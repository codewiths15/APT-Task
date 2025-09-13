import db from "../config/db.js";

export async function createOrder(customerName, productName, status) {
  const query = `
    INSERT INTO orders (customer_name, product_name, status, updated_at)
    VALUES ($1, $2, $3, NOW())
    RETURNING *;
  `;
  const values = [customerName, productName, status];
  const result = await db.query(query, values);
  return result.rows[0];
}

export async function updateOrder(id, updates) {
  const keys = Object.keys(updates);
  if (keys.length === 0) return null;

  // Build SET clause dynamically
  const setClause = keys.map((key, idx) => `${key} = $${idx + 1}`).join(", ");
  const values = Object.values(updates);

  const query = `
    UPDATE orders
    SET ${setClause}, updated_at = NOW()
    WHERE id = $${keys.length + 1}
    RETURNING *;
  `;

  const result = await db.query(query, [...values, id]);
  return result.rows[0];
}

export async function deleteOrder(id) {
  const query = `
    DELETE FROM orders
    WHERE id = $1
    RETURNING *;
  `;
  const result = await db.query(query, [id]);
  return result.rows[0];
}

export async function getOrders() {
  const query = `SELECT * FROM orders ORDER BY updated_at DESC;`;
  const result = await db.query(query);
  return result.rows;
}
