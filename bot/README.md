# PDP Room Finder Bot

aiogram bot that exposes the same room availability data as the website through Telegram commands.

## Local Setup

Install dependencies:

```powershell
npm run bot:install
```

Required environment variables are loaded from the project root `.env.local`:

```env
TELEGRAM_BOT_TOKEN=123:abc
ROOM_FINDER_API_BASE=https://project-kxc4g.vercel.app
MINI_APP_URL=https://project-kxc4g.vercel.app
REFRESH_TOKEN=optional-refresh-token
ADMINID=5426775640
```

`ROOM_FINDER_API_BASE` may also be named `API_URL` or `WEB_APP_URL` on the server. If none is set, the bot defaults to `https://project-kxc4g.vercel.app`.

For local-only testing against your local Next app, set:

```env
ROOM_FINDER_API_BASE=http://localhost:3000
```

Then run the Next app in one terminal:

```powershell
npm run dev
```

Run the bot in another terminal:

```powershell
npm run bot:dev:venv
```

After changing server env vars, restart the PM2 process:

```bash
pm2 restart timetable-bot
```

## User Menu

The public slash-command menu is hidden. Users get a persistent Telegram reply keyboard with:

- Available now
- Next lesson
- Busy rooms
- Status
- Open app

Typed examples still work:

- `room 304`
- `group 102`
- `when Friday 10:30`
- `stay 10:30 13:20`

`/refresh` is only registered for `ADMINID` and refreshes timetable data if `REFRESH_TOKEN` is configured.
