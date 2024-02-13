import react, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Graphs from "../components/Graphs";
import Loader from "../components/Loader";
import axios from "axios";
import Chat from "../components/ChatBot";


export default function Component() {
  const [data, setData] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const navigateToContacts = () => {
    // 👇️ navigate to /contacts
    navigate("/VendorList");
  };

  const getData = async () => {
    const result = await axios
      .get("http://localhost:8000/api/auth/get/vendors")
      .catch((err) => {
        console.log(err);
      });
    setVendors(result.data);

    const config = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      url: `http://localhost:8000/api/auth/getRequests?user_id=${sessionStorage.getItem(
        "user_id"
      )}`,
    };

    await axios(config)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  return (
    <div>
    <Navbar style={{backgroundColor:"#2d3748"}}/>
      {loading ? (
        <Loader size={30} loading={loading} />
      ) : (
        
        
            
        <div className="bg-gradient-to-r from-gray-900 via-gray-900 to-slate-700 ">
          <div className="bg-gradient-to-r from-gray-900 via-gray-900 to-slate-700 text-white px-8 py-4 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold font-serif mb-4 mt-24 ">
              Risk Compliance : Using Generative AI
            </h1>
            <p className="text-lg mb-6 text-gray-500 font-medium">
             Enhance risk compliance with generate AI for 
             automated, adaptive risk assessment and mitigation 
             strategies
            </p>
            <button
              onClick={navigateToContacts}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md  inline-flex items-center"
            >
              Add Request
              <ArrowRightIcon className="ml-2" />
            </button>
          </div>
          
          <div>
            <Graphs />
          </div>
          <div className="mt-5">
            
          </div>
          <div>
            <div className="bg-gradient-to-r from-gray-900 via-gray-900 to-slate-700 p-6 shadow rounded-lg">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    <button className="h-8 w-20 rounded-full bg-white hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-black font-medium py-1 px-2">
                      All
                    </button>
                  </div>
                  <div className="relative w-full max-w-xs ">
                    <input
                      type="search"
                      name="q"
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-base leading-normal pl-10 pr-3 py-2 rounded-xl relative mb-4 mt-1 focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:z-10"
                      placeholder="Search"
                    />
                  </div>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-gray-900 via-gray-900 to-slate-700">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Request ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Raised For
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Compliance Request Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gradient-to-r from-gray-900 via-gray-900 to-slate-700 divide-y divide-gray-200">
                    {data &&
                      data?.map((item, key) => {
                        return (
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-white">
                                {item?.requestID}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-md text-white">
                                {
                                  vendors?.find((s) => s._id == item?.vendor_id)
                                    ?.vendorName
                                }
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 leading-5 rounded-md bg-green-100 text-green-800">
                                {item?.status == "PENDING"
                                  ? "PENDING"
                                  : item?.status == "APPROVED"
                                  ? "VERIFIED AND COMPLETED"
                                  : "REJECTED"}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <nav
                  className="flex justify-between items-center"
                  aria-label="Pagination"
                >
                  <p className="text-sm text-white">
                    Showing <span className="font-medium">{data.length}</span>{" "}
                    of <span className="font-medium">{data?.length}</span>{" "}
                    results.
                  </p>
                </nav>
              </div>
            </div>
          </div>
          <div>
            <Chat />
          </div>
        </div>
       
        
      )}
    </div>
  );
}

function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}


