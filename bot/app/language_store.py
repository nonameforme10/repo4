from __future__ import annotations

import json
from pathlib import Path

from bot.app.i18n import LanguageCode, is_language_code, normalize_language


class LanguageStore:
    def __init__(self, path: Path) -> None:
        self.path = path
        self._languages = self._load()

    def _load(self) -> dict[str, LanguageCode]:
        if not self.path.exists():
            return {}

        try:
            raw = json.loads(self.path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            return {}

        if not isinstance(raw, dict):
            return {}

        return {
            str(user_id): normalize_language(language)
            for user_id, language in raw.items()
            if is_language_code(language)
        }

    def _save(self) -> None:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        temp_path = self.path.with_suffix(".tmp")
        temp_path.write_text(
            json.dumps(self._languages, ensure_ascii=False, indent=2, sort_keys=True),
            encoding="utf-8",
        )
        temp_path.replace(self.path)

    def has(self, user_id: int | None) -> bool:
        return user_id is not None and str(user_id) in self._languages

    def get(self, user_id: int | None) -> LanguageCode | None:
        if user_id is None:
            return None

        return self._languages.get(str(user_id))

    def set(self, user_id: int | None, language: LanguageCode) -> None:
        if user_id is None:
            return

        self._languages[str(user_id)] = normalize_language(language)
        self._save()
