import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Form from '../../components/Form'
import BankDetails from '../../components/BankDetails'

const VoulnteerAdd = () => {

    const [loading, setloading] = useState(false);

    const [sechoolData, setschoolData] = useState([]);
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
    const [selectedBasti, setSelectedBasti] = useState('');
    const [options, setOptions] = useState([]);
    const [formError, setFormError] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        basti_name: '',
        Email: '',
        number: ''
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

    const uniqueschoollist = [
        ...new Set(sechoolData.map((item) => item.type)),
    ];

    useEffect(() => {
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        fetchBastiData()

        setloading(true)
        setTimeout(() => {
            setloading(false)

        }, 1000)
    }, [])
    const navigate = useNavigate();

    const fetchBastiData = () => {
        fetch('https://apisikligar.azurewebsites.net/api/v1/bastilist')
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

        if (!selectedState || !selectedDistrict || !selectedTehsil || !Bankselect) {
            setFormError(true);
            return;
        }
        setFormError(false);

        // const check = JSON.stringify({ ...formData, vendor_state: selectedState })

        console.log(formData, "======")

        //Proceed with the second API call 
        const response = await fetch("https://apisikligar.azurewebsites.net/api/v1/addvendor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // UserId: userID,

                CatgCode: "VOLN",
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
        navigate('/');
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
                            Master - Add Volunteer Details
                        </p>
                        <form onSubmit={handleSubmit}>

                            <div className="space-y-12">
                                <div className="border-b border-grey-900/10 pb-12">
                                    <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">

                                        <div className="sm:col-span-3">
                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-grey-900">
                                                Voulnteer Name
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    placeholder='Name (40)'
                                                    maxLength={40}
                                                    value={formData['name']}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="basti_name" className="block text-sm font-medium leading-6 text-grey-900">
                                                Basti
                                            </label>
                                            <div className="mt-0">
                                                <select
                                                    id="basti_name"
                                                    name="basti_name"
                                                    value={formData['basti_name']}
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
                                                    placeholder='Email (125)'
                                                    maxLength={125}
                                                    value={formData['Email']}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="number" className="block text-sm font-medium leading-6 text-grey-900">
                                                Phone Number
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    id="number"
                                                    name="number"
                                                    placeholder='&#9742; Number (20)'
                                                    maxLength={20}
                                                    value={formData['number']}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                            handleBankChange={handleBankChange}
                                            handleAccountNameChange={handleAccountNameChange}
                                            handleIFSCcode={handleIFSCcode}
                                            handleAccountNumberChange={handleAccountNumberChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-1 flex items-center justify-end gap-x-6">
                                <button type="button" className="text-sm font-semibold leading-6 text-grey-900">
                                    Cancel
                                </button>
                                <button
                                    type="submit"

                                    style={{ opacity: formData.name && formData.basti_name ? 1 : 0.5 }}
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

export default VoulnteerAdd