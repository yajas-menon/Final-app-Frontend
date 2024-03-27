import react, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import axios from "axios";
import Chat from "../components/ChatBot";
import BarGraph from "../components/BarGraphs";
import LineC from "../components/LineC";

export default function Component() {
  const [data, setData] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [dashboard, setDashboard] = useState([]);

  const navigate = useNavigate();

  const navigateToVendorList = () => {
    // 👇️ navigate to /VendorList
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

    const config1 = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      url: `http://localhost:8000/api/auth/dashboardApi`,
    };

    await axios(config1)
      .then((res) => {
        console.log(res.data.data);
        setDashboard(res.data.data);
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
      <Navbar />
      {loading ? (
        <Loader size={30} loading={loading} />
      ) : (
        <div>
          <div className="mt-5 mr-12 text-right ">
            <button
              type="button"
              onClick={navigateToVendorList}
              class="  h-10  rounded-full text-white bg-slate-600 hover:bg-black focus:ring-4 focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-black dark:hover:bg-black focus:outline-none dark:focus:ring-black"
            >
              Add Request
            </button>
          </div>
          <div className="flex flex-col min-h-screen mx-10 my-5">
            <main className="flex-1 p-4 flex flex-col gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-white rounded-lg shadow-md p-4 ">
                  <div className="flex flex-col md:flex-row  gap-4">
                    <div className="grid gap-1.5">
                      <h2 className="text-xl font-bold font-nunito italic ">
                        High-Risk Vendors
                      </h2>
                      <p className="text-sm font-nunito">
                        Number of vendors with high-risk assessments
                      </p>
                    </div>
                  </div>
                  <div className="font-bold font-mono">
                    {dashboard?.risk_percent}
                    <span className="lowercase">%</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="grid gap-1.5">
                      <h2 className="text-xl font-bold font-nunito italic ">
                        Completed Assessments
                      </h2>
                      <p className="text-sm font-nunito">
                        Percentage of vendors with completed assessments
                      </p>
                    </div>
                  </div>
                  <div className="font-bold font-mono">
                    {dashboard?.approved_percent}
                    <span className="lowercase">%</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-semibold font-lato">
                  Responses Over Time
                </h2>
                <p className="text-sm font-nunito">
                  Number of response given by vendors over the past 6 months
                </p>
                <BarGraph
                  months={dashboard?.months}
                  monthsData={dashboard?.monthCount}
                />
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-semibold font-lato">
                  Risk Distribution
                </h2>
                <p className="text-sm font-nunito">
                  Distribution of vendors by risk category
                </p>
                <LineC />
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-semibold font-lato">Vendor List</h2>
                <p className="text-sm font-nunito">
                  List of vendors with relevant information
                </p>
                <div>
                  <div className=" p-6 shadow rounded-lg">
                    <div className="flex flex-col space-y-4">
                      <div className="flex justify-between">
                        <div className="flex space-x-2">
                          <button className="h-8 w-20 rounded-full bg-slate-600 hover:bg-black active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white font-medium py-1 px-2">
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
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                            >
                              Request ID
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                            >
                              Raised For
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                            >
                              Compliance Request Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {data &&
                            data?.map((item, key) => {
                              return (
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-black">
                                      {item?.requestID}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-md text-black">
                                      {
                                        vendors?.find(
                                          (s) => s._id == item?.vendor_id
                                        )?.vendorName
                                      }
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex px-2 py-1 leading-5 italic font-nunito rounded-md bg-green-100 text-green-800">
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
                        <p className="text-sm text-black">
                          Showing{" "}
                          <span className="font-medium">{data.length}</span> of{" "}
                          <span className="font-medium">{data?.length}</span>{" "}
                          results.
                        </p>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <div>
              <Chat />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
