import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    const updated = data.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  }, []);

  // ➕ Increase quantity
  const increaseQty = (index) => {
    let updated = [...cart];
    updated[index].quantity += 1;
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  // ➖ Decrease quantity
  const decreaseQty = (index) => {
    let updated = [...cart];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
    }
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  // ❌ Remove item
  const removeItem = (index) => {
    let updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  // 💰 Total
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-5">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 mb-4 shadow rounded flex items-center gap-5"
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />

              {/* Product Details */}
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p>₹{item.price}</p>
                {item.selectedSize && (
                  <p className="text-sm text-gray-500">
                    Size: {item.selectedSize}
                  </p>
                )}

                {/* Quantity Controls */}
                <div className="flex items-center mt-2 gap-2">
                  <button
                    onClick={() => decreaseQty(index)}
                    className="px-2 bg-gray-300 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(index)}
                    className="px-2 bg-gray-300 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price & Remove */}
              <div className="text-right">
                <p className="font-bold">
                  ₹{item.price * item.quantity}
                </p>
                <button
                  onClick={() => removeItem(index)}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total & Checkout */}
          <div className="bg-white p-5 shadow rounded mt-5 flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-xl font-bold mb-3 md:mb-0">
              Total: ₹{totalPrice}
            </h2>
            <button
              onClick={() => navigate("/checkout")}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;