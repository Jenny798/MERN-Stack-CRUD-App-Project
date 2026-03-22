import { useEffect, useState } from "react";

function Checkout() {
  const [cartItems, setCartItems] = useState([]);

  // ✅ STEP 2.1 — FORM STATE ADDED
  const [form, setForm] = useState({
    address: "",
    city: "",
    pincode: "",
    landmark: "",
    phone: ""
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(data);
  }, []);

  // 💰 Total
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  // ✅ STEP 2.2 — HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Place Order
  const handleOrder = async () => {

    // ✅ STEP 2.5 — VALIDATION
    if (!form.address || !form.pincode || !form.phone) {
      alert("Fill Address, Pincode & Phone ❌");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/orders/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            items: cartItems,
            totalAmount: total,
            shippingAddress: form, // ✅ STEP 2.4
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Order placed successfully 🎉");

        localStorage.removeItem("cart");
        setCartItems([]);

        window.dispatchEvent(new Event("storage"));
      } else {
        alert(data.message);
      }

    } catch (err) {
      console.log(err);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-5">Checkout</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {/* 🧾 Items */}
          <div className="space-y-3">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-white p-3 rounded shadow flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 object-cover rounded"
                  />

                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity || 1}
                    </p>
                  </div>
                </div>

                <p className="font-bold">
                  ₹{item.price * (item.quantity || 1)}
                </p>
              </div>
            ))}
          </div>

          {/* 💰 Total */}
          <div className="mt-5 text-xl font-bold">
            Total: ₹{total}
          </div>

          {/* ✅ STEP 2.3 — DELIVERY FORM */}
          <div className="bg-white p-4 mt-5 rounded shadow">
            <h2 className="font-bold mb-2">Delivery Details</h2>

            <input
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />

            <input
              name="city"
              placeholder="City"
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />

            <input
              name="pincode"
              placeholder="Pincode"
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />

            <input
              name="landmark"
              placeholder="Landmark"
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />

            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />
          </div>

          {/* 🟢 Place Order */}
          <button
            onClick={handleOrder}
            className="mt-5 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded w-full text-lg"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Checkout;