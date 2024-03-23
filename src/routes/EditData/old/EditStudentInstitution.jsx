import React, { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

const EditStudentInstitution = () => {
    const [loading, setloading] = useState(false);
    const [userID, setUserId] = useState('')
    const [academicgetdata, setacademicgetdata] = useState([]);
    const [searchStudentCode, setSearchStudentCode] = useState('');
    const [studentDetails, setStudentDetails] = useState([]);
    const [filteredStudentDetails, setFilteredStudentDetails] = useState([]);
    const [academicData, setAcademicData] = useState([]);
    const [fetchData, setfetchData] = useState({ data: { data: [] } });
    const [fetchDataId, setfetchDataId] = useState('');

    const [institutionType, setInstitutionType] = useState('');
    const [selectedInstitution, setSelectedInstitution] = useState('');

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        StudentCode: "",
        stuyear: "",
        institutiontype: "",
        institutionname: "",
        boardoruniversity: ""
    })
    const [errors, setErrors] = useState({});
    const { studentCode, year, catgcode } = useParams();

    const handleSearchChange = (selectedOption) => {
        setSearchStudentCode(selectedOption ? selectedOption.value : '');

        // Update studentCode in formData when searchStudentCode changes
        setFormData((prevData) => ({
            ...prevData,
            studentcode: selectedOption ? selectedOption.value : '',
        }));
    };

    const filteredInstitutions = academicData.filter(
        (item) => JSON.parse(item.Json).Institution_Type === institutionType
    );
    const fetchUserInfo = async () => {
        console.log('fetch');
        setloading(true);
        try {
            const response = await fetch(`https://apisikligar.azurewebsites.net/api/v1/getAllData/${studentCode}/${year}/${catgcode}`);
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

    useEffect(() => {

        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        const getUserid = localStorage.getItem("UserId")
        setUserId(getUserid)
        fetchAllStudentDetails()
        const fetchData = async () => {
            try {
                const response = await fetch('https://apisikligar.azurewebsites.net/api/v1/instlist');
                const data = await response.json();
                setAcademicData(data.data);

                console.log(data.data, "cheking what data print");
                const formDataJsonString = JSON.stringify(data.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);
    useEffect(() => {
        fetchUserInfo()
        const filteredDetails = studentDetails.filter(
            (detail) => detail.StudentCode.includes(searchStudentCode)
        );
        setFilteredStudentDetails(filteredDetails);
    }, [searchStudentCode, studentDetails]);

    const fetchAllStudentDetails = () => {
        setloading(true);
        fetch('https://apisikligar.azurewebsites.net/api/v1/fetchAllStudentDetails')
            .then(response => response.json())
            .then(data => {
                console.log(data, "data data");
                setStudentDetails(data.data);
                setloading(false);
            })
            .catch(error => {
                console.error('Error fetching student details:', error);
                setloading(false);
            });
    };

    const uniqueInstitutionTypes = [
        // console.log(academicData, "academicData")
        ...new Set(academicData.map((item) => JSON.parse(item.Json).Institution_Type)),
    ];


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleInstitutionTypeChange = (e) => {
        const selectedType = e.target.value;
        setInstitutionType(selectedType);

        // Reset the selected institution when the institution type changes
        setSelectedInstitution('');

        setFormData((prevData) => ({
            ...prevData,
            institutiontype: selectedType,
            institutionname: "",  // Reset institutionname
            boardoruniversity: "",  // Reset boardoruniversity
        }));
    };
    const handleSelectedInstitutionChange = (e) => {
        const selectedName = e.target.value;
        setSelectedInstitution(selectedName);
        // Update formData with selected institutionname and reset boardoruniversity
        setFormData((prevData) => ({
            ...prevData,
            institutionname: selectedName,
            boardoruniversity: "",  // Reset boardoruniversity
        }));
    };



    const handleSubmit = async (e) => {
        console.log(fetchDataId, "fetchDataId :Handle Start");
        e.preventDefault();

        // Check if any select is not selected
        const errorsObj = {};

        setloading(true);

        try {
            console.log(formData, "sdd");
            const response = await fetch(`https://apisikligar.azurewebsites.net/api/v1/updateBasicDetail/${fetchDataId}`, {
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
    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-4">
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
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight sm:text-2xl">
                            Student Institution {studentCode}, {year}, {catgcode}
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Student Code {console.log(JSON.parse(fetchData.Json).institutionname, "fetchData")}
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
                                                    value="INST"
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
                                            <label htmlFor="institutiontype" className="block text-sm font-medium leading-6 text-gray-900">
                                                Institution Type
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="institutiontype"
                                                    name="institutiontype"
                                                    value={formData.institutiontype || (fetchData ? JSON.parse(fetchData.Json).institutiontype : "No Data")}
                                                    // value={institutionType}
                                                    onChange={handleInstitutionTypeChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stubasti ? 'border-red-500' : ''
                                                        }`}
                                                >
                                                    {uniqueInstitutionTypes.map((type, index) => (
                                                        <option
                                                            key={index}
                                                            value={type}
                                                            selected={institutionType === type}
                                                        >
                                                            {type}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>


                                        <div className="sm:col-span-3">
                                            <label htmlFor="institutionname" className="block text-sm font-medium leading-6 text-gray-900">
                                                Institution Name
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="institutionname"
                                                    name="institutionname"
                                                    defaultValue={formData.institutionname || (fetchData ? JSON.parse(fetchData.Json).institutionname : "No Data")}

                                                    // value={selectedInstitution}
                                                    onChange={handleSelectedInstitutionChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stubasti ? 'border-red-500' : ''
                                                        }`}
                                                >
                                                    {filteredInstitutions.map((item, index) => (
                                                        <option
                                                            key={index}
                                                            value={item.id}
                                                            // value={item.json.Institution_Name}
                                                            // selected={selectedInstitution === item.json.Institution_Name}
                                                            selected=
                                                            {
                                                                academicgetdata.length > 0
                                                                    ?
                                                                    academicgetdata[0].Selected_Institution !== null && academicgetdata[0].Selected_Institution !== undefined
                                                                        ?
                                                                        academicgetdata[0].Selected_Institution === item.json.Institution_Name
                                                                            ?
                                                                            "selected" : "" : "" : ""

                                                            }
                                                        >
                                                            {JSON.parse(item.Json).Institution_Name}
                                                            {/* {console.log(JSON.parse(item.json).Institution_Name, "item.json.Institution_Name")} */}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {institutionType && (
                                            <div className="sm:col-span-3">
                                                <label htmlFor="Board" className="block text-sm font-medium leading-6 text-gray-900">
                                                    {institutionType === "School" ? "Board" : "University"}
                                                </label>
                                                <div className="mt-2">

                                                    <select
                                                        name="boardoruniversity"
                                                        id="boardoruniversity"
                                                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stupin ? 'border-red-500' : ''}`}
                                                        onChange={handleInputChange}
                                                    >
                                                        {institutionType === "School" ? (
                                                            <>
                                                                <option value="cbse">CBSE</option>
                                                                <option value="icse">ICSE</option>
                                                                <option value="up board">UP Board</option>
                                                                <option value="punjab board">Punjab Board</option>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <option value="university_1">University 1</option>
                                                                <option value="university_2">University 2</option>
                                                                <option value="university_3">University 3</option>
                                                            </>
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                        )}




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

export default EditStudentInstitution