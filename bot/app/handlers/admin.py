from __future__ import annotations

from aiogram import Bot, Router
from aiogram.filters import Command
from aiogram.types import Message

from bot.app.formatters import e
from bot.app.i18n import LanguageCode, button_matches, resolve_language, t
from bot.app.keyboards import admin_reply_keyboard, main_reply_keyboard
from bot.app.language_store import LanguageStore
from bot.app.user_store import UserStore
from bot.config import Config


router = Router(name="admin")
BROADCAST_USERS: set[int] = set()
MAX_VISIBLE_USERS = 80


def user_id(message: Message) -> int | None:
    return message.from_user.id if message.from_user else None


def message_language(message: Message, language_store: LanguageStore) -> LanguageCode:
    user = message.from_user
    return resolve_language(
        user.id if user else None,
        user.language_code if user else None,
        language_store,
    )


def is_admin(message: Message, config: Config) -> bool:
    return config.is_admin(user_id(message))


def waiting_for_broadcast(message: Message) -> bool:
    sender_id = user_id(message)
    return sender_id in BROADCAST_USERS and not (message.text or "").startswith("/")


def display_user(user: dict) -> str:
    username = str(user.get("username") or "")
    first_name = str(user.get("first_name") or "")
    last_name = str(user.get("last_name") or "")
    full_name = " ".join(part for part in (first_name, last_name) if part).strip()
    label = f"@{username}" if username else full_name or str(user.get("id"))
    return f"{e(label)} <code>{e(user.get('id'))}</code>"


async def send_admin_menu(message: Message, config: Config, language_store: LanguageStore) -> None:
    lang = message_language(message, language_store)

    if not is_admin(message, config):
        await message.answer(t(lang, "admin_only"))
        return

    sender_id = user_id(message)
    if sender_id is not None:
        BROADCAST_USERS.discard(sender_id)

    await message.answer(t(lang, "admin_menu"), reply_markup=admin_reply_keyboard(lang))


@router.message(Command("admin"))
@router.message(lambda message: button_matches(message.text, "button_admin"))
async def admin_menu(message: Message, config: Config, language_store: LanguageStore) -> None:
    await send_admin_menu(message, config, language_store)


@router.message(lambda message: button_matches(message.text, "button_back"))
async def back_to_main(message: Message, config: Config, language_store: LanguageStore) -> None:
    lang = message_language(message, language_store)
    sender_id = user_id(message)

    if sender_id is not None:
        BROADCAST_USERS.discard(sender_id)

    await message.answer(
        t(lang, "welcome"),
        reply_markup=main_reply_keyboard(config, lang, is_admin=config.is_admin(sender_id)),
    )


@router.message(Command("broadcast"))
@router.message(lambda message: button_matches(message.text, "button_global_message"))
async def broadcast_prompt(message: Message, config: Config, language_store: LanguageStore) -> None:
    lang = message_language(message, language_store)

    if not is_admin(message, config):
        await message.answer(t(lang, "admin_only"))
        return

    sender_id = user_id(message)
    if sender_id is not None:
        BROADCAST_USERS.add(sender_id)

    await message.answer(t(lang, "broadcast_prompt"), reply_markup=admin_reply_keyboard(lang))


@router.message(Command("users"))
@router.message(lambda message: button_matches(message.text, "button_bot_users"))
async def bot_users(message: Message, config: Config, language_store: LanguageStore, user_store: UserStore) -> None:
    lang = message_language(message, language_store)
    sender_id = user_id(message)

    if not is_admin(message, config):
        await message.answer(t(lang, "admin_only"))
        return

    if sender_id is not None:
        BROADCAST_USERS.discard(sender_id)

    users = user_store.all()
    if not users:
        await message.answer(t(lang, "users_empty"), reply_markup=admin_reply_keyboard(lang))
        return

    lines = [t(lang, "users_title", count=len(users))]
    for index, user in enumerate(users[:MAX_VISIBLE_USERS], start=1):
        lines.append(f"{index}. {display_user(user)}")

    if len(users) > MAX_VISIBLE_USERS:
        lines.append(t(lang, "more_suffix", count=len(users) - MAX_VISIBLE_USERS).strip())

    await message.answer("\n".join(lines), reply_markup=admin_reply_keyboard(lang))


@router.message(waiting_for_broadcast)
async def broadcast_send(
    message: Message,
    bot: Bot,
    config: Config,
    language_store: LanguageStore,
    user_store: UserStore,
) -> None:
    lang = message_language(message, language_store)
    sender_id = user_id(message)

    if not is_admin(message, config):
        await message.answer(t(lang, "admin_only"))
        return

    if sender_id is not None:
        BROADCAST_USERS.discard(sender_id)

    sent = 0
    failed = 0
    for recipient_id in user_store.ids():
        try:
            await bot.copy_message(
                chat_id=recipient_id,
                from_chat_id=message.chat.id,
                message_id=message.message_id,
            )
            sent += 1
        except Exception:
            failed += 1

    await message.answer(
        t(lang, "broadcast_complete", sent=sent, failed=failed),
        reply_markup=admin_reply_keyboard(lang),
    )
