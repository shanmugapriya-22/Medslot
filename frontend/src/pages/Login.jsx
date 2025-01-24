import React, { useContext,useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from 'axios'
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [state, setState] = useState(""); // "Sign Up" for signup mode, "" for login mode
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Reset form fields when switching modes
  const resetFormFields = () => {
    setEmail("");
    setPassword("");
    setName("");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          password,
          email,},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
    
  }, [token,navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
      >
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {state === "Sign Up" ? "Create an Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-600 mt-2">
            {state === "Sign Up"
              ? "Sign up to access amazing features."
              : "Log in to your account."}
          </p>
        </div>

        {/* Form Fields */}
        <div className="mt-6 space-y-4">
          {state === "Sign Up" && (
            <div className="relative">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="flex items-center mt-1">
                <i className="fas fa-user text-gray-400 absolute ml-3"></i>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="flex items-center mt-1">
              <i className="fas fa-envelope text-gray-400 absolute ml-3"></i>
              <input
                type="email"
                id="email"
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="flex items-center mt-1">
              <i className="fas fa-lock text-gray-400 absolute ml-3"></i>
              <input
                type="password"
                id="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium shadow-md"
        >
          {state === "Sign Up" ? "Sign Up" : "Log In"}
        </button>

        {/* Footer Section */}
        <p className="mt-4 text-sm text-center text-gray-600">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setState("");
                  resetFormFields(); // Reset form fields when switching to Login
                }}
                className="text-blue-600 font-medium hover:underline"
              >
                Log In
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setState("Sign Up");
                  resetFormFields(); // Reset form fields when switching to Sign Up
                }}
                className="text-blue-600 font-medium hover:underline"
              >
                Sign Up
              </button>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
