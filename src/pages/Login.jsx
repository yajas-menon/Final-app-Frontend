import React, { useState ,useEffect } from "react";
import axios from "axios";
import "./Login.css";
import Navbar from "../components/Navbar";
// import Dashboard from "../pages/Dashboard";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
        setLoading(false)
    },2500)
},[])
  

  const switchMode = () => {
    setMode(mode === "login" ? "register" : "login");
  };

  const clearData = () => {
    setRole("");
    setPassword("");
    setEmail("");
    setName("");
  };

  const registerUser = async () => {
    return await axios
      .post("http://localhost:8000/api/auth/register", {
        name,
        email,
        password,
        role,
      })
      .then((response) => {
        console.log(response);
        clearData();
        alert("Registration Successful!");
        switchMode();
      })
      .catch((error) => {
        throw error;
      });
  };

  const loginUser = async () => {
    return await axios
      .post("http://localhost:8000/api/auth/login", { email, password })
      .then((response) => {
        sessionStorage.setItem("jwtToken", response.data.accessToken);
        sessionStorage.setItem("user_id", response.data.data._id);
        sessionStorage.setItem("role", response.data.data.role);
        sessionStorage.setItem(
          "questions",
          JSON.stringify(response.data.data?.questions)
        );
        if (response.data.data.role == "Admin")
          window.location.href = "/AdminPage";
        else window.location.href = "/dashboard";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar />
      {loading ? (<Loader/>):(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-lg bg-white">
          <h1 className="text-center text-2xl font-bold mb-6">{mode}</h1>
          {mode === "register" && (
            <div className="mb-4">
              <label className="block mb-2" htmlFor="name">
                Name:
              </label>
              <input
                className="px-3 py-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                type="text"
                placeholder="Enter your full name"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block mb-2" htmlFor="email">
              Email:
            </label>
            <input
              className="px-3 py-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              type="email"
              placeholder="Enter your email address"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="password">
              Password:
            </label>
            <input
              className="px-3 py-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              type="password"
              placeholder="Enter your password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {mode == "register" ? (
            <div className="mb-4">
              <label className="block mb-2" htmlFor="password">
                Role
              </label>
              <select
                className="px-3 py-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                type="text"
                value={role}
                name="role"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          ) : null}
          <div className="flex flex-col md:flex-row justify-between">
            <button
              onClick={mode == "login" ? loginUser : registerUser}
              className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 transition duration-300 text-white rounded-md w-full mt-4"
              type="submit"
            >
              Submit
            </button>
          </div>
          {mode == "login" ? (
            <p className="text-xs text-center text-gray-500">
              Dont Have an Account?{" "}
              <span onClick={switchMode} className="underline cursor-pointer">
                Sign Up
              </span>
            </p>
          ) : (
            <p className="text-xs text-center text-gray-500">
              Have an Account?{" "}
              <span onClick={switchMode} className="underline cursor-pointer">
                Log In
              </span>
            </p>
          )}
        </div>
      </div>

      )}
          </div>
  );
};

export default Login;
