import React from 'react';
import Navbar from '../components/Navbar';

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

function ChevronRightIcon(props) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
const VendorList = () =>{
    return (
        <><div>
        <Navbar />
        <div class=" py-8">
          <div class=" mx-auto px-4">
            <h1 class="text-3xl font-semibold mb-4 ml-10">Vendor</h1>
            <div class="flex justify-between items-center">
              <div class="flex w-20 max-w-lg ml-10">
                <input type="text" placeholder="Search Product" class="border border-gray-300 rounded p-2 focus:outline-none flex-grow" />
                <select name="" id="" class="border border-gray-300 rounded p-2 focus:outline-none ml-4">
                  <option class="" value="">Sort</option>
                </select>
                <div class="w-6 h-6 bg-blue-500 rounded"></div>
              </div>
              <div class="flex space-x-2 mr-10">
                <button class="p-2 rounded-md hover:bg-gray-200 active:bg-gray-300">Grid View</button>
                <button class="p-2 rounded-md hover:bg-gray-200 active:bg-gray-300">List View</button>
              </div>
            </div>
          </div>
        </div>
      </div><div className="flex items-center justify-center h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 py-6">
              <div className="flex flex-wrap -m-4">
                <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div className="border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                    <img
                      alt="content"
                      className="lg:h-48 md:h-36 w-full object-cover object-center"
                      height="192"
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "192/192",
                        objectFit: "cover",
                      }}
                      width="192" />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">Internet Services</h2>
                     <a href='/VendorComplianceTemplate'> <span className="title-font text-lg font-medium text-gray-900 mb-3">Sify Technologies</span></a>
                      <p className="leading-relaxed mb-3">Bengaluru</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div className="border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                    <img
                      alt="content"
                      className="lg:h-48 md:h-36 w-full object-cover object-center"
                      height="192"
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "192/192",
                        objectFit: "cover",
                      }}
                      width="192" />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">Food and Beverages</h2>
                      <span className="title-font text-lg font-medium text-gray-900 mb-3">RK Caterers</span>
                      <p className="leading-relaxed mb-3">Bengaluru</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div className="border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                    <img
                      alt="content"
                      className="lg:h-48 md:h-36 w-full object-cover object-center"
                      height="192"
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "192/192",
                        objectFit: "cover",
                      }}
                      width="192" />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">Hardware Solutions</h2>
                      <span className="title-font text-lg font-medium text-gray-900 mb-3">Techno Solution</span>
                      <p className="leading-relaxed mb-3">Bengaluru</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div className="border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                    <img
                      alt="content"
                      className="lg:h-48 md:h-36 w-full object-cover object-center"
                      height="192"
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "192/192",
                        objectFit: "cover",
                      }}
                      width="192" />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                        Facilities Management
                      </h2>
                      <span className="title-font text-lg font-medium text-gray-900 mb-3">MyInfra Facilities</span>
                      <p className="leading-relaxed mb-3">Bengaluru</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center space-x-2 mt-6">
              <button className="bg-gray-300 text-gray-800 rounded-full px-3 py-1.5" variant="ghost">
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button className="bg-gray-300 text-gray-800 rounded-full px-4 py-1.5" variant="ghost">
                1
              </button>
              <button className="bg-gray-300 text-gray-800 rounded-full px-4 py-1.5" variant="ghost">
                2
              </button>
              <button className="bg-gray-300 text-gray-800 rounded-full px-3 py-1.5" variant="ghost">
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div></>
)
}     

export default VendorList;