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


    const studentDetails = [
        {
            id: "1",
            option: "Nursary",
        },

        {
            id: "2",
            option: "I",
        },
        {
            id: "3",
            option: "II",
        },
        {
            id: "4",
            option: "III",
        },
        {
            id: "5",
            option: "IV",
        },
        {
            id: "6",
            option: "V",
        },
        {
            id: "7",
            option: "VI",
        },
        {
            id: "8",
            option: "VII",
        },
        {
            id: "9",
            option: "VIII",
        },
        {
            id: "10",
            option: "IX",
        },
        {
            id: "11",
            option: "X",
        },
        {
            id: "12",
            option: "XI",
        },
        {
            id: "13",
            option: "XII",
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
            option: "Maths",
        },
        {
            id: "3",
            option: "Punjabi",
        },
        {
            id: "4",
            option: "Hindi",
        },

    ];



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
        if(!isEmpty(selectedOptions)) setSelectedOptions(selectedOptions);
    };


    const isEmpty = function(obj) {
        if (obj == null) return true;
        if (obj.constructor.name == "Array" || obj.constructor.name == "String") return obj.length === 0;
        for (var key in obj) if (isEmpty(obj[key])) return true;
        return false;
    }


    const handleSubjectChange = (selectedOptions) => {
        if(!isEmpty(selectedOptions)) setSelectedSubjectOptions(selectedOptions);
    };

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
        fetch('https://nishkamapi.onrender.com/api/v1/bastilist')
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



    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        console.log(formData, "======")

        //Proceed with the second API call 
        const response = await fetch(`https://nishkamapi.onrender.com/api/v1/updateMasterData/${JSON.parse(searchParams.get('id'))}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({

                data: JSON.stringify(
                    {
                        ...formData,
                        Subject: selectedSubjectOptions,
                        Class: selectedOptions,
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
            const response = await fetch(`https://nishkamapi.onrender.com/api/v1/MastergetFetchData/${JSON.parse(searchParams.get('id'))}`);
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
                                                    value={formData['TutorName']}
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

                                                    value={formData['Basti']}
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
                                                    value={formData.Email}
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
                                                    value={formData.PhoneNumber}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="Subject" className="block text-sm font-medium leading-6 text-grey-900">
                                                Subject {console.log(selectedSubjectOptions, "selectedSubjectOptions")}
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
                                                    onChange={handleSubjectChange}
                                                />
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
                                                    value={formData.MonthlyFee}
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