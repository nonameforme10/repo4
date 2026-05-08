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
from bot.config import Config, ROOT_DIR, load_config


ADMIN_COMMANDS = [
    BotCommand(command="refresh", description="Admin: refresh timetable"),
]


async def set_profile_text(bot: Bot) -> None:
    await bot.set_my_short_description(short_description="Find free PDP rooms by time, lesson, room, or group.")
    await bot.set_my_description(
        description=(
            "PDP Room Finder shows realtime room availability for PDP University. "
            "Use the menu buttons to check available rooms, busy rooms, next lesson, group location, and the Mini App."
        )
    )


async def set_commands(bot: Bot, config: Config) -> None:
    await set_profile_text(bot)
    await bot.delete_my_commands()

    for admin_id in config.admin_ids:
        await bot.set_my_commands(
            ADMIN_COMMANDS,
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
    dispatcher.include_routers(admin.router, rooms.router, group.router, common.router)
    language_store = LanguageStore(ROOT_DIR / "data" / "bot-user-languages.json")

    async with RoomFinderApi(config.room_finder_api_base, config.refresh_token) as api:
        await set_commands(bot, config)
        await dispatcher.start_polling(
            bot,
            allowed_updates=dispatcher.resolve_used_update_types(),
            config=config,
            api=api,
            language_store=language_store,
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
