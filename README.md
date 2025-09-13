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

Go to the frontend folder by opening a new tab of the code editor (VS Code).

Open index.html using Live Server (VS Code plugin or any HTTP server).

---

## 🔥 Testing with Postman

### Create Order (POST)
**Endpoint**  
POST http://localhost:4000/api/orders


**Body (JSON)**
```json
{
  "customer_name": "Sahil",
  "product_name": "Laptop",
  "status": "pending"
}
```

Open the client to view the real time notification

### Update Order (PUT)
Update the same order which we just created.
**Endpoint**  
POST http://localhost:4000/api/orders/${id}


**Body (JSON)**
```json
{
  "status": "shipped"
}
```
Open the client to view the real time notification

## ✅ Why This Approach?

This design was chosen because it gives us **real-time updates** in a simple and efficient way. Let’s break it down:

### 🔄 No Polling
Normally, if we want to know whether the database has changed, the client keeps **asking the server every few seconds** (“Has anything changed?”).  
This is called **polling**. It wastes a lot of server resources because most of the time, nothing has changed.  

👉 In our system, the server itself **pushes updates only when something happens**.  
This means no unnecessary requests, faster response, and less load on the system.

---

### 📡 Scalable
Since we use **Socket.IO (WebSockets)**, multiple clients (like many users in their browsers) can stay connected at the same time.  
When one order changes in the database, the server can **broadcast the update to all clients instantly**.  

👉 Even if 1000 users are connected, everyone sees the change **at the same time** without each user spamming the server with requests.

---

### 🛡️ Reliable
We use PostgreSQL’s built-in **LISTEN/NOTIFY** feature.  
This means that whenever something changes in the `orders` table, the database itself will **send a signal** to our backend.  

👉 This ensures that we **never miss a change** — every insert, update, or delete is captured and forwarded to clients right away.

---
