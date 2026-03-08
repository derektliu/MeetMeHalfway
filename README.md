# MeetMeHalfway

Find the perfect meeting spot between multiple locations. Enter addresses for 2 or more people, and MeetMeHalfway calculates the central point and shows nearby venues on a map. Search for restaurants, cafes, bars, parks, and more. Optionally equalize travel times, then vote on your favorites in real time.

## Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Database:** SQLite (local dev) / PostgreSQL (production) via Prisma
- **Maps:** Leaflet + OpenStreetMap
- **Venue Search:** Google Places Nearby Search
- **Geocoding:** Google Maps Geocoding API
- **Travel Times:** Google Distance Matrix API
- **Autocomplete:** Google Places Autocomplete
- **Styling:** Tailwind CSS

## Features

- **Multi-stop support** — 2 or more people
- **Address autocomplete** — powered by Google Places
- **Beyond restaurants** — search for cafes, bars, parks, libraries, or gyms
- **Travel-aware midpoint** — optionally equalize travel time instead of using geographic center, with driving/transit/walking/biking modes
- **Filter venues** — by price, rating, and open status
- **Vote on venues** — with shareable links
- **Real-time collaboration** — live vote updates and viewer presence when multiple people view the same results
- **Search history** — browse past searches with venue type labels

## Getting Started

### Prerequisites

- Node.js 18+
- Google Cloud project with **Geocoding API**, **Places API**, **Maps JavaScript API**, and **Distance Matrix API** enabled

No database install needed for local dev — SQLite is used automatically.

### Setup

1. Clone and install:
   ```bash
   git clone https://github.com/derektliu/MeetMeHalfway.git
   cd MeetMeHalfway
   npm install
   ```

2. Create `.env.local` with your Google Maps API key:
   ```
   GOOGLE_MAPS_API_KEY=your_key_here
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
   DATABASE_URL="file:./dev.db"
   ```

3. Run migrations:
   ```bash
   npm run db:migrate
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Database

The database provider is auto-detected from `DATABASE_URL`:

| `DATABASE_URL` | Provider | Use case |
|---|---|---|
| `file:./dev.db` | SQLite | Local development |
| `postgresql://...` | PostgreSQL | Production / Vercel |

This is handled by `scripts/set-db-provider.mjs`, which runs automatically on `npm run dev`, `npm run build`, and `npm install`.

## Deploy to Vercel

1. Push your code to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add a Postgres database ([Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) or [Neon](https://neon.tech))
4. Set environment variables:
   - `GOOGLE_MAPS_API_KEY` — your Google Maps API key
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` — same key (used for client-side autocomplete)
   - `DATABASE_URL` — PostgreSQL connection string (provided by Vercel/Neon)
5. Set the build command to: `prisma migrate deploy && next build`
6. Deploy

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (auto-detects DB, generates Prisma client) |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run db:migrate` | Create and apply Prisma migrations |
| `npm run db:push` | Push schema changes without migrations |

## How It Works

1. Enter addresses for you and your friends (2 or more)
2. Pick a venue type (restaurants, cafes, bars, parks, libraries, or gyms)
3. Choose midpoint mode: **Geographic** (simple centroid) or **Travel-Time** (equalizes travel duration via Distance Matrix API, with driving/transit/walking/biking options)
4. The app geocodes all addresses and computes the midpoint
5. Google Places API finds nearby venues around the midpoint
6. Results are displayed on a Leaflet map with venue cards
7. Filter results by price, rating, or open status
8. Set your name and vote on your favorite venues
9. Share the URL with friends — they'll see live vote updates and who else is viewing
