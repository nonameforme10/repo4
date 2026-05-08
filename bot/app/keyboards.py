from __future__ import annotations

from aiogram.types import (
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    KeyboardButton,
    ReplyKeyboardMarkup,
    WebAppInfo,
)

from bot.config import Config


def main_reply_keyboard(config: Config, is_admin: bool = False) -> ReplyKeyboardMarkup:
    rows = [
        [
            KeyboardButton(text="Available now"),
            KeyboardButton(text="Next lesson"),
        ],
        [
            KeyboardButton(text="Busy rooms"),
            KeyboardButton(text="Status"),
        ],
        [
            KeyboardButton(text="Open app", web_app=WebAppInfo(url=config.mini_app_url)),
        ],
    ]

    if is_admin:
        rows.append([KeyboardButton(text="Refresh timetable")])

    return ReplyKeyboardMarkup(
        keyboard=rows,
        resize_keyboard=True,
        input_field_placeholder="Choose an action...",
    )


def inline_action_keyboard(config: Config) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="Available now", callback_data="rooms:now"),
                InlineKeyboardButton(text="Next lesson", callback_data="rooms:next"),
            ],
            [
                InlineKeyboardButton(text="Busy rooms", callback_data="busy:now"),
                InlineKeyboardButton(text="Status", callback_data="status"),
            ],
            [
                InlineKeyboardButton(text="Open app", web_app=WebAppInfo(url=config.mini_app_url)),
            ],
        ]
    )


def web_app_keyboard(config: Config) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="Open PDP Room Finder", web_app=WebAppInfo(url=config.mini_app_url))]
        ]
    )
