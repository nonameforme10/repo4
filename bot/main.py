from __future__ import annotations

import asyncio
import logging
import sys

from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.types import BotCommand, BotCommandScopeChat

from bot.app.handlers import admin, common, group, rooms
from bot.app.language_store import LanguageStore
from bot.app.services.room_finder import RoomFinderApi
from bot.app.user_store import UserStore, UserTrackingMiddleware
from bot.config import Config, ROOT_DIR, load_config


PUBLIC_COMMANDS = [
    BotCommand(command="start", description="Choose language and open the menu"),
    BotCommand(command="menu", description="Show the main menu"),
    BotCommand(command="language", description="Change language"),
    BotCommand(command="settings", description="Open language settings"),
    BotCommand(command="help", description="Show examples and commands"),
    BotCommand(command="rooms", description="Show available rooms now"),
    BotCommand(command="busy", description="Show busy rooms now"),
    BotCommand(command="room", description="Check one room, example: /room 304"),
    BotCommand(command="group", description="Find group plan and rooms"),
    BotCommand(command="when", description="Check time, example: /when Friday 10:30"),
    BotCommand(command="stay", description="Rooms free for a period"),
    BotCommand(command="webapp", description="Open the Mini App"),
]

ADMIN_COMMANDS = [
    BotCommand(command="admin", description="Open admin menu"),
    BotCommand(command="broadcast", description="Send message to all users"),
    BotCommand(command="users", description="Show bot users"),
]


async def set_profile_text(bot: Bot) -> None:
    await bot.set_my_short_description(short_description="Find free PDP rooms by time, room, or group.")
    await bot.set_my_description(
        description=(
            "PDP Room Finder shows realtime room availability for PDP University. "
            "Use the menu buttons to check available rooms, busy rooms, group schedules, and the Mini App."
        )
    )


async def set_commands(bot: Bot, config: Config) -> None:
    await set_profile_text(bot)
    await bot.delete_my_commands()
    await bot.set_my_commands(PUBLIC_COMMANDS)

    for admin_id in config.admin_ids:
        await bot.set_my_commands(
            [*PUBLIC_COMMANDS, *ADMIN_COMMANDS],
            scope=BotCommandScopeChat(chat_id=admin_id),
        )


async def run(config: Config) -> None:
    if not config.bot_token:
        raise RuntimeError("TELEGRAM_BOT_TOKEN is not configured.")

    bot = Bot(
        token=config.bot_token,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML),
    )
    dispatcher = Dispatcher()
    user_store = UserStore(ROOT_DIR / "data" / "bot-users.json")
    dispatcher.message.middleware(UserTrackingMiddleware(user_store))
    dispatcher.callback_query.middleware(UserTrackingMiddleware(user_store))
    dispatcher.include_routers(admin.router, rooms.router, group.router, common.router)
    language_store = LanguageStore(ROOT_DIR / "data" / "bot-user-languages.json")

    async with RoomFinderApi(config.room_finder_api_base) as api:
        await set_commands(bot, config)
        await dispatcher.start_polling(
            bot,
            allowed_updates=dispatcher.resolve_used_update_types(),
            config=config,
            api=api,
            language_store=language_store,
            user_store=user_store,
        )


def main() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        handlers=[logging.StreamHandler(sys.stdout)],
    )

    asyncio.run(run(load_config()))


if __name__ == "__main__":
    main()
