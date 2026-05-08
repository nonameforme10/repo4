from __future__ import annotations

from aiogram import Router
from aiogram.filters import Command
from aiogram.types import Message

from bot.app.formatters import format_group
from bot.app.i18n import LanguageCode, resolve_language, t
from bot.app.language_store import LanguageStore
from bot.app.room_logic import find_group_matches, group_schedule_for_day
from bot.app.services.room_finder import RoomFinderApi, RoomFinderError


router = Router(name="group")


def message_language(message: Message, language_store: LanguageStore) -> LanguageCode:
    user = message.from_user
    return resolve_language(
        user.id if user else None,
        user.language_code if user else None,
        language_store,
    )


def command_args(message: Message) -> str:
    text = message.text or ""
    return text.split(maxsplit=1)[1].strip() if len(text.split(maxsplit=1)) > 1 else ""


@router.message(Command("group"))
@router.message(lambda message: bool(message.text) and message.text.casefold().startswith("group "))
async def group(message: Message, api: RoomFinderApi, language_store: LanguageStore) -> None:
    lang = message_language(message, language_store)
    query = command_args(message)

    if not query:
        await message.answer(t(lang, "usage_group"))
        return

    try:
        status = await api.status(mode="now")
    except RoomFinderError as error:
        await message.answer(t(lang, "could_not_load_group", error=error))
        return

    await message.answer(
        format_group(
            status=status,
            current=find_group_matches(status, query),
            schedule=group_schedule_for_day(status, query),
            query=query,
            lang=lang,
        )
    )
