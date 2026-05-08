from __future__ import annotations

from aiogram import Router
from aiogram.filters import Command
from aiogram.types import Message

from bot.app.formatters import format_group
from bot.app.room_logic import find_group_matches, group_schedule_for_day
from bot.app.services.room_finder import RoomFinderApi, RoomFinderError


router = Router(name="group")


def command_args(message: Message) -> str:
    text = message.text or ""
    return text.split(maxsplit=1)[1].strip() if len(text.split(maxsplit=1)) > 1 else ""


@router.message(Command("group"))
@router.message(lambda message: bool(message.text) and message.text.casefold().startswith("group "))
async def group(message: Message, api: RoomFinderApi) -> None:
    query = command_args(message)

    if not query:
        await message.answer("Usage: /group 102")
        return

    try:
        status = await api.status(mode="now")
    except RoomFinderError as error:
        await message.answer(f"Could not load group schedule: {error}")
        return

    await message.answer(
        format_group(
            status=status,
            current=find_group_matches(status, query),
            schedule=group_schedule_for_day(status, query),
            query=query,
        )
    )
