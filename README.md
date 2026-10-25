# 🌌 Nexus Bot v2.0 — All-in-One Discord Bot & Next.js Web Dashboard

[![Python Version](https://img.shields.io/badge/python-3.10%2B-blue.svg)](https://www.python.org/)
[![Discord API](https://img.shields.io/badge/library-Py--cord%20v2.8-5865F2.svg)](https://pycord.dev/)
[![Framework](https://img.shields.io/badge/frontend-Next.js%2014%20(App%20Router)-black.svg)](https://nextjs.org/)
[![API Backend](https://img.shields.io/badge/backend-FastAPI%20%2B%20Uvicorn-009688.svg)](https://fastapi.tiangolo.com/)
[![Database](https://img.shields.io/badge/database-SQLite%20(WAL%20Mode)-003B57.svg)](https://sqlite.org/)
[![Music Free](https://img.shields.io/badge/music-ZERO%20BLOAT-red.svg)](#zero-music-guarantee)

> **Nexus** is an enterprise-grade All-in-One Discord management bot featuring strict Bot-Role security isolation, automated 4-channel audit logging, persistent Support Tickets with transcripts, interactive Mini-Games, automated Leveling XP, and a sleek **Next.js 14 web dashboard**.

---

## 🚀 Key Highlights

- 🔐 **Strict Bot-Role Security**: Server Admins without the designated Bot-Role are blocked from management commands, ensuring ultimate Server Owner control.
- 📁 **Automated 4-Channel Central Logging**: `/setupbot` creates the `📁 NEXUS LOGS` category with `mod-logs`, `server-logs`, `activity-logs`, and `cmd-logs`.
- ⚖️ **Immutable Moderation Cases**: Every disciplinary action is assigned a persistent incrementing Case Number with target, moderator, reason, duration, and timestamps.
- 🚨 **Emergency Lockdown**: Instantly lock/unlock all server text channels against `@everyone` during active raids.
- 🎟️ **Support Tickets & Transcripts**: One-click ticket panels with private channels, role isolation, staff-only closure, and automated formatted transcript generation.
- 🎮 **Multiplayer Mini-Games**: 2-player `/rps` showdowns with secret hidden picks, `/tictactoe`, single-message in-place `/guess`, dice rolling, and coin flips.
- 🏆 **Activity Leveling & Role Rewards**: Granular XP calculation with configurable cooldowns, custom level-up announcement cards, and milestone role rewards.
- 🎛️ **Next.js 14 Web Dashboard**: Complete web management interface with Discord OAuth2 login, server picker, real-time settings toggles, save bars, role/channel pickers, and live audit telemetry.
- 📖 **Interactive Command Directory**: Full 62-command encyclopedia with live instant search, category filters, and 1-click syntax copying.
- 🚫 **Zero Music Guarantee**: Clean codebase with zero Lavalink, Wavelink, yt-dlp, or audio streaming bloat.

---

## 📁 Repository Structure

```
nexus/
├── main.py                     # Primary entry point: initializes DB, launches Pycord bot & FastAPI
├── bot.py                      # Backward-compatible launcher wrapper
├── dashboard_server.py         # Standalone / embedded aiohttp web control dashboard server
├── run_dashboard.py            # Standalone dashboard launcher
├── core/
│   ├── bot.py                  # NexusBot subclass with resilient slash dispatcher & 429 backoff
│   ├── config.py               # Typed environment loader & validator
│   ├── permissions.py          # 4-tier permission architecture & global command checks
│   ├── errors.py               # Global error handling and friendly user embeds
│   ├── events.py               # Gateway lifecycle events & onboarding
│   └── ui.py                   # Shared embed builders, color schemes, and modals
├── db/
│   ├── database.py             # Shared WAL SQLite connection & cached config repository
│   ├── migrations/             # Numbered additive schema migrations (001-006)
│   └── repos/                  # Repositories: mod_cases, management, engagement, security
├── cogs/                       # 16 active modular Pycord cogs (62 commands)
│   ├── admin.py                # Server setup, bot-role collision check, 4-channel audit logging
│   ├── moderation.py           # Kick, ban, softban, mute, warn, clearwarns, purge, slowmode, lockdown
│   ├── tickets.py              # Private support tickets with staff-only close & transcript generation
│   ├── leveling.py             # Chat XP, rank cards, leaderboards, role rewards
│   ├── games.py                # Mini-games: 2-player RPS, Tic-Tac-Toe, Guess, Dice Roll, Coin Flip
│   ├── giveaway.py             # Multi-role requirement giveaways (restart-resilient)
│   ├── polls.py                # Persistent button polls (survives bot reboots)
│   ├── announcements.py        # Modal-based embeds and ping announcements
│   ├── dm.py                   # Direct dispatch messaging & role broadcasts
│   ├── autorole.py             # Member autorole on joining
│   ├── reaction_roles.py       # Persistent button-based reaction roles
│   ├── afk.py                  # AFK status with mention alerts and auto-clearing
│   ├── autoresponder.py        # Keyword-triggered custom bot replies
│   ├── logging_events.py       # Member join/leave, message edit/delete, role/channel changes
│   ├── help.py                 # Categorized interactive dropdown manual (Staff tier)
│   └── utility.py              # Serverinfo, creator diagnostics (ping, stats, uptime)
├── api/                        # In-process FastAPI REST backend
│   ├── app.py                  # FastAPI application with CORS & rate-limiting
│   ├── auth.py                 # Constant-time API key and live bot guild permission checks
│   ├── ratelimit.py            # In-memory token bucket rate limiter (429 Retry-After)
│   ├── models.py               # Pydantic v2 validation models
│   └── routes/                 # Routes: meta, guilds, settings, security, features
├── dashboard/                  # Next.js 14 frontend web dashboard (Tailwind CSS)
│   ├── src/app/                # App Router pages (Overview, Moderation, Tickets, Leveling, Commands, etc.)
│   ├── src/components/         # Reusable UI widgets: Toggle, RoleSelect, ChannelSelect, SaveBar, Navbar
│   ├── src/lib/                # NextAuth Discord provider configuration
│   └── package.json            # Node.js dependencies
├── web/                        # Standalone Control Center & Command Encyclopedia
│   ├── index.html              # Standalone web control center
│   ├── commands.html           # Standalone 62-command manual & directory
│   ├── css/                    # Glassmorphism styling
│   └── js/                     # Real-time WebSocket telemetry & simulation
├── tests/                      # Automated unit test suite (pytest)
├── COMMANDS.md                 # Full user command reference & tier specification (62 commands)
└── requirements.txt            # Python dependencies
```

---

## ⚙️ Environment Configuration

### Bot Configuration (`.env`)
Create a `.env` file in the root directory:
```ini
# Discord Bot Credentials
BOT_TOKEN=your_bot_token_here
BRAND_NAME=Nexus
OWNER_IDS=1201050377911554061              # Comma-separated Discord User IDs
SUPPORT_SERVER=https://discord.gg/your_support_link
DATABASE_PATH=nexus.db
ENABLE_PRESENCE_INTENT=false

# In-Process API Backend Configuration
PORT=8000                                   # Cloud container port (Render/Railway)
API_ENABLED=true
API_HOST=0.0.0.0
API_PORT=8000
DASHBOARD_API_KEY=a_very_long_secure_random_hex_key
CORS_ORIGINS=http://localhost:3000,https://your-dashboard.vercel.app

# Optional Cloudflare Tunnel
TUNNEL_ENABLED=false
CF_TUNNEL_TOKEN=
CF_TUNNEL_URL=
```

### Dashboard Configuration (`dashboard/.env.local`)
Create `dashboard/.env.local`:
```ini
NEXT_PUBLIC_BRAND_NAME=Nexus
NEXT_PUBLIC_BRAND_COLOR=#6366f1
NEXT_PUBLIC_ADMIN_IDS=1201050377911554061

# Internal Server-to-Bot Communication (Never exposed to client browser)
BOT_API_URL=http://127.0.0.1:8000
BOT_API_KEY=a_very_long_secure_random_hex_key

# NextAuth Discord OAuth2 Credentials
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=a_very_long_random_nextauth_secret_key
DISCORD_CLIENT_ID=your_discord_application_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
```

---

## 💻 Local Installation & Execution

### 1. Requirements
- Python 3.10+
- Node.js 18+ LTS & npm

### 2. Install Python Dependencies
```bash
python -m pip install -r requirements.txt
```

### 3. Run Automated Tests
```bash
python -m pytest tests/
```

### 4. Start the Nexus Bot & API Backend
```bash
python main.py
```
*Nexus will initialize `nexus.db`, execute schema migrations, load all 21 cogs, and start FastAPI on port 8000.*

### 5. Install & Run Next.js Dashboard
In a separate terminal:
```bash
cd dashboard
npm install
npm run dev
```
Visit `http://localhost:3000` to access the web panel!

---

## 🚢 Production Deployment

### Option A: Render / Container Hosting (Bot + API)
Render provides a single dynamic `$PORT`. Nexus is engineered to bind FastAPI to `$PORT` automatically:
1. Connect your GitHub repository to Render.
2. Select **Web Service** (Python 3 environment).
3. **Build Command**: `pip install -r requirements.txt`
4. **Start Command**: `python main.py`
5. Configure Environment Variables matching `.env.example`.
6. Health Check Path: `/health` (Serves `200 OK` with JSON telemetry).

### Option B: Vercel Hosting (Public Site + Next.js Dashboard)
The Next.js app serves the public site at `/` and the authenticated server dashboard under `/dashboard` from one Vercel project. The separate `landing/` Astro implementation is for local development and is not the production root.
1. Import the repository into Vercel and set the **Root Directory** to `dashboard`.
2. Configure Environment Variables in Vercel matching `dashboard/.env.example`.
3. Set `BOT_API_URL` to your Render service URL (e.g. `https://nexus-bot.onrender.com`).
4. Set Discord OAuth2 Redirect URI in Discord Developer Portal:
   `https://your-vercel-domain.vercel.app/api/auth/callback/discord`

### Option C: Cloudflare Tunnel Option
If hosting on a home server or private VPS without open ports:
1. Set `TUNNEL_ENABLED=true` in `.env`.
2. Provide your `CF_TUNNEL_TOKEN`. Nexus will automatically spawn `pycloudflared` to expose the API safely.

---

## 🔒 Permission Model & Security Rules

1. **Hierarchy Rule**: Nexus will never execute moderation or antinuke actions on server owners, bot creators, or members positioned above the bot's highest role.
2. **Bot-Role Security**: Server Administrators **without the bot role** are strictly blocked from management commands and the dashboard. The server owner must explicitly assign access via `/set-botrole`.
3. **Constant-Time Verification**: API requests are verified using `hmac.compare_digest` to prevent timing attacks.
4. **Audit Logging**: Every action executed via the dashboard is permanently recorded in the `dashboard_audit` database table.

---

## 📄 License & Attribution
Designed and built for high-performance server management. Distributed under the MIT License.
