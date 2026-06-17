# Finance Manager Web

React + Vite + TypeScript frontend for the Finance Manager app.

## Stack

- **React 18** + TypeScript
- **Vite** for build tooling
- **React Router v6** for routing
- **TanStack Query** for data fetching
- **Zustand** for auth state
- **Axios** for HTTP

## Getting started

```bash
cp .env.example .env
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Pages

| Path | Description |
|------|-------------|
| `/login` | Sign in |
| `/register` | Create account |
| `/` | Dashboard — balance & recent transactions |
| `/accounts` | Manage accounts |
| `/transactions` | Add / view transactions |
