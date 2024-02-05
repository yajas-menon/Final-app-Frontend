import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/apiConst";
import Loader from "../components/Loader";

const VendorComplianceTemplate = () => {
  const [requestID, setRequestID] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const locate = useLocation();
  const [loading , setLoading] =useState(false);

  const navigateToContacts = () => {
    // 👇️ navigate to /contacts
    navigate("/SecurityTemplate");
  };
  useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
        setLoading(false)
    },2500)
},[])

  // const navigateToDestination = async (requestId) => {
  //     navigate(`/SubmitForm/requestId/${requestId}`);
  // };

  const genID = (vendor_id, template_id) => {
    const rawUUID = uuidv4().replaceAll("-", ""); // Remove hyphens for simplicity
    let sum = 0;
    for (let i = 0; i < rawUUID.length; i++) {
      sum += parseInt(rawUUID[i], 16); // Convert hexadecimal characters to decimal integers
    }

    // Get the last two digits of the sum
    const finalSum = ((sum % 100) + 100) % 100;
    setRequestID(finalSum.toString());

    alert(`Your requestID has been generated: ${finalSum}`);

    let route = `/SubmitForm/requestId/${finalSum}`;
    navigate(route, {
      state: {
        vendor_id: vendor_id,
        template_id: template_id,
      },
    });
    // navigateToDestination(requestID);
  };

  const getData = async () => {
    const config = {
      url: `${BASE_URL}/api/auth/get/Template?vendor_id=${locate?.state?.vendor_id}`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Navbar />
      {loading ? (<Loader/>):(
        <div className="p-5 mx-10 mt-10 ">
        <h1 className="text-2xl font-bold mb-5">Templates</h1>
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left border-b whitespace-nowrap">
                Version
              </th>
              <th className="px-4 py-2 text-left border-b whitespace-nowrap">
                Status
              </th>
              <th className="px-4 py-2 text-left border-b whitespace-nowrap">
                Template Name
              </th>
              <th className="px-4 py-2 text-left border-b whitespace-nowrap">
                Created By
              </th>
              <th className="px-4 py-2 text-left border-b whitespace-nowrap">
                Created On
              </th>
              <th className="px-4 py-2 text-left border-b whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr key={index}>
                  <td
                    onClick={navigateToContacts}
                    className="px-4 py-2 text-left border-b whitespace-nowrap hover:cursor-pointer"
                  >
                    {item?.Version}
                  </td>
                  <td className="px-4 py-2 text-left border-b whitespace-nowrap">
                    <button
                      className={`${
                        item.Status === "Active" ? "bg-green-500" : "bg-red-500"
                      } ${
                        item.Status === "Active"
                          ? "hover:bg-green-600"
                          : "hover:bg-red-600"
                      } ${
                        item.Status === "Active" ? "text-white" : "text-white"
                      } ${
                        item.Status === "Active" ? "font-medium" : "font-medium"
                      } ${
                        item.Status === "Active"
                          ? "px-3 py-1.5 rounded-full"
                          : "px-3 py-1.5 rounded-full"
                      } focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-offset-gray-50 focus:ring-green-500`}
                    >
                      {item?.Status}
                    </button>
                  </td>
                  <td className="px-6 py-6 textleft border-b whitespace-nowwrap">
                    {item?.templatename}
                  </td>
                  <td className="px-4 py-2 text-left border-b whitespace-nowrap">
                    {item?.creator_name}
                  </td>
                  <td className="px-4 py-2 text-left border-b whitespace-nowrap">
                    {item?.createdon?.split("T")[0]}
                  </td>
                  <td className="px-4 py-2 border-b whitespace-nowrap">
                    <button
                      onClick={() => {
                        genID(item?.vendorid, item?._id);
                      }}
                      className="focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364C18.564 18.432 16.5 19 16.5 19a9 9 0 01-3.036-5.767m0-12A9 9 0 0116.5 4.5a9 9 0 01-3.036 5.767m0 0c1.657 0 3 1.007 3 2.25 0 1.657-1.007 3-3 3H15m-12 0v12l12-12"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      ) }
      
    </div>
  );
};

export default VendorComplianceTemplate;
