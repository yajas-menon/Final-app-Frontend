import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { BASE_URL } from "../utils/apiConst";
import Loader from "../components/Loader";

function ReviewPage() {
  const [vendors, setVendors] = useState([]);
  const [formData, setFormData] = useState();
  const [template, setTemplate] = useState([]);
  const [questions, setNewQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios
          .get("http://localhost:8000/api/auth/get/vendors")
          .catch((err) => {
            console.log(err);
          });
        setVendors(result.data);

        const result1 = await axios
          .get("http://localhost:8000/api/auth/get/Template")
          .catch((err) => {
            console.log(err);
          });

        setTemplate(result1.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData?.vendor_id || !formData?.template_id) {
      return alert("Please Select Vendors and Templates");
    }
    const config = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      url: `http://localhost:8000/api/auth/getuserstemplateWise?vendor_id=${formData?.vendor_id}&template_id=${formData?.template_id}`,
    };

    await axios(config)
      .then((res) => {
        console.log(res.data.data);
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    const result3 = await axios
      .get(
        `http://localhost:8000/api/auth/get/questions?vendor_id=${formData?.vendor_id}&template_id=${formData?.template_id}`
      )
      .catch((err) => {
        console.log(err);
      });
    setNewQuestions(result3.data);
    await getRequests();
  };

  const getRequests = async () => {
    const result2 = await axios
      .get(
        `http://localhost:8000/api/auth/getRequests?vendor_id=${formData?.vendor_id}&template_id=${formData?.template_id}&status=PENDING`
      )
      .catch((err) => {
        console.log(err);
      });
    console.log(result2.data);
    setRequests(result2.data.data);
  };

  const handleEdit = async (status) => {
    const config = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: `http://localhost:8000/api/auth/updateRequests`,
      data: {
        data: requests,
        status: status,
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res);
        alert("Successfully Updated Details");
        getRequests();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function showDocument(_base64Str, _contentType) {
    var byte = atob(_base64Str);
    var blob = new Blob(
      [new Uint8Array([...byte].map((char) => char.charCodeAt(0)))],
      { type: _contentType }
    );
    window.open(URL.createObjectURL(blob), "_blank");
  }

  return (
    <div>
      <Navbar />

      <div className="mx-10 my-5">
        <a className="text-blue-600 hover:underline flex items-center space-x-1 mb-3">
          <ChevronLeftIcon className="w-5 h-5" />
          <button onClick={navigateBack} type="button" className="text-black">
            <span>Back</span>
          </button>
        </a>
        <div className="flex">
          <select
            id="vendor_id"
            className="bg-gray-50  max-w-xs my-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={handleInputChange}
          >
            <option value="" selected disabled hidden>
              Choose a UserName....
            </option>
            {vendors?.map((index, key) => (
              <option value={index?._id}>
                <td>{index.vendorName}</td>
              </option>
            ))}
          </select>
          <select
            id="template_id"
            className="bg-gray-50  max-w-xs mx-3 my-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={handleInputChange}
          >
            <option value="" selected disabled hidden>
              Choose Template
            </option>
            {template
              ?.filter((s) => s.vendorid == formData?.vendor_id)
              ?.map((index, key) => (
                <option value={index?._id}>
                  <td>{index.templatename}</td>
                </option>
              ))}
          </select>

          <button
            type="button"
            onClick={handleSubmit}
            class="mt-10 h-10 rounded-full text-white bg-black hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider  break-words word-wrap"
              >
                Questions
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Documents
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Template Name
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Submitted By
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Answers
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {user &&
              user?.map((item, key) => {
                return (
                  <tr>
                    <td className="px-6 py-4 whitespace-normal break-words word-wrap">
                      {questions?.find((s) => s._id == item?.Question)?.text}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words word-wrap">
                      <a
                        onClick={() => {
                          const semicolonIndex = item?.EvidenceBinary.indexOf(
                            ";"
                          );
                          const semicolonIndex1 = item?.EvidenceBinary.indexOf(
                            ","
                          );
                          const result = item?.EvidenceBinary.slice(
                            5,
                            semicolonIndex
                          );
                          showDocument(
                            item?.EvidenceBinary.slice(
                              semicolonIndex1 + 1,
                              item?.EvidenceBinary?.length
                            ),
                            result
                          );
                        }}
                      >
                        View
                      </a>{" "}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words words-wrap">
                      {
                        template?.find((s) => s._id == item?.template_id)
                          ?.templatename
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words words-wrap">
                      {item?.userName}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words words-wrap">
                      {item?.answer}
                    </td>
                  </tr>
                );
              })}
            {/* Additional rows */}
          </tbody>
        </table>
        {user?.length > 0 &&
        requests?.filter((s) => s.status == "PENDING")?.length > 0 ? (
          <div className="flex justify-center inline my-10">
            <button
              type="button"
              onClick={() => {
                handleEdit("APPROVED");
              }}
              class="rounded-full text-white bg-black hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Accept
            </button>
            <button
              onClick={() => {
                handleEdit("DECLINED");
              }}
              className="bg-white h-10 flex hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              Reject
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
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

export default ReviewPage;
