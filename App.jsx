import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import AdminOrders from "./pages/AdminOrders";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>

      {/* ✅ Navbar MUST be inside Router */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:name" element={<CategoryPage />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

    </Router>
  );
}

export default App;