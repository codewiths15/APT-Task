import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./src/app.js";
import { initOrderListener } from "./src/listeners/orderListener.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

const expressApp = express();
expressApp.use(express.json());
expressApp.use("/api", app);

const httpServer = createServer(expressApp);

// Setup WebSocket (Socket.IO)
const io = new Server(httpServer, {
  cors: { origin: "*" }, // allow all clients (for testing)
});

// Start DB listener
initOrderListener(io);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
