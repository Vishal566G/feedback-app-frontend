# Feedback App — Frontend

React frontend for the Feedback Board application, built with Vite and styled with Tailwind CSS v4.

---

## Tech Stack

| Tool            | Purpose                   |
| --------------- | ------------------------- |
| React 18        | UI library                |
| Vite            | Build tool and dev server |
| Tailwind CSS v4 | Utility-first styling     |
| Axios           | HTTP client for API calls |

---

## Project Structure

```
client/
├── public/
├── src/
│   ├── axios/
│   │   └── axios.js          # Axios instance with base URL configured
│   ├── components/
│   │   ├── FeedbackForm.jsx  # Controlled form with validation and success toast
│   │   └── FeedbackList.jsx  # Paginated list with avatars and time-ago display
│   ├── App.jsx               # Root component — state, API calls, dark mode
│   ├── main.jsx              # React entry point
│   └── index.css             # Tailwind v4 import + dark mode config
├── index.html
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- Backend server running (see `/server` README)

### Installation

```bash
cd client
npm install
```

### Run the dev server

```bash
npm run dev
```

App runs at `http://localhost:5173`

> Make sure your backend is running at `http://localhost:5000` before starting the frontend.

---

## Features

### Form

- Controlled inputs with `useState` — React owns the input values, not the DOM
- Client-side validation before any API call:
  - Name is required and must contain only letters, spaces, or hyphens
  - Feedback is required and must be at least 10 characters
- Live character counter on the feedback field turns green at 10 chars
- Errors clear as you type, not just on submit
- Loading state disables the button and shows a spinner during submission
- Success toast slides in for 3 seconds after a successful submit

### Feedback List

- Entries sorted newest first
- Avatar with initials generated from the user's name
- Avatar color is deterministic — same name always gets the same color
- `timeAgo` display ("2m ago", "3h ago") instead of raw timestamps
- Proper empty state with icon and copy when no entries exist
- Entry count badge in the header

### Pagination

- "View more feedback" button loads the next page of entries
- Appends new entries to the existing list without replacing them
- "You're all caught up" message when all entries are loaded

### Dark Mode

- Toggle in the header navbar switches between light and dark
- Respects the user's OS preference on first load (`prefers-color-scheme`)
- Persists for the session via the `dark` class on `<html>`

---

## Tailwind v4 Dark Mode Setup

Tailwind v4 uses no config file. Dark mode is configured directly in `src/index.css`:

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

This activates `dark:` variants whenever the `.dark` class is present on any parent — which is what the toggle in `App.jsx` adds and removes from `document.documentElement`.

---

## Axios Configuration

`src/axios/axios.js` exports a pre-configured Axios instance:

```js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/feedback",
});

export default API;
```

All components import `API` from here instead of using raw `fetch` or hardcoding the base URL everywhere. If the backend URL changes (e.g. after deployment), you only update it in one place.

---

## Deployment

This frontend is deployable on [Vercel](https://vercel.com) (free tier).

1. Push your code to GitHub
2. Go to Vercel → New Project → import your repo
3. Set **Root Directory** to `client`
4. Vercel auto-detects Vite — no build config needed
5. After deploying, update the `baseURL` in `src/axios/axios.js` to your Render backend URL:

```js
baseURL: "https://your-app-name.onrender.com/api/feedback";
```

Then redeploy.

---

## Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start development server             |
| `npm run build`   | Build for production                 |
| `npm run preview` | Preview the production build locally |
