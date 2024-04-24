import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Form from '../../components/Form'
import BankDetails from '../../components/BankDetails'
import { useSearchParams } from 'react-router-dom'

const EditInstitution = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const [loading, setloading] = useState(false);
    const [toggle, settoggle] = useState(true);
    const [selectedState, setSelectedState] = useState('');
    const [fetchData, setfetchData] = useState({ data: { data: [] } });
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedTehsil, setSelectedTehsil] = useState('');
    const [selectedAddress, setselectedAddress] = useState('');
    const [selectedPincode, setSelectedpincode] = useState('');
    const [SelectedVillage, setSelectedVillage] = useState('');
    const [AccountName, setAccountName] = useState('');
    const [IFSCcode, setIFSCcode] = useState('');
    const [AccountNumber, setAccountNumber] = useState('');
    const [Bankselect, setBankselect] = useState('');

    const [formError, setFormError] = useState(false);

    const [formData, setFormData] = useState({
        Institution_Catg: '',
        Institution_Name: '',
        Institution_Type: '',
        number: '',
        alternate_number: '',
        Email: '',
        Select_Board: '',
        Principal_Name: '',
        Principal_Number: '',
        Contact_Number_1: '',
        Contact_Number_1_Designation: '',
        Contact_Number_2: '',
        Contact_Number_2_Designation: '',
        Website: '',
        Medium: '',
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

        // if (!selectedState || !selectedDistrict || !selectedTehsil) {
        //     setFormError(true);
        //     return;
        // }

        setFormError(false);

        // const check = JSON.stringify({ ...formData, vendor_state: selectedState })

        console.log(formData, "Submit Data")

        //Proceed with the second API call 
        const response = await fetch(`https://nishkamapi.onrender.com/api/v1/updateMasterData/${JSON.parse(searchParams.get('id'))}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // // UserId: userID,

                // CatgCode: "INST",
                data: JSON.stringify(
                    {
                        ...formData,
                        State: selectedState,
                        District: selectedDistrict,
                        Tehsil: selectedTehsil,
                        Address: selectedAddress,
                        Pincode: selectedPincode,
                        Village: SelectedVillage,
                        Bank_Name: Bankselect,
                        Account_Name: AccountName,
                        IFSC_Code: IFSCcode,
                        Account_Number: AccountNumber,
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
        navigate("/institutionList")
    };

    useEffect(() => {
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        fetchUserInfo()
        setloading(true)
        setTimeout(() => {
            setloading(false)

        }, 1000)


    }, [])

    const fetchUserInfo = async () => {
        //console.log(typeof searchParams.get('id'), 'fetch');
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
            //console.log(data.data.data[0], "Data ============")
            if (data.data.data.length > 0) {
                setfetchData(data.data.data[0]);
                // setstuCodeYear(data.data.data);

                setSelectedState(JSON.parse(data.data.data[0].Json).State);
                setSelectedVillage(JSON.parse(data.data.data[0].Json).Village);
                setSelectedDistrict(JSON.parse(data.data.data[0].Json).District);
                setSelectedTehsil(JSON.parse(data.data.data[0].Json).Tehsil);
                setselectedAddress(JSON.parse(data.data.data[0].Json).Address);
                setSelectedpincode(JSON.parse(data.data.data[0].Json).Pincode);
                setAccountName(JSON.parse(data.data.data[0].Json).Account_Name);
                setIFSCcode(JSON.parse(data.data.data[0].Json).IFSC_Code);
                setAccountNumber(JSON.parse(data.data.data[0].Json).Account_Number);
                setBankselect(JSON.parse(data.data.data[0].Json).Bank_Name
                );

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
                        {/* <p className="font-bold text-orange-900 tracking-tight text-1xl">
                            Edit Institution - Master ({selectedState || 'No State'}, {selectedTehsil || 'No Tehsil'}, {selectedDistrict || 'No Dist'})
                        </p> */}

                        <p className="text-center font-bold bg-blue-100 tracking-tight text-1lg">
                            Master - Edit Institution Details
                        </p>

                        <form onSubmit={handleSubmit}>

                            <div className="space-y-12">
                                <div className="border-b border-grey-900/10 pb-12">
                                    <div className="mt-2 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">

                                        <div className="sm:col-span-2">
                                            <label htmlFor="Institution_Type" className="block text-sm font-medium leading-6 text-grey-900">
                                                Institution Type
                                            </label>
                                            <div className="mt-0">
                                                <select
                                                    className='text-sm w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                    aria-label="Institution_Type"
                                                    value={
                                                        formData.Institution_Type ||
                                                        (fetchData.Json
                                                            ? JSON.parse(fetchData.Json).Institution_Type
                                                            : "No Data")
                                                    }
                                                    onChange={handleInputChange}
                                                    name='Institution_Type'
                                                >
                                                    <option >Select Institution Type</option>
                                                    <option value="School">School</option>
                                                    <option value="College" >College</option>
                                                    <option value="Private Insititution">Private Insititution</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="Institution_Catg" className="block text-sm font-medium leading-6 text-grey-900">
                                                Institution Category
                                            </label>
                                            <div className="mt-0">
                                                <select
                                                    className='text-sm w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                    aria-label="Institution_Catg"
                                                    value={formData.Institution_Catg}
                                                    onChange={handleInputChange}
                                                    name='Institution_Catg'
                                                >
                                                    <option >Select Institution Category</option>
                                                    <option value="Public">Public</option>
                                                    <option value="Private">Private</option>
                                                    <option value="Govt" >Govt</option>
                                                    <option value="Semi Pvt">Semi Pvt</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="Institution_Name" className="block text-sm font-medium leading-6 text-grey-900">
                                                Name of Institution
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    id="Institution_Name"
                                                    name="Institution_Name"
                                                    value={formData['Institution_Name']}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="number" className="block text-sm font-medium leading-6 text-grey-900">
                                                Institution &#9742;
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    id="number"
                                                    name="number"
                                                    placeholder='Institution &#9742; (25)'
                                                    maxLength={25}
                                                    value={formData['number']}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="alternate_number" className="block text-sm font-medium leading-6 text-grey-900">
                                                Alternate &#9742;
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    id="alternate_number"
                                                    name="alternate_number"
                                                    placeholder='Alternate &#9742; (25)'
                                                    maxLength={25}
                                                    value={formData['alternate_number']}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="Select_Board" className="block text-sm font-medium leading-6 text-grey-900">
                                                Institution Certification Board
                                            </label>
                                            <div className="mt-0">
                                            <select
                                                    className='text-sm w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-3 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
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
                                                    <option value="Karnataka Board">Haryana  Board</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="Email" className="block text-sm font-medium leading-6 text-grey-900">
                                                Institution Email
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    id="Email"
                                                    name="Email"
                                                    placeholder='Email (125)'
                                                    maxLength={125}
                                                    value={formData['Email']}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="Principal_Name" className="block text-sm font-medium leading-6 text-grey-900">
                                                Principal Name
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    id="Principal_Name"
                                                    name="Principal_Name"
                                                    placeholder='Principal Name (40)'
                                                    maxLength={40}
                                                    value={formData['Principal_Name']}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="Principal_Number" className="block text-sm font-medium leading-6 text-grey-900">
                                                Principal &#9742;
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    id="Principal_Number"
                                                    name="Principal_Number"
                                                    placeholder='Principal &#9742; (25)'
                                                    maxLength={25}
                                                    value={formData['Principal_Number']}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="Contact_Number_1" className="block text-sm font-medium leading-6 text-grey-900">
                                                Contact-1 &#9742;
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    id="Contact_Number_1"
                                                    name="Contact_Number_1"
                                                    placeholder='Contact-1 &#9742; (25)'
                                                    maxLength={25}
                                                    value={formData['Contact_Number_1']}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="Contact_Number_1_Designation" className="block text-sm font-medium leading-6 text-grey-900">
                                                Contact-1- Designation
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    id="Contact_Number_1_Designation"
                                                    name="Contact_Number_1_Designation"
                                                    placeholder='Contact-1 Designation (25)'
                                                    maxLength={25}
                                                    value={formData['Contact_Number_1_Designation']}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="Contact_Number_2" className="block text-sm font-medium leading-6 text-grey-900">
                                                Contact-2 &#9742;
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    id="Contact_Number_2"
                                                    name="Contact_Number_2"
                                                    placeholder='Contact-2 &#9742; (25)'
                                                    maxLength={25}
                                                    value={formData['Contact_Number_2']}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="Contact_Number_2_Designation" className="block text-sm font-medium leading-6 text-grey-900">
                                                Contact-2 Designation
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    id="Contact_Number_2_Designation"
                                                    name="Contact_Number_2_Designation"
                                                    placeholder='Contact-2 Designation (25)'
                                                    maxLength={25}
                                                    value={formData['Contact_Number_2_Designation']}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="Website" className="block text-sm font-medium leading-6 text-grey-900">
                                                Website
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    id="Website"
                                                    name="Website"
                                                    placeholder='Website Address (75)'
                                                    maxLength={75}
                                                    value={formData['Website']}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="Medium" className="block text-sm font-medium leading-6 text-grey-900">
                                                Medium
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    className='text-sm w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-3 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                    type="text"
                                                    id="Medium"
                                                    name="Medium"
                                                    placeholder='Medium (25)'
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
                                            selectedPincode={selectedPincode}
                                            selectedVillage={SelectedVillage}
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
                                            handleBankChange={handleBankChange}
                                            handleAccountNameChange={handleAccountNameChange}
                                            handleIFSCcode={handleIFSCcode}
                                            handleAccountNumberChange={handleAccountNumberChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-2 flex items-center justify-end gap-x-6">
                                <button type="button" onClick={() => navigate("/InstitutionList")} className="text-sm font-semibold leading-6 text-grey-900">
                                    Cancel
                                </button>
                                <button
                                    type="submit"

                                    // style={{ opacity: formData.studentcode && formData.stuyear ? 1 : 0.5 }}
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

export default EditInstitution