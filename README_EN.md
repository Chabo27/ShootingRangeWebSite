# SK Pogodak — Shooting Range Booking Website

A small full-stack application for listing shooting ranges (streljane) and their offers (ponude), built with a Node/Express + MongoDB API and a React frontend. The repo contains three main folders:

- `api/` — Express backend with Mongoose models and REST API controllers.
- `client/` — React frontend (user-facing website).
- `admin/` — React admin panel to manage shooting ranges and offers.

Quick overview
- Users can search shooting ranges by city, date range, and price.
- Each shooting range has multiple offers; the site shows the cheapest offer (`najjeftinijaPonuda`) in listings.
- Date picking is implemented with `react-date-range` and prices are displayed in EUR.

Tech stack
- Backend: Node.js, Express, Mongoose (MongoDB)
- Frontend: React, react-router, axios
- Styling: plain CSS modules in components

Getting started (local)

Prerequisites
- Node.js (16+)
- npm or yarn
- MongoDB (local or Atlas)

1) Run the backend API

Open a terminal in `api/` and install dependencies:

```powershell
cd c:\Users\Win\Desktop\MOSSTR3\MOJSTR2\Projekat\api
npm install
```

Set the environment variables (PowerShell examples):

```powershell
# example for local MongoDB
$env:MONGO_URL = "mongodb://localhost:27017/skpogodak"
# optional: $env:PORT = 8800
```

Start the API:

```powershell
npm start
```

The API runs on port 8800 by default (check `api/index.js`).

2) Run the client (frontend)

Open a second terminal in `client/`:

```powershell
cd c:\Users\Win\Desktop\MOSSTR3\MOJSTR2\Projekat\client
npm install
# if port 3000 is busy, run on another port:
$env:PORT=3001; npm start
```

Client uses a proxy to `http://localhost:8800/api` (see `client/package.json`). If your backend runs on a different port, either update the proxy or use full API URLs.

3) (Optional) Admin app

The `admin/` folder contains a separate React app for managing streljane and ponude. Install and run similarly.

API highlights
- GET /streljane?grad=city&min=0&max=999&limit=10 — list shooting ranges (case-insensitive partial match for `grad`)
- GET /streljane/:id — get a single shooting range
- GET /ponude?popularno=true — list offers
- POST/PUT/DELETE endpoints exist for authenticated admin operations (see `api/routes`)

Notes and recommendations
- Existing data: if you see `najjeftinijaPonuda` incorrectly set to 0 for older records, you may need to recalculate it from the related `Ponuda` documents. I can add a migration script to update all records.
- Environment example: Add a file `api/.env.example` with the keys `MONGO_URL`, `PORT`, `JWT_SECRET` to help other developers.
- Styling: site uses component-level CSS files. Consider migrating to CSS modules or a design system if the project grows.

Development tips
- When editing frontend styles, dev server auto-reloads (react-scripts). If you face CSS compilation errors, check for unclosed braces in `.css` files.
- The backend uses `type: module` (ESM) in `api/package.json`.

