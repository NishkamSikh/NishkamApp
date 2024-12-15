import React, { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { useSearchParams } from 'react-router-dom'

const StudentAddressEdit = () => {
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
    const [searchParams, setSearchParams] = useSearchParams();

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

    const navigate = useNavigate();
    useEffect(() => {

        // console.log(formData.stubasti, "formData.stubasti");
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        const getUserid = localStorage.getItem("UserId")
        setUserId(getUserid)
        fetchUserInfo();
        // fetchBastiData()

        // Trigger handleBastiChange with the default value of Basti
    }, [])

    const fetchUserInfo = async () => {


        setloading(true);
        try {

            const fetchbastilist = await fetch('https://sikligarapi.azurewebsites.net/api/v1/bastilist2');
            if (!fetchbastilist.ok) {
                if (fetchbastilist.status === 404) {
                    // Handle specific HTTP status codes
                    alert("Basti List not found!");
                } else {
                    throw new Error(`Error fetching student details: ${fetchbastilist.statusText}`);
                }
            }
            const bastidata = await fetchbastilist.json();
            const parsedData = bastidata.data.map(item => item);
            console.log(bastidata, JSON.parse(searchParams.get('Id')), parsedData, "In Try Folde");
            setOptions(parsedData);
            const response = await fetch(`https://sikligarapi.azurewebsites.net/api/v1/getSingleStudentAddress/${JSON.parse(searchParams.get('Id'))}`);
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
            console.log(data.data, "Data====")
            if (data.data.length > 0) {
                const fetchbasti = data.data[0].stubasti
                console.log(parsedData, "parsedData");

                // Use parsedData.data for finding the matching item
                const bastimatch = parsedData.find(b => b.BastiId == fetchbasti);
                console.log("bastimatch", bastimatch, "bastimatch =========");
                console.log("data.data[0]", data.data[0]);
                
                setSelectedBasti(bastimatch.BastiId)
                setfetchData(data.data[0]);
                setFormData(data.data[0]);
                // setfetchDataId(JSON.parse(data.data.data[0].Id));
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
        // console.log(fetchData, "basti Change");

        setSelectedBasti(selectedBasti);

        const selectedBastiData = options.find(item => item.BastiId == selectedBasti);
        console.log(selectedBastiData, "selectedBastiData");
        if (selectedBastiData) {
            // Update form data with selected basti details
            setFormData((prevData) => ({
                ...prevData,
                stustate: selectedBastiData.State,
                studistrict: selectedBastiData.District,
                stutehsil: selectedBastiData.Tehsil,
                stubasti: selectedBastiData.BastiId,
            }));
            setBastiError(false); // Clear the error flag
        } else {
            setBastiError(true); // Set the error flag if basti is empty
        }
    };

    const handleSubmit = async (e) => {
        // console.log(fetchDataId, "fetchDataId :Handle Start");
        e.preventDefault();
        const { StudentCode, StudentId, AcademicYear, CatgCode, FirstName, LastName, MiddleName, DOB, AddressId, ...formDataWithoutCodeYear } = formData;

        // Check if any select is not selected
        const errorsObj = {};

        setloading(true);

        try {
            const response = await fetch(`https://sikligarapi.azurewebsites.net/api/v1/updateBasicDetail/${JSON.parse(searchParams.get('Id'))}`, {
                method: "PUT", // Assuming you are using PUT for updating
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({

                    data: JSON.stringify(formDataWithoutCodeYear),
                }),
            });
            if (!response.ok) {
                console.error("Error:", response.statusText);
                return;
            }
            if (searchParams.get('flag') == "address") {
                navigate(`/StudentSummaryDetail?id=${JSON.parse(searchParams.get('proId'))}`)
            } else {
                navigate('/StudentAddressList')
            }

            setloading(false);
            // navigate('/studentAddressList')

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
                    <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                        <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-4 h-10 w-10"></div>
                    </div>
                    :
                    <div className="mt-2 flex flex-col">
                        <p className="font-bold text-orange-900 tracking-tight text-1xl">
                            Edit - Student Address Data
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">

                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-bold bg-blue-500 leading-6 text-white">
                                                Student Code: {formData.StudentCode} / {formData.AcademicYear} / {formData.FirstName} {formData.MiddleName} {formData.LastName} / {formData.DOB}
                                            </label>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="stubasti" className="block text-sm font-medium leading-6 text-gray-900">
                                                Basti

                                            </label>
                                            <div className="mt-1">
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
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stubasti ? 'border-red-500' : ''
                                                        }`}
                                                >
                                                    {options.map((option, index) => (
                                                        <option
                                                            key={index}
                                                            value={option.BastiId}
                                                        // selected={option.basti_name === (formData.stubasti || (fetchData.Json ? JSON.parse(fetchData.Json).stubasti : defaultStubasti))}
                                                        >
                                                            {option.BastiName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                State {console.log(options, "options ========")}
                                                {console.log(selectedBasti
                                                    ?
                                                    options.find((b) => b.BastiId == selectedBasti).State
                                                    :
                                                    '', "selectedBasti ========")}
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="stustate"
                                                    id="stustate"
                                                    readOnly
                                                    value={
                                                        selectedBasti
                                                            ?
                                                            options.find((b) => b.BastiId == selectedBasti).State
                                                            :
                                                            ''
                                                    }
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.StudentCode ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                District
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="studistrict"
                                                    id="studistrict"
                                                    readOnly
                                                    value={selectedBasti ? options.find((b) => b.BastiId == selectedBasti).District : ''}

                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.StudentCode ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Tehsil
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="stutehsil"
                                                    id="stutehsil"
                                                    readOnly
                                                    value={selectedBasti ? options.find((b) => b.BastiId == selectedBasti).Tehsil : ''}

                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.StudentCode ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>


                                        <div className="sm:col-span-3">
                                            <label htmlFor="stuvillage" className="block text-sm font-medium leading-6 text-gray-900">
                                                Village
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="stuvillage"
                                                    value={formData.stuvillage}
                                                    id="stuvillage"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuaddress ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="stuaddress" className="block text-sm font-medium leading-6 text-gray-900">
                                                Address
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="stuaddress"
                                                    value={formData.stuaddress}
                                                    id="stuaddress"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuaddress ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="stupin" className="block text-sm font-medium leading-6 text-gray-900">
                                                PIN
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="Number"
                                                    maxLength={6}
                                                    name="stupin"
                                                    value={formData.stupin}
                                                    id="stupin"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stupin ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>


                                        <div className="sm:col-span-3">
                                            <label htmlFor="rep1" className="block text-sm font-medium leading-6 text-gray-900">
                                                Rep-1 &#9742;
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="Number"
                                                    maxLength={10}
                                                    name="rep1"
                                                    id="rep1"
                                                    value={formData.rep1}
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.rep1 ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="rep2" className="block text-sm font-medium leading-6 text-gray-900">
                                                Rep-2 &#9742;
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="Number"
                                                    maxLength={10}
                                                    name="rep2"
                                                    value={formData.rep2}
                                                    id="rep2"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.rep2 ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="mt-1 flex items-center justify-end gap-x-6">
                                <button type="button" onClick={() => navigate("/StudentAddressList")} className="text-sm font-semibold leading-6 text-grey-900">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!formData.stuaddress || !formData.stustate || !formData.stubasti}
                                    style={{ opacity: formData.stuaddress && formData.stustate && formData.stubasti ? 1 : 0.5 }}
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

export default StudentAddressEdit