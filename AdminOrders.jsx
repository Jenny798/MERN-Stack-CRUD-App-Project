import { useEffect, useState } from "react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch("http://localhost:5000/api/orders");
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    fetchOrders();
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-5">Admin Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="bg-white p-4 mb-4 rounded shadow">
          <p><b>Total:</b> ₹{order.total}</p>
          <p><b>Status:</b> {order.status}</p>

          <div className="mt-2 flex gap-2">
            <button
              onClick={() => updateStatus(order._id, "Shipped")}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Mark Shipped
            </button>

            <button
              onClick={() => updateStatus(order._id, "Delivered")}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Mark Delivered
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;