import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products`)
      .then(res => {
        const found = res.data.find(p => p._id === id);
        setProduct(found);
      });
  }, [id]);

  if (!product) return <p className="p-5">Loading...</p>;

  // 📦 Fake delivery date (3 days)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);

  return (
    <div className="p-5 bg-gray-100 min-h-screen">

      <div className="bg-white p-5 rounded shadow flex gap-10">

        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-80 h-80 object-contain"
        />

        {/* Details */}
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>

          <p className="text-gray-600 mt-2">{product.description}</p>

          <p className="text-2xl font-bold mt-3">₹{product.price}</p>

          {/* 🚚 Delivery */}
          <p className="mt-3 text-green-600">
            Delivery by: {deliveryDate.toDateString()}
          </p>

          {/* 👕 Sizes (only for fashion) */}
          {product.category === "fashion" && (
            <div className="mt-4">
              <p className="font-semibold mb-2">Select Size:</p>

              <div className="flex gap-2">
                {["XS", "S", "M", "L", "XL"].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border rounded ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <button
            onClick={() => {
              let cart = JSON.parse(localStorage.getItem("cart")) || [];

              cart.push({
                ...product,
                selectedSize: selectedSize || null
              });

              localStorage.setItem("cart", JSON.stringify(cart));
              window.dispatchEvent(new Event("storage"));

              alert("Added to cart ✅");
            }}
            className="mt-5 bg-yellow-400 px-6 py-3 rounded"
          >
            Add to Cart
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;