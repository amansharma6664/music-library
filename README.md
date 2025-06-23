# 🎶 Music Library – Micro Frontend (Remote App)

This is the **Music Library Micro Frontend** built using React and Webpack 5 with Module Federation. It is dynamically loaded into the `main-app` container using remote module loading.

---

## 🚀 Features

- 🎵 Display a list of songs in a clean, dark-themed UI
- 🔍 Filter songs by title, artist, or album
- ↕️ Sort and group songs using built-in JavaScript methods
- ➕ Add/Delete songs (admin only)
- 🔐 Role-based UI controls (admin/user)
- ✅ Form validation and success/error messages

---

## 🧰 Tech Stack
  
- React (Functional Components with Hooks)
- Webpack 5 + Module Federation
- JavaScript methods: `map`, `filter`, `reduce`
- Styled with custom dark UI (no CSS framework)

---

## 👥 Role-Based Behavior

| Role   | View Songs | Filter/Sort | Add/Delete |
|--------|------------|-------------|------------|
| User   | ✅         | ✅          | ❌       | 
| Admin  | ✅         | ✅          | ✅       |

Role is passed in as a **prop from the main app**, like:

```jsx
<RemoteSongList role="admin" />
