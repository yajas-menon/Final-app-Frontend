import React , {useState} from 'react';
import { button, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';


const HomePage = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    const navigate = useNavigate();
  const navigateToLoginPage = () => {
    // 👇️ navigate to /contacts
    navigate("/Login");
  };
  return (
    <div>
        <Navbar/>
        {loading ? (
        <Loader size={30} loading={loading} />
      ) : (
        <div>
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold mb-8 text-gray-800">Risk Compliance</h1>
      <p className="text-xl italic text-gray-700 mx-10">
        <span>Risk compliance refers to the process of ensuring that an organization's activities are carried out in compliance with applicable laws, regulations, and standards. </span></p>
      <p className='text-xl italic  mb-8 text-gray-700 mx-12'>  <span>This includes identifying and assessing risks, implementing controls to mitigate those risks, and monitoring and reporting on compliance.</span></p>
      
      <p className="text-xl mb-8  text-gray-700 mx-16">
        <span>GenAI is a powerful and easy-to-use platform that utilizes the latest in generative AI technology to help you stay compliant and make informed decisions.</span>
      </p>
      <div className="flex space-x-4">
        <button onClick={navigateToLoginPage} className="bg-orange-500 rounded-full hover:bg-amber-500 text-white font-bold py-2 px-4 rounded">
          Vendor Login
        </button>
        <button onClick={navigateToLoginPage}  className="bg-gray-600 rounded-full hover:bg-zinc-600 text-white font-bold py-2 px-4 rounded">
          Admin Login
        </button>
      </div>
    </div>
    </div>
    
      )}
      </div>
  );
};

export default HomePage;