import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const DonorBeneficiaryAdd = () => {
    const [loading, setloading] = useState(false);
    const [userID, setUserId] = useState('')
    //const [searchDonor, setSearchDonor] = useState('');
    const [beneficiaryDetails, setBeneficiaryDetails] = useState([]);
    const [donorDetails, setDonorDetails] = useState([]);

    const [beneficiaryCode, setBeneficiaryCode] = useState('');
    //const [donorCode, setDonorCode] = useState('');

    const [stuStatus, setStuStatus] = useState('');

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        donorCode: "",
        beneficiaryCode: "",

    })
    const [errors, setErrors] = useState({});

    //const canSubmit = (formData.studentcode && searchTutorStudentCode && stuStatus) ? true : false;

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
        fetch('https://nishkamapi.onrender.com/api/v1/fetchAllBeneficiaryDetails')
        //fetch('http://localhost:3000/api/v1/fetchAllBeneficiaryDetails')
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
        fetch('https://nishkamapi.onrender.com/api/v1/donorlist')
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
        //console.log("asasas=", selectedOption.value);
         setFormData((prevData) => ({
             ...prevData,
             beneficiaryCode: selectedOption.value,
         }));
     };

     const handleDonorChange = (selectedOption) => {
        //console.log("asasas=", selectedOption.value);
         setFormData((prevData) => ({
             ...prevData,
             donorCode: selectedOption.value,
             status: "Active",
         }));
     };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        console.log("formData=",formData);
        
        ///const response = await fetch("http://localhost:3000/api/v1/addDonorBeneficiaryData", {
        const response = await fetch("https://nishkamapi.onrender.com/api/v1/addDonorBeneficiaryData", {
                method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                UserId: userID,
                data: JSON.stringify(formData),
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
                                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                    <div className="sm:col-span-3">
                                            <label htmlFor="searchTutorStudentCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                Select Beneficiary
                                            </label>
                                            <Select
                                                options={beneficiaryDetails.map((beneficiary) => ({
                                                    value: beneficiary.StudentCode,
                                                    label: beneficiary.dd_label
                                                }))}
                                                className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''                                                   }`}
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
                                                className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''                                                   }`}
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
                                    //disabled={!canSubmit}
                                    //style={{ opacity: canSubmit ? 1 : 0.5 }}
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