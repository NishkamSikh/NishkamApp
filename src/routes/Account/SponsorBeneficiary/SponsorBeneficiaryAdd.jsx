import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';

const SponsorBeneficiaryAdd = () => {
    const [loading, setLoading] = useState(false);
    const [selectedStudentOptions, setSelectedStudentOptions] = useState([]);
    const [selectedDonorOptions, setSelectedDonorOptions] = useState([]);
    const [studentCode, setStudentCode] = useState([]);
    const [donorCode, setDonorCode] = useState([]);
    const [userID, setUserId] = useState('')
    const [donorStatusOptions, setDonorStatusOptions] = useState([]);
    const [formData, setFormData] = useState({
        studentCode: '',
        donorCode: '',
        donorStatus: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        const getUserid = localStorage.getItem("UserId")
        setUserId(getUserid)
        fetchData();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const fetchData = () => {
        fetchStudentCode();
        fetchDonorCode();
    };
    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Before Form submitted', typeof userID, typeof formData.donorStatus,formData);
        // Post request to the API endpoint with formData
        fetch('https://nishkamapi.onrender.com/api/v1/AddDonorBeneficiary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                BeneficiaryCode: formData.studentCode, 
                DonorCode: formData.donorCode, 
                isActive:formData.donorStatus,
                UserID:userID
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('Data successfully posted');
                console.log('After Form submitted', formData);
                setLoading(false);
                navigate('/');
                // Handle success scenario
            } else {
                console.error('Failed to post data');
                // Handle failure scenario
            }
        })
        .catch(error => {
            console.error('Error posting data:', error);
            // Handle error scenario
        });
    };
    const DonarStatus = [
                {
                    id: "0",
                    option: "Active",
                    value:1
                },
                {
                    id: "0",
                    option: "InActive",
                    value:0
                },
            ];

            const fetchStudentCode = () => {
                fetch('https://nishkamapi.onrender.com/api/v1/fetchAllStudentCode')
                    .then(response => response.json())
                    .then(data => {
                        console.log(data, "Data");
                        // Check if data is an array before setting studentCode
                        if (Array.isArray(data.data)) {
                            console.log(data.data, "Data");
                            setStudentCode(data.data);
                        } else {
                            console.error('Error: Data fetched is not an array');
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching Student data:', error);
                    });
            };

    const fetchDonorCode = () => {
        fetch('https://nishkamapi.onrender.com/api/v1/fetchAllDonorCode')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data.data)) {
                    console.log(data.data, "Data");
                    setDonorCode(data.data);
                } else {
                    console.error('Error: Data fetched is not an array');
                }
               
            })
            .catch(error => {
                console.error('Error fetching Donor data:', error);
            });
    };

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: 'black', // Change this to the desired color
        }),
    };
    const handleStudentChange = (selectedOptions) => {
        console.log("selectedOptions",selectedOptions);
        setSelectedStudentOptions(selectedOptions);
        setFormData({
            ...formData,
            studentCode: selectedOptions.value
        });
    };
    
    const handleDonorChange = (selectedOptions) => {
        setSelectedDonorOptions(selectedOptions);
        setFormData({
            ...formData,
            donorCode: selectedOptions.value
        });
    };
    
    const handleDonorStatusChange = (selectedOptions) => {
        setDonorStatusOptions(selectedOptions);
        setFormData({
            ...formData,
            donorStatus: selectedOptions.value
        });
    };

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-2">
            {loading ? (
                <div className="grid grid-cols-1 lg:grid-cols-1">
                    <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md text-center">
                            <div
                                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status"
                            >
                                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-0 flex flex-col">
                    <p className="text-center font-bold bg-blue-100 tracking-tight text-1lg">Add Sponsor Beneficiary</p>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-12">
                            <div className="border-b border-grey-900/10 pb-12">
                                <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="studentCode" className="block text-sm font-medium leading-6 text-grey-900">
                                            Student Code 
                                        </label>
                                        <Select
                                            options={studentCode.map(student => ({ value: student.StudentCode, label: student.StudentCode }))}
                                            id="studentCode"
                                            name="studentCode"
                                            className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            styles={customStyles}
                                            value={selectedStudentOptions}
                                            onChange={handleStudentChange}
                                        />
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="donorCode" className="block text-sm font-medium leading-6 text-grey-900">
                                            Donor Code
                                        </label>
                                        <Select
                                            options={donorCode.map(donor => ({ value: donor.DonorCode, label: donor.DonorCode }))}
                                            id="donorCode"
                                            name="donorCode"
                                            className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                           
                                            value={selectedDonorOptions}
                                            onChange={handleDonorChange}
                                        />
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="donorStatusOptions" className="block text-sm font-medium leading-6 text-grey-900">
                                            Status
                                        </label>
                                        <Select
                                            options={DonorStatus.map(status => ({ value: status.value, label: status.option }))}
                                            id="donorStatusOptions"
                                            name="donorStatusOptions"
                                            className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            isMulti={false}
                                            value={donorStatusOptions}
                                            onChange={handleDonorStatusChange}
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
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </section>
    );
};

export default SponsorBeneficiaryAdd;
