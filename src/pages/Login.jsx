import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import Navbar from "../components/Navbar";
// import Dashboard from "../pages/Dashboard";
import { Navigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("login");
    const [name, setName] = useState("");

    const switchMode = () => {
        setMode(mode === "login" ? "register" : "login");
    };

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            if (mode === "register") {
                await registerUser({ name, email, password });
            } else {
                await loginUser({ email, password });
            }
        } catch (err) {
            console.log(err);
        }
    };

    const registerUser = () => {
        console.log(name,email,password)
        return axios
            .post("http://localhost:8000/api/auth/register", { name, email, password })
            .then((response) => {
                console.log(response);
                alert("Registration Successful!");
                switchMode();
            })
            .catch((error) => {
                throw error;
            });
    };

    const loginUser = () => {
        return axios
            .post("http://localhost:8000/api/auth/login", { email, password })
            .then((response) => {
                console.log(response);
                localStorage.setItem("jwtToken", response.data.accessToken);
                window.location.href = "/VendorTemplate";
            })
            .catch((error) => {
                throw error;
            });
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                
                <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-lg bg-white">
                    <h1 className="text-center text-2xl font-bold mb-6">{mode}</h1>
                    <form onSubmit={submitForm}>
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
                        <div className="flex flex-col md:flex-row justify-between">

                            <button onClick={mode == "login" ? loginUser : registerUser } 
                                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 transition duration-300 text-white rounded-md w-full mt-4"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                    <p className="text-xs text-center text-gray-500">
                        Dont Have an Account?{" "}
                        <span onClick={switchMode} className="underline cursor-pointer">
                            Sign Up
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;