import * as orderService from "../services/orderService.js";

export async function createOrder(req, res) {
  try {
    const { customer_name, product_name, status } = req.body;
    const order = await orderService.createOrder(
      customer_name,
      product_name,
      status
    );
    res.status(201).json({ message: "Order created", data: order });
  } catch (err) {
    console.error("❌ Create order error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
}

export async function updateOrder(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body; // can have customer_name, product_name, status

    const order = await orderService.updateOrder(id, updates);

    if (!order) return res.status(404).json({ error: "Order not found" });

    res.json({ message: "Order updated", data: order });
  } catch (err) {
    console.error("❌ Update order error:", err);
    res.status(500).json({ error: "Failed to update order" });
  }
}


export async function deleteOrder(req, res) {
  try {
    const { id } = req.params;
    const order = await orderService.deleteOrder(id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order deleted", data: order });
  } catch (err) {
    console.error("❌ Delete order error:", err);
    res.status(500).json({ error: "Failed to delete order" });
  }
}

export async function getOrders(req, res) {
  try {
    const orders = await orderService.getOrders();
    res.json({ data: orders });
  } catch (err) {
    console.error("❌ Get orders error:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
}


