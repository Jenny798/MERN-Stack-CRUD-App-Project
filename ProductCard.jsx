import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ ADD

function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate(); // ✅ ADD

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((item) => item._id === product._id);
    if (exists) setLiked(true);
  }, [product]);

  // ❤️ Wishlist
  const handleWishlist = (e) => {
    e.stopPropagation(); // ✅ VERY IMPORTANT

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (liked) {
      wishlist = wishlist.filter((item) => item._id !== product._id);
      setLiked(false);
    } else {
      wishlist.push(product);
      setLiked(true);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    window.dispatchEvent(new Event("storage"));
  };

  // 🛒 Cart
  const handleCart = (e) => {
    e.stopPropagation(); // ✅ VERY IMPORTANT

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("storage"));
    alert("Item added to cart ✅");
  };

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)} // ✅ CLICK NAVIGATION
      className="bg-white p-4 shadow hover:shadow-lg transition rounded cursor-pointer"
    >

      {/* Image */}
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover rounded"
      />

      {/* Details */}
      <h2 className="font-semibold text-lg">{product.name}</h2>
      <p className="text-gray-600 text-sm">{product.description}</p>
      <p className="text-xl font-bold mt-2">₹{product.price}</p>

      {/* Actions */}
      <div className="flex justify-between items-center mt-4">

        {/* ❤️ Wishlist */}
        <button onClick={handleWishlist} className="p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={liked ? "red" : "none"}
            viewBox="0 0 24 24"
            stroke="red"
            strokeWidth="2"
            className="w-7 h-7 transition"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.015-4.5-4.5-4.5-1.74 0-3.24 1-3.99 2.44A4.502 4.502 0 008.5 3.75C6.015 3.75 4 5.765 4 8.25c0 6.25 8 11 8 11s8-4.75 8-11z"
            />
          </svg>
        </button>

        {/* 🛒 Cart */}
        <button
          onClick={handleCart}
          className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 text-lg font-semibold rounded-lg shadow"
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
}

export default ProductCard;