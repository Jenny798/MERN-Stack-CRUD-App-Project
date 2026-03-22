import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/orders/my-orders",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-5 bg-gray-100 min-h-screen">

      {/* 👤 User Info */}
      <div className="bg-white p-5 shadow rounded mb-5">
        <h2 className="text-xl font-bold">Hi, {user?.name}</h2>
        <p>{user?.email}</p>
      </div>

      {/* 📦 Orders */}
      <h2 className="text-xl font-bold mb-3">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="bg-white p-4 mb-4 shadow rounded">

            {/* Items */}
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-4 mb-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 object-cover"
                />
                <div>
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                </div>
              </div>
            ))}

            {/* Status */}
            <div className="mt-3">
              <p className="font-semibold">
                Status:{" "}
                <span
                  className={
                    order.status === "ordered"
                      ? "text-yellow-500"
                      : order.status === "shipped"
                      ? "text-blue-500"
                      : "text-green-600"
                  }
                >
                  {order.status.toUpperCase()}
                </span>
              </p>

              <p className="text-sm text-gray-500">
                Ordered on: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

          </div>
        ))
      )}
    </div>
  );
}

export default Profile;