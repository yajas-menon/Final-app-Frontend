import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const TemplateForm = () => {
  const [formData, setFormData] = useState({
    Version: "",
    Status: "ACTIVE",
    templatename: "",
    createdby: sessionStorage.getItem("user_id"),
    createdon: "",
    vendorid: "",
  });
  const [vendors, setVendors] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/save/template",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Template details submitted successfully");
        navigate("/QuestionForm");

        // You can perform additional actions here, such as redirecting or showing a success message.
      } else {
        alert("Failed to submit Template details");
        // Handle error cases
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="display-flex items-center mx-12 my-5">
        <div className="border border-gray-300 p-4 rounded-md">
          <h2 className="text-xl font-bold mb-2">Template</h2>
          <p className="text-gray-600 mb-4">
            Please fill in the details of the Template
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <select
              id="vendorid"
              name="templateId"
              className="bg-gray-50  max-w-xs my-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={handleInputChange}
            >
              <option value="" selected disabled hidden>
                Choose a Vendor Name...
              </option>
              {vendors?.map((index) => (
                <option key={index} value={index._id}>
                  {index.vendorName}
                </option>
              ))}
            </select>
            <div className="space-y-2">
              <label htmlFor="Version" className="block font-semibold text-sm">
                Version
              </label>
              <input
                type="text"
                id="Version"
                placeholder="Enter the version"
                className="w-full p-2 border border-gray-300 rounded-md"
                onChange={handleInputChange}
                value={formData.vendorName}
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="templatename"
                className="block font-semibold text-sm"
              >
                Template Name
              </label>
              <input
                type="text"
                id="templatename"
                placeholder="Enter Template Name"
                className="w-full p-2 border border-gray-300 rounded-md"
                onChange={handleInputChange}
                value={formData.onboardingdate}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="createdon"
                className="block font-semibold text-sm"
              >
                Created On
              </label>
              <input
                type="text"
                id="createdon"
                placeholder="Enter contact email"
                className="w-full p-2 border border-gray-300 rounded-md"
                onChange={handleInputChange}
                value={formData.contactEmail}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white p-2  rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TemplateForm;
