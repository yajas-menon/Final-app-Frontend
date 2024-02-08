
import react, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Graphs from "../components/Graphs";
import Button from "../components/Button";
import Loader from "../components/Loader";



export default function Component() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const navigateToContacts = () => {
        // 👇️ navigate to /contacts
        navigate('/VendorList');
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 2500)
    }, [])

    return (
        <div>
            <Navbar />
            {loading ? (
                <Loader size={30} loading={loading} />
            ) : (


                <div className="bg-white px-8 py-4 mt-10">
                    <div className="flex justify-between items-center mx-6">
                        <div>
                            <h1 className="text-4xl font-bold">Your Dashboard</h1>
                            <p className="text-sm text-gray-500">Last update 10 Jan 2024</p>
                        </div>
                        <button onClick={navigateToContacts} className="bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-slate-950">Add request</button>
                    </div>
                    <hr className="divide-y divide-solid divide-inherit mt-8 " />
                    <div>

                        <Graphs />

                    </div>
                    <div className="mt-5">

                        <span className="text-2xl font-bold mx-10">Requests</span>
                    </div>
                    <div>
                        <div className="bg-white p-6 shadow rounded-lg">
                            <div className="flex flex-col space-y-4">
                                <div className="flex justify-between">
                                    <div className="flex space-x-2">
                                        <button className="rounded-full max-w-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white font-medium py-1 px-2">
                                            All
                                        </button>
                                    </div>
                                    <div className="relative w-full max-w-xs lg:max-w-md xl:max-w-lg">
                                        <input type="search" name="q" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-base leading-normal pl-10 pr-3 py-2 rounded-xl relative mb-4 mt-1 focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:z-10" placeholder="Search" />
                                    </div>
                                </div>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Request ID
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Raised For
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Compliance Request Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">1</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">RK Caterers</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex px-2 py-1 leading-5 rounded-md bg-green-100 text-green-800">
                                                    Verified & Completed
                                                </span>
                                            </td>
                                        </tr>
                                       
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">3</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">Sify Technologies</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex px-2 py-1 leading-5 rounded-md bg-gray-100 text-gray-800">
                                                    Submitted to Vendor
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">4</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">MyInfra Facilities</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex px-2 py-1 leading-5 rounded-md bg-gray-100 text-gray-800">
                                                    Draft
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <nav className="flex justify-between items-center" aria-label="Pagination">
                                    <p className="text-sm text-gray-700">Showing <span className="font-medium">1 to 4</span> of <span className="font-medium">31</span> results.</p>

                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
