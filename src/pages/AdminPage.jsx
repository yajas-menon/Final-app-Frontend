import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AdminPage = () => {
  const navigate = useNavigate();
  const navigateToVendorForm = () => {
    // 👇️ navigate to /contacts
    navigate("/VendorForm");
  };
  const navigateToTemplateForm = () => {
    navigate("/TemplateForm");
  };
  const navigateToQuestionForm = () => {
    navigate("/QuestionForm");
  };
  return (
    <div>
      <Navbar />

      <div className="bg-white py-1 mt-10 mx-10">
        <div className="flex justify-between items-center mx-6">
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          </div>
          <div>
            <button
              onClick={navigateToVendorForm}
              className="bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-slate-950"
            >
              Create Vendor
            </button>
            <button
              onClick={navigateToTemplateForm}
              className="bg-slate-800 mx-3 text-white py-2 px-4 rounded-md hover:bg-slate-950"
            >
              Create Template
            </button>
            <button
              onClick={navigateToQuestionForm}
              className="bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-slate-950"
            >
              Create Questionaire
            </button>
          </div>
        </div>
        <hr className="divide-y divide-solid divide-inherit mt-4 " />
      </div>
    </div>
  );
};

export default AdminPage;
