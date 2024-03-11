import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Form from '../../components/Form'
import BankDetails from '../../components/BankDetails'
import { useSearchParams } from 'react-router-dom'
import Select from 'react-select';

const TutorEdit = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [loading, setloading] = useState(false);

    const [sechoolData, setschoolData] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [fetchData, setfetchData] = useState({ data: { data: [] } });
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedTehsil, setSelectedTehsil] = useState('');
    const [selectedAddress, setselectedAddress] = useState('');
    const [selectedPincode, setSelectedpincode] = useState('');
    const [selectedVillage, setSelectedVillage] = useState('');
    const [AccountName, setAccountName] = useState('');
    const [IFSCcode, setIFSCcode] = useState('');
    const [AccountNumber, setAccountNumber] = useState('');
    const [Bankselect, setBankselect] = useState('');

    const [selectedBasti, setSelectedBasti] = useState('');
    const [options, setOptions] = useState([]);
    const [formError, setFormError] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedSubjectOptions, setSelectedSubjectOptions] = useState([]);
    const [formData, setFormData] = useState({
        TutorName: '',
        Basti: '',
        Email: '',
        PhoneNumber: '',
        Class: '',
        Subject: '',
        MonthlyFee: '',
    });


    const handleStateChange = (value) => {
        setSelectedState(value);
    };

    const handleDistrictChange = (value) => {
        setSelectedDistrict(value);
    };

    const handleTehsilChange = (value) => {
        setSelectedTehsil(value);
    };
    const handleBankChange = (value) => {
        setBankselect(value);
    };
    const handleAddressChange = (value) => {
        console.log(value, "Address value");
        setselectedAddress(value);

    };
    const handlePinCodeChange = (value) => {
        setSelectedpincode(value);

    };
    const handleVillageChange = (value) => {
        setSelectedVillage(value);

    };
    const handleAccountNameChange = (value) => {
        setAccountName(value);

    };
    const handleIFSCcode = (value) => {
        setIFSCcode(value);

    };
    const handleAccountNumberChange = (value) => {
        setAccountNumber(value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
    };

    const uniqueschoollist = [
        ...new Set(sechoolData.map((item) => item.type)),
    ];

    useEffect(() => {
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        fetchUserInfo()
        fetchBastiData()
        setloading(true)
        setTimeout(() => {
            setloading(false)

        }, 1000)


    }, [])
    const navigate = useNavigate();

    const fetchBastiData = () => {
        fetch('http://localhost:3000/api/v1/bastilist')
            .then(response => response.json())
            .then(data => {
                // Assuming the API response contains basti name, state, and city
                const bastiData = data;
                // Parse the json string within the data object and setOptions
                const parsedData = bastiData.data.map(item => JSON.parse(item.Json));
                setOptions(parsedData);
                if (parsedData.length > 0) {
                    // Assuming the API response contains basti name, state, and city
                    const { basti_name, State, District, Tehsil } = parsedData[0];

                    setSelectedBasti(basti_name);

                }

            })
            .catch(error => {
                console.error('Error fetching basti data:', error);
            });
    };

    const studentDetails = [
        {
            id: "1",
            option: "MBA (Masters in Business Administration)",
        },
        {
            id: "2",
            option: "Certification in Finance and Accounting (CFA)",
        },
        {
            id: "3",
            option: "PGD in Hotel Management",
        },
        {
            id: "3",
            option: "PG Diploma in Digital Marketing or Business Analytics Courses",
        },
    ];
    const subjectDetails = [
        {
            id: "1",
            option: "English",
        },
        {
            id: "2",
            option: "Science",
        },
        {
            id: "3",
            option: "Hindi",
        },
        {
            id: "3",
            option: "Punjabi",
        },
    ];


    const handleSubmit1 = async (e) => {

        e.preventDefault();

        console.log(formData, "formData ===");

    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        console.log(formData, "======")

        //Proceed with the second API call 
        const response = await fetch(`http://localhost:3000/api/v1/updateMasterData/${JSON.parse(searchParams.get('id'))}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({

                data: JSON.stringify(
                    {
                        ...formData,
                        State: selectedState,
                        District: selectedDistrict,
                        Tehsil: selectedTehsil,
                        Address: selectedAddress,
                        Pincode: selectedPincode,
                        Village: selectedVillage,
                        BankName: Bankselect,
                        AccountName: AccountName,
                        IFSCCode: IFSCcode,
                        AccountNumber: AccountNumber,
                    }
                ),
            }),
        });
        console.log(formData, "After ======")

        if (!response.ok) {
            console.error("Error:", response.statusText);
            return;
        }

        setloading(false);
        navigate('/TutorList');
    };


    const fetchUserInfo = async () => {
        console.log(typeof searchParams.get('id'), 'fetch');
        setloading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/v1/MastergetFetchData/${JSON.parse(searchParams.get('id'))}`);
            if (!response.ok) {
                if (response.status === 404) {
                    // Handle specific HTTP status codes
                    alert("User not found!");
                } else {
                    throw new Error(`Error fetching student details: ${response.statusText}`);
                }
            }

            const data = await response.json();

            // Initialize fetchData with the expected structure
            // console.log(JSON.parse(data.data.data[0].Json).Address, "Data ============")
            if (data.data.data.length > 0) {
                setfetchData(data.data.data[0]);
                console.log(data.data, "Jsadhsd ");

                setSelectedState(JSON.parse(data.data.data[0].Json).State);
                setSelectedVillage(JSON.parse(data.data.data[0].Json).Village);
                setSelectedDistrict(JSON.parse(data.data.data[0].Json).District);
                setSelectedTehsil(JSON.parse(data.data.data[0].Json).Tehsil);
                setselectedAddress(JSON.parse(data.data.data[0].Json).Address);
                setSelectedpincode(JSON.parse(data.data.data[0].Json).Pincode);
                setAccountName(JSON.parse(data.data.data[0].Json).AccountName);
                setIFSCcode(JSON.parse(data.data.data[0].Json).IFSCCode);
                setAccountNumber(JSON.parse(data.data.data[0].Json).AccountNumber);
                setBankselect(JSON.parse(data.data.data[0].Json).BankName);
                setSelectedOptions(JSON.parse(data.data.data[0].Json).Class);
                setSelectedSubjectOptions(JSON.parse(data.data.data[0].Json).Subject);

                setFormData(JSON.parse(data.data.data[0].Json));


            } else {
                alert("No such user found!");
            }
        } catch (error) {
            console.error('Error fetching student details:', error);
        } finally {
            setloading(false);
        }
    };

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-0">
            {
                loading
                    ?
                    <div className="grid grid-cols-1 lg:grid-cols-1">
                        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md text-center">
                                <div
                                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                    role="status">
                                    <span
                                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                    >Loading...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="mt-0 flex flex-col">
                        <p className="font-bold text-grey-900 tracking-tight text-1xl">
                            Edit Tutor {console.log(studentDetails, "studentDetails")}
                        </p>
                        <form onSubmit={handleSubmit}>

                            <div className="space-y-12">
                                <div className="border-b border-grey-900/10 pb-12">
                                    <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-6">

                                        <div className="sm:col-span-3">
                                            <label htmlFor="TutorName" className="block text-sm font-medium leading-6 text-grey-900">
                                                Tutor Name
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    id="TutorName"
                                                    name="TutorName"
                                                    maxLength={25}
                                                    value={
                                                        formData.TutorName ||
                                                        (fetchData.Json
                                                            ? JSON.parse(fetchData.Json).TutorName
                                                            : "No Data")
                                                    }
                                                    // value={formData['TutorName']}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>


                                        <div className="sm:col-span-3">
                                            <label htmlFor="Basti" className="block text-sm font-medium leading-6 text-grey-900">
                                                Basti
                                            </label>
                                            <div className="mt-0">
                                                <select
                                                    id="Basti"
                                                    name="Basti"
                                                    value={
                                                        formData.Basti ||
                                                        (fetchData.Json
                                                            ? JSON.parse(fetchData.Json).Basti
                                                            : "No Data")
                                                    }
                                                    // value={formData['Basti']}
                                                    onChange={handleInputChange}
                                                    className={'block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'}

                                                ><option >Select Basti</option>
                                                    {options.map((option, index) => (
                                                        <option
                                                            key={index}
                                                            value={option.basti_name}
                                                        >
                                                            {option.basti_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="Email" className="block text-sm font-medium leading-6 text-grey-900">
                                                Email
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    id="Email"
                                                    name="Email"
                                                    maxLength={125}
                                                    value={
                                                        formData.Email ||
                                                        (fetchData.Json
                                                            ? JSON.parse(fetchData.Json).Email
                                                            : "No Data")
                                                    }
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>


                                        <div className="sm:col-span-3">
                                            <label htmlFor="PhoneNumber" className="block text-sm font-medium leading-6 text-grey-900">
                                                Phone Number
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    id="PhoneNumber"
                                                    name="PhoneNumber"
                                                    maxLength={15}
                                                    value={
                                                        formData.PhoneNumber ||
                                                        (fetchData.Json
                                                            ? JSON.parse(fetchData.Json).PhoneNumber
                                                            : "No Data")
                                                    }
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="Subject" className="block text-sm font-medium leading-6 text-grey-900">
                                                Subject
                                            </label>
                                            <div className="mt-0">
                                                <Select
                                                    options={subjectDetails && subjectDetails.map((student) => ({
                                                        value: student.option,
                                                        label: student.option,
                                                    }))}
                                                    id="Subject"
                                                    name="Subject"
                                                    className='block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                                    isMulti={true}
                                                    value={selectedSubjectOptions}
                                                    onChange={handleChange}
                                                />

                                                {/* <input
                                                    type="text"
                                                    id="Subject"
                                                    name="Subject"
                                                    maxLength={25}
                                                    value={
                                                        formData.Subject ||
                                                        (fetchData.Json
                                                            ? JSON.parse(fetchData.Json).Subject
                                                            : "No Data")
                                                    }
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                /> */}
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="MonthlyFee" className="block text-sm font-medium leading-6 text-grey-900">
                                                Monthly Fee
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    id="MonthlyFee"
                                                    name="MonthlyFee"
                                                    maxLength={15}
                                                    value={
                                                        formData.MonthlyFee ||
                                                        (fetchData.Json
                                                            ? JSON.parse(fetchData.Json).MonthlyFee
                                                            : "No Data")
                                                    }
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="Class" className="block text-sm font-medium leading-6 text-grey-900">
                                                Class
                                            </label>
                                            <div className="mt-0">

                                                <Select
                                                    options={studentDetails && studentDetails.map((student) => ({
                                                        value: student.option,
                                                        label: student.option,
                                                    }))}
                                                    id="Class"
                                                    name="Class"
                                                    className='block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                                    isMulti={true}
                                                    value={selectedOptions}
                                                    onChange={handleChange}
                                                />
                                                {/* <input
                                                    type="text"
                                                    id="Class"
                                                    name="Class"
                                                    maxLength={15}
                                                    value={
                                                        formData.Class ||
                                                        (fetchData.Json
                                                            ? JSON.parse(fetchData.Json).Class
                                                            : "No Data")
                                                    }
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                /> */}
                                            </div>
                                        </div>
                                        <div className="sm:col-span-6">
                                            <p className="font-bold w-100 d-block text-grey-900 tracking-tight text-1xl">
                                                Address Detail
                                            </p>
                                        </div>

                                        <Form
                                            selectedState={selectedState}
                                            selectedDistrict={selectedDistrict}
                                            selectedTehsil={selectedTehsil}
                                            selectedAddress={selectedAddress}
                                            selectedPincode={selectedPincode}
                                            selectedVillage={selectedVillage}
                                            handleStateChange={handleStateChange}
                                            handleDistrictChange={handleDistrictChange}
                                            handleTehsilChange={handleTehsilChange}
                                            handleAddressChange={handleAddressChange}
                                            handlePinCodeChange={handlePinCodeChange}
                                            handleVillageChange={handleVillageChange}
                                        />
                                        <div className="sm:col-span-6">

                                            <p className="font-bold w-100 d-block text-grey-900 tracking-tight text-1xl">
                                                Bank Detail
                                            </p>
                                        </div>
                                        <BankDetails
                                            Bankselect={Bankselect}
                                            AccountNumber={AccountNumber}
                                            IFSCcode={IFSCcode}
                                            AccountName={AccountName}
                                            handleBankChange={handleBankChange}
                                            handleAccountNameChange={handleAccountNameChange}
                                            handleIFSCcode={handleIFSCcode}
                                            handleAccountNumberChange={handleAccountNumberChange}

                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 flex items-center justify-end gap-x-6">
                                <button type="button" onClick={() => navigate("/TutorList")} className="text-sm font-semibold leading-6 text-grey-900">
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
            }
        </section>
    )
}

export default TutorEdit