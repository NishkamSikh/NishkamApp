import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Form from '../../components/Form'
import BankDetails from '../../components/BankDetails'
import Select from 'react-select';

const AddInstitution = () => {

    const [loading, setloading] = useState(false);
    const [toggle, settoggle] = useState(true);
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedTehsil, setSelectedTehsil] = useState('');
    const [selectedAddress, setselectedAddress] = useState('');
    const [selectedpincode, setSelectedpincode] = useState('');
    const [SelectedVillage, setSelectedVillage] = useState('');
    const [AccountName, setAccountName] = useState('');
    const [IFSCcode, setIFSCcode] = useState('');
    const [AccountNumber, setAccountNumber] = useState('');
    const [Bankselect, setBankselect] = useState('');
    const [BranchName, setBranchName] = useState('');

    const [formError, setFormError] = useState(false);

    const [formData, setFormData] = useState({
        Institution_Type: '',
        Institution_Name: '',
        Institution_Catg: '',
        number: '',
        alternate_number: '',
        Email: '',
        Institution_Board: '',
        Medium: '',
        Principal_Name: '',
        Principal_Number: '',
        Contact_Number_1: '',
        Contact_Number_1_Designation: '',
        Contact_Number_2: '',
        Contact_Number_2_Designation: '',
        Website: '',
    });

    const navigate = useNavigate();

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
    const handleBranchNameChange = (value) => {
        setBranchName(value);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);

        // if (!selectedState || !selectedDistrict || !selectedTehsil || !Bankselect) {
        //     setFormError(true);
        //     return;
        // }
        setFormError(false);

        // const check = JSON.stringify({ ...formData, vendor_state: selectedState })

        console.log(formData, "======")

        //Proceed with the second API call 
        const response = await fetch("https://nishkamapi.onrender.com/api/v1/addvendor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // UserId: userID,

                CatgCode: "INST",
                data: JSON.stringify(
                    {
                        ...formData,
                        State: selectedState,
                        District: selectedDistrict,
                        Tehsil: selectedTehsil,
                        Address: selectedAddress,
                        Pincode: selectedpincode,
                        Village: SelectedVillage,
                        Bank_Name: Bankselect,
                        Account_Name: AccountName,
                        IFSC_Code: IFSCcode,
                        Account_Number: AccountNumber,
                        BranchName: BranchName,
                    }
                ),
            }),
        });

        if (!response.ok) {
            console.error("Error:", response.statusText);
            return;
        }

        setloading(false);
        navigate('/')
    };

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-2">
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
                        <p className="text-center font-bold bg-blue-100 tracking-tight text-1lg">
                            Master - Add Institution Details
                        </p>
                        <form onSubmit={handleSubmit}>

                            <div className="space-y-12">
                                <div className="border-b border-grey-900/10 pb-12">
                                    <div className="mt-2 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">

                                        <div className="sm:col-span-2">
                                            <label htmlFor="Institution_Type" className="block text-sm font-medium leading-6 text-grey-900">
                                                Institution Type*
                                            </label>
                                            <div className="mt-0">
                                                <select
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 valid:[&:not(:placeholder-shown)]:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-gray-300 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]"
                                                    aria-label="Institution_Type"
                                                    value={formData['Institution_Type']}
                                                    onChange={handleInputChange}
                                                    name='Institution_Type'
                                                >
                                                    <option>Select Institution Type</option>
                                                    <option value="School">School</option>
                                                    <option value="College">College</option>
                                                    <option value="Private Insititution">Private Insititution</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="Institution_Catg" className="block text-sm font-medium leading-6 text-grey-900">
                                                Institution Category*
                                            </label>
                                            <div className="mt-0">
                                                <select
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 valid:[&:not(:placeholder-shown)]:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-gray-300 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]"
                                                    aria-label="Institution_Catg"
                                                    value={formData['Institution_Catg']}
                                                    onChange={handleInputChange}
                                                    name='Institution_Catg'
                                                >
                                                    <option>Select Institution Category</option>
                                                    <option value="Public">Public</option>
                                                    <option value="Private">Private</option>
                                                    <option value="Government">Government</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="Institution_Name" className="block text-sm font-medium leading-6 text-grey-900">
                                                Name of Institution*
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 valid:[&:not(:placeholder-shown)]:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]"
                                                    type="text"
                                                    id="Institution_Name"
                                                    name="Institution_Name"
                                                    value={formData['Institution_Name']}
                                                    placeholder='Institution Name (50)'
                                                    maxLength={50}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="number" className="block text-sm font-medium leading-6 text-grey-900">
                                                Institution &#9742;
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 valid:[&:not(:placeholder-shown)]:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]"
                                                    type="text"
                                                    id="number"
                                                    name="number"
                                                    value={formData['number']}
                                                    placeholder=''
                                                    maxLength={25}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="alternate_number" className="block text-sm font-medium leading-6 text-grey-900">
                                                Alternate &#9742;
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 valid:[&:not(:placeholder-shown)]:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]"
                                                    type="text"
                                                    id="alternate_number"
                                                    name="alternate_number"
                                                    placeholder=''
                                                    maxLength={25}
                                                    value={formData['alternate_number']}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="Select_Board" className="block text-sm font-medium leading-6 text-grey-900">
                                                Institution Certification Board
                                            </label>
                                            <div className="mt-0">
                                                <select
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 valid:[&:not(:placeholder-shown)]:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-gray-300 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]"
                                                    aria-label="Select_Board"
                                                    value={formData['Select_Board']}
                                                    onChange={handleInputChange}
                                                    name='Institution_Board'
                                                >
                                                    <option>Select Certification Board</option>
                                                    <option value="CBSE">CBSE</option>
                                                    <option value="ICSE">ICSE</option>
                                                    <option value="U.P. Board">U.P. Board</option>
                                                    <option value="Punjab Board">Punjab Board</option>
                                                    <option value="Karnataka Board">Karnataka  Board</option>
                                                    <option value="Haryana Board">Haryana  Board</option>
                                                    <option value="Maharashtra Board">Maharashtra Board</option>
                                                    <option value="Karnataka Seconidary Education Board">Karnataka Seconidary Education Board</option>
                                                    <option value="Karnatak University">Karnatak University</option>
                                                    <option value="Dr. APJ Abdul Kalam Techinal University">Dr. APJ Abdul Kalam Techinal University</option>
                                                    <option value="Visvesvaraya Technological University Belagavi">Visvesvaraya Technological University Belagavi</option>
                                                    <option value="Chaudhary Charan Singh University Meerut">Chaudhary Charan Singh University Meerut</option>
                                                    <option value="Swami Vivekanand Subharti University Meerut">Swami Vivekanand Subharti University Meerut</option>
                                                    <option value="Baba Farid University of Health Sciences">Baba Farid University of Health Sciences</option>
                                                    <option value="University of Delhi">University of Delhi</option>
                                                    <option value="Institute of Chartered Accountants of India">Institute of Chartered Accountants of India</option>
                                                    <option value="IIT Kharagpur">IIT Kharagpur</option>
                                                    <option value="Gulbaraga  University">Gulbaraga  University</option>
                                                    <option value="Shri Dharmasthala Manjunateshwara University">Shri Dharmasthala Manjunateshwara University</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="Email" className="block text-sm font-medium leading-6 text-grey-900">
                                                Institution Email
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 valid:[&:not(:placeholder-shown)]:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]"
                                                    type="text"
                                                    id="Email"
                                                    name="Email"
                                                    placeholder=''
                                                    maxLength={125}
                                                    value={formData['Email']}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="Principal_Name" className="block text-sm font-medium leading-6 text-grey-900">
                                                Principal Name
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 valid:[&:not(:placeholder-shown)]:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]"
                                                    type="text"
                                                    id="Principal_Name"
                                                    name="Principal_Name"
                                                    placeholder=''
                                                    maxLength={40}
                                                    value={formData['Principal_Name']}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="Principal_Number" className="block text-sm font-medium leading-6 text-grey-900">
                                                Principal &#9742;
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 valid:[&:not(:placeholder-shown)]:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]"
                                                    type="text"
                                                    id="Principal_Number"
                                                    name="Principal_Number"
                                                    placeholder=''
                                                    maxLength={25}
                                                    value={formData['Principal_Number']}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="Contact_Number_1" className="block text-sm font-medium leading-6 text-grey-900">
                                                Contact-1 &#9742;
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 valid:[&:not(:placeholder-shown)]:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]"
                                                    type="text"
                                                    id="Contact_Number_1"
                                                    name="Contact_Number_1"
                                                    placeholder=''
                                                    maxLength={25}
                                                    value={formData['Contact_Number_1']}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="Contact_Number_1_Designation" className="block text-sm font-medium leading-6 text-grey-900">
                                                Contact-1 Designation
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 valid:[&:not(:placeholder-shown)]:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]"
                                                    type="text"
                                                    id="Contact_Number_1_Designation"
                                                    name="Contact_Number_1_Designation"
                                                    placeholder=''
                                                    maxLength={25}
                                                    value={formData['Contact_Number_1_Designation']}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="Contact_Number_2" className="block text-sm font-medium leading-6 text-grey-900">
                                                Contact-2 &#9742;
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 valid:[&:not(:placeholder-shown)]:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]"
                                                    type="text"
                                                    id="Contact_Number_2"
                                                    name="Contact_Number_2"
                                                    placeholder=''
                                                    maxLength={25}
                                                    value={formData['Contact_Number_2']}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="Contact_Number_2_Designation" className="block text-sm font-medium leading-6 text-grey-900">
                                                Contact-2 Designation
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 valid:[&:not(:placeholder-shown)]:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]"
                                                    type="text"
                                                    id="Contact_Number_2_Designation"
                                                    name="Contact_Number_2_Designation"
                                                    placeholder=''
                                                    maxLength={25}
                                                    value={formData['Contact_Number_2_Designation']}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="Website" className="block text-sm font-medium leading-6 text-grey-900">
                                                Website
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 valid:[&:not(:placeholder-shown)]:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]"
                                                    type="text"
                                                    id="Website"
                                                    name="Website"
                                                    placeholder='Website Address (75)'
                                                    maxLength={75}
                                                    value={formData['Website']}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="Medium" className="block text-sm font-medium leading-6 text-grey-900">
                                                Education Medium
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 valid:[&:not(:placeholder-shown)]:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]"
                                                    type="text"
                                                    id="Medium"
                                                    name="Medium"
                                                    placeholder='Education Medium (25)'
                                                    maxLength={25}
                                                    value={formData['Medium']}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-6">

                                            <p className="font-bold w-100 d-block text-orange-900 tracking-tight text-1xl">
                                                Address Detail
                                            </p>
                                        </div>
                                        <Form
                                            selectedState={selectedState}
                                            selectedDistrict={selectedDistrict}
                                            selectedTehsil={selectedTehsil}
                                            selectedAddress={selectedAddress}
                                            selectedpincode={selectedpincode}
                                            SelectedVillage={SelectedVillage}
                                            handleStateChange={handleStateChange}
                                            handleDistrictChange={handleDistrictChange}
                                            handleTehsilChange={handleTehsilChange}
                                            handleAddressChange={handleAddressChange}
                                            handlePinCodeChange={handlePinCodeChange}
                                            handleVillageChange={handleVillageChange}
                                        />
                                        <div className="sm:col-span-6">

                                            <p className="font-bold w-100 d-block text-orange-900 tracking-tight text-1xl">
                                                Bank Detail
                                            </p>
                                        </div>
                                        <BankDetails
                                            Bankselect={Bankselect}
                                            AccountNumber={AccountNumber}
                                            IFSCcode={IFSCcode}
                                            AccountName={AccountName}
                                            BranchName={BranchName}
                                            handleBankChange={handleBankChange}
                                            handleAccountNameChange={handleAccountNameChange}
                                            handleIFSCcode={handleIFSCcode}
                                            handleAccountNumberChange={handleAccountNumberChange}
                                            handleBranchNameChange={handleBranchNameChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-1 flex items-center justify-end gap-x-6">
                                <button type="button" onClick={() => navigate("/")} className="text-sm font-semibold leading-6 text-grey-900">
                                    Cancel
                                </button>
                                <button
                                    type="submit"

                                    style={{ opacity: formData.Institution_Name && formData.Institution_Type && formData.Institution_Catg ? 1 : 0.5 }}
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

export default AddInstitution