import react from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const navigateToContacts = () => {
    sessionStorage.clear();
    localStorage.clear();
    // 👇️ navigate to /contacts
    navigate("/");
  };

  return (
    <div>
      <nav className="bg-white flex justify-between items-center px-4 py-4 shadow-md">
        <div>
          <a href="/dashboard">
            {" "}
            <span className="text-xl font-bold text-gray-800 ml-10">
              Risk Compliance Demo
            </span>
          </a>
        </div>
        <button
          onClick={navigateToContacts}
          className="px-3 py-1 mr-10  text-gray-800 hover:border-black hover:text-grey transition duration-200 ease-in"
        >
          {sessionStorage.getItem("jwtToken") ? (
            <>
              Logout{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 inline ml-1"
              >
                <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"></path>
                <path d="M5 15h14l-1.5-1.5L11 13 7 9z"></path>
              </svg>
            </>
          ) : (
            <>
              Login{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 inline ml-1"
              >
                <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"></path>
                <path d="M5 15h14l-1.5-1.5L11 13 7 9z"></path>
              </svg>
            </>
          )}
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
