
-- Create table orders
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'shipped', 'delivered')),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a trigger function to send JSON payloads
CREATE OR REPLACE FUNCTION notify_order_changes()
RETURNS TRIGGER AS $$
DECLARE
  payload JSON;
BEGIN
  IF (TG_OP = 'INSERT') THEN
    payload = json_build_object(
      'action', TG_OP,
      'data', row_to_json(NEW)
    );
  ELSIF (TG_OP = 'UPDATE') THEN
    payload = json_build_object(
      'action', TG_OP,
      'data', row_to_json(NEW)
    );
  ELSIF (TG_OP = 'DELETE') THEN
    payload = json_build_object(
      'action', TG_OP,
      'data', row_to_json(OLD)
    );
  END IF;

  PERFORM pg_notify('order_changes', payload::text);
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to the orders table
CREATE TRIGGER orders_notify_trigger
AFTER INSERT OR UPDATE OR DELETE ON orders
FOR EACH ROW
EXECUTE FUNCTION notify_order_changes();
