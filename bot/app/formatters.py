from __future__ import annotations

from html import escape
from typing import Any

from bot.app.i18n import DEFAULT_LANGUAGE, LanguageCode, day_name, t


JsonDict = dict[str, Any]
MAX_ROOMS_PER_SECTION = 36
MAX_PLAN_ITEMS = 14


def e(value: object) -> str:
    return escape(str(value or ""), quote=False)


def localized_title(status: JsonDict, label: str, lang: LanguageCode) -> str:
    return f"<b>{e(label)}</b>\n{e(day_name(lang, status.get('day')))} {e(status.get('time'))}"


def group_by_floor(rooms: list[JsonDict], lang: LanguageCode) -> dict[str, list[str]]:
    floors: dict[str, list[str]] = {}

    for room in rooms:
        label = str(room.get("floorLabel") or "")
        if not label or label == "Floor unknown":
            label = t(lang, "floor_unknown")
        floors.setdefault(label, []).append(str(room.get("room", "")))

    return floors


def format_room_names(rooms: list[JsonDict], lang: LanguageCode = DEFAULT_LANGUAGE) -> str:
    if not rooms:
        return t(lang, "no_rooms_found")

    lines: list[str] = []
    grouped = group_by_floor(rooms, lang)

    for floor, names in grouped.items():
        visible = names[:MAX_ROOMS_PER_SECTION]
        suffix = t(lang, "more_suffix", count=len(names) - len(visible)) if len(names) > len(visible) else ""
        lines.append(f"\n<b>{e(floor)}</b>")
        lines.append(e(", ".join(visible) + suffix))

    return "\n".join(lines).strip()


def format_available(
    status: JsonDict,
    rooms: list[JsonDict],
    label: str | None = None,
    lang: LanguageCode = DEFAULT_LANGUAGE,
) -> str:
    counts = status.get("counts", {})
    header = (
        f"{localized_title(status, label or t(lang, 'available_rooms'), lang)}\n"
        f"{t(lang, 'available_count', count=len(rooms), total=e(counts.get('total', '')))}"
    )
    return f"{header}\n\n{format_room_names(rooms, lang)}"


def format_busy(status: JsonDict, rooms: list[JsonDict], lang: LanguageCode = DEFAULT_LANGUAGE) -> str:
    if not rooms:
        return f"{localized_title(status, t(lang, 'busy_rooms'), lang)}\n\n{t(lang, 'no_busy_rooms')}"

    lines = [f"{localized_title(status, t(lang, 'busy_rooms'), lang)}\n{t(lang, 'busy_count', count=len(rooms))}"]

    for room in rooms[:42]:
        details = room.get("details") if isinstance(room.get("details"), dict) else {}
        subject = details.get("subject") or t(lang, "class_fallback")
        until = room.get("until") or details.get("end") or ""
        classes = details.get("classes") if isinstance(details.get("classes"), list) else []
        class_text = f" - {', '.join(map(str, classes[:2]))}" if classes else ""
        until_text = f" {t(lang, 'busy_until', time=e(until))}" if until else ""
        lines.append(f"{e(room.get('room'))}: {e(subject)}{until_text}{e(class_text)}")

    if len(rooms) > 42:
        lines.append(t(lang, "more_suffix", count=len(rooms) - 42).strip())

    return "\n".join(lines)


def slot_summary(slot: JsonDict, lang: LanguageCode = DEFAULT_LANGUAGE) -> str:
    if slot.get("status") != "busy":
        return t(lang, "free")

    parts = [
        str(slot.get("subject") or t(lang, "class_fallback")),
        ", ".join(map(str, slot.get("classes", []))) if isinstance(slot.get("classes"), list) else "",
        str(slot.get("teacher") or ""),
    ]
    return " - ".join(part for part in parts if part)


def format_room_plan(status: JsonDict, room: JsonDict, lang: LanguageCode = DEFAULT_LANGUAGE) -> str:
    is_busy = bool(room.get("details"))
    current = room.get("details") if isinstance(room.get("details"), dict) else None
    state = t(lang, "busy_status") if is_busy else t(lang, "available_status")
    until = f" {t(lang, 'busy_until', time=e(room.get('until')))}" if is_busy and room.get("until") else ""
    next_busy = f"\n{t(lang, 'next_busy', time=e(room.get('nextBusyAt')))}" if not is_busy and room.get("nextBusyAt") else ""

    lines = [
        f"<b>{t(lang, 'room_title', room=e(room.get('room')))}</b>",
        f"{e(day_name(lang, status.get('day')))} {e(status.get('time'))}",
        f"{t(lang, 'status_label')}: <b>{e(state)}</b>{until}{next_busy}",
    ]

    if current:
        lines.append(f"{t(lang, 'current')}: {e(slot_summary(current, lang))}")

    plan = [slot for slot in room.get("dailyPlan", []) if isinstance(slot, dict)]
    if plan:
        lines.append(f"\n<b>{t(lang, 'today')}</b>")
        for slot in plan[:MAX_PLAN_ITEMS]:
            lines.append(f"{e(slot.get('start'))}-{e(slot.get('end'))}: {e(slot_summary(slot, lang))}")

        if len(plan) > MAX_PLAN_ITEMS:
            lines.append(t(lang, "more_suffix", count=len(plan) - MAX_PLAN_ITEMS).strip())

    return "\n".join(lines)


def format_group(
    status: JsonDict,
    current: list[JsonDict],
    schedule: list[JsonDict],
    query: str,
    lang: LanguageCode = DEFAULT_LANGUAGE,
) -> str:
    lines = [
        f"<b>{t(lang, 'group_title', query=e(query))}</b>",
        f"{e(day_name(lang, status.get('day')))} {e(status.get('time'))}",
    ]

    if current:
        lines.append(f"\n<b>{t(lang, 'now')}</b>")
        for item in current[:8]:
            slot = item["slot"]
            room = item["room"]
            lines.append(
                f"{e(item['group'])}: {t(lang, 'room_word')} <b>{e(room.get('room'))}</b>, "
                f"{e(slot.get('subject') or t(lang, 'class_fallback'))} {e(slot.get('start'))}-{e(slot.get('end'))}"
            )
    else:
        lines.append(f"\n{t(lang, 'no_current_class')}")

    next_items = [item for item in schedule if item.get("state") == "next"]
    if next_items:
        lines.append(f"\n<b>{t(lang, 'next')}</b>")
        for item in next_items[:6]:
            slot = item["slot"]
            room = item["room"]
            lines.append(
                f"{e(item['group'])}: {t(lang, 'room_word')} <b>{e(room.get('room'))}</b>, "
                f"{e(slot.get('start'))}-{e(slot.get('end'))}"
            )

    if schedule:
        lines.append(f"\n<b>{t(lang, 'day_schedule')}</b>")
        for item in schedule[:10]:
            slot = item["slot"]
            room = item["room"]
            marker = {
                "current": t(lang, "state_current"),
                "next": t(lang, "state_next"),
                "past": t(lang, "state_past"),
            }.get(str(item.get("state")), t(lang, "state_later"))
            lines.append(
                f"{e(slot.get('start'))}-{e(slot.get('end'))} [{marker}] "
                f"{e(slot.get('subject') or t(lang, 'class_fallback'))} - {e(room.get('room'))}"
            )

        if len(schedule) > 10:
            lines.append(t(lang, "more_suffix", count=len(schedule) - 10).strip())
    else:
        lines.append(t(lang, "no_matching_group_day"))

    return "\n".join(lines)


def format_stay(
    status: JsonDict,
    rooms: list[JsonDict],
    start: str,
    end: str,
    lang: LanguageCode = DEFAULT_LANGUAGE,
) -> str:
    header = [
        f"<b>{t(lang, 'rooms_free_stay')}</b>",
        f"{e(day_name(lang, status.get('day')))} {e(start)}-{e(end)}",
        t(lang, "found_count", count=len(rooms)),
    ]
    header_text = "\n".join(header)
    return f"{header_text}\n\n{format_room_names(rooms, lang)}"


def format_status(status: JsonDict, lang: LanguageCode = DEFAULT_LANGUAGE) -> str:
    metadata = status.get("metadata", {})
    counts = status.get("counts", {})
    lines = [
        f"<b>{t(lang, 'pdp_status')}</b>",
        t(lang, "time_label", day=e(day_name(lang, status.get("day"))), time=e(status.get("time"))),
        t(
            lang,
            "rooms_status",
            available=e(counts.get("available")),
            busy=e(counts.get("busy")),
            total=e(counts.get("total")),
        ),
        t(lang, "source", source=e(metadata.get("timetableText") or t(lang, "local_timetable"))),
    ]

    if metadata.get("fetchedAt"):
        lines.append(t(lang, "synced", value=e(metadata.get("fetchedAt"))))

    return "\n".join(lines)
