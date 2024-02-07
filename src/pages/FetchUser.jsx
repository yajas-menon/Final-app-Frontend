import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { BASE_URL } from '../utils/apiConst';

function FetchUser() {
  const [formData, setFormData] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/api/auth/find/Users`);
      setUsers(result.data);
    } catch (error) {
      console.error('Error Fetching data: ', error);
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div>
      <Navbar />
      <div className='mx-10 my-5'>
        <select
          id="vendorname"
          name="templatename"
          className="bg-gray-50  max-w-xs my-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onChange={handleInputChange}
        >
          <option value="" selected disabled hidden>Choose a UserName....</option>
          {users.map((user, index) => (
            <option key={index}>
              <td>{user.name}</td>
            </option>
          ))}
        </select>
        {/* Rest of your table rendering code goes here */}
      </div>
    </div>
  );
}

export default FetchUser;