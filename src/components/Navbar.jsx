import react, { useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import loginSvg from "../assets/login-icon.svg"
import userIcon from "../assets/user-icon.svg";
import settingIcon from "../assets/settings-icon.svg";


const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen , setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(()=>{
    const handleOutsideClick = (e) =>{
      if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
        setIsOpen(false);
      }
    };

  document.addEventListener('mousedown',handleOutsideClick);
  return () =>{
    document.removeEventListener('mousedown',handleOutsideClick);
  }
},[]);
  
  const toggleDropdown = () =>{
    setIsOpen(!isOpen);
  }

  const navigateToContacts = () => {
    sessionStorage.clear();
    localStorage.clear();
    // 👇️ navigate to /contacts
    navigate("/");
  };

  const navigateToLogin = () =>{
    sessionStorage.clear();
    localStorage.clear();

    navigate("/")
  }

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
          className="px-3 py-1 mr-10  text-gray-800 hover:border-black hover:text-grey transition duration-200 ease-in"
        >
          {sessionStorage.getItem("jwtToken") ? (
            <div className="relative" ref={dropdownRef}>
              <img src={userIcon} alt="Dropdown" className="cursor-pointer h-6 w-6 inline" onClick={toggleDropdown}/>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                  <ul>
                    <li className="py-2 px-4 hover:bg-gray-100"><img src={settingIcon} alt="Setting-icon" className="h-4 w-4 mr-2 inline"/>Settings</li>
                    <li className="py-2 px-4 hover:bg-gray-100" onClick={navigateToContacts} ><img src={loginSvg} alt="Logout-icon" className="h-4 w-4 mr-2 inline"/> Logout</li>
                  </ul>
                </div>
              )

              }
            </div>
          ) : (
            <>
              Login{" "}
             <img onClick={navigateToLogin} src={loginSvg} alt="Login-icon" className="h-4 w-4 inline"/>
            </>
          )}
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
