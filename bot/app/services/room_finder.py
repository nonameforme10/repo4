from __future__ import annotations

import json
from typing import Any

import aiohttp

from bot.app.availability import get_availability


JsonDict = dict[str, Any]


class RoomFinderError(RuntimeError):
    def __init__(self, message: str, status: int | None = None, url: str | None = None) -> None:
        super().__init__(message)
        self.status = status
        self.url = url


class RoomFinderApi:
    def __init__(self, base_url: str) -> None:
        self.base_url = base_url.rstrip("/")
        self._session: aiohttp.ClientSession | None = None

    async def __aenter__(self) -> "RoomFinderApi":
        await self.start()
        return self

    async def __aexit__(self, *_args: object) -> None:
        await self.close()

    async def start(self) -> None:
        if self._session is None or self._session.closed:
            timeout = aiohttp.ClientTimeout(total=18)
            self._session = aiohttp.ClientSession(timeout=timeout)

    async def close(self) -> None:
        if self._session and not self._session.closed:
            await self._session.close()

    @property
    def session(self) -> aiohttp.ClientSession:
        if self._session is None or self._session.closed:
            raise RoomFinderError("Room Finder API client is not started.")
        return self._session

    async def get_json(self, path: str, params: dict[str, str] | None = None) -> JsonDict:
        url = f"{self.base_url}/{path.lstrip('/')}"

        async with self.session.get(url, params=params) as response:
            text = await response.text()
            payload: Any = None

            if text.strip():
                try:
                    payload = json.loads(text)
                except json.JSONDecodeError as error:
                    content_type = response.headers.get("content-type", "unknown")
                    snippet = " ".join(text.strip().split())[:180]
                    raise RoomFinderError(
                        f"Expected JSON from {url}, got HTTP {response.status} {content_type}: {snippet}",
                        status=response.status,
                        url=url,
                    ) from error

            if response.status >= 400:
                message = payload.get("error") if isinstance(payload, dict) else None
                raise RoomFinderError(
                    message or f"Room Finder API returned HTTP {response.status} for {url}.",
                    status=response.status,
                    url=url,
                )

            if not isinstance(payload, dict):
                raise RoomFinderError(
                    f"Room Finder API returned an unexpected response from {url}.",
                    status=response.status,
                    url=url,
                )

            return payload

    async def post_json(
        self,
        path: str,
        params: dict[str, str] | None = None,
        headers: dict[str, str] | None = None,
    ) -> JsonDict:
        url = f"{self.base_url}/{path.lstrip('/')}"

        async with self.session.post(url, params=params, headers=headers) as response:
            text = await response.text()
            payload: Any = None

            if text.strip():
                try:
                    payload = json.loads(text)
                except json.JSONDecodeError as error:
                    content_type = response.headers.get("content-type", "unknown")
                    snippet = " ".join(text.strip().split())[:180]
                    raise RoomFinderError(
                        f"Expected JSON from {url}, got HTTP {response.status} {content_type}: {snippet}",
                        status=response.status,
                        url=url,
                    ) from error

            if response.status >= 400:
                message = payload.get("error") if isinstance(payload, dict) else None
                raise RoomFinderError(
                    message or f"Room Finder API returned HTTP {response.status} for {url}.",
                    status=response.status,
                    url=url,
                )

            if not isinstance(payload, dict):
                raise RoomFinderError(
                    f"Room Finder API returned an unexpected response from {url}.",
                    status=response.status,
                    url=url,
                )

            return payload

    async def status(
        self,
        mode: str = "now",
        day: str | None = None,
        time: str | None = None,
        reload_data: bool = False,
    ) -> JsonDict:
        params: dict[str, str] = {"mode": mode}

        if day:
            params["day"] = day
        if time:
            params["time"] = time
        if reload_data:
            params["reload"] = "1"

        try:
            return await self.get_json("/api/status", params=params)
        except RoomFinderError as error:
            if error.status != 404:
                raise

            timetable = await self.get_json("/timetable.json")
            return get_availability(
                timetable,
                {
                    "mode": mode,
                    "day": day,
                    "time": time,
                },
            )

    async def timetable(self) -> JsonDict:
        try:
            return await self.get_json("/api/timetable")
        except RoomFinderError as error:
            if error.status != 404:
                raise

            return await self.get_json("/timetable.json")
