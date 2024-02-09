import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { BASE_URL } from '../utils/apiConst';

function ReviewPage() {
    const [vendors, setVendors] = useState([]);
    const [formData, setFormData] = useState();
    // const [user, setUsers] = useState([]);


    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(
                    "http://localhost:8000/api/auth/get/vendors"
                );
                setVendors(result.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
        fetchData();
    }, []);

    // useEffect(() => {
    //     fetchUsers();
    // }, []);

    // const fetchUsers = async () => {
    //     try {
    //         const result = await axios.get("http://localhost:8000/api/auth/find/Users");
    //         setUsers(result.data);
    //         // console.log(result.data);
    //     } catch (error) {
    //         console.error("Error Fetching data: ", error);
    //     }
    // }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    return (



        <div>
            <Navbar />
            <div className='mx-10 my-5'>
                <select
                    id="vendorname"
                    name="templatename"
                    className="bg-gray-50  max-w-xs my-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={handleInputChange}
                >
                    <option value="" selected disabled hidden>
                        Choose a UserName....
                    </option>
                    {vendors?.map((index) => (
                        <option key={index}>
                            <td>{index.vendorName}</td>
                        </option>
                    ))}
                </select>
                <table className="min-w-full divide-y divide-gray-200 ">
                    <thead>
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Questions</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Answers</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">What is your name?</td>
                            <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                            <td className="px-6 py-4 whitespace-nowrap">Document 1</td>
                            <td className="px-6 py-4 whitespace-nowrap">Vendor 1</td>
                            <td className="px-6 py-4 whitespace-nowrap flex gap-2">


                            </td>
                        </tr>
                        {/* Additional rows */}
                    </tbody>
                </table>
                {/* <div className='flex justify-center mt-5 '>

                    <button className="bg-black h-10 whitespace-nowrap rounded-lg hover:bg-black text-white font-bold py-2 px-4 inline mx-5">Approve</button>
                    <button className="bg-white h-10 flex hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow inline">Reject</button>

                </div> */}
                    <button type="button" class=" rounded-full mt-10 text-white bg-black hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
            </div>
        </div>
    );
}

export default ReviewPage;