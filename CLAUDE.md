# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MeetMeHalfway is a web app that finds the geographic midpoint between multiple addresses and suggests nearby restaurants via the Google Places API. Built with Next.js 14 (App Router), TypeScript, Prisma, and Leaflet for maps. Supports 2+ people, venue filtering, and voting.

## Commands

- **Install dependencies:** `npm install` (auto-detects DB provider and generates Prisma client)
- **Start dev server:** `npm run dev` (runs on port 3000)
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Run migrations:** `npm run db:migrate`
- **Push schema (no migration):** `npm run db:push`

## Architecture

### API Routes (Next.js App Router)

- `POST /api/search` — geocodes N addresses, calculates centroid, queries Google Places, saves to DB, returns `{ id }`
- `GET /api/results/[id]` — returns a single search with venues and vote counts
- `GET /api/history` — returns all past searches (summaries, `force-dynamic`)
- `POST /api/vote` — toggle vote on a venue (voterName + venueId)

### Server-Side Libraries (`lib/`)

- `lib/geocode.ts` — Google Maps Geocoding API wrapper (async/await)
- `lib/places.ts` — Google Places Nearby Search wrapper, returns `PlaceResult[]`
- `lib/halfway.ts` — `calculateCentroid(points)` returns midpoint of N coordinates
- `lib/prisma.ts` — Prisma client singleton

### Pages (`app/`)

- `app/page.tsx` — Home page with `<SearchForm>` (supports 2+ address inputs)
- `app/results/[id]/page.tsx` — Results page (server component, Leaflet map + filterable venue cards + voting)
- `app/history/page.tsx` — Search history listing (`force-dynamic`)

### Components (`components/`)

- `SearchForm.tsx` — Client component: dynamic address inputs with Google Places Autocomplete + submit
- `AddressInput.tsx` — Autocomplete-enabled address input using Google Maps Places library
- `MapView.tsx` — Client component: Leaflet map (dynamic import, `ssr: false`)
- `ResultsView.tsx` — Client component: map + filters + voter name + venue list
- `FilterControls.tsx` — Price level, min rating, and open-now filters (client-side)
- `VenueCard.tsx` / `VenueList.tsx` — Venue display cards with vote button
- `Header.tsx` — Nav bar with links to Search and History
- `SearchHistory.tsx` — List of past searches as links

### Database (Prisma — SQLite local, PostgreSQL production)

- Schema: `prisma/schema.prisma` — `Search`, `Participant`, `Venue`, `Vote` models
- Provider auto-detected from `DATABASE_URL` via `scripts/set-db-provider.mjs`
  - `file:` prefix → SQLite (local dev)
  - Otherwise → PostgreSQL (production/Vercel)
- `Venue.types` stored as JSON string (`String`, not `String[]`) for cross-DB compatibility
- Multi-stop: `Search` has many `Participant`s (each with an address)
- Voting: `Venue` has many `Vote`s (voterName-based, toggle on/off)

### Types (`types/index.ts`)

- `Coordinates`, `SearchRequest`, `PlaceResult`, `VenueData`, `SearchResult`, `SearchSummary`
- `PlaceResult` is raw Places API data; `VenueData` extends it with `id` and `voteCount`

## Key Notes

- **Env vars** in `.env.local`:
  - `GOOGLE_MAPS_API_KEY` — server-side (geocoding, places search)
  - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` — client-side (address autocomplete)
  - `DATABASE_URL` — `file:./dev.db` for local, PostgreSQL URL for production
- **Google Cloud APIs required:** Geocoding API, Places API, Maps JavaScript API
- The midpoint calculation is a simple lat/lng average (centroid, not geodesic)
- Leaflet is dynamically imported with `ssr: false` (accesses `window`)
- Current branch is `2025`; main branch is `master`
- Styling: Tailwind CSS with cream background (`#f0ead6`) and Quicksand font
