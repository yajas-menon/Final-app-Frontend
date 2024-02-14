import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { BASE_URL } from "../utils/apiConst";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import VendorImage from "../assets/VendorImage.jpg";

function ChevronLeftIcon(props) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

const VendorList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const navigateBack = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  const getData = async () => {
    const config = {
      url: `${BASE_URL}/api/auth/get/vendors`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const next = (id) => {
    navigate("/VendorComplianceTemplate", {
      state: {
        vendor_id: id,
      },
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div>
        <Navbar />
        {loading ? (
          <Loader />
        ) : (
          <div class=" py-8">
            <div class=" mx-auto px-4">
              <a
                className="text-blue-600 hover:underline flex items-center space-x-1"
                href="#"
              >
                <ChevronLeftIcon className="w-5 h-5" />
                <button
                  onClick={navigateBack}
                  type="button"
                  className="text-black"
                >
                  <span>Back</span>
                </button>
              </a>
              <hr className="divide-y divide-solid divide-inherit mt-4 mx-10 " />
              <h1 class="text-3xl font-semibold mb-4 mx-10 mt-5">Vendors</h1>
              <div class="flex justify-between items-center">
                <div className="flex  max-w-lg ml-10">
                  <input
                    type="text"
                    placeholder="Search Vendor..."
                    className="border max-w-md border-gray-300 rounded p-2 focus:outline-none flex-grow"
                  />
                  <select
                    name=""
                    id=""
                    className="border border-gray-300 max-w-lg rounded p-2 focus:outline-none ml-4 "
                  >
                    <option className="" value="">
                      Sort By
                    </option>
                    <option className="" value="asc">
                      Ascending
                    </option>
                    <option className="" value="desc">
                      Descending
                    </option>
                  </select>
                </div>
                <div class="flex space-x-2 mr-10">
                  <button class="p-2 rounded-md hover:bg-gray-200 active:bg-gray-300">
                    Grid View
                  </button>
                  <button class="p-2 rounded-md hover:bg-gray-200 active:bg-gray-300">
                    List View
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-row md:flex-row md:space-x-6 space-y-6 md:space-y-0 py-6">
            <div className="flex flex-wrap ">
              {data &&
                data?.map((item, key) => {
                  return (
                    <div
                      className="p-4 cursor-pointer"
                      onClick={() => {
                        next(item?._id);
                      }}
                    >
                      <div className="border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                        <img
                          alt="content"
                          className="lg:h-48 md:h-36 w-full object-cover object-center"
                          height="192"
                          src={VendorImage}
                          style={{
                            aspectRatio: "192/192",
                            objectFit: "cover",
                          }}
                          width="192"
                        />
                        <div className="p-6">
                          <a>
                            {" "}
                            <span className="title-font text-lg font-medium text-gray-900 mb-3">
                              {item?.vendorName}
                            </span>
                          </a>
                          <p className="leading-relaxed mb-3">
                            {item?.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorList;
