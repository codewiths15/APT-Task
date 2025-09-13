# 📦 Real-Time Orders Notification System

This project is an assignment to build a **real-time notification system** where clients automatically receive updates whenever the database changes — **without polling**.  
We used **PostgreSQL + Node.js + Socket.IO** for the backend, and a simple **HTML + JavaScript frontend**.  

---

## 🚀 Problem Statement

- We have a table called **orders** in PostgreSQL.  
- Whenever a new order is **created**, **updated**, or **deleted**, clients should get notified in **real-time**.  
- Clients should not keep sending requests (polling). Instead, the server should **push** changes to them.  

---

## 🛠️ Tech Choices

- **Backend**: Node.js (Express + Socket.IO)  
- **Database**: PostgreSQL (Supabase in this case, but works with any Postgres DB)  
- **Frontend**: Simple HTML file using Socket.IO client  
- **Real-time Updates**: PostgreSQL `LISTEN/NOTIFY` + WebSockets  

---

## 📂 Project Structure
```
server/ → Backend service (Node.js + Express)
├── src/
│ ├── controllers/ → Handle requests (CRUD)
│ ├── services/ → Database queries
│ ├── listeners/ → Database listeners (LISTEN/NOTIFY for order changes)
│ ├── config/ → Configuration files (DB connection, env setup)
│ └── app.js → Express app setup
├── index.js → Entry point (starts API + WebSocket server)
├── .env → DB connection details
└── package.json

frontend/ → Simple client (HTML + JS)
└── index.html → Connects via WebSocket and shows updates
```

---

## ⚙️ How It Works (Flow)

1. PostgreSQL trigger + function sends a **NOTIFY event** whenever `orders` table changes.  
2. Node.js backend is **listening to notifications** from Postgres.  
3. When a change happens, backend uses **Socket.IO** to broadcast updates to all connected clients.  
4. The client (browser) receives the update and immediately shows it on screen.  

So if you **create, update, or delete** an order in Postman, every connected client will **see it instantly**.  

---

## ▶️ How to Run

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd <repo-folder>
```

### 2. Start Backend
```bash
cd server
npm install
npm run dev
```

### 3. Start Frontend
```bash
cd ..
cd frontend
```
Open index.html using Live Server (VS Code plugin or any HTTP server).
