from __future__ import annotations

import re

from aiogram import F, Router
from aiogram.filters import Command
from aiogram.types import CallbackQuery, Message

from bot.app.formatters import format_group
from bot.app.i18n import LanguageCode, button_matches, resolve_language, t
from bot.app.language_store import LanguageStore
from bot.app.room_logic import group_schedule_for_day
from bot.app.services.room_finder import RoomFinderApi, RoomFinderError


router = Router(name="group")
PENDING_GROUP_USERS: set[int] = set()
GROUP_QUERY_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9 -]{0,24}$")


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


def user_id(message: Message) -> int | None:
    return message.from_user.id if message.from_user else None


def is_waiting_for_group(message: Message) -> bool:
    sender_id = user_id(message)
    text = (message.text or "").strip()
    return (
        sender_id in PENDING_GROUP_USERS
        and bool(text)
        and not text.startswith("/")
        and any(character.isdigit() for character in text)
        and bool(GROUP_QUERY_RE.fullmatch(text))
    )


async def ask_group(message: Message, language_store: LanguageStore) -> None:
    sender_id = user_id(message)
    if sender_id is not None:
        PENDING_GROUP_USERS.add(sender_id)

    await message.answer(t(message_language(message, language_store), "group_prompt"))


async def send_group_plan(message: Message, api: RoomFinderApi, language_store: LanguageStore, query: str) -> None:
    lang = message_language(message, language_store)

    try:
        status = await api.status(mode="now")
    except RoomFinderError as error:
        await message.answer(t(lang, "could_not_load_group", error=error))
        return

    await message.answer(
        format_group(
            status=status,
            current=[],
            schedule=group_schedule_for_day(status, query),
            query=query,
            lang=lang,
        )
    )


@router.message(lambda message: button_matches(message.text, "button_find_group"))
async def group_button(message: Message, language_store: LanguageStore) -> None:
    await ask_group(message, language_store)


@router.callback_query(F.data == "group:ask")
async def group_callback(callback: CallbackQuery, language_store: LanguageStore) -> None:
    await callback.answer()

    if callback.message:
        PENDING_GROUP_USERS.add(callback.from_user.id)
        lang = resolve_language(callback.from_user.id, callback.from_user.language_code, language_store)
        await callback.message.answer(t(lang, "group_prompt"))


@router.message(is_waiting_for_group)
async def group_answer(message: Message, api: RoomFinderApi, language_store: LanguageStore) -> None:
    sender_id = user_id(message)
    if sender_id is not None:
        PENDING_GROUP_USERS.discard(sender_id)

    await send_group_plan(message, api, language_store, (message.text or "").strip())


@router.message(Command("group"))
@router.message(lambda message: bool(message.text) and message.text.casefold().startswith("group "))
async def group(message: Message, api: RoomFinderApi, language_store: LanguageStore) -> None:
    query = command_args(message)

    if not query:
        await ask_group(message, language_store)
        return

    await send_group_plan(message, api, language_store, query)
