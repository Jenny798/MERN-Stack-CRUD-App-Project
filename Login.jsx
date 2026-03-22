import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);

      localStorage.setItem("token", res.data.token); // ✅ SAVE TOKEN

localStorage.setItem("user", JSON.stringify({
  name: res.data.user.name,
  email: res.data.user.email
}));
      alert(`Welcome ${res.data.user.name} 🎉`);
      window.dispatchEvent(new Event("storage")); // update navbar
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow w-96 rounded">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />

        <button className="bg-yellow-400 w-full p-2 mt-3 rounded">
          Login
        </button>

        <p className="mt-3 text-sm text-center">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 cursor-pointer"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;