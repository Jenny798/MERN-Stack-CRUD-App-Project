import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Chatbot from "../components/Chatbot";

function Home() {
  const [products, setProducts] = useState([]);
  const [chatOpen, setChatOpen] = useState(false); // toggle state

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-5 relative">
      {/* 🔥 HERO BANNER */}
<div className="relative mb-6">
  <img
    src="/images/banner5.jpg"
    alt="Banner"
    className="w-full h-[300px] object-cover rounded"
  />

  {/* Overlay Text */}
  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40 text-white rounded">
    
  </div>
</div>

      <h1 className="text-2xl font-bold mb-5">Our Latest Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Chat Toggle Button */}
{!chatOpen && (
  <button
    onClick={() => setChatOpen(true)}
    className="fixed bottom-5 right-5 bg-gray-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-600 transition-colors"
  >
    Chat
  </button>
)}

      {/* Chatbot Component */}
      <Chatbot isOpen={chatOpen} onClose={() => setChatOpen(false)} />

    </div>
  );
}

export default Home;