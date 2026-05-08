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

## User Menu And Commands

On first `/start`, users choose a language:

- UZB
- RUS
- ENG

The selected language is saved in `data/bot-user-languages.json` and can be changed later with `/language` or the language button.

After language selection, users get a persistent Telegram reply keyboard with localized labels for:

- Available now
- Find group
- Busy rooms
- Open app
- Language
- Admin, only for configured admins

The bot also registers slash commands for clients that cannot use the reply keyboard:

- `/start` - choose language and open menu
- `/menu` - show the main menu
- `/language` or `/settings` - change language
- `/help` - show examples
- `/rooms` - available rooms now
- `/busy` - busy rooms now
- `/group` - ask for a group number and show today's plan
- `/webapp` - open the Mini App

Typed examples still work with or without a slash:

- `/room 304`
- `/group 25-102`
- `/group 102`
- `/when Friday 10:30`
- `/stay 10:30 13:20`

Admins see an Admin button and these extra commands:

- `/admin` - open the admin menu
- `/broadcast` - send one message to all tracked bot users
- `/users` - show how many users have used the bot and their Telegram nicknames

Tracked users are stored in `data/bot-users.json`.
