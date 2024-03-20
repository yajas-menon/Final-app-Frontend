import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

export default function Template() {
  const [questions, setQuestions] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const locate = useLocation();
  const navigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(
          `http://localhost:8000/api/auth/get/questions?template_id=${locate?.state?.template_id}&vendor_id=${locate?.state?.vendor_id}`
        );
        setQuestions(result.data);

        const result1 = await axios.get(
          `http://localhost:8000/api/auth/get/vendors?id=${locate?.state?.vendor_id}`
        );
        setVendors(result1.data);
        console.log(result1);
      } catch (error) {
        console.error("Error fetching questions: ", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="transition-shadow">
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <main className=" mx-10 my-10">
          <a
            className="text-blue-600 hover:underline flex items-center space-x-1"
            href=""
          >
            <ChevronLeftIcon className="w-5 h-5" />
            <button onClick={navigateBack} type="button" className="text-black">
              <span>Back</span>
            </button>
          </a>
          <div className="mt-4">
            <details className="border-t border-b" open>
              <summary className="flex justify-between items-center p-4 cursor-pointer">
                <span className="text-lg font-medium">Vendor Details</span>
                <ChevronDownIcon className="w-5 h-5" />
              </summary>
              <div className="p-4">
                <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
                  <h2 className="text-2xl font-semibold mb-4">
                    Vendor Details
                  </h2>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">Vendor Name</span>
                        <ClipboardIcon className="h-4 w-4" />
                      </div>
                      <p className="mb-4">{vendors[0]?.vendorName}</p>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">Template Version</span>
                        <FileIcon className="h-4 w-4" />
                      </div>
                      <p>{locate?.state?.template_details?.Version}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">Inc Date</span>
                        <CalendarIcon className="h-4 w-4" />
                      </div>
                      <p className="mb-4">
                        {vendors[0]?.incorporationdate?.split("T")[0]}
                      </p>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">Contact Name</span>
                        <PersonStandingIcon className="h-4 w-4" />
                      </div>
                      <p>{vendors[0]?.contactName}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">Onboarding Date</span>
                        <CalendarIcon className="h-4 w-4" />
                      </div>
                      <p className="mb-4">
                        {vendors[0]?.onboardingdate?.split("T")[0]}
                      </p>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">Contact Email</span>
                        <MailboxIcon className="h-4 w-4" />
                      </div>
                      <p> {vendors[0]?.contactEmail}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium">Template Name</span>
                      <FileIcon className="h-4 w-4" />
                    </div>
                    <p>{locate?.state?.template_details?.templatename}</p>
                  </div>
                </div>
              </div>
            </details>
            <details className="border-t border-b">
              <summary className="flex justify-between items-center p-4 cursor-pointer">
                <span className="text-lg font-medium">Questions</span>
                <ChevronDownIcon className="w-5 h-5" />
              </summary>
              <div className="p-4 space-y-4">
                {questions?.map((question, index) => {
                  return (
                    <div key={index} className=" border-t pt-4">
                      <p>{question.text}</p>
                    </div>
                  );
                })}
              </div>
            </details>
          </div>
        </main>
      )}
    </div>
  );
}

function ChevronDownIcon(props) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
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

function CalendarIcon(props) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function ClipboardIcon(props) {
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
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

function FileIcon(props) {
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
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function MailboxIcon(props) {
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
      <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" />
      <polyline points="15,9 18,9 18,11" />
      <path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0" />
      <line x1="6" x2="7" y1="10" y2="10" />
    </svg>
  );
}

function PersonStandingIcon(props) {
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
      <circle cx="12" cy="5" r="1" />
      <path d="m9 20 3-6 3 6" />
      <path d="m6 8 6 2 6-2" />
      <path d="M12 10v4" />
    </svg>
  );
}


