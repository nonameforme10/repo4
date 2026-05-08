from __future__ import annotations

from aiogram.types import (
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    KeyboardButton,
    ReplyKeyboardMarkup,
    WebAppInfo,
)

from bot.app.i18n import DEFAULT_LANGUAGE, LANGUAGE_OPTIONS, LanguageCode, t
from bot.config import Config


def admin_reply_keyboard(language: LanguageCode = DEFAULT_LANGUAGE) -> ReplyKeyboardMarkup:
    return ReplyKeyboardMarkup(
        keyboard=[
            [
                KeyboardButton(text=t(language, "button_global_message")),
                KeyboardButton(text=t(language, "button_bot_users")),
            ],
            [
                KeyboardButton(text=t(language, "button_back")),
            ],
        ],
        resize_keyboard=True,
        input_field_placeholder=t(language, "admin_keyboard_placeholder"),
    )


def main_reply_keyboard(config: Config, language: LanguageCode = DEFAULT_LANGUAGE, is_admin: bool = False) -> ReplyKeyboardMarkup:
    rows = [
        [
            KeyboardButton(text=t(language, "button_available_now")),
            KeyboardButton(text=t(language, "button_find_group")),
        ],
        [
            KeyboardButton(text=t(language, "button_busy_rooms")),
            KeyboardButton(text=t(language, "button_open_app"), web_app=WebAppInfo(url=config.mini_app_url)),
        ],
        [
            KeyboardButton(text=t(language, "button_language")),
        ],
    ]

    if is_admin:
        rows.append([KeyboardButton(text=t(language, "button_admin"))])

    return ReplyKeyboardMarkup(
        keyboard=rows,
        resize_keyboard=True,
        input_field_placeholder=t(language, "keyboard_placeholder"),
    )


def inline_action_keyboard(config: Config, language: LanguageCode = DEFAULT_LANGUAGE) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text=t(language, "button_available_now"), callback_data="rooms:now"),
                InlineKeyboardButton(text=t(language, "button_find_group"), callback_data="group:ask"),
            ],
            [
                InlineKeyboardButton(text=t(language, "button_busy_rooms"), callback_data="busy:now"),
            ],
            [
                InlineKeyboardButton(text=t(language, "button_open_app"), web_app=WebAppInfo(url=config.mini_app_url)),
            ],
        ]
    )


def language_selector_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text=option["button"], callback_data=f"language:{option['code']}")
                for option in LANGUAGE_OPTIONS
            ],
        ]
    )


def web_app_keyboard(config: Config, language: LanguageCode = DEFAULT_LANGUAGE) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text=t(language, "button_open_app"), web_app=WebAppInfo(url=config.mini_app_url))]
        ]
    )
