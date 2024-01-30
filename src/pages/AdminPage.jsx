import React  from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Navbar from '../components/Navbar';


const AdminPage = () => {
    const navigate = useNavigate();
    const navigateToContacts = () => {
        // 👇️ navigate to /contacts
        navigate('/TemplateDetails');
      };
    return (
        <div>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center">
                <button onClick={navigateToContacts}className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Create Vendor
                </button>
            </div>
        </div>
    );
};

export default AdminPage;