# 🌀 SubSwap — The Subscription Sharing Marketplace

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/theanirbanpanda/subsswap)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Project Status](https://img.shields.io/badge/status-active-blueviolet)](https://github.com/theanirbanpanda/subsswap)

**SubSwap** is a peer-to-peer marketplace where people can share or trade their unused digital subscription slots — safely and easily.

---

![SubSwap Demo](uploads/placeholder.gif)

> 💡 **Note:** This is a working prototype meant to show the full user flow and product logic. There’s no real backend yet — everything runs locally using `localStorage` so you can still try all the core features.

---

## 🚀 Why I Built SubSwap

### The Problem
Most of us in India have multiple OTT or digital subscriptions — Netflix, Hotstar, Prime Video, Spotify, SonyLIV, etc.  
But we rarely use all of them at once. Some accounts sit half-empty, while we pay full price every month. That’s wasted money.

### The Idea
What if you could swap your extra Netflix slot with someone who has an extra Hotstar slot?  
That’s what **SubSwap** does — it connects users who want to exchange their unused subscriptions, in a simple, transparent way.

---

## ✨ What’s Inside

Here’s what the current prototype can do:

### 🖥️ Landing Page
A clean, responsive landing page that explains what SubSwap is and gives you quick access to **Login** or **Sign Up**.

### 🛒 Marketplace Dashboard
* Shows all active listings (except your own).
* Built-in **search** so you can instantly filter by service or user.
* Updates live as new subscriptions are added.

### 🎫 My Subscriptions
* Add, view, or edit your subscriptions.
* Each entry includes details like **Service Name**, **Price**, **Available Slots**, and **Renewal Date**.
* Whatever you add here automatically shows up in the marketplace for others to see.

### 🔁 Swap Requests
The heart of SubSwap — the full swap workflow:
1. Click **Request Swap** on any listing.
2. Confirm the action, and the app creates a **pending swap request**.
3. You can view all your **Sent** and **Received** requests in the dashboard.
4. Owners can **Accept** or **Decline**, and both sides see the update instantly.

### 💬 Chat System
* Each swap opens a private chat between the two users.
* Chats are saved persistently using `localStorage`, so your messages stay even after a refresh.
* The **Chat** tab in the header jumps straight to your latest conversation.

### ✅ Trust & Verification
User profiles can be marked as **Verified** (e.g., `priya@gmail.com`) to build trust between traders.

---

## ⚙️ Tech Stack

* **Frontend:** React.js (v19)
* **Routing:** React Router v6  
* **State Management:** React Context API  
* **Prototype Storage:** Browser `localStorage`  
* **Styling:** Pure CSS with custom variables (Dark theme)
* **Build Tool:** Vite

---

## 🧩 Getting Started

This project is entirely client-side — you just need Node.js and npm.


1.  **Clone the repository:**
    ```bash
    git clone https_://[github.com/theanirbanpanda/subsswap.git](https://github.com/theanirbanpanda/subsswap.git)
    cd subsswap
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:5173](http://localhost:5173) in your browser.

### 🔑 Demo Accounts

Use these pre-set accounts to test the full swap flow.
* **User A (Requester):**
    * **Email:** `me@gmail.com`
    * **Password:** `123`
* **User B (Owner):**
    * **Email:** `priya@gmail.com`
    * **Password:** `123`


🔮 Roadmap :

This is just the start — here’s where I’d like to take SubSwap next:

Replace localStorage with a real-time backend (Firebase or Node.js + MongoDB)

Add a star-rating system for reputation and trust

Build group swaps (A ↔ B ↔ C)

Add notifications for chat and requests

❤️ A Note :

SubSwap started as a small idea to solve a problem I personally face — paying for too many subscriptions.
This prototype is my attempt to show how a simple, community-driven marketplace could fix that.


Check this webapp demo here:
https://app.netlify.com/projects/subswapp/overview


License: MIT

© 2025 Anirban Panda