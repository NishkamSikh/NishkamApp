import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const DonorBeneficiaryAdd = () => {
    const [loading, setloading] = useState(false);
    const [userID, setUserId] = useState('')
    const [beneficiaryDetails, setBeneficiaryDetails] = useState([]);
    const [donorDetails, setDonorDetails] = useState([]);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        donorCode: "",
        beneficiaryCode: "",
    })

    const canSubmit = (formData.donorCode && formData.beneficiaryCode) ? true : false;

    useEffect(() => {
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        const getUserid = localStorage.getItem("UserId")
        setUserId(getUserid);
        fetchAllBeneficiaryDetails();
        fetchAllDonors();
    }, []);


    const fetchAllBeneficiaryDetails = () => {
        setloading(true);
        fetch('https://sikligarapi-fpe3b0bjfhgsadg5.centralindia-01.azurewebsites.net/api/v1/fetchAllBeneficiaryDetails')
            //fetch('https://sikligarapi-fpe3b0bjfhgsadg5.centralindia-01.azurewebsites.net/api/v1/fetchAllBeneficiaryDetails')
            .then(response => response.json())
            .then(data => {
                //console.log(data, "data.data");
                setBeneficiaryDetails(data.data);
                //console.log("beneficiaryDetails", beneficiaryDetails)
                setloading(false);
            })
            .catch(error => {
                console.error('Error fetching student details:', error);
                setloading(false);
            });
    };

    const fetchAllDonors = () => {
        setloading(true);
        fetch('https://sikligarapi-fpe3b0bjfhgsadg5.centralindia-01.azurewebsites.net/api/v1/donorlist')
            .then(response => response.json())
            .then(data => {
                //console.log(data.data, "Donor data");
                setDonorDetails(data.data);
                setloading(false);
                //console.log("donorDetails=", donorDetails)                

            })
            .catch(error => {
                console.error('Error fetching student details:', error);
                setloading(false);
            });
    };

    const handleBeneficiaryChange = (selectedOption) => {

        setFormData((prevData) => ({
            ...prevData,
            beneficiaryCode: selectedOption.value,
        }));
    };

    const handleDonorChange = (selectedOption) => {
        setFormData((prevData) => ({
            ...prevData,
            donorCode: selectedOption.value,
            status: "Active",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        //const response = await fetch("https://sikligarapi-fpe3b0bjfhgsadg5.centralindia-01.azurewebsites.net/api/v1/addDonorBeneficiaryData", {
        const response = await fetch("https://sikligarapi-fpe3b0bjfhgsadg5.centralindia-01.azurewebsites.net/api/v1/addDonorBeneficiaryData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userID,
                donorCode: formData.donorCode,
                beneficiaryCode: formData.beneficiaryCode,
                status: formData.status
            }),
        });

        if (!response.ok) {
            console.error("Error:", response.statusText);
            return;
        }

        setloading(false);
        navigate('/');
    }

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-0">
            {
                loading
                    ?
                    <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                        <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-4 h-10 w-10"></div>
                    </div>
                    :
                    <div className="mt-0 flex flex-col">
                        <p className="font-bold text-gray-900 tracking-tight text-1xl">
                            Add - Donor Beneficiary Data
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="searchTutorStudentCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                Select Beneficiary
                                            </label>
                                            <Select
                                                options={beneficiaryDetails.map((beneficiary) => ({
                                                    value: beneficiary.StudentCode,
                                                    label: beneficiary.dd_label
                                                }))}
                                                className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''}`}
                                                onChange={handleBeneficiaryChange}
                                            />
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="searchTutorStudentCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                Select Donor
                                            </label>
                                            <Select
                                                options={donorDetails.map((donor) => ({
                                                    value: donor.DonorCode,
                                                    label: donor.DonorCode + '/' + donor.FirstName
                                                }))}
                                                className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''}`}
                                                onChange={handleDonorChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 flex items-center justify-end gap-x-6">
                                <button type="button" onClick={() => navigate("/")} className="text-sm font-semibold leading-6 text-grey-900">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!canSubmit}
                                    style={{ opacity: canSubmit ? 1 : 0.5 }}
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
            }
        </section>
    )
}

export default DonorBeneficiaryAdd