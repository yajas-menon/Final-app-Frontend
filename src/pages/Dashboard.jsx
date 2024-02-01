
import react from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Graphs from "../components/Graphs";
import Button from "../components/Button";


export default function Component() {
    const navigate = useNavigate();

    const navigateToContacts = () => {
        // 👇️ navigate to /contacts
        navigate('/VendorList');
    };

    return (
        <div>
            <Navbar />
            <div className="bg-white px-8 py-4 mt-10">
                <div className="flex justify-between items-center mx-6">
                    <div>
                        <h1 className="text-4xl font-bold">Your Dashboard</h1>
                        <p className="text-sm text-gray-500">Last update 10 Jan 2024</p>
                    </div>
                    <button onClick={navigateToContacts} className="bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-slate-950">Add request</button>
                </div>
                <hr className="divide-y divide-solid divide-inherit mt-36 " />
                <div>

                    <Graphs />

                </div>
                <div className="mt-5">

                    <span className="text-2xl font-bold mx-10">Requests</span>
                </div>
                <div>
               </div>
               </div>
               </div>
    )
}
