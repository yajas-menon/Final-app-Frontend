import React , {useState , useEffect} from "react";
import axios from "axios";

import BarGraph from "../components/BarGraphs"
import LineC from "../components/LineC";
import Navbar from "../components/Navbar";


export default function Component() {
    const [data, setData] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [loading,setLoading] = useState(false);
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
        <Navbar/>
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1 p-4 flex flex-col gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <div className="flex flex-col md:flex-row  gap-4">
              <div className="grid gap-1.5">
                <h2 className="text-lg font-semibold">High-Risk Vendors</h2>
                <p className="text-sm">Number of vendors with high-risk assessments</p>
              </div>
              <button className="ml-auto md:ml-auto h-8 w-8 border border-gray-300 rounded-full flex items-center justify-center" title="View more">
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
            <div>
              42
              <span className="lowercase">%</span>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="grid gap-1.5">
                <h2 className="text-lg font-semibold">Completed Assessments</h2>
                <p className="text-sm">Percentage of vendors with completed assessments</p>
              </div>
              <button className="ml-auto md:ml-auto h-8 w-8 border border-gray-300 rounded-full flex items-center justify-center" title="View more">
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
            <div>
              78
              <span className="lowercase">%</span>
            </div>
          </Card>
        </div>
        <Card>
          <h2 className="text-lg font-semibold">Assessments Over Time</h2>
          <p className="text-sm">Number of assessments conducted over the past 6 months</p>
          <BarGraph/>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Risk Distribution</h2>
          <p className="text-sm">Distribution of vendors by risk category</p>
          <LineC/>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Vendor List</h2>
          <p className="text-sm">List of vendors with relevant information</p>
          <div>
          <div className=" p-6 shadow rounded-lg">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    <button className="h-8 w-20 rounded-full bg-black hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white font-medium py-1 px-2">
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
                  <thead >
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
                  <p className="text-sm text-black">
                    Showing <span className="font-medium">{data.length}</span>{" "}
                    of <span className="font-medium">{data?.length}</span>{" "}
                    results.
                  </p>
                </nav>
              </div>
            </div>
          </div>
        </Card>
      </main>
      <footer className="flex items-center justify-center gap-4 p-4 border-t">
        <nav className="flex items-center gap-4">
          {/* <Route href="#" passHref>
            <a className="text-sm font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">Privacy Policy</a>
            </Route>
            <Route href="#" passHref>
            <a className="text-sm font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">Terms of Service</a>
            </Route>
            <Route href="#" passHref>
            <a className="text-sm font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">Contact Us</a>
        </Route> */}
        </nav>
      </footer>
    </div>
        </div>
  );
}

function ChevronRightIcon(props) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function CurvedlineChart(props) {
  return (
    <div {...props}>
      {/* Chart Implementation */}
    </div>
  );
}

function LineChart(props) {
  return (
    <div {...props}>
      {/* Chart Implementation */}
    </div>
  );
}

function ShieldCheckIcon(props) {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function Card({ children }) {
  return <div className="bg-white rounded-lg shadow-md p-4">{children}</div>;
}