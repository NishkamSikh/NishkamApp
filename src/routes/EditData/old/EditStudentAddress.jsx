import React, { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

const EditStudentAddress = () => {
    const [userID, setUserId] = useState('')
    const [loading, setloading] = useState(false);
    const [stuCodeYear, setstuCodeYear] = useState([]);
    const [fetchData, setfetchData] = useState({ data: { data: [] } });
    const [fetchDataId, setfetchDataId] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedBasti, setSelectedBasti] = useState('');
    const [stateValue, setStateValue] = useState('');
    const [districtValue, setDistrictValue] = useState('');
    const [tehsilValue, setTehsilValue] = useState('');
    const [bastiError, setBastiError] = useState(false);

    const [formData, setFormData] = useState({
        StudentCode: "",
        stuyear: "",
        stustate: "",
        studistrict: "",
        stutehsil: "",
        stubasti: "",
        stuvillage: "",
        stuaddress: "",
        stupin: "",
        rep1: "",
        rep2: "",

    })
    const [errors, setErrors] = useState({});
    const { studentCode, year, catgcode } = useParams();

    const handleSearchChange = (selectedOption) => {
        setSearchStudentCode(selectedOption ? selectedOption.value : '');

        // Update studentCode in formData when searchStudentCode changes
        setFormData((prevData) => ({
            ...prevData,
            StudentCode: selectedOption ? selectedOption.value : '',
        }));
    };

    const fetchBastiData = () => {
        console.log("Start");
        fetch('http://localhost:3000/api/v1/bastilist')
            .then(response => response.json())
            .then(data => {
                // Assuming the API response contains basti name, state, and city
                const bastiData = data;

                console.log(bastiData, "dataprint")
                // Parse the json string within the data object and setOptions
                const parsedData = bastiData.data.map(item => JSON.parse(item.Json));
                console.log(parsedData, "parsedData"); // Print the parsed data object in the console
                setOptions(parsedData);

                if (parsedData.length > 0) {
                    // Assuming the API response contains basti name, state, and city
                    const { basti_name, State, District, Tehsil } = parsedData[0];

                    // console.log(basti_name, State, District, "basti_name, State, District")

                    setSelectedBasti(basti_name);
                    setStateValue(State);
                    setDistrictValue(District);
                    setTehsilValue(Tehsil);
                }

            })
            .catch(error => {
                console.error('Error fetching basti data:', error);
            });
    };

    const navigate = useNavigate();
    useEffect(() => {
        fetchBastiData()


        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        const getUserid = localStorage.getItem("UserId")
        setUserId(getUserid)
        fetchUserInfo();


    }, [])



    const fetchUserInfo = async () => {
        console.log('fetch');
        setloading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/v1/getAllData/${studentCode}/${year}/${catgcode}`);
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
            console.log(data.data.data, "Data ============")
            if (data.data.data.length > 0) {
                setfetchData(data.data.data[0]);
                setstuCodeYear(data.data.data);
                setFormData(JSON.parse(data.data.data[0].Json));
                setfetchDataId(JSON.parse(data.data.data[0].Id));
            } else {
                alert("No such user found!");
            }
        } catch (error) {
            console.error('Error fetching student details:', error);
        } finally {
            setloading(false);
        }
    };
    const handleBastiChange = (event) => {
        const selectedBasti = event.target.value;
        setSelectedBasti(selectedBasti);

        const selectedBastiData = options.find(item => item.basti_name === selectedBasti);

        if (selectedBastiData) {
            // Update form data with selected basti details
            setFormData((prevData) => ({
                ...prevData,
                stustate: selectedBastiData.State,
                studistrict: selectedBastiData.District,
                stutehsil: selectedBastiData.Tehsil,
                stubasti: selectedBastiData.basti_name,
            }));
            setBastiError(false); // Clear the error flag
        } else {
            setBastiError(true); // Set the error flag if basti is empty
        }
    };

    const handleSubmit = async (e) => {
        console.log(fetchDataId, "fetchDataId :Handle Start");
        e.preventDefault();

        // Check if any select is not selected
        const errorsObj = {};

        setloading(true);

        try {
            console.log(formData, "sdd");
            const response = await fetch(`http://localhost:3000/api/v1/updateBasicDetail/${fetchDataId}`, {
                method: "PUT", // Assuming you are using PUT for updating
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({

                    data: JSON.stringify(formData),
                }),
            });
            console.log(formData, "After");
            if (!response.ok) {
                console.error("Error:", response.statusText);
                return;
            }

            setloading(false);
            navigate('/studentsList')

        } catch (error) {
            setloading(false);
            console.error("Error:", error.message);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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
                    <div className="mt-2 flex flex-col">
                        <h1 className="font-bold text-gray-900 tracking-tight sm:text-2xl">
                            Student Address Detail {console.log(JSON.stringify(formData), "----------------")}
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="StudentCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                Student Code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    readOnly={true}
                                                    id="StudentCode"
                                                    name="StudentCode"
                                                    defaultValue={formData.StudentCode || (fetchData ? fetchData.StudentCode : "No Data")}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <input
                                                    type="hidden"
                                                    name="catgcode"
                                                    id="catgcode"
                                                    value="ADDR"
                                                />


                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="stuyear" className="block text-sm font-medium leading-6 text-gray-900">
                                                Year
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="stuyear"
                                                    name="stuyear"
                                                    defaultValue={formData.stuyear || (fetchData ? fetchData.AcademicYear : "No Data")}

                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                        }`}
                                                >
                                                    <option >Select Year</option>
                                                    <option value="2023-2024">2023-2024</option>
                                                    <option value="2022-2023">2022-2023</option>
                                                    <option value="2021-2022">2021-2022</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="stubasti" className="block text-sm font-medium leading-6 text-gray-900">
                                                Basti

                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="stubasti"
                                                    name="stubasti"
                                                    value={
                                                        formData.stubasti ||
                                                        (fetchData.Json
                                                            ? JSON.parse(fetchData.Json).stubasti
                                                            : "No Data")
                                                    }
                                                    onChange={handleBastiChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stubasti ? 'border-red-500' : ''
                                                        }`}
                                                >
                                                    {options.map((option, index) => (
                                                        <option
                                                            key={index}
                                                            value={option.basti_name}
                                                            selected={option.basti_name === (formData.stubasti || (fetchData.Json ? JSON.parse(fetchData.Json).stubasti : defaultStubasti))}
                                                        >
                                                            {option.basti_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                State {console.log(selectedBasti.length, "dsdsddsdsds")}
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="stustate"
                                                    id="stustate"

                                                    readOnly
                                                    // defaultValue={
                                                    //     selectedBasti.length !== 0
                                                    //         ?
                                                    //         (fetchData.Json
                                                    //             ? JSON.parse(fetchData.Json).stustate
                                                    //             : "No Data")
                                                    //         :
                                                    //         options.find((b) => b.basti_name === selectedBasti).State
                                                    // }
                                                    value={
                                                        selectedBasti
                                                            ?
                                                            options.find((b) => b.basti_name === selectedBasti).State
                                                            :
                                                            ''
                                                    }
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.StudentCode ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                District
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="studistrict"
                                                    id="studistrict"
                                                    readOnly
                                                    value={selectedBasti ? options.find((b) => b.basti_name === selectedBasti).District : ''}

                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.StudentCode ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Tehsil
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="stutehsil"
                                                    id="stutehsil"
                                                    readOnly
                                                    value={selectedBasti ? options.find((b) => b.basti_name === selectedBasti).Tehsil : ''}

                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.StudentCode ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>


                                        <div className="sm:col-span-3">
                                            <label htmlFor="stuvillage" className="block text-sm font-medium leading-6 text-gray-900">
                                                Village
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="stuvillage"
                                                    value={
                                                        formData.stuvillage ||
                                                        (fetchData.Json
                                                            ? JSON.parse(fetchData.Json).stuvillage
                                                            : "No Data")
                                                    }
                                                    id="stuvillage"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuaddress ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>



                                        <div className="sm:col-span-3">
                                            <label htmlFor="stuaddress" className="block text-sm font-medium leading-6 text-gray-900">
                                                Address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="stuaddress"
                                                    value={
                                                        formData.stuaddress ||
                                                        (fetchData.Json
                                                            ? JSON.parse(fetchData.Json).stuaddress
                                                            : "No Data")
                                                    }
                                                    id="stuaddress"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuaddress ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="stupin" className="block text-sm font-medium leading-6 text-gray-900">
                                                PIN
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="stupin"
                                                    value={
                                                        formData.stupin ||
                                                        (fetchData.Json
                                                            ? JSON.parse(fetchData.Json).stupin
                                                            : "No Data")
                                                    }
                                                    id="stupin"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stupin ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>


                                        <div className="sm:col-span-3">
                                            <label htmlFor="rep1" className="block text-sm font-medium leading-6 text-gray-900">
                                                Representation Mobile Number 1
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="rep1"
                                                    id="rep1"
                                                    value={
                                                        formData.rep1 ||
                                                        (fetchData.Json
                                                            ? JSON.parse(fetchData.Json).rep1
                                                            : "No Data")
                                                    }
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.rep1 ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="rep2" className="block text-sm font-medium leading-6 text-gray-900">
                                                Representation Mobile Number 2
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="rep2"
                                                    value={
                                                        formData.rep2 ||
                                                        (fetchData.Json
                                                            ? JSON.parse(fetchData.Json).rep2
                                                            : "No Data")
                                                    }
                                                    id="rep2"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.rep2 ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Save
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Save & Next
                                </button>
                            </div>
                        </form>
                    </div>
            }
        </section>
    )
}

export default EditStudentAddress