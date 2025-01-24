import React, { useContext, useState } from "react";
import { FaLock, FaEnvelope, FaStethoscope, FaUser } from "react-icons/fa";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success("Login successful!");
        } else {
          toast.error(data.message || "Login failed. Please try again.");
        }
      } else {
        toast.warning("Doctor login not implemented yet.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Invalid credential");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 via-white to-blue-50 text-gray-800">
      {/* Main container */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 relative overflow-hidden">
        {/* Blue-Themed Decorations */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-blue-300 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-20"></div>

        {/* Dynamic Icon */}
        <div className="absolute top-8 right-8 text-blue-500 text-4xl flex items-center justify-center">
          {state === "Admin" ? <FaUser /> : <FaStethoscope />}
        </div>

        {/* Login Header */}
        <div className="text-center mb-8 relative z-10">
          <p className="text-4xl font-bold tracking-wide text-blue-600">
            {state} Login
          </p>
          <p className="text-sm text-gray-500">Sign in to access your dashboard</p>
        </div>

        {/* Login Form */}
        <form onSubmit={onSubmitHandler}>
          {/* Email Input */}
          <div className="mb-6 relative z-10">
            <label htmlFor="email" className="text-sm font-semibold text-gray-500">
              Email
            </label>
            <div className="flex items-center mt-2 bg-gray-100 p-3 rounded-lg">
              <FaEnvelope className="text-gray-400 mr-3" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="bg-transparent outline-none w-full text-gray-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6 relative z-10">
            <label htmlFor="password" className="text-sm font-semibold text-gray-500">
              Password
            </label>
            <div className="flex items-center mt-2 bg-gray-100 p-3 rounded-lg">
              <FaLock className="text-gray-400 mr-3" />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="bg-transparent outline-none w-full text-gray-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-md"
          >
            Login
          </button>

          {/* Switch Login Option */}
          <div className="mt-4 text-center text-sm text-gray-500 relative z-10">
            {state === "Admin" ? (
              <p>
                Doctor Login?{" "}
                <span
                  onClick={() => setState("Doctor")}
                  className="text-blue-500 font-semibold cursor-pointer hover:underline"
                >
                  Click here
                </span>
              </p>
            ) : (
              <p>
                Admin Login?{" "}
                <span
                  onClick={() => setState("Admin")}
                  className="text-blue-500 font-semibold cursor-pointer hover:underline"
                >
                  Click here
                </span>
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
