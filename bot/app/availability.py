from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError


APP_TIMEZONE = "Asia/Tashkent"
JsonDict = dict[str, Any]


def app_zoneinfo(timezone_name: str):
    try:
        return ZoneInfo(timezone_name)
    except ZoneInfoNotFoundError:
        if timezone_name == APP_TIMEZONE:
            return timezone(timedelta(hours=5), APP_TIMEZONE)

        return timezone.utc


def time_to_minutes(time: str | None) -> int:
    try:
        hour, minute = str(time or "00:00").split(":", 1)
        return int(hour) * 60 + int(minute)
    except ValueError:
        return 0


def zoned_parts(timezone: str) -> dict[str, str]:
    now = datetime.now(app_zoneinfo(timezone))
    return {
        "weekday": now.strftime("%A"),
        "time": now.strftime("%H:%M"),
    }


def clean_name(value: Any, fallback: str = "") -> str:
    return " ".join(str(value if value is not None else fallback).split()).strip()


def room_sort_name(value: Any) -> str:
    if isinstance(value, dict):
        return clean_name(
            value.get("room")
            or value.get("name")
            or value.get("short")
            or value.get("roomKey")
            or value.get("id")
            or value
        )

    return clean_name(value)


def room_sort_parts(value: Any) -> dict[str, int]:
    import re

    numbers = [int(match.group(0)) for match in re.finditer(r"\d+", room_sort_name(value))]
    number = next((candidate for candidate in numbers if candidate >= 100), numbers[0] if numbers else None)

    if number is None:
        return {"floor": 2**53 - 1, "number": 2**53 - 1}

    return {
        "floor": number // 100 if number >= 100 else 2**53 - 2,
        "number": number,
    }


def room_floor(value: Any) -> int | None:
    floor = room_sort_parts(value)["floor"]
    return None if floor >= 2**53 - 2 else floor


def room_floor_label(value: Any) -> str:
    floor = room_floor(value)
    if floor is None:
        return "Floor unknown"

    suffix = "st" if floor == 1 else "nd" if floor == 2 else "rd" if floor == 3 else "th"
    return f"{floor}{suffix} floor"


def room_sort_key(room: JsonDict) -> tuple[int, int, str]:
    parts = room_sort_parts(room)
    return parts["floor"], parts["number"], room_sort_name(room).casefold()


def timetable_rooms(timetable_data: JsonDict) -> dict[str, JsonDict]:
    timetable = timetable_data.get("timetable")
    if isinstance(timetable, dict):
        return {key: value for key, value in timetable.items() if isinstance(value, dict)}

    return {
        key: value
        for key, value in timetable_data.items()
        if key != "metadata" and isinstance(value, dict)
    }


def room_display_name(room_key: str, room_data: JsonDict, metadata: JsonDict) -> str:
    room_meta = room_data.get("_room") if isinstance(room_data.get("_room"), dict) else {}
    if room_meta.get("name"):
        return str(room_meta["name"])

    metadata_rooms = metadata.get("rooms", [])
    if isinstance(metadata_rooms, list):
        for room in metadata_rooms:
            if isinstance(room, dict) and room.get("key") == room_key and room.get("name"):
                return str(room["name"])

    return room_key.replace("_", " ")


def slots_for(room_day: Any) -> list[JsonDict]:
    if not isinstance(room_day, dict):
        return []

    slots: list[JsonDict] = []
    for period_name, slot in room_day.items():
        if not isinstance(slot, dict) or not slot.get("start") or not slot.get("end"):
            continue

        slots.append({"periodName": period_name, **slot})

    return sorted(slots, key=lambda slot: time_to_minutes(str(slot.get("start"))))


def active_slot(slots: list[JsonDict], minute: int) -> JsonDict | None:
    for slot in slots:
        if time_to_minutes(str(slot.get("start"))) <= minute <= time_to_minutes(str(slot.get("end"))):
            return slot

    return None


def next_busy_slot(slots: list[JsonDict], minute: int) -> JsonDict | None:
    for slot in slots:
        if slot.get("status") == "busy" and time_to_minutes(str(slot.get("start"))) > minute:
            return slot

    return None


def next_day_name(days: list[JsonDict], current_day: str) -> str:
    index = next((idx for idx, day in enumerate(days) if day.get("name") == current_day), -1)
    if index < 0:
        return str(days[0].get("name")) if days else current_day

    return str(days[(index + 1) % len(days)].get("name", current_day))


def next_lesson_target(metadata: JsonDict, current_day: str, current_time: str) -> dict[str, str]:
    minute = time_to_minutes(current_time)
    periods = metadata.get("periods", [])
    periods = periods if isinstance(periods, list) else []

    next_period = next(
        (period for period in periods if isinstance(period, dict) and time_to_minutes(str(period.get("start"))) > minute),
        None,
    )

    if next_period:
        start = str(next_period.get("start", current_time))
        return {"day": current_day, "time": start, "label": f"Next lesson at {start}"}

    first_period = periods[0] if periods and isinstance(periods[0], dict) else None
    days = metadata.get("days", [])
    day = next_day_name(days if isinstance(days, list) else [], current_day)
    time = str(first_period.get("start")) if first_period and first_period.get("start") else current_time
    label = f"Next lesson {day} at {time}" if first_period else "Next lesson"

    return {"day": day, "time": time, "label": label}


def get_availability(timetable_data: JsonDict, options: JsonDict | None = None) -> JsonDict:
    options = options or {}
    metadata = timetable_data.get("metadata") if isinstance(timetable_data.get("metadata"), dict) else {}
    timezone = str(options.get("timezone") or metadata.get("timezone") or APP_TIMEZONE)
    now = zoned_parts(timezone)
    day = str(options.get("day") or now["weekday"])
    time = str(options.get("time") or now["time"])
    mode = str(options.get("mode") or "now")
    mode_label = "Right now"

    if mode == "next":
        target = next_lesson_target(metadata, day, time)
        day = target["day"]
        time = target["time"]
        mode_label = target["label"]
    elif mode == "custom":
        mode_label = f"{day} {time}"

    minute = time_to_minutes(time)
    available: list[JsonDict] = []
    busy: list[JsonDict] = []

    for room_key, room_data in timetable_rooms(timetable_data).items():
        display_name = room_display_name(room_key, room_data, metadata)
        today_slots = slots_for(room_data.get(day))
        daily_plan = [dict(slot) for slot in today_slots]
        current = active_slot(today_slots, minute)
        next_busy = next_busy_slot(today_slots, minute)
        base_room = {
            "room": display_name,
            "roomKey": room_key,
            "floor": room_floor(display_name),
            "floorLabel": room_floor_label(display_name),
            "dailyPlan": daily_plan,
        }

        if current and current.get("status") == "busy":
            busy.append({
                **base_room,
                "until": current.get("end"),
                "details": current,
                "nextFree": current.get("end"),
            })
        else:
            available.append({
                **base_room,
                "nextBusyAt": next_busy.get("start") if next_busy else None,
                "nextBusy": next_busy,
            })

    available.sort(key=room_sort_key)
    busy.sort(key=room_sort_key)

    days = metadata.get("days", [])
    periods = metadata.get("periods", [])
    rooms = metadata.get("rooms", [])

    return {
        "timestamp": datetime.now(app_zoneinfo(timezone)).isoformat(),
        "timezone": timezone,
        "day": day,
        "time": time,
        "mode": mode,
        "modeLabel": mode_label,
        "available": available,
        "busy": busy,
        "counts": {
            "available": len(available),
            "busy": len(busy),
            "total": len(available) + len(busy),
        },
        "metadata": {
            "school": metadata.get("school"),
            "fetchedAt": metadata.get("fetchedAt"),
            "timetableText": metadata.get("timetableText"),
            "validity": metadata.get("validity"),
            "days": days if isinstance(days, list) else [],
            "periods": periods if isinstance(periods, list) else [],
            "rooms": rooms if isinstance(rooms, list) else [],
        },
    }
