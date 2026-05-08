from __future__ import annotations

from html import escape
from typing import Any


JsonDict = dict[str, Any]
MAX_ROOMS_PER_SECTION = 36
MAX_PLAN_ITEMS = 14


def e(value: object) -> str:
    return escape(str(value or ""), quote=False)


def title(status: JsonDict, label: str) -> str:
    day = status.get("day", "")
    time = status.get("time", "")
    return f"<b>{e(label)}</b>\n{e(day)} {e(time)}"


def group_by_floor(rooms: list[JsonDict]) -> dict[str, list[str]]:
    floors: dict[str, list[str]] = {}

    for room in rooms:
        label = str(room.get("floorLabel") or "Floor unknown")
        floors.setdefault(label, []).append(str(room.get("room", "")))

    return floors


def format_room_names(rooms: list[JsonDict]) -> str:
    if not rooms:
        return "No rooms found."

    lines: list[str] = []
    grouped = group_by_floor(rooms)

    for floor, names in grouped.items():
        visible = names[:MAX_ROOMS_PER_SECTION]
        suffix = f" +{len(names) - len(visible)} more" if len(names) > len(visible) else ""
        lines.append(f"\n<b>{e(floor)}</b>")
        lines.append(e(", ".join(visible) + suffix))

    return "\n".join(lines).strip()


def format_available(status: JsonDict, rooms: list[JsonDict], label: str = "Available rooms") -> str:
    counts = status.get("counts", {})
    header = f"{title(status, label)}\nAvailable: <b>{len(rooms)}</b> / {e(counts.get('total', ''))}"
    return f"{header}\n\n{format_room_names(rooms)}"


def format_busy(status: JsonDict, rooms: list[JsonDict]) -> str:
    if not rooms:
        return f"{title(status, 'Busy rooms')}\n\nNo busy rooms found."

    lines = [f"{title(status, 'Busy rooms')}\nBusy: <b>{len(rooms)}</b>"]

    for room in rooms[:42]:
        details = room.get("details") if isinstance(room.get("details"), dict) else {}
        subject = details.get("subject") or "Class"
        until = room.get("until") or details.get("end") or ""
        classes = details.get("classes") if isinstance(details.get("classes"), list) else []
        class_text = f" - {', '.join(map(str, classes[:2]))}" if classes else ""
        lines.append(f"{e(room.get('room'))}: {e(subject)} until {e(until)}{e(class_text)}")

    if len(rooms) > 42:
        lines.append(f"+{len(rooms) - 42} more")

    return "\n".join(lines)


def slot_summary(slot: JsonDict) -> str:
    if slot.get("status") != "busy":
        return "Free"

    parts = [
        str(slot.get("subject") or "Class"),
        ", ".join(map(str, slot.get("classes", []))) if isinstance(slot.get("classes"), list) else "",
        str(slot.get("teacher") or ""),
    ]
    return " - ".join(part for part in parts if part)


def format_room_plan(status: JsonDict, room: JsonDict) -> str:
    is_busy = bool(room.get("details"))
    current = room.get("details") if isinstance(room.get("details"), dict) else None
    state = "Busy" if is_busy else "Available"
    until = f" until {e(room.get('until'))}" if is_busy and room.get("until") else ""
    next_busy = f"\nNext busy: {e(room.get('nextBusyAt'))}" if not is_busy and room.get("nextBusyAt") else ""

    lines = [
        f"<b>Room {e(room.get('room'))}</b>",
        f"{e(status.get('day'))} {e(status.get('time'))}",
        f"Status: <b>{state}</b>{until}{next_busy}",
    ]

    if current:
        lines.append(f"Current: {e(slot_summary(current))}")

    plan = [slot for slot in room.get("dailyPlan", []) if isinstance(slot, dict)]
    if plan:
        lines.append("\n<b>Today</b>")
        for slot in plan[:MAX_PLAN_ITEMS]:
            lines.append(f"{e(slot.get('start'))}-{e(slot.get('end'))}: {e(slot_summary(slot))}")

        if len(plan) > MAX_PLAN_ITEMS:
            lines.append(f"+{len(plan) - MAX_PLAN_ITEMS} more")

    return "\n".join(lines)


def format_group(status: JsonDict, current: list[JsonDict], schedule: list[JsonDict], query: str) -> str:
    lines = [
        f"<b>Group {e(query)}</b>",
        f"{e(status.get('day'))} {e(status.get('time'))}",
    ]

    if current:
        lines.append("\n<b>Now</b>")
        for item in current[:8]:
            slot = item["slot"]
            room = item["room"]
            lines.append(
                f"{e(item['group'])}: room <b>{e(room.get('room'))}</b>, "
                f"{e(slot.get('subject') or 'Class')} {e(slot.get('start'))}-{e(slot.get('end'))}"
            )
    else:
        lines.append("\nNo current class found.")

    next_items = [item for item in schedule if item.get("state") == "next"]
    if next_items:
        lines.append("\n<b>Next</b>")
        for item in next_items[:6]:
            slot = item["slot"]
            room = item["room"]
            lines.append(
                f"{e(item['group'])}: room <b>{e(room.get('room'))}</b>, "
                f"{e(slot.get('start'))}-{e(slot.get('end'))}"
            )

    if schedule:
        lines.append("\n<b>Day schedule</b>")
        for item in schedule[:10]:
            slot = item["slot"]
            room = item["room"]
            marker = {
                "current": "now",
                "next": "next",
                "past": "past",
            }.get(str(item.get("state")), "later")
            lines.append(
                f"{e(slot.get('start'))}-{e(slot.get('end'))} [{marker}] "
                f"{e(slot.get('subject') or 'Class')} - {e(room.get('room'))}"
            )

        if len(schedule) > 10:
            lines.append(f"+{len(schedule) - 10} more")
    else:
        lines.append("No matching group in today's timetable.")

    return "\n".join(lines)


def format_stay(status: JsonDict, rooms: list[JsonDict], start: str, end: str) -> str:
    header = [
        "<b>Rooms free for full stay</b>",
        f"{e(status.get('day'))} {e(start)}-{e(end)}",
        f"Found: <b>{len(rooms)}</b>",
    ]
    header_text = "\n".join(header)
    return f"{header_text}\n\n{format_room_names(rooms)}"


def format_status(status: JsonDict) -> str:
    metadata = status.get("metadata", {})
    counts = status.get("counts", {})
    lines = [
        "<b>PDP Room Finder status</b>",
        f"Time: {e(status.get('day'))} {e(status.get('time'))}",
        f"Rooms: {e(counts.get('available'))} available, {e(counts.get('busy'))} busy, {e(counts.get('total'))} total",
        f"Source: {e(metadata.get('timetableText') or 'Local timetable')}",
    ]

    if metadata.get("fetchedAt"):
        lines.append(f"Synced: {e(metadata.get('fetchedAt'))}")

    return "\n".join(lines)
