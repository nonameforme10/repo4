from __future__ import annotations

from aiogram import F, Router
from aiogram.filters import Command
from aiogram.types import CallbackQuery, Message

from bot.app.formatters import format_available, format_busy, format_room_plan, format_stay
from bot.app.room_logic import (
    first_matching_room,
    normalize_day,
    normalize_time,
    room_matches,
    rooms_free_for_range,
    time_to_minutes,
)
from bot.app.services.room_finder import RoomFinderApi, RoomFinderError


router = Router(name="rooms")


def command_args(message: Message) -> str:
    text = message.text or ""
    return text.split(maxsplit=1)[1].strip() if len(text.split(maxsplit=1)) > 1 else ""


def filter_rooms(rooms: list[dict], query: str) -> list[dict]:
    return [room for room in rooms if room_matches(room, query)]


async def send_available(message: Message, api: RoomFinderApi, mode: str, query: str = "") -> None:
    try:
        status = await api.status(mode=mode)
    except RoomFinderError as error:
        await message.answer(f"Could not load rooms: {error}")
        return

    rooms = filter_rooms(status.get("available", []), query)
    label = "Available next lesson" if mode == "next" else "Available rooms"
    await message.answer(format_available(status, rooms, label=label))


@router.message(Command("rooms"))
async def rooms(message: Message, api: RoomFinderApi) -> None:
    await send_available(message, api, mode="now", query=command_args(message))


@router.message(F.text == "Available now")
async def rooms_button(message: Message, api: RoomFinderApi) -> None:
    await send_available(message, api, mode="now")


@router.message(Command("next"))
async def next_rooms(message: Message, api: RoomFinderApi) -> None:
    await send_available(message, api, mode="next", query=command_args(message))


@router.message(F.text == "Next lesson")
async def next_rooms_button(message: Message, api: RoomFinderApi) -> None:
    await send_available(message, api, mode="next")


@router.message(Command("busy"))
async def busy(message: Message, api: RoomFinderApi) -> None:
    query = command_args(message)

    try:
        status = await api.status(mode="now")
    except RoomFinderError as error:
        await message.answer(f"Could not load busy rooms: {error}")
        return

    await message.answer(format_busy(status, filter_rooms(status.get("busy", []), query)))


@router.message(F.text == "Busy rooms")
async def busy_button(message: Message, api: RoomFinderApi) -> None:
    try:
        status = await api.status(mode="now")
    except RoomFinderError as error:
        await message.answer(f"Could not load busy rooms: {error}")
        return

    await message.answer(format_busy(status, status.get("busy", [])))


@router.message(Command("when"))
@router.message(lambda message: bool(message.text) and message.text.casefold().startswith("when "))
async def when(message: Message, api: RoomFinderApi) -> None:
    args = command_args(message).split()

    if len(args) < 2:
        await message.answer("Usage: /when Friday 10:30\nExample: /when juma 12:00")
        return

    day = normalize_day(args[0])
    time = normalize_time(args[1])
    query = " ".join(args[2:])

    if not day or not time:
        await message.answer("Use a valid day and time, for example: /when Friday 10:30")
        return

    try:
        status = await api.status(mode="custom", day=day, time=time)
    except RoomFinderError as error:
        await message.answer(f"Could not load rooms: {error}")
        return

    await message.answer(format_available(status, filter_rooms(status.get("available", []), query), label="Available rooms"))


@router.message(Command("room"))
@router.message(lambda message: bool(message.text) and message.text.casefold().startswith("room "))
async def room(message: Message, api: RoomFinderApi) -> None:
    query = command_args(message)

    if not query:
        await message.answer("Usage: /room 304")
        return

    try:
        status = await api.status(mode="now")
    except RoomFinderError as error:
        await message.answer(f"Could not load room: {error}")
        return

    found = first_matching_room(status, query)
    if not found:
        await message.answer(f"No room matched '{query}'.")
        return

    await message.answer(format_room_plan(status, found))


@router.message(Command("stay"))
@router.message(lambda message: bool(message.text) and message.text.casefold().startswith("stay "))
async def stay(message: Message, api: RoomFinderApi) -> None:
    args = command_args(message).split()

    if not args:
        await message.answer("Usage: /stay 13:20 or /stay 10:30 13:20")
        return

    day: str | None = None
    start: str | None = None
    end: str | None = None
    query = ""

    if len(args) >= 3 and normalize_day(args[0]):
        day = normalize_day(args[0])
        start = normalize_time(args[1])
        end = normalize_time(args[2])
        query = " ".join(args[3:])
    elif len(args) >= 2:
        start = normalize_time(args[0])
        end = normalize_time(args[1])
        query = " ".join(args[2:])
    else:
        end = normalize_time(args[0])

    if not end:
        await message.answer("Use valid time, for example: /stay 10:30 13:20")
        return

    try:
        status = await api.status(mode="custom", day=day, time=start) if start else await api.status(mode="now")
    except RoomFinderError as error:
        await message.answer(f"Could not load stay rooms: {error}")
        return

    start = start or str(status.get("time", ""))

    if time_to_minutes(end) <= time_to_minutes(start):
        await message.answer("End time must be later than start time.")
        return

    await message.answer(format_stay(status, rooms_free_for_range(status, start, end, query), start, end))


@router.callback_query(F.data == "rooms:now")
async def rooms_now_callback(callback: CallbackQuery, api: RoomFinderApi) -> None:
    await callback.answer()
    if callback.message:
        await send_available(callback.message, api, mode="now")


@router.callback_query(F.data == "rooms:next")
async def rooms_next_callback(callback: CallbackQuery, api: RoomFinderApi) -> None:
    await callback.answer()
    if callback.message:
        await send_available(callback.message, api, mode="next")


@router.callback_query(F.data == "busy:now")
async def busy_callback(callback: CallbackQuery, api: RoomFinderApi) -> None:
    await callback.answer()
    if not callback.message:
        return

    try:
        status = await api.status(mode="now")
    except RoomFinderError as error:
        await callback.message.answer(f"Could not load busy rooms: {error}")
        return

    await callback.message.answer(format_busy(status, status.get("busy", [])))
