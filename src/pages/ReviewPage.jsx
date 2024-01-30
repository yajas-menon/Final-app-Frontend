import React from 'react';

const ReviewPage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Question Review Page</h1>
            <div className="grid grid-cols-6 gap-4">
                <div className="col-span-3">
                    <p className="text-lg font-semibold mb-2">Question:</p>
                    <p className="mb-4 text-gray-700">What is the policy on expense reimbursement?</p>
                    <p className="text-lg font-semibold mb-2">Vendor Comments:</p>
                    <p className="mb-4 text-gray-700">The policy allows for timely reimbursement of approved expenses.</p>
                    <p className="text-lg font-semibold mb-2">Reviewer Comments:</p>
                    <input type="text" className="w-full border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="col-span-2">
                    <img src="/path/to/evidence_doc.jpg" alt="Evidence Doc Thumbnail" className="rounded-md w-full h-64 object-cover"/>
                </div>
                <div className="col-span-1 flex flex-col items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4">
                        Save
                    </button>
                    <div className="flex space-x-4 mt-4">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                            Approve
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                            Reject
                        </button>
                    </div>
                    <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full mt-4">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewPage;