import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useSearchParams } from 'react-router-dom'

const DonorBeneficiaryAdd = () => {
    const [loading, setloading] = useState(false);
    const [userID, setUserId] = useState('')
    const [beneficiaryDetails, setBeneficiaryDetails] = useState([]);
    const [donorDetails, setDonorDetails] = useState([]);
    const [errors, setErrors] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [donorBeneficiaryDetails, setDonorBeneficiaryDetails] = useState([]);


    //alert(JSON.parse(searchParams.get('Id')));
    //console.log("Id= ", JSON.parse(searchParams.get('Flag')));

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
        //setUserId(getUserid);
        fetchUserInfo();
        //fetchAllBeneficiaryDetails();
        //fetchAllDonors();
    }, []);


    const fetchUserInfo = async () => {
        setloading(true);
        try {
            //SELECT * FROM v_DonorBeneficiary WHERE Id = @Id
            const response = await fetch(`https://nishkamapi.onrender.com/api/v1/getSingleDonorBeneficiary/${searchParams.get('Id')}`);
//            const response = await fetch(`https://nishkamapi.onrender.com/api/v1/getSingleDonorBeneficiary/${searchParams.get('Id')}`);
            if (!response.ok) {
                if (response.status === 404) {
                    // Handle specific HTTP status codes
                    alert("User not found!");
                } else {
                    throw new Error(`Error fetching student details: ${response.statusText}`);
                }
            }
            const data = await response.json();
            console.log("Data:", data.data[0]);
           // console.log("Data2:", data.data[0].DonorCode);


           setDonorBeneficiaryDetails(data.data[0]);

           console.log('doeneficiaryDetails=',donorBeneficiaryDetails);
           //console.log(donorBeneficiaryDetails);
           //console.log(donorBeneficiaryDetails);
           //console.log(donorBeneficiaryDetails);



            if (data.data.length > 1) {

                //console.log(donorDetails,"new");
               // setfetchData(data.data[0]);
                //setFormData(data.data[0]);


                //setSearchDonorBenefCode({value:data.data[0].TutorId, label:data.data[0].DonorName})
                //setStuStatus(data.data[0].isActive ? "1" : "0");

   
                //setfetchData(data.data[0]);
               // setFormData(data.data[0]);
                // setfetchDataId(JSON.parse(data.data[0].Id));
            } else {
                //alert("No such user found!");
            }
        } catch (error) {
            console.error('Error fetching student details:', error);
        } finally {
            setloading(false);
        }
    };




    const fetchAllBeneficiaryDetails = () => {
        setloading(true);
        fetch('https://nishkamapi.onrender.com/api/v1/fetchAllBeneficiaryDetails')
            //fetch('https://nishkamapi.onrender.com/api/v1/fetchAllBeneficiaryDetails')
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
        console.log("formData=", formData);

        ///const response = await fetch("https://nishkamapi.onrender.com/api/v1/addDonorBeneficiaryData", {
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