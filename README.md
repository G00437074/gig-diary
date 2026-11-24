# Gig Diary 🎸

A personal concert log built with the MERN stack. Record every gig you've been to, rate it out of five, keep track of gigs you have tickets for, and see your gig-going history in numbers.

By Adam Devlin
Data Representation Project 2026, ATU.

---

## Features

### Core
- **Add a gig**: log the artist, venue, city, date and a star rating
- **View your gigs**: every gig is shown as a ticket-style card
- **Edit a gig**: add a rating after the show or fix a mistake
- **Delete a gig**: with an inline "Yes, delete / Cancel" confirmation so nothing is removed by accident

### Beyond the brief
- **Upcoming vs Past**: gigs dated today or later appear under *Upcoming* with a live countdown ("Tonight!", "Tomorrow", "12 days to go"). Once the date passes, the gig moves to *Past gigs* automatically, with no extra input needed.
- **On This Day**: if you went to a gig on today's date in a previous year, a banner on the home page reminds you ("2 years ago you saw…").
- **Stats page**: gigs attended, most-seen artist, favourite venue, average rating, number of cities, and a gigs-per-year bar chart, all calculated live from the database.
- **Search**: filter your gigs instantly by artist, venue or city.
- **Clickable star rating**: tap a star to rate, tap the same star again to clear it.
- **Responsive design**: works on desktop and mobile.

---

## Tech stack

| Layer | Technology |
|---|---|
| Database | MongoDB Atlas (cloud-hosted) |
| Server | Node.js + Express, running on port **4000** |
| ODM | Mongoose |
| Client | React, set up with **Vite** |
| Routing | React Router |
| HTTP requests | axios |

---

## Project structure

```
gig-diary/
├── server/
│   ├── server.js                 Starts Express on port 4000 and connects to MongoDB
│   ├── models/Gig.js             Mongoose schema describing a gig
│   ├── controllers/gigController.js   Read, create, update and delete logic
│   └── routes/gigRoutes.js       Maps URLs to controller functions
└── client/
    └── src/
        ├── App.jsx               Page routes
        ├── api/gigApi.js         All axios calls to the server
        ├── components/           Reusable pieces: NavBar, GigCard, GigForm, StarRating,
        │                         SearchBar, OnThisDay, StatTile, YearChart
        ├── pages/                GigListPage, AddGigPage, EditGigPage, StatsPage, NotFoundPage
        └── utils/                Date helpers (countdowns, On This Day) and stats calculations
```

---

## API endpoints

| Method | URL | What it does |
|---|---|---|
| GET | `/api/gigs` | Get all gigs, newest first |
| GET | `/api/gigs/:id` | Get one gig |
| POST | `/api/gigs` | Add a new gig |
| PUT | `/api/gigs/:id` | Update a gig |
| DELETE | `/api/gigs/:id` | Delete a gig |

---

## Running the project

You will need [Node.js](https://nodejs.org) and a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster.

### 1. Clone the repository
```
git clone https://github.com/G00437074/gig-diary.git
cd gig-diary
```

### 2. Start the server
```
cd server
npm install
cp .env.example .env
```
Open `.env` and replace the placeholder with your MongoDB Atlas connection string, then:
```
npm run dev
```
You should see `Connected to MongoDB` and `Gig Diary server running on http://localhost:4000`.

### 3. Start the client
In a second terminal:
```
cd client
npm install
npm run dev
```
Open the link shown (usually http://localhost:5173).

---

## User guide

See the [Wiki](https://github.com/G00437074/gig-diary/wiki) for a step-by-step guide to using the app.

---

## Acknowledgements

Developed with the help of Claude (Anthropic) as an AI coding assistant.
