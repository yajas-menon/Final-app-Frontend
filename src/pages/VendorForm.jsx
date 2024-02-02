import React, { useState ,useEffect } from 'react';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';

const VendorForm = () => {
    const [formData, setFormData] = useState({
        vendorName: '',
        incorporationdate: '',
        onboardingdate: '',
        contactName: '',
        contactEmail: '',
        address: '',
    });
    const [loading , setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true);
        setTimeout(()=>{
            setLoading(false)
        },2500)
    },[])

    // const imagebase64 = async (file)=>{
    //     const reader = new FileReader();
    //    await  reader.readAsDataURL(file)
    //     const data = new Promise((resolve,reject)=>{
    //         reader.onload = () => resolve(reader.result)
    //         reader.onerror = (err)=> reject(err)
    //     })
    //     return data 
    // }


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    // const handleImageUpload = async(e) =>{
    //     const file = e.target.files[0];
    //     const image = await imagebase64(file)
    //     setFormData(image)
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/auth/save/vendors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Vendor details submitted successfully');
                setFormData({
                    vendorName: '',
                    incorporationdate: '',
                    onboardingdate: '',
                    contactName: '',
                    contactEmail: '',
                    address: '',
                    logoImage:'',
                     
                });
                
                // You can perform additional actions here, such as redirecting or showing a success message.
            } else {
                alert('Failed to submit vendor details');
                // Handle error cases
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Navbar />
            {loading ? (<Loader/>):(
                <div className="display-flex items-center mx-12 my-5">
                <div className="border border-gray-300 p-4 rounded-md">
                    <h2 className="text-xl font-bold mb-2">Vendor Details</h2>
                    <p className="text-gray-600 mb-4">Please fill in the details of the vendor.</p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label htmlFor="vendorName" className="block font-semibold text-sm">
                                Vendor name
                            </label>
                            <input
                                type="text"
                                id="vendorName"
                                placeholder="Enter vendor name"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                onChange={handleInputChange}
                                value={formData.vendorName}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="incorporationDate" className="block font-semibold text-sm">
                                Inc Date
                            </label>
                            <input
                                type="text"
                                id="incorporationdate"
                                placeholder="Enter inc date"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                onChange={handleInputChange}
                                value={formData.incorporationdate}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="onboardingDate" className="block font-semibold text-sm">
                                Onboarding Date
                            </label>
                            <input
                                type="text"
                                id="onboardingdate"
                                placeholder="Enter onboarding date"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                onChange={handleInputChange}
                                value={formData.onboardingdate}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="contactName" className="block font-semibold text-sm">
                                Contact Name
                            </label>
                            <input
                                type="text"
                                id="contactName"
                                placeholder="Enter contact name"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                onChange={handleInputChange}
                                value={formData.contactName}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="contactEmail" className="block font-semibold text-sm">
                                Contact email
                            </label>
                            <input
                                type="text"
                                id="contactEmail"
                                placeholder="Enter contact email"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                onChange={handleInputChange}
                                value={formData.contactEmail}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="address" className="block font-semibold text-sm">
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                placeholder="Enter address"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                onChange={handleInputChange}
                                value={formData.address}
                                required
                            />
                        </div>
                        
                        


                        <button type="submit" className="w-full bg-black text-white p-2 rounded-md">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            )}
            
        </div>
    );
}

export default VendorForm;