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
ROOM_FINDER_API_BASE=http://localhost:3000
MINI_APP_URL=https://project-kxc4g.vercel.app
REFRESH_TOKEN=optional-refresh-token
ADMINID=5426775640
```

Run the Next app in one terminal:

```powershell
npm run dev
```

Run the bot in another terminal:

```powershell
npm run bot:dev:venv
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
