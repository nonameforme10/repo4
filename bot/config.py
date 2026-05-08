from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv


ROOT_DIR = Path(__file__).resolve().parents[1]
DEFAULT_ADMIN_IDS = {5426775640}
DEFAULT_PUBLIC_URL = "https://project-kxc4g.vercel.app"

for env_file in (ROOT_DIR / ".env.local", ROOT_DIR / ".env", ROOT_DIR / "bot" / ".env"):
    if env_file.exists():
        load_dotenv(env_file, override=False)


def _csv_ints(value: str) -> set[int]:
    result: set[int] = set()

    for item in value.split(","):
        item = item.strip()
        if not item:
            continue

        try:
            result.add(int(item))
        except ValueError:
            continue

    return result


def _first_env(*names: str, default: str = "") -> str:
    for name in names:
        value = os.getenv(name, "").strip()
        if value:
            return value.rstrip("/")

    return default.rstrip("/")


@dataclass(frozen=True)
class Config:
    bot_token: str
    room_finder_api_base: str
    mini_app_url: str
    refresh_token: str
    admin_ids: set[int]

    @property
    def has_refresh(self) -> bool:
        return bool(self.refresh_token)

    def is_admin(self, user_id: int | None) -> bool:
        return user_id is not None and user_id in self.admin_ids


def load_config() -> Config:
    api_base = _first_env(
        "ROOM_FINDER_API_BASE",
        "API_URL",
        "WEB_APP_URL",
        default=DEFAULT_PUBLIC_URL,
    )
    mini_app_url = _first_env(
        "MINI_APP_URL",
        "WEB_APP_URL",
        "ROOM_FINDER_API_BASE",
        "API_URL",
        default=DEFAULT_PUBLIC_URL,
    )
    admin_ids = set(DEFAULT_ADMIN_IDS)
    admin_ids.update(_csv_ints(os.getenv("ADMINID", "")))
    admin_ids.update(_csv_ints(os.getenv("BOT_ADMIN_IDS", "")))

    return Config(
        bot_token=os.getenv("TELEGRAM_BOT_TOKEN", "") or os.getenv("TELEGRAM-BOT-TOKEN", ""),
        room_finder_api_base=api_base,
        mini_app_url=mini_app_url,
        refresh_token=os.getenv("REFRESH_TOKEN", ""),
        admin_ids=admin_ids,
    )
