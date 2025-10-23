# Doctor's Appointment Scheduler Frontend

Single-page React application for browsing, scheduling, and canceling doctor appointments against a REST API.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [API Usage](#api-usage)
- [Scripts](#scripts)
- [Testing](#testing)

## Overview
The project delivers the client-side of a doctor's appointment scheduler. Users select a date, review all scheduled appointments for that day, and submit new bookings with precise time slots and durations. Frontend responsibilities include rendering the UI, validating inputs, and calling the backend to read, create, and delete appointments.

## Features
- Daily agenda view driven by a date picker keeps the UI focused on the selected day.
- Appointment list fetches and refreshes automatically when the date changes, and supports in-place cancellations.
- Scheduling form generates 30-minute time slots, validates required fields, and surfaces success or error notifications.
- Centralized Axios `httpService` adds JSON defaults and response normalization so components stay lightweight.
- Tailwind-powered dark theme with responsive layout for a quick, modern presentation layer.

## Architecture
- `src/App.tsx` orchestrates page layout, tracks the active date, and coordinates the list and form.
- `src/components/` holds focused UI building blocks (`AppointmentList`, `AppointmentItem`, `AppointmentForm`).
- `src/services/httpService.ts` wraps Axios with base URL, headers, and response interceptors; `src/services/api.ts` exposes appointment-specific helpers.
- `src/interfaces/` centralizes TypeScript contracts shared across components.

```
src/
  components/
    AppointmentForm.tsx
    AppointmentItem.tsx
    AppointmentList.tsx
  interfaces/
    appointment.ts
  services/
    api.ts
    httpService.ts
  App.tsx
  main.tsx
```

## Tech Stack
- React 18 with TypeScript, bundled by Vite 5 for fast development.
- Tailwind CSS 3 for utility-first styling.
- Axios for HTTP and interceptors, with environment-driven base URLs.
- ESLint 9 for linting and code quality.

## Getting Started
### Prerequisites
- Node.js 18 or newer.
- [pnpm](https://pnpm.io/) (preferred). You can substitute npm or yarn if needed.

### Installation
```bash
pnpm install
```

### Run the development server
```bash
pnpm dev
```
The app is served at `http://localhost:5173` by default.

### Build for production
```bash
pnpm build
```

## Configuration
Set the backend base URL through Vite environment variables. Create `.env.local` (not committed) and define:
```bash
VITE_API_BASE_URL=https://your-api.example.com
```
Restart the dev server after modifying environment variables.

## API Usage
The UI assumes a REST API that supports:

### List appointments
`GET /appointments?date=YYYY-MM-DD`

Expected response (array):
```json
[
  {
    "id": 42,
    "time": "09:00",
    "duration": 30,
    "patientName": "Ada Lovelace",
    "description": "Routine checkup"
  }
]
```

### Create an appointment
`POST /appointments`
```json
{
  "patientName": "Ada Lovelace",
  "description": "Routine checkup",
  "date": "2024-10-22",
  "startTime": "09:00",
  "duration": 30
}
```

### Cancel an appointment
`DELETE /appointments/:id`

The Axios interceptor unwraps `data` payloads, so endpoints can return either the resource array directly or a `{ "data": [...] }` envelope.

## Scripts
- `pnpm dev` – start the Vite dev server with HMR.
- `pnpm build` – type-check and build the production bundle.
- `pnpm preview` – preview the production build locally.
- `pnpm lint` – run ESLint across the workspace.

## Testing
Automated tests are not yet implemented. Recommended next steps include adding component tests with React Testing Library and API contract tests to ensure the frontend remains aligned with backend responses.
