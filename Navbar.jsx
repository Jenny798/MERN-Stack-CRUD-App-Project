import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 🔍 Search
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/search/${search}`);
      setSearch("");
    }
  };

  // 🛒 ❤️ 👤 Update state
  useEffect(() => {
    const updateState = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalItems = cart.reduce(
        (acc, item) => acc + (item.quantity || 1),
        0
      );
      setCartCount(totalItems);

      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlistCount(wishlist.length);

      const currentUser = JSON.parse(localStorage.getItem("user"));
      setUser(currentUser);
    };

    updateState();
    window.addEventListener("storage", updateState);

    return () => window.removeEventListener("storage", updateState);
  }, []);

  // 🔑 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  return (
    <div className="bg-gray-800 text-white p-4 flex items-center gap-6">

      {/* Logo */}
      <h1 className="text-xl font-bold">
        <Link to="/">Zenvy</Link>
      </h1>

      {/* Categories */}
      <div className="flex gap-4 text-sm">
        <Link to="/category/electronics">Electronics</Link>
        <Link to="/category/fashion">Fashion</Link>
        <Link to="/category/home">Home & Kitchen</Link>
        <Link to="/category/toys">Toys & Games</Link>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex flex-1 max-w-xl ml-5">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 text-black rounded-l outline-none"
        />
        <button className="bg-yellow-400 px-4 rounded-r text-black">
          Search
        </button>
      </form>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {/* 🏠 Home */}
        <Link to="/" className="hover:underline">
          Home
        </Link>

        {/* 👤 Login / User */}
        {user ? (
          <>
            {/* 🔥 CLICKABLE NAME → PROFILE */}
            <span
              onClick={() => navigate("/profile")}
              className="font-semibold cursor-pointer hover:underline"
            >
              Hi, {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        )}

        {/* ❤️ Wishlist */}
        <Link to="/wishlist" className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={wishlistCount > 0 ? "red" : "none"}
            viewBox="0 0 24 24"
            stroke="red"
            strokeWidth="2"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.015-4.5-4.5-4.5-1.74 0-3.24 1-3.99 2.44A4.502 4.502 0 008.5 3.75C6.015 3.75 4 5.765 4 8.25c0 6.25 8 11 8 11s8-4.75 8-11z"
            />
          </svg>

          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">
              {wishlistCount}
            </span>
          )}
        </Link>

        {/* 🛒 Cart */}
        <Link to="/cart" className="relative">
          <span className="text-2xl">🛒</span>

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

      </div>
    </div>
  );
}

export default Navbar;