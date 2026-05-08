from __future__ import annotations

import re
from typing import Any


JsonDict = dict[str, Any]


DAY_ALIASES = {
    "mon": "Monday",
    "monday": "Monday",
    "dushanba": "Monday",
    "tue": "Tuesday",
    "tues": "Tuesday",
    "tuesday": "Tuesday",
    "seshanba": "Tuesday",
    "wed": "Wednesday",
    "wednesday": "Wednesday",
    "chorshanba": "Wednesday",
    "thu": "Thursday",
    "thur": "Thursday",
    "thurs": "Thursday",
    "thursday": "Thursday",
    "payshanba": "Thursday",
    "fri": "Friday",
    "friday": "Friday",
    "juma": "Friday",
    "sat": "Saturday",
    "saturday": "Saturday",
    "shanba": "Saturday",
    "sun": "Sunday",
    "sunday": "Sunday",
    "yakshanba": "Sunday",
}


def room_matches(room: JsonDict, query: str) -> bool:
    if not query:
        return True

    return query.casefold() in str(room.get("room", "")).casefold()


def time_to_minutes(time: str | None) -> int:
    try:
        hour, minute = str(time or "00:00").split(":", 1)
        return int(hour) * 60 + int(minute)
    except ValueError:
        return 0


def normalize_time(value: str) -> str | None:
    match = re.fullmatch(r"(\d{1,2})[:.](\d{2})", value.strip())
    if not match:
        return None

    hour = int(match.group(1))
    minute = int(match.group(2))
    if hour > 23 or minute > 59:
        return None

    return f"{hour:02d}:{minute:02d}"


def normalize_day(value: str) -> str | None:
    return DAY_ALIASES.get(value.strip().casefold())


def all_rooms(status: JsonDict) -> list[JsonDict]:
    return [*status.get("available", []), *status.get("busy", [])]


def first_matching_room(status: JsonDict, query: str) -> JsonDict | None:
    normalized_query = query.casefold().strip()
    rooms = all_rooms(status)

    exact = [
        room for room in rooms
        if str(room.get("room", "")).casefold() == normalized_query
        or str(room.get("roomKey", "")).casefold() == normalized_query
    ]
    if exact:
        return exact[0]

    partial = [room for room in rooms if room_matches(room, query)]
    return partial[0] if partial else None


def busy_slot_overlaps_range(slot: JsonDict, start: str, end: str) -> bool:
    if slot.get("status") != "busy" or not slot.get("start") or not slot.get("end"):
        return False

    return time_to_minutes(str(slot["start"])) < time_to_minutes(end) and time_to_minutes(str(slot["end"])) > time_to_minutes(start)


def first_range_conflict(room: JsonDict, start: str, end: str) -> JsonDict | None:
    for slot in room.get("dailyPlan", []):
        if isinstance(slot, dict) and busy_slot_overlaps_range(slot, start, end):
            return slot

    return None


def rooms_free_for_range(status: JsonDict, start: str, end: str, query: str = "") -> list[JsonDict]:
    return [
        room for room in all_rooms(status)
        if room_matches(room, query) and first_range_conflict(room, start, end) is None
    ]


def normalize_lookup(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", value.casefold())


def group_lookup_tokens(value: str) -> list[str]:
    return re.findall(r"[a-z0-9]+", value.casefold())


def class_matches_group(class_name: str, query: str) -> bool:
    normalized_query = normalize_lookup(query)
    normalized_class = normalize_lookup(class_name)
    tokens = group_lookup_tokens(class_name)
    numeric_code = f"{tokens[0]}{tokens[1]}" if len(tokens) > 1 and tokens[0].isdigit() and tokens[1].isdigit() else ""

    if not normalized_query:
        return False
    if normalized_class == normalized_query or numeric_code == normalized_query:
        return True

    if normalized_query.isdigit():
        return len(normalized_query) >= 3 and normalized_query in tokens

    return False


def matching_groups(slot: JsonDict, query: str) -> list[str]:
    classes = slot.get("classes", [])
    if not isinstance(classes, list):
        return []

    return [class_name for class_name in classes if isinstance(class_name, str) and class_matches_group(class_name, query)]


def slot_active_at(slot: JsonDict, time: str) -> bool:
    if slot.get("status") != "busy" or not slot.get("start") or not slot.get("end"):
        return False

    minute = time_to_minutes(time)
    return time_to_minutes(str(slot["start"])) <= minute <= time_to_minutes(str(slot["end"]))


def find_group_matches(status: JsonDict, query: str) -> list[JsonDict]:
    time = str(status.get("time", ""))
    result: list[JsonDict] = []

    for room in all_rooms(status):
        for slot in room.get("dailyPlan", []):
            if not isinstance(slot, dict) or not slot_active_at(slot, time):
                continue

            for group in matching_groups(slot, query):
                result.append({"group": group, "room": room, "slot": slot})

    return result


def group_schedule_for_day(status: JsonDict, query: str) -> list[JsonDict]:
    current_minute = time_to_minutes(str(status.get("time", "")))
    schedule: list[JsonDict] = []

    for room in all_rooms(status):
        for slot in room.get("dailyPlan", []):
            if not isinstance(slot, dict) or slot.get("status") != "busy" or not slot.get("start") or not slot.get("end"):
                continue

            for group in matching_groups(slot, query):
                schedule.append({
                    "group": group,
                    "room": room,
                    "slot": slot,
                    "startMinute": time_to_minutes(str(slot["start"])),
                    "endMinute": time_to_minutes(str(slot["end"])),
                    "state": "later",
                })

    schedule.sort(key=lambda item: (
        item["startMinute"],
        item["endMinute"],
        str(item["room"].get("room", "")),
    ))
    next_start = next((item["startMinute"] for item in schedule if item["startMinute"] > current_minute), None)

    for item in schedule:
        if item["startMinute"] <= current_minute <= item["endMinute"]:
            item["state"] = "current"
        elif next_start is not None and item["startMinute"] == next_start:
            item["state"] = "next"
        elif item["startMinute"] > current_minute:
            item["state"] = "later"
        else:
            item["state"] = "past"

    return schedule
