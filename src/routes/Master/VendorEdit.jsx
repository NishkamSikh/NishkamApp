import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom'
import Form from '../../components/Form'
import BankDetails from '../../components/BankDetails'

const VendorEdit = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [loading, setloading] = useState(false);

    const [sechoolData, setschoolData] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [fetchData, setfetchData] = useState({ data: { data: [] } });
    const [selectedTehsil, setSelectedTehsil] = useState('');
    const [selectedAddress, setselectedAddress] = useState('');
    const [selectedpincode, setSelectedpincode] = useState('');
    const [SelectedVillage, setSelectedVillage] = useState('');
    const [AccountName, setAccountName] = useState('');
    const [IFSCcode, setIFSCcode] = useState('');
    const [AccountNumber, setAccountNumber] = useState('');
    const [Bankselect, setBankselect] = useState('');
    const [formError, setFormError] = useState(false);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        vendor_name: '',
        vendor_shop_name: '',
        vendor_email: '',
        vendor_number: '',
        vendor_items: '',
        vendor_institution: '',
        vendor_state: ''
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
        console.log(value, "PIN");
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

    const SchoolfetchData = async () => {

        try {
            const response = await fetch('https://nishkamapi.onrender.com/api/v1/schoolrecordlist'); // Replace with your API endpoint
            const jsonData = await response.json();
            console.log(jsonData.data, "jsonData.length")
            if (jsonData.data.length > 0) {
                const filteredData = jsonData.data.filter((item) => JSON.parse(item.Json).Institution_Type === "School");
                setschoolData(filteredData);
                setloading(false);

            } else {
                setschoolData([]);
                setloading(false);
            }
            setloading(false);
        } catch (error) {
            setloading.error('Error:', error);
            setloading(false);
        }
    };

    const uniqueschoollist = [
        ...new Set(sechoolData.map((item) => item.type)),
    ];

    useEffect(() => {
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        fetchUserInfo()
        SchoolfetchData()
        setloading(true)
        setTimeout(() => {
            setloading(false)
        }, 1000)
    }, [])


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
            console.log("Fetched vendor data=======", data)

            // Initialize fetchData with the expected structure
            if (data.data.data.length > 0) {
                setfetchData(data.data.data[0]);
                setSelectedState(JSON.parse(data.data.data[0].Json).vendor_state);
                setSelectedVillage(JSON.parse(data.data.data[0].Json).vendor_village);
                setSelectedDistrict(JSON.parse(data.data.data[0].Json).vendor_district);
                setSelectedTehsil(JSON.parse(data.data.data[0].Json).vendor_tehsil);
                setselectedAddress(JSON.parse(data.data.data[0].Json).vendor_address);
                setSelectedpincode(JSON.parse(data.data.data[0].Json).vendor_pincode);
                setAccountName(JSON.parse(data.data.data[0].Json).vendor_accountName);
                setIFSCcode(JSON.parse(data.data.data[0].Json).vendor_IFSCCode);
                setAccountNumber(JSON.parse(data.data.data[0].Json).vendor_AccountNumber);
                setBankselect(JSON.parse(data.data.data[0].Json).vendor_bank);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);

        // if (!selectedState || !selectedDistrict || !selectedTehsil || !Bankselect) {
        //     setFormError(true);
        //     return;
        // }
        setFormError(false);

        // const check = JSON.stringify({ ...formData, vendor_state: selectedState })

        console.log("formData==", formData)

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
                        vendor_state: selectedState,
                        vendor_district: selectedDistrict,
                        vendor_tehsil: selectedTehsil,
                        vendor_address: selectedAddress,
                        vendor_pincode: selectedpincode,
                        vendor_village: SelectedVillage,
                        vendor_bank: Bankselect,
                        vendor_accountName: AccountName,
                        vendor_IFSCCode: IFSCcode,
                        vendor_AccountNumber: AccountNumber,
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
        navigate('/VendorList');
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
                        <p className="font-bold text-grey-900 tracking-tight text-1xl">
                            Edit Vendor
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-12">
                                <div className="border-b border-grey-900/10 pb-12">
                                    <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="vendor_name" className="block text-sm font-medium leading-6 text-grey-900">
                                                Vendor Name
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    id="vendor_name"
                                                    name="vendor_name"
                                                    value={formData['vendor_name']}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="vendor_shop_name" className="block text-sm font-medium leading-6 text-grey-900">
                                                Vendor Shop Name
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    id="vendor_shop_name"
                                                    name="vendor_shop_name"
                                                    value={formData['vendor_shop_name']}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="vendor_email" className="block text-sm font-medium leading-6 text-grey-900">
                                                Email
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    id="vendor_email"
                                                    name="vendor_email"
                                                    value={formData['vendor_email']}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="vendor_number" className="block text-sm font-medium leading-6 text-grey-900">
                                                Phone Number
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    id="vendor_number"
                                                    name="vendor_number"
                                                    value={formData['vendor_number']}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="vendor_items" className="block text-sm font-medium leading-6 text-grey-900">
                                                Items
                                            </label>
                                            <div className="mt-0">
                                                <select
                                                    className='w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-3 normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                    aria-label="Items"
                                                    name='vendor_items'
                                                    onChange={handleInputChange}
                                                    value={formData['vendor_items']}
                                                >
                                                    <option value="">Select Items</option>
                                                    <option value="Stationary">Stationary</option>
                                                    <option value="Uniforum">Uniforum</option>
                                                    <option value="Books">Books</option>
                                                    <option value="Shoes">Shoes</option>

                                                </select>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="vendor_institution" className="block text-sm font-medium leading-6 text-grey-900">
                                                Select Institution Name
                                            </label>
                                            <div className="mt-0">
                                                <select
                                                    className='w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-3 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                    aria-label="vendor_institution"
                                                    onChange={handleInputChange}
                                                    value={formData['vendor_institution']}
                                                    name='vendor_institution'>

                                                    {sechoolData.map((item, index) => (
                                                        <option key={index} value={item.id}>
                                                            {JSON.parse(item.Json).Institution_Name}
                                                        </option>
                                                    ))}
                                                </select>
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
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="button" onClick={() => navigate("/VendorList")} className="text-sm font-semibold leading-6 text-grey-900">
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

export default VendorEdit;