from __future__ import annotations

from typing import Any

import aiohttp


JsonDict = dict[str, Any]


class RoomFinderError(RuntimeError):
    pass


class RoomFinderApi:
    def __init__(self, base_url: str, refresh_token: str = "") -> None:
        self.base_url = base_url.rstrip("/")
        self.refresh_token = refresh_token
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
            payload = await response.json(content_type=None)

            if response.status >= 400:
                message = payload.get("error") if isinstance(payload, dict) else None
                raise RoomFinderError(message or f"Room Finder API returned HTTP {response.status}.")

            if not isinstance(payload, dict):
                raise RoomFinderError("Room Finder API returned an unexpected response.")

            return payload

    async def post_json(
        self,
        path: str,
        params: dict[str, str] | None = None,
        headers: dict[str, str] | None = None,
    ) -> JsonDict:
        url = f"{self.base_url}/{path.lstrip('/')}"

        async with self.session.post(url, params=params, headers=headers) as response:
            payload = await response.json(content_type=None)

            if response.status >= 400:
                message = payload.get("error") if isinstance(payload, dict) else None
                raise RoomFinderError(message or f"Room Finder API returned HTTP {response.status}.")

            if not isinstance(payload, dict):
                raise RoomFinderError("Room Finder API returned an unexpected response.")

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

        return await self.get_json("/api/status", params=params)

    async def timetable(self) -> JsonDict:
        return await self.get_json("/api/timetable")

    async def refresh(self) -> JsonDict:
        if not self.refresh_token:
            raise RoomFinderError("REFRESH_TOKEN is not configured for the bot.")

        return await self.post_json(
            "/api/refresh",
            headers={"Authorization": f"Bearer {self.refresh_token}"},
        )
