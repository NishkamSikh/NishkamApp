import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Form from '../../components/Form'
import BankDetails from '../../components/BankDetails'

const VendorAdd = () => {

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
    const [formError, setFormError] = useState(false);

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
            const response = await fetch('https://apisikligar.azurewebsites.net/api/v1/schoolrecordlist'); // Replace with your API endpoint
            const jsonData = await response.json();
            console.log(jsonData.data, "jsonData.length")
            if (jsonData.data.length > 0) {
                console.log('startsdsd')

                const filteredData = jsonData.data.filter((item) => JSON.parse(item.Json).Institution_Type === "School");

                console.log(filteredData, 'School Data')
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
        SchoolfetchData()
        setloading(true)
        setTimeout(() => {
            setloading(false)

        }, 1000)
    }, [])
    const navigate = useNavigate();

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

                CatgCode: "VNDR",
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
        navigate('/');
    };


    const handleSubmit2 = async (event) => {
        event.preventDefault();
        if (!selectedState || !selectedDistrict || !selectedTehsil || !Bankselect) {
            setFormError(true);
            return;
        }
        setFormError(false);
        setloading(true)
        // const form = event.currentTarget;
        // const url = form.action;

        try {
            const formData = new FormData(form);
            const responseData = await postFormDataAsJson({ url, formData });
            setloading(false)
            // navigate('/admin/Vendorlistadmin');
            console.log({ responseData });

        } catch (error) {
            console.error(error);
        }
    }

    const postFormDataAsJson = async ({ url, formData }) => {
        const plainFormData = Object.fromEntries(formData.entries());
        const formDataJsonString = JSON.stringify(plainFormData);
        const jsondatastore = {
            tutorjson: formDataJsonString
        }
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(jsondatastore)
        };

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        return response.json();
    }
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
                            Master - Add Vendor Details
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
                                                    placeholder='Name (40)'
                                                    maxLength={40}
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
                                                    placeholder='Shop Name (40)'
                                                    maxLength={40}
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
                                                    placeholder='Email (125)'
                                                    maxLength={125}

                                                    value={formData['vendor_email']}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>


                                        <div className="sm:col-span-3">
                                            <label htmlFor="vendor_number" className="block text-sm font-medium leading-6 text-grey-900">
                                                &#9742;  Number
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    id="vendor_number"
                                                    name="vendor_number"
                                                    placeholder='&#9742; Number (25)'
                                                    maxLength={25}
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
                                                    className='text-sm w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-3 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                    aria-label="Items"
                                                    name='vendor_items'
                                                    onChange={handleInputChange}
                                                    value={formData['vendor_items']}
                                                >
                                                    <option >Select Items</option>
                                                    <option value="Stationary">Stationary</option>
                                                    <option value="Uniforum">Uniforum</option>
                                                    <option value="Shoes">Shoes</option>
                                                    <option value="Books">Books</option>

                                                </select>
                                            </div>
                                        </div>


                                        <div className="sm:col-span-3">
                                            <label htmlFor="vendor_institution" className="block text-sm font-medium leading-6 text-grey-900">
                                                Select Institution
                                            </label>
                                            <div className="mt-0">
                                                <select
                                                    className='text-sm w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-3 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
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
                            <div className="mt-2 flex items-center justify-end gap-x-6">
                                <button type="button" className="text-sm font-semibold leading-6 text-grey-900">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={{ opacity: formData.vendor_name && formData.vendor_shop_name ? 1 : 0.5 }}
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

export default VendorAdd