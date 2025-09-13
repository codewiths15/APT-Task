import { Router } from "express";
import {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrders,
} from "./controllers/orderController.js";

const router = Router();

// REST API endpoints
router.get("/orders", getOrders);
router.post("/orders", createOrder);
router.put("/orders/:id", updateOrder);
router.delete("/orders/:id", deleteOrder);

export default router;
