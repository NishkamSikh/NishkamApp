import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Form from '../../components/Form'
import BankDetails from '../../components/BankDetails'
import { useSearchParams } from 'react-router-dom'

const BastiEdit = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const [loading, setloading] = useState(false);
    const [sechoolData, setschoolData] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedTehsil, setSelectedTehsil] = useState('');
    const [selectedAddress, setselectedAddress] = useState('');
    const [selectedPincode, setSelectedpincode] = useState('');
    const [selectedVillage, setSelectedVillage] = useState('');

    const [fetchData, setfetchData] = useState({ data: { data: [] } });

    const [selectedBasti, setSelectedBasti] = useState('');
    const [options, setOptions] = useState([]);
    const [formError, setFormError] = useState(false);

    const [formData, setFormData] = useState({
        basti_name: '',

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
        fetchUserInfo()
        setloading(true)
        setTimeout(() => {
            setloading(false)

        }, 1000)
    }, [])
    const navigate = useNavigate();

    const fetchUserInfo = async () => {

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
            console.log(data.data.data[0].Id, "Data ============")
            console.log(JSON.parse(data.data.data[0].Json), "Village ============")
            if (data.data.data.length > 0) {
                setfetchData(data.data.data[0]);

                setSelectedState(JSON.parse(data.data.data[0].Json).State);
                setSelectedVillage(JSON.parse(data.data.data[0].Json).Village);
                setSelectedDistrict(JSON.parse(data.data.data[0].Json).District);
                setSelectedTehsil(JSON.parse(data.data.data[0].Json).Tehsil);
                setselectedAddress(JSON.parse(data.data.data[0].Json).Address);
                setSelectedpincode(JSON.parse(data.data.data[0].Json).Pincode);


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
        console.log(formData, "======")

        //Proceed with the second API call 
        const response = await fetch(`http://localhost:3000/api/v1/updateMasterData/${JSON.parse(searchParams.get('id'))}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // UserId: userID,

                // CatgCode: "BAST",
                data: JSON.stringify(
                    {
                        ...formData,
                        State: selectedState,
                        District: selectedDistrict,
                        Tehsil: selectedTehsil,
                        Address: selectedAddress,
                        Pincode: selectedPincode,
                        Village: selectedVillage,

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
        navigate('/BastiList');
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
                            Edit Basti
                        </p>
                        <form onSubmit={handleSubmit}>

                            <div className="space-y-12">
                                <div className="border-b border-grey-900/10 pb-12">
                                    <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">

                                        <div className="sm:col-span-3">
                                            <label htmlFor="basti_name" className="block text-sm font-medium leading-6 text-grey-900">
                                                Basti Name
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    id="basti_name"
                                                    name="basti_name"
                                                    value={formData['basti_name']}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
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
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="button" onClick={() => navigate("/BastiList")} className="text-sm font-semibold leading-6 text-grey-900">
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

export default BastiEdit