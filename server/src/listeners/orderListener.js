import db from "../config/db.js";

export function initOrderListener(io) {
  // Subscribe to "order_changes" channel
  db.query("LISTEN order_changes");

  db.on("notification", (msg) => {
    if (msg.channel === "order_changes") {
      try {
        const payload = JSON.parse(msg.payload);
        console.log("📢 Order change detected:", payload);

        // Broadcast to all connected clients
        io.emit("order_update", payload);
      } catch (err) {
        console.error("❌ Error parsing notification:", err);
      }
    }
  });

  console.log("✅ Listening for order changes...");
}
