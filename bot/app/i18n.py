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
        "admin_help": "\nAdmin:\n/admin - open admin menu\n/broadcast - send global message\n/users - show bot users\n",
        "admin_keyboard_placeholder": "Choose an admin action...",
        "admin_menu": "<b>Admin menu</b>\nChoose an option below.",
        "admin_only": "This menu is admin-only.",
        "available_count": "Available: <b>{count}</b> / {total}",
        "available_next_lesson": "Available next lesson",
        "available_rooms": "Available rooms",
        "available_status": "Available",
        "button_available_now": "Available now",
        "button_admin": "Admin",
        "button_back": "Back",
        "button_bot_users": "Bot users",
        "button_busy_rooms": "Busy rooms",
        "button_find_group": "Find group",
        "button_global_message": "Global message",
        "button_language": "Language",
        "button_open_app": "Open app",
        "broadcast_empty": "Send a text message to broadcast, or press Back to cancel.",
        "broadcast_complete": "Broadcast sent to {sent} users. Failed: {failed}.",
        "broadcast_prompt": "Send the message that should go to all users.",
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
        "group_prompt": "Send the group number, for example: 25-102 or 102.",
        "help_public": (
            "<b>PDP Room Finder bot</b>\n\n"
            "Use buttons or slash commands for quick room checks.\n\n"
            "/menu - show menu\n"
            "/language or /settings - change language\n"
            "/rooms - available rooms now\n"
            "/busy - busy rooms now\n"
            "/group - find group plan and rooms\n"
            "/webapp - open Mini App\n\n"
            "Examples:\n"
            "/room 304\n"
            "/group 102\n"
            "/when Friday 10:30\n"
            "/stay 10:30 13:20\n"
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
        "users_empty": "No users are tracked yet.",
        "users_title": "<b>Bot users</b>\nTotal: <b>{count}</b>",
        "welcome": (
            "<b>PDP Room Finder</b>\n\n"
            "Realtime PDP room availability.\n"
            "Check free rooms, busy rooms, group plans, or open the Mini App.\n\n"
            "Choose an action from the menu below."
        ),
    },
    "uz": {
        "admin_help": "\nAdmin:\n/admin - admin menyuni ochish\n/broadcast - hammaga xabar yuborish\n/users - bot foydalanuvchilari\n",
        "admin_keyboard_placeholder": "Admin amalini tanlang...",
        "admin_menu": "<b>Admin menu</b>\nQuyidan amal tanlang.",
        "admin_only": "Bu menu faqat admin uchun.",
        "available_count": "Bo'sh: <b>{count}</b> / {total}",
        "available_next_lesson": "Keyingi darsdagi bo'sh xonalar",
        "available_rooms": "Bo'sh xonalar",
        "available_status": "Bo'sh",
        "button_available_now": "Bo'sh xonalar",
        "button_admin": "Admin",
        "button_back": "Orqaga",
        "button_bot_users": "Bot foydalanuvchilari",
        "button_busy_rooms": "Band xonalar",
        "button_find_group": "Guruhni topish",
        "button_global_message": "Global xabar",
        "button_language": "Til",
        "button_open_app": "Appni ochish",
        "broadcast_empty": "Yuborish uchun matnli xabar yuboring yoki bekor qilish uchun Orqaga bosing.",
        "broadcast_complete": "Xabar {sent} foydalanuvchiga yuborildi. Xato: {failed}.",
        "broadcast_prompt": "Hamma foydalanuvchilarga yuboriladigan xabarni yuboring.",
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
        "group_prompt": "Guruh raqamini yuboring, masalan: 25-102 yoki 102.",
        "help_public": (
            "<b>PDP Room Finder bot</b>\n\n"
            "Tez tekshirish uchun tugmalar yoki slash buyruqlardan foydalaning.\n\n"
            "/menu - menyuni ko'rsatish\n"
            "/language yoki /settings - tilni almashtirish\n"
            "/rooms - hozir bo'sh xonalar\n"
            "/busy - hozir band xonalar\n"
            "/group - guruh rejasi va xonalarini topish\n"
            "/webapp - Mini Appni ochish\n\n"
            "Misollar:\n"
            "/room 304\n"
            "/group 102\n"
            "/when Friday 10:30\n"
            "/stay 10:30 13:20\n"
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
        "users_empty": "Hali foydalanuvchilar saqlanmagan.",
        "users_title": "<b>Bot foydalanuvchilari</b>\nJami: <b>{count}</b>",
        "welcome": (
            "<b>PDP Room Finder</b>\n\n"
            "PDP xonalari bandligini real vaqtda ko'rsatadi.\n"
            "Bo'sh xonalar, band xonalar, guruh rejasi yoki Mini Appni tekshiring.\n\n"
            "Quyidagi menyudan amalni tanlang."
        ),
    },
    "ru": {
        "admin_help": "\nAdmin:\n/admin - открыть админ меню\n/broadcast - отправить сообщение всем\n/users - пользователи бота\n",
        "admin_keyboard_placeholder": "Выберите действие админа...",
        "admin_menu": "<b>Admin menu</b>\nВыберите действие ниже.",
        "admin_only": "Это меню только для админа.",
        "available_count": "Свободно: <b>{count}</b> / {total}",
        "available_next_lesson": "Свободно на следующем уроке",
        "available_rooms": "Свободные аудитории",
        "available_status": "Свободно",
        "button_available_now": "Свободные",
        "button_admin": "Admin",
        "button_back": "Назад",
        "button_bot_users": "Пользователи",
        "button_busy_rooms": "Занятые",
        "button_find_group": "Найти группу",
        "button_global_message": "Сообщение всем",
        "button_language": "Язык",
        "button_open_app": "Открыть app",
        "broadcast_empty": "Отправьте текстовое сообщение для рассылки или нажмите Назад для отмены.",
        "broadcast_complete": "Сообщение отправлено {sent} пользователям. Ошибок: {failed}.",
        "broadcast_prompt": "Отправьте сообщение, которое нужно разослать всем пользователям.",
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
        "group_prompt": "Отправьте номер группы, например: 25-102 или 102.",
        "help_public": (
            "<b>PDP Room Finder bot</b>\n\n"
            "Используйте кнопки или slash-команды для быстрой проверки аудиторий.\n\n"
            "/menu - показать меню\n"
            "/language или /settings - сменить язык\n"
            "/rooms - свободные аудитории сейчас\n"
            "/busy - занятые аудитории сейчас\n"
            "/group - найти план и аудитории группы\n"
            "/webapp - открыть Mini App\n\n"
            "Примеры:\n"
            "/room 304\n"
            "/group 102\n"
            "/when Friday 10:30\n"
            "/stay 10:30 13:20\n"
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
        "users_empty": "Пользователей пока нет.",
        "users_title": "<b>Пользователи бота</b>\nВсего: <b>{count}</b>",
        "welcome": (
            "<b>PDP Room Finder</b>\n\n"
            "Показывает занятость аудиторий PDP в реальном времени.\n"
            "Проверяйте свободные и занятые аудитории, план группы или Mini App.\n\n"
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
