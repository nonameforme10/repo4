from __future__ import annotations

from aiogram import Router
from aiogram.filters import Command, CommandStart
from aiogram.types import CallbackQuery, Message

from bot.app.formatters import format_status
from bot.app.i18n import (
    LanguageCode,
    button_matches,
    is_language_code,
    language_from_choice_text,
    normalize_language,
    resolve_language,
    t,
)
from bot.app.keyboards import language_selector_keyboard, main_reply_keyboard, web_app_keyboard
from bot.app.language_store import LanguageStore
from bot.app.services.room_finder import RoomFinderApi, RoomFinderError
from bot.config import Config


router = Router(name="common")


def user_id(message: Message) -> int | None:
    return message.from_user.id if message.from_user else None


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


async def send_home(message: Message, config: Config, lang: LanguageCode, sender_id: int | None) -> None:
    keyboard = main_reply_keyboard(config, lang, is_admin=config.is_admin(sender_id))
    await message.answer(t(lang, "welcome"), reply_markup=keyboard)


async def send_language_prompt(message: Message, lang: LanguageCode) -> None:
    await message.answer(t(lang, "choose_language"), reply_markup=language_selector_keyboard())


@router.message(CommandStart())
async def start(message: Message, config: Config, language_store: LanguageStore) -> None:
    sender_id = user_id(message)
    lang = message_language(message, language_store)

    if not language_store.has(sender_id):
        await send_language_prompt(message, lang)
        return

    await send_home(message, config, lang, sender_id)


@router.message(Command("language"))
@router.message(lambda message: button_matches(message.text, "button_language"))
async def choose_language(message: Message, language_store: LanguageStore) -> None:
    await send_language_prompt(message, message_language(message, language_store))


@router.message(lambda message: language_from_choice_text(message.text) is not None)
async def choose_language_text(message: Message, config: Config, language_store: LanguageStore) -> None:
    lang = language_from_choice_text(message.text)
    if lang is None:
        return

    language_store.set(user_id(message), lang)
    await message.answer(t(lang, "language_saved"))
    await send_home(message, config, lang, user_id(message))


@router.callback_query(lambda query: bool(query.data) and query.data.startswith("language:"))
async def choose_language_callback(callback: CallbackQuery, config: Config, language_store: LanguageStore) -> None:
    code = (callback.data or "").split(":", 1)[1]
    if not is_language_code(code):
        await callback.answer()
        return

    lang = normalize_language(code)
    language_store.set(callback.from_user.id, lang)
    await callback.answer(t(lang, "language_saved"))

    if callback.message:
        await callback.message.edit_text(t(lang, "language_saved"))
        await send_home(callback.message, config, lang, callback.from_user.id)


@router.message(Command("help"))
async def help_command(message: Message, config: Config, language_store: LanguageStore) -> None:
    lang = message_language(message, language_store)
    admin_text = t(lang, "admin_help") if config.is_admin(user_id(message)) else ""
    await message.answer(f"{t(lang, 'help_public')}{admin_text}")


@router.message(Command("webapp"))
async def webapp(message: Message, config: Config, language_store: LanguageStore) -> None:
    lang = message_language(message, language_store)
    await message.answer(t(lang, "open_webapp"), reply_markup=web_app_keyboard(config, lang))


@router.message(lambda message: button_matches(message.text, "button_open_app"))
async def webapp_button(message: Message, config: Config, language_store: LanguageStore) -> None:
    await webapp(message, config, language_store)


@router.message(Command("status"))
async def status(message: Message, api: RoomFinderApi, language_store: LanguageStore) -> None:
    lang = message_language(message, language_store)

    try:
        data = await api.status()
    except RoomFinderError as error:
        await message.answer(t(lang, "could_not_load_status", error=error))
        return

    await message.answer(format_status(data, lang))


@router.message(lambda message: button_matches(message.text, "button_status"))
async def status_button(message: Message, api: RoomFinderApi, language_store: LanguageStore) -> None:
    await status(message, api, language_store)


@router.callback_query(lambda query: query.data == "status")
async def status_callback(callback: CallbackQuery, api: RoomFinderApi, language_store: LanguageStore) -> None:
    lang = callback_language(callback, language_store)
    await callback.answer()

    if not callback.message:
        return

    try:
        data = await api.status()
    except RoomFinderError as error:
        await callback.message.answer(t(lang, "could_not_load_status", error=error))
        return

    await callback.message.answer(format_status(data, lang))


@router.message()
async def fallback(message: Message, language_store: LanguageStore) -> None:
    await message.answer(t(message_language(message, language_store), "fallback"))
