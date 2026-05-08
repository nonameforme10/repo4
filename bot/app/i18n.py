from __future__ import annotations

from typing import Literal


LanguageCode = Literal["en", "uz", "ru"]
DEFAULT_LANGUAGE: LanguageCode = "en"
LANGUAGE_CODES: tuple[LanguageCode, ...] = ("en", "uz", "ru")

LANGUAGE_OPTIONS: tuple[dict[str, str], ...] = (
    {"code": "uz", "label": "O'zbek", "button": "UZB"},
    {"code": "ru", "label": "Русский", "button": "RUS"},
    {"code": "en", "label": "English", "button": "ENG"},
)


TRANSLATIONS: dict[LanguageCode, dict[str, str]] = {
    "en": {
        "admin_help": "\nAdmin:\n/refresh - admin-only timetable refresh\n",
        "available_count": "Available: <b>{count}</b> / {total}",
        "available_next_lesson": "Available next lesson",
        "available_rooms": "Available rooms",
        "available_status": "Available",
        "button_available_now": "Available now",
        "button_busy_rooms": "Busy rooms",
        "button_language": "Language",
        "button_next_lesson": "Next lesson",
        "button_open_app": "Open app",
        "button_refresh_timetable": "Refresh timetable",
        "button_status": "Status",
        "busy_count": "Busy: <b>{count}</b>",
        "busy_rooms": "Busy rooms",
        "busy_status": "Busy",
        "busy_until": "until {time}",
        "choose_language": "Choose language / Tilni tanlang / Выберите язык:",
        "class_fallback": "Class",
        "could_not_load_busy": "Could not load busy rooms: {error}",
        "could_not_load_group": "Could not load group schedule: {error}",
        "could_not_load_room": "Could not load room: {error}",
        "could_not_load_rooms": "Could not load rooms: {error}",
        "could_not_load_status": "Could not load status: {error}",
        "could_not_load_stay": "Could not load stay rooms: {error}",
        "current": "Current",
        "day_schedule": "Day schedule",
        "end_after_start": "End time must be later than start time.",
        "fallback": "Use the buttons below, or type examples like: room 304, group 102, stay 10:30 13:20.",
        "floor_unknown": "Floor unknown",
        "found_count": "Found: <b>{count}</b>",
        "free": "Free",
        "group_title": "Group {query}",
        "help_public": (
            "<b>PDP Room Finder bot</b>\n\n"
            "Use the buttons below for quick room checks.\n\n"
            "Manual examples still work:\n"
            "room 304\n"
            "group 102\n"
            "when Friday 10:30\n"
            "stay 10:30 13:20\n"
        ),
        "invalid_day_time": "Use a valid day and time, for example: /when Friday 10:30",
        "invalid_time": "Use valid time, for example: /stay 10:30 13:20",
        "keyboard_placeholder": "Choose an action...",
        "language_saved": "Language set to English.",
        "local_timetable": "Local timetable",
        "more_suffix": " +{count} more",
        "next": "Next",
        "next_busy": "Next busy: {time}",
        "no_busy_rooms": "No busy rooms found.",
        "no_current_class": "No current class found.",
        "no_matching_group_day": "No matching group in today's timetable.",
        "no_room_match": "No room matched '{query}'.",
        "no_rooms_found": "No rooms found.",
        "now": "Now",
        "open_webapp": "Open the full Mini App here:",
        "pdp_status": "PDP Room Finder status",
        "refresh_admin_only": "This command is admin-only.",
        "refresh_complete": "Refresh complete.",
        "refresh_failed": "Refresh failed: {error}",
        "refresh_missing_token": "REFRESH_TOKEN is not configured for the bot.",
        "refreshing": "Refreshing timetable...",
        "room_title": "Room {room}",
        "room_word": "room",
        "rooms_free_stay": "Rooms free for full stay",
        "rooms_status": "Rooms: {available} available, {busy} busy, {total} total",
        "source": "Source: {source}",
        "state_current": "now",
        "state_later": "later",
        "state_next": "next",
        "state_past": "past",
        "status_label": "Status",
        "synced": "Synced: {value}",
        "time_label": "Time: {day} {time}",
        "today": "Today",
        "usage_group": "Usage: /group 102",
        "usage_room": "Usage: /room 304",
        "usage_stay": "Usage: /stay 13:20 or /stay 10:30 13:20",
        "usage_when": "Usage: /when Friday 10:30\nExample: /when juma 12:00",
        "welcome": (
            "<b>PDP Room Finder</b>\n\n"
            "Realtime PDP room availability.\n"
            "Check free rooms, busy rooms, next lesson, group location, or open the Mini App.\n\n"
            "Choose an action from the menu below."
        ),
    },
    "uz": {
        "admin_help": "\nAdmin:\n/refresh - faqat admin jadvalni yangilaydi\n",
        "available_count": "Bo'sh: <b>{count}</b> / {total}",
        "available_next_lesson": "Keyingi darsdagi bo'sh xonalar",
        "available_rooms": "Bo'sh xonalar",
        "available_status": "Bo'sh",
        "button_available_now": "Bo'sh xonalar",
        "button_busy_rooms": "Band xonalar",
        "button_language": "Til",
        "button_next_lesson": "Keyingi dars",
        "button_open_app": "Appni ochish",
        "button_refresh_timetable": "Jadvalni yangilash",
        "button_status": "Holat",
        "busy_count": "Band: <b>{count}</b>",
        "busy_rooms": "Band xonalar",
        "busy_status": "Band",
        "busy_until": "{time} gacha",
        "choose_language": "Tilni tanlang / Choose language / Выберите язык:",
        "class_fallback": "Dars",
        "could_not_load_busy": "Band xonalarni yuklab bo'lmadi: {error}",
        "could_not_load_group": "Guruh jadvalini yuklab bo'lmadi: {error}",
        "could_not_load_room": "Xonani yuklab bo'lmadi: {error}",
        "could_not_load_rooms": "Xonalarni yuklab bo'lmadi: {error}",
        "could_not_load_status": "Holatni yuklab bo'lmadi: {error}",
        "could_not_load_stay": "To'liq vaqt uchun xonalarni yuklab bo'lmadi: {error}",
        "current": "Hozir",
        "day_schedule": "Kun jadvali",
        "end_after_start": "Tugash vaqti boshlanish vaqtidan keyin bo'lishi kerak.",
        "fallback": "Quyidagi tugmalardan foydalaning yoki shunday yozing: room 304, group 102, stay 10:30 13:20.",
        "floor_unknown": "Qavat noma'lum",
        "found_count": "Topildi: <b>{count}</b>",
        "free": "Bo'sh",
        "group_title": "Guruh {query}",
        "help_public": (
            "<b>PDP Room Finder bot</b>\n\n"
            "Tez tekshirish uchun quyidagi tugmalardan foydalaning.\n\n"
            "Qo'lda yozish misollari ham ishlaydi:\n"
            "room 304\n"
            "group 102\n"
            "when Friday 10:30\n"
            "stay 10:30 13:20\n"
        ),
        "invalid_day_time": "To'g'ri kun va vaqt kiriting, masalan: /when Friday 10:30",
        "invalid_time": "To'g'ri vaqt kiriting, masalan: /stay 10:30 13:20",
        "keyboard_placeholder": "Amalni tanlang...",
        "language_saved": "Til O'zbek tiliga o'rnatildi.",
        "local_timetable": "Lokal jadval",
        "more_suffix": " +yana {count}",
        "next": "Keyingi",
        "next_busy": "Keyingi band vaqt: {time}",
        "no_busy_rooms": "Band xonalar topilmadi.",
        "no_current_class": "Hozirgi dars topilmadi.",
        "no_matching_group_day": "Bugungi jadvalda mos guruh topilmadi.",
        "no_room_match": "'{query}' bo'yicha xona topilmadi.",
        "no_rooms_found": "Xonalar topilmadi.",
        "now": "Hozir",
        "open_webapp": "To'liq Mini Appni shu yerdan oching:",
        "pdp_status": "PDP Room Finder holati",
        "refresh_admin_only": "Bu buyruq faqat admin uchun.",
        "refresh_complete": "Yangilash tugadi.",
        "refresh_failed": "Yangilash amalga oshmadi: {error}",
        "refresh_missing_token": "Bot uchun REFRESH_TOKEN sozlanmagan.",
        "refreshing": "Jadval yangilanmoqda...",
        "room_title": "{room}-xona",
        "room_word": "xona",
        "rooms_free_stay": "Butun vaqt bo'sh bo'lgan xonalar",
        "rooms_status": "Xonalar: {available} bo'sh, {busy} band, jami {total}",
        "source": "Manba: {source}",
        "state_current": "hozir",
        "state_later": "keyinroq",
        "state_next": "keyingi",
        "state_past": "o'tgan",
        "status_label": "Holat",
        "synced": "Sinxronlangan: {value}",
        "time_label": "Vaqt: {day} {time}",
        "today": "Bugun",
        "usage_group": "Foydalanish: /group 102",
        "usage_room": "Foydalanish: /room 304",
        "usage_stay": "Foydalanish: /stay 13:20 yoki /stay 10:30 13:20",
        "usage_when": "Foydalanish: /when Friday 10:30\nMisol: /when juma 12:00",
        "welcome": (
            "<b>PDP Room Finder</b>\n\n"
            "PDP xonalari bandligini real vaqtda ko'rsatadi.\n"
            "Bo'sh xonalar, band xonalar, keyingi dars, guruh joylashuvi yoki Mini Appni tekshiring.\n\n"
            "Quyidagi menyudan amalni tanlang."
        ),
    },
    "ru": {
        "admin_help": "\nAdmin:\n/refresh - обновление расписания только для админа\n",
        "available_count": "Свободно: <b>{count}</b> / {total}",
        "available_next_lesson": "Свободно на следующем уроке",
        "available_rooms": "Свободные аудитории",
        "available_status": "Свободно",
        "button_available_now": "Свободные",
        "button_busy_rooms": "Занятые",
        "button_language": "Язык",
        "button_next_lesson": "Следующий урок",
        "button_open_app": "Открыть app",
        "button_refresh_timetable": "Обновить расписание",
        "button_status": "Статус",
        "busy_count": "Занято: <b>{count}</b>",
        "busy_rooms": "Занятые аудитории",
        "busy_status": "Занято",
        "busy_until": "до {time}",
        "choose_language": "Выберите язык / Tilni tanlang / Choose language:",
        "class_fallback": "Занятие",
        "could_not_load_busy": "Не удалось загрузить занятые аудитории: {error}",
        "could_not_load_group": "Не удалось загрузить расписание группы: {error}",
        "could_not_load_room": "Не удалось загрузить аудиторию: {error}",
        "could_not_load_rooms": "Не удалось загрузить аудитории: {error}",
        "could_not_load_status": "Не удалось загрузить статус: {error}",
        "could_not_load_stay": "Не удалось загрузить аудитории на весь период: {error}",
        "current": "Сейчас",
        "day_schedule": "Расписание дня",
        "end_after_start": "Время окончания должно быть позже времени начала.",
        "fallback": "Используйте кнопки ниже или напишите, например: room 304, group 102, stay 10:30 13:20.",
        "floor_unknown": "Этаж неизвестен",
        "found_count": "Найдено: <b>{count}</b>",
        "free": "Свободно",
        "group_title": "Группа {query}",
        "help_public": (
            "<b>PDP Room Finder bot</b>\n\n"
            "Используйте кнопки ниже для быстрой проверки аудиторий.\n\n"
            "Ручные примеры тоже работают:\n"
            "room 304\n"
            "group 102\n"
            "when Friday 10:30\n"
            "stay 10:30 13:20\n"
        ),
        "invalid_day_time": "Укажите корректный день и время, например: /when Friday 10:30",
        "invalid_time": "Укажите корректное время, например: /stay 10:30 13:20",
        "keyboard_placeholder": "Выберите действие...",
        "language_saved": "Язык изменен на русский.",
        "local_timetable": "Локальное расписание",
        "more_suffix": " +еще {count}",
        "next": "Далее",
        "next_busy": "Следующее занятие: {time}",
        "no_busy_rooms": "Занятые аудитории не найдены.",
        "no_current_class": "Текущее занятие не найдено.",
        "no_matching_group_day": "В сегодняшнем расписании нет такой группы.",
        "no_room_match": "Аудитория по запросу '{query}' не найдена.",
        "no_rooms_found": "Аудитории не найдены.",
        "now": "Сейчас",
        "open_webapp": "Откройте полный Mini App здесь:",
        "pdp_status": "Статус PDP Room Finder",
        "refresh_admin_only": "Эта команда только для админа.",
        "refresh_complete": "Обновление завершено.",
        "refresh_failed": "Обновление не удалось: {error}",
        "refresh_missing_token": "REFRESH_TOKEN не настроен для бота.",
        "refreshing": "Расписание обновляется...",
        "room_title": "Аудитория {room}",
        "room_word": "аудитория",
        "rooms_free_stay": "Аудитории, свободные на весь период",
        "rooms_status": "Аудитории: {available} свободно, {busy} занято, всего {total}",
        "source": "Источник: {source}",
        "state_current": "сейчас",
        "state_later": "позже",
        "state_next": "след.",
        "state_past": "прошло",
        "status_label": "Статус",
        "synced": "Синхронизировано: {value}",
        "time_label": "Время: {day} {time}",
        "today": "Сегодня",
        "usage_group": "Использование: /group 102",
        "usage_room": "Использование: /room 304",
        "usage_stay": "Использование: /stay 13:20 или /stay 10:30 13:20",
        "usage_when": "Использование: /when Friday 10:30\nПример: /when juma 12:00",
        "welcome": (
            "<b>PDP Room Finder</b>\n\n"
            "Показывает занятость аудиторий PDP в реальном времени.\n"
            "Проверяйте свободные и занятые аудитории, следующий урок, группу или Mini App.\n\n"
            "Выберите действие в меню ниже."
        ),
    },
}

DAY_NAMES: dict[LanguageCode, dict[str, str]] = {
    "en": {
        "Monday": "Monday",
        "Tuesday": "Tuesday",
        "Wednesday": "Wednesday",
        "Thursday": "Thursday",
        "Friday": "Friday",
        "Saturday": "Saturday",
        "Sunday": "Sunday",
    },
    "uz": {
        "Monday": "Dushanba",
        "Tuesday": "Seshanba",
        "Wednesday": "Chorshanba",
        "Thursday": "Payshanba",
        "Friday": "Juma",
        "Saturday": "Shanba",
        "Sunday": "Yakshanba",
    },
    "ru": {
        "Monday": "Понедельник",
        "Tuesday": "Вторник",
        "Wednesday": "Среда",
        "Thursday": "Четверг",
        "Friday": "Пятница",
        "Saturday": "Суббота",
        "Sunday": "Воскресенье",
    },
}


def is_language_code(value: object) -> bool:
    return value in LANGUAGE_CODES


def normalize_language(value: object) -> LanguageCode:
    return value if is_language_code(value) else DEFAULT_LANGUAGE  # type: ignore[return-value]


def language_from_telegram(value: str | None) -> LanguageCode:
    primary = (value or "").split("-", 1)[0].casefold()
    return normalize_language(primary)


def language_from_choice_text(value: str | None) -> LanguageCode | None:
    normalized = (value or "").strip().casefold()

    for option in LANGUAGE_OPTIONS:
        code = option["code"]
        if normalized in {option["button"].casefold(), option["label"].casefold(), code.casefold()}:
            return normalize_language(code)

    return None


def resolve_language(user_id: int | None, telegram_language_code: str | None, language_store: object) -> LanguageCode:
    if user_id is not None and hasattr(language_store, "get"):
        saved = language_store.get(user_id)
        if is_language_code(saved):
            return normalize_language(saved)

    return language_from_telegram(telegram_language_code)


def t(lang: LanguageCode, key: str, **params: object) -> str:
    language = normalize_language(lang)
    template = TRANSLATIONS[language].get(key, TRANSLATIONS[DEFAULT_LANGUAGE].get(key, key))

    for name, value in params.items():
        template = template.replace("{" + name + "}", str(value))

    return template


def button_matches(text: str | None, key: str) -> bool:
    value = (text or "").strip()
    return any(value == t(lang, key) for lang in LANGUAGE_CODES)


def day_name(lang: LanguageCode, day: object) -> str:
    value = str(day or "")
    return DAY_NAMES[normalize_language(lang)].get(value, value)
