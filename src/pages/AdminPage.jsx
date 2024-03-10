import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/apiConst";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Graphs from "../components/Graphs";
import BarGraph from "../components/BarGraphs";
import LineC from "../components/LineC";

const AdminPage = () => {
  const [loading, setLoading] = useState(false);
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
  const navigateToReviewPage = () => {
    navigate("/ReviewPage");
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
      {loading ? (<Loader />) : (
        <div>
        <div>
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
                className="bg-slate-800 mx-3 text-white py-2 px-4 rounded-md hover:bg-slate-950"
              >
                Create Questionaire
              </button>
              
              <button
                onClick={navigateToReviewPage}
                className="bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-slate-950"
              >
                Vendor Response Page
              </button>
            </div>
          </div>
          <hr className="divide-y divide-solid divide-inherit mt-4 " />
        </div>
        </div>
        <div>
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
                  42
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
                  78
                  <span className="lowercase">%</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold font-lato">Responses Over Time</h2>
              <p className="text-sm font-nunito">
                Number of response given by vendors over the past 6 months
              </p>
              <BarGraph />
           </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold font-lato">Risk Distribution</h2>
              <p className="text-sm font-nunito">
                Distribution of vendors by risk category
              </p>
              <LineC />
              
            </div>
        </main>
        </div>
        
        </div>
        
      )}
    </div>
  );
};

export default AdminPage;
