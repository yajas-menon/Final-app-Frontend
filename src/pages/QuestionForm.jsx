import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/apiConst";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

function QuestionForm() {
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState([0]);
  const [vendor_id, setV_id] = useState("");
  const [template_id, setT_id] = useState("");
  const [vendor, setVendor] = useState([]);
  const [template, setTemplate] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(-1);
  }


  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const config = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const result = await axios
          .get(`${BASE_URL}/api/auth/get/Template`)
          .catch((err) => {
            console.log(err);
          });
        setTemplate(result.data);
        console.log(result.data);

        await axios({ ...config, url: `${BASE_URL}/api/auth/get/vendors` })
          .then((res) => {
            console.log(res);
            setVendor(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    fetchData();
  }, []);

  const handleInputChange = (index, value) => {
    const updatedData = [...questions];
    updatedData[index] = value;
    setQuestions(updatedData);
  };

  function addNewQuestionField() {
    let x = count[count.length - 1];
    let y = [...count];
    y.push(x++);
    setCount(y);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let arr = [];
    questions.forEach((item, index) => {
      let obj = {
        vendor_id: vendor_id,
        template_id: template_id,
        text: item,
      };
      arr.push(obj);
    });
    console.log(arr);
    // return;
    const config = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${BASE_URL}/api/auth/questions`,
      data: arr,
    };
    await axios(config)
      .then((res) => {
        alert("Questions are added , Thank You!");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="mx-10 my-10 display-flex align-items ">
           <a className="text-blue-600 hover:underline flex items-center space-x-1 mb-3">
            <ChevronLeftIcon className="w-5 h-5" />
            <button onClick={navigateBack} type="button" className="text-black">
              <span>Back</span>
            </button>
          </a>
          <h2 className="text-xl font-bold mb-2">Questions</h2>
          <p className="text-gray-600 mb-4">
            Please fill the Security Questions
          </p>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex-col ">
              <select
                id="vendor_id"
                name="templateId"
                className="bg-gray-50 max-w-xs border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={(e) => {
                  setV_id(e.target.value);
                }}
              >
                <option value="" selected disabled hidden>
                  Choose a Vendor Name...
                </option>
                {vendor.map((index) => (
                  <option key={index} value={index._id}>
                    {index.vendorName}
                  </option>
                ))}
              </select>
              <select
                id="template_id"
                name="templateId"
                className="bg-gray-50  max-w-xs my-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={(e) => {
                  setT_id(e.target.value);
                }}
              >
                <option value="" selected disabled hidden>
                  Choose a Template Name...
                </option>
                {template
                  ?.filter((s) => s.vendorid == vendor_id)
                  ?.map((index) => (
                    <option key={index} value={index._id}>
                      {index.templatename}
                    </option>
                  ))}
              </select>
            </div>
            {count.length > 0 &&
              count?.map((questionObj, index) => (
                <div key={index}>
                  <input
                    name="text"
                    value={questions[index] || ""}
                    onChange={(e) => {
                      handleInputChange(index, e.target.value);
                    }}
                    placeholder="Enter question..."
                    className="border rounded p-2 mb-4"
                    required
                  />
                </div>
              ))}
            <button
              onClick={addNewQuestionField}
              className="w-full bg-black text-white p-2 rounded-md"
            >
              Add question
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 w-full my-10 rounded-md "
            >
              Save all questions
            </button>
          </form>
        </div>
      )}
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

export default QuestionForm;
