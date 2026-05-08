from __future__ import annotations

from aiogram import F, Router
from aiogram.filters import Command
from aiogram.types import CallbackQuery, Message

from bot.app.formatters import format_available, format_busy, format_room_plan, format_stay
from bot.app.i18n import LanguageCode, button_matches, resolve_language, t
from bot.app.language_store import LanguageStore
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


def message_language(message: Message, language_store: LanguageStore) -> LanguageCode:
    user = message.from_user
    return resolve_language(
        user.id if user else None,
        user.language_code if user else None,
        language_store,
    )


def callback_language(callback: CallbackQuery, language_store: LanguageStore) -> LanguageCode:
    user = callback.from_user
    return resolve_language(user.id, user.language_code, language_store)


def command_args(message: Message) -> str:
    text = message.text or ""
    return text.split(maxsplit=1)[1].strip() if len(text.split(maxsplit=1)) > 1 else ""


def filter_rooms(rooms: list[dict], query: str) -> list[dict]:
    return [room for room in rooms if room_matches(room, query)]


async def send_available(
    message: Message,
    api: RoomFinderApi,
    mode: str,
    lang: LanguageCode,
    query: str = "",
) -> None:
    try:
        status = await api.status(mode=mode)
    except RoomFinderError as error:
        await message.answer(t(lang, "could_not_load_rooms", error=error))
        return

    rooms = filter_rooms(status.get("available", []), query)
    label = t(lang, "available_next_lesson") if mode == "next" else t(lang, "available_rooms")
    await message.answer(format_available(status, rooms, label=label, lang=lang))


@router.message(Command("rooms"))
async def rooms(message: Message, api: RoomFinderApi, language_store: LanguageStore) -> None:
    await send_available(message, api, mode="now", lang=message_language(message, language_store), query=command_args(message))


@router.message(lambda message: button_matches(message.text, "button_available_now"))
async def rooms_button(message: Message, api: RoomFinderApi, language_store: LanguageStore) -> None:
    await send_available(message, api, mode="now", lang=message_language(message, language_store))


@router.message(Command("next"))
async def next_rooms(message: Message, api: RoomFinderApi, language_store: LanguageStore) -> None:
    await send_available(message, api, mode="next", lang=message_language(message, language_store), query=command_args(message))


@router.message(lambda message: button_matches(message.text, "button_next_lesson"))
async def next_rooms_button(message: Message, api: RoomFinderApi, language_store: LanguageStore) -> None:
    await send_available(message, api, mode="next", lang=message_language(message, language_store))


@router.message(Command("busy"))
async def busy(message: Message, api: RoomFinderApi, language_store: LanguageStore) -> None:
    lang = message_language(message, language_store)
    query = command_args(message)

    try:
        status = await api.status(mode="now")
    except RoomFinderError as error:
        await message.answer(t(lang, "could_not_load_busy", error=error))
        return

    await message.answer(format_busy(status, filter_rooms(status.get("busy", []), query), lang))


@router.message(lambda message: button_matches(message.text, "button_busy_rooms"))
async def busy_button(message: Message, api: RoomFinderApi, language_store: LanguageStore) -> None:
    lang = message_language(message, language_store)

    try:
        status = await api.status(mode="now")
    except RoomFinderError as error:
        await message.answer(t(lang, "could_not_load_busy", error=error))
        return

    await message.answer(format_busy(status, status.get("busy", []), lang))


@router.message(Command("when"))
@router.message(lambda message: bool(message.text) and message.text.casefold().startswith("when "))
async def when(message: Message, api: RoomFinderApi, language_store: LanguageStore) -> None:
    lang = message_language(message, language_store)
    args = command_args(message).split()

    if len(args) < 2:
        await message.answer(t(lang, "usage_when"))
        return

    day = normalize_day(args[0])
    time = normalize_time(args[1])
    query = " ".join(args[2:])

    if not day or not time:
        await message.answer(t(lang, "invalid_day_time"))
        return

    try:
        status = await api.status(mode="custom", day=day, time=time)
    except RoomFinderError as error:
        await message.answer(t(lang, "could_not_load_rooms", error=error))
        return

    await message.answer(
        format_available(
            status,
            filter_rooms(status.get("available", []), query),
            label=t(lang, "available_rooms"),
            lang=lang,
        )
    )


@router.message(Command("room"))
@router.message(lambda message: bool(message.text) and message.text.casefold().startswith("room "))
async def room(message: Message, api: RoomFinderApi, language_store: LanguageStore) -> None:
    lang = message_language(message, language_store)
    query = command_args(message)

    if not query:
        await message.answer(t(lang, "usage_room"))
        return

    try:
        status = await api.status(mode="now")
    except RoomFinderError as error:
        await message.answer(t(lang, "could_not_load_room", error=error))
        return

    found = first_matching_room(status, query)
    if not found:
        await message.answer(t(lang, "no_room_match", query=query))
        return

    await message.answer(format_room_plan(status, found, lang))


@router.message(Command("stay"))
@router.message(lambda message: bool(message.text) and message.text.casefold().startswith("stay "))
async def stay(message: Message, api: RoomFinderApi, language_store: LanguageStore) -> None:
    lang = message_language(message, language_store)
    args = command_args(message).split()

    if not args:
        await message.answer(t(lang, "usage_stay"))
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
        await message.answer(t(lang, "invalid_time"))
        return

    try:
        status = await api.status(mode="custom", day=day, time=start) if start else await api.status(mode="now")
    except RoomFinderError as error:
        await message.answer(t(lang, "could_not_load_stay", error=error))
        return

    start = start or str(status.get("time", ""))

    if time_to_minutes(end) <= time_to_minutes(start):
        await message.answer(t(lang, "end_after_start"))
        return

    await message.answer(format_stay(status, rooms_free_for_range(status, start, end, query), start, end, lang))


@router.callback_query(F.data == "rooms:now")
async def rooms_now_callback(callback: CallbackQuery, api: RoomFinderApi, language_store: LanguageStore) -> None:
    lang = callback_language(callback, language_store)
    await callback.answer()
    if callback.message:
        await send_available(callback.message, api, mode="now", lang=lang)


@router.callback_query(F.data == "rooms:next")
async def rooms_next_callback(callback: CallbackQuery, api: RoomFinderApi, language_store: LanguageStore) -> None:
    lang = callback_language(callback, language_store)
    await callback.answer()
    if callback.message:
        await send_available(callback.message, api, mode="next", lang=lang)


@router.callback_query(F.data == "busy:now")
async def busy_callback(callback: CallbackQuery, api: RoomFinderApi, language_store: LanguageStore) -> None:
    lang = callback_language(callback, language_store)
    await callback.answer()
    if not callback.message:
        return

    try:
        status = await api.status(mode="now")
    except RoomFinderError as error:
        await callback.message.answer(t(lang, "could_not_load_busy", error=error))
        return

    await callback.message.answer(format_busy(status, status.get("busy", []), lang))
