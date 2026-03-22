import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: ""
  });

  const navigate = useNavigate(); // ✅ navigation

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      alert("Registered Successfully ✅");

      // ✅ SAVE USER (important for navbar)
      localStorage.setItem("user", JSON.stringify({
        name: form.name
      }));

      // 🔥 Redirect to home
      navigate("/");

      // 🔄 update navbar instantly
      window.dispatchEvent(new Event("storage"));

    } catch (err) {
      alert("Error ❌");
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow w-96 rounded">

        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />

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

        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />

        <button className="bg-yellow-400 hover:bg-yellow-500 w-full p-2 mt-3 rounded">
          Register
        </button>

        {/* 🔥 Login Link */}
        <p className="mt-3 text-sm text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer"
          >
            Login
          </span>
        </p>

      </form>
    </div>
  );
}

export default Register;