from __future__ import annotations

from aiogram import F
from aiogram import Router
from aiogram.filters import Command
from aiogram.types import Message

from bot.app.formatters import format_status
from bot.app.services.room_finder import RoomFinderApi, RoomFinderError
from bot.config import Config


router = Router(name="admin")


def user_id(message: Message) -> int | None:
    return message.from_user.id if message.from_user else None


@router.message(Command("refresh"))
@router.message(F.text == "Refresh timetable")
async def refresh(message: Message, api: RoomFinderApi, config: Config) -> None:
    sender_id = user_id(message)

    if not config.is_admin(sender_id):
        await message.answer("This command is admin-only.")
        return

    if not config.has_refresh:
        await message.answer("REFRESH_TOKEN is not configured for the bot.")
        return

    progress = await message.answer("Refreshing timetable...")

    try:
        data = await api.refresh()
    except RoomFinderError as error:
        await progress.edit_text(f"Refresh failed: {error}")
        return

    status = data.get("status") if isinstance(data.get("status"), dict) else None
    if status:
        await progress.edit_text(f"Refresh complete.\n\n{format_status(status)}")
    else:
        await progress.edit_text("Refresh complete.")
