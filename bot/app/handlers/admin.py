from __future__ import annotations

from aiogram import Router
from aiogram.filters import Command
from aiogram.types import Message

from bot.app.formatters import format_status
from bot.app.i18n import LanguageCode, button_matches, resolve_language, t
from bot.app.language_store import LanguageStore
from bot.app.services.room_finder import RoomFinderApi, RoomFinderError
from bot.config import Config


router = Router(name="admin")


def user_id(message: Message) -> int | None:
    return message.from_user.id if message.from_user else None


def message_language(message: Message, language_store: LanguageStore) -> LanguageCode:
    user = message.from_user
    return resolve_language(
        user.id if user else None,
        user.language_code if user else None,
        language_store,
    )


@router.message(Command("refresh"))
@router.message(lambda message: button_matches(message.text, "button_refresh_timetable"))
async def refresh(message: Message, api: RoomFinderApi, config: Config, language_store: LanguageStore) -> None:
    sender_id = user_id(message)
    lang = message_language(message, language_store)

    if not config.is_admin(sender_id):
        await message.answer(t(lang, "refresh_admin_only"))
        return

    if not config.has_refresh:
        await message.answer(t(lang, "refresh_missing_token"))
        return

    progress = await message.answer(t(lang, "refreshing"))

    try:
        data = await api.refresh()
    except RoomFinderError as error:
        await progress.edit_text(t(lang, "refresh_failed", error=error))
        return

    status = data.get("status") if isinstance(data.get("status"), dict) else None
    if status:
        await progress.edit_text(f"{t(lang, 'refresh_complete')}\n\n{format_status(status, lang)}")
    else:
        await progress.edit_text(t(lang, "refresh_complete"))
