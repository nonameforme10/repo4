from __future__ import annotations

from aiogram import F
from aiogram import Router
from aiogram.filters import Command, CommandStart
from aiogram.types import CallbackQuery, Message

from bot.app.formatters import format_status
from bot.app.keyboards import main_reply_keyboard, web_app_keyboard
from bot.app.services.room_finder import RoomFinderApi, RoomFinderError
from bot.config import Config


router = Router(name="common")

PUBLIC_HELP_TEXT = """<b>PDP Room Finder bot</b>

Use the buttons below for quick room checks.

Manual examples still work:
room 304
group 102
when Friday 10:30
stay 10:30 13:20
"""

ADMIN_HELP_TEXT = """

Admin:
/refresh - admin-only timetable refresh
"""


def user_id(message: Message) -> int | None:
    return message.from_user.id if message.from_user else None


@router.message(CommandStart())
async def start(message: Message, config: Config) -> None:
    caption = (
        "🔴 <b>PDP ROOM FINDER</b>\n"
        "━━━━━━━━━━━━━━━━\n"
        "🏫 Realtime PDP room availability\n"
        "⏱ Check now, next lesson, or custom time\n"
        "👥 Find where a group is studying\n"
        "🚪 Open the Mini App when you need the full dashboard\n\n"
        "👇 Choose an action from the menu below."
    )
    keyboard = main_reply_keyboard(config, is_admin=config.is_admin(user_id(message)))
    await message.answer(caption, reply_markup=keyboard)


@router.message(Command("help"))
async def help_command(message: Message, config: Config) -> None:
    admin_text = ADMIN_HELP_TEXT if config.is_admin(user_id(message)) else ""
    await message.answer(f"{PUBLIC_HELP_TEXT}{admin_text}")


@router.message(Command("webapp"))
async def webapp(message: Message, config: Config) -> None:
    await message.answer("Open the full Mini App here:", reply_markup=web_app_keyboard(config))


@router.message(F.text == "Open app")
async def webapp_button(message: Message, config: Config) -> None:
    await webapp(message, config)


@router.message(Command("status"))
async def status(message: Message, api: RoomFinderApi) -> None:
    try:
        data = await api.status()
    except RoomFinderError as error:
        await message.answer(f"Could not load status: {error}")
        return

    await message.answer(format_status(data))


@router.message(F.text == "Status")
async def status_button(message: Message, api: RoomFinderApi) -> None:
    await status(message, api)


@router.callback_query(lambda query: query.data == "status")
async def status_callback(callback: CallbackQuery, api: RoomFinderApi) -> None:
    await callback.answer()

    if not callback.message:
        return

    try:
        data = await api.status()
    except RoomFinderError as error:
        await callback.message.answer(f"Could not load status: {error}")
        return

    await callback.message.answer(format_status(data))


@router.message()
async def fallback(message: Message) -> None:
    await message.answer("Use the buttons below, or type examples like: room 304, group 102, stay 10:30 13:20.")
