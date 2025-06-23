# Music Library – Micro Frontend (Remote App)

This is the Music Library Micro Frontend built using **React** and **Webpack 5 Module Federation**. It is loaded remotely into the `main-app` container.

---

## Features

-  Clean dark-themed UI to display a list of songs
-  Filter songs by title, artist, or album
-  Sort and group songs using `map`, `filter`, `reduce`
-  Add/Delete songs (Admin only)
-  Form validation with success/error messages
-  Role-based UI (Admin/User)

---

## Role-Based Access

| Role   | View Songs | Filter/Sort | Add/Delete |
|--------|------------|-------------|------------|
| User   | ✅         | ✅          | ❌         |
| Admin  | ✅         | ✅          | ✅         |

> The `role` is passed as a prop from the main app (`<SongList role="admin" />`)

---

## Tech Stack

- React (Functional Components + Hooks)
- Webpack 5 with Module Federation
- JavaScript: `map`, `filter`, `reduce`
- Minimal custom CSS (dark mode)

---

## How to Run Locally

1. Clone this repo:
   ```bash
   git clone https://github.com/amansharma6664/music-library.git
   cd music-library
