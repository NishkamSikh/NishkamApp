import React, { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { useSearchParams } from 'react-router-dom'

const StudentInstitutionEdit = () => {
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
    const [boardoruniversity, setboardoruniversity] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

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
        console.log("Data fetch");
        setloading(true);
        try {
            console.log("Data ============", JSON.parse(searchParams.get('Id')))
            const response = await fetch(`https://nishkamapi.onrender.com/api/v1/getSingleStudentInst/${JSON.parse(searchParams.get('Id'))}`);
            if (!response.ok) {
                if (response.status === 404) {
                    // Handle specific HTTP status codes
                    alert("User not found!");
                } else {
                    throw new Error(`Error fetching student details: ${response.statusText}`);
                }
            }
            const data = await response.json();


            console.log(data, "Data ============")
            // Initialize fetchData with the expected structure
            console.log("Data:", data.data[0]);
            if (data.data.length > 0) {
                setInstitutionType(data.data[0].institutiontype);
                setSelectedInstitution(data.data[0].institutionname);
                setboardoruniversity(data.data[0].boardoruniversity);

                setfetchData(data.data[0]);
                setFormData(data.data[0]);
                // setfetchDataId(JSON.parse(data.data[0].Id));
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
        fetchUserInfo()
        fetchAllStudentDetails()
        const fetchData = async () => {
            try {
                const response = await fetch('https://nishkamapi.onrender.com/api/v1/instlist');
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


    const fetchAllStudentDetails = () => {
        setloading(true);
        fetch('https://nishkamapi.onrender.com/api/v1/fetchAllStudentDetails')
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
        console.log(name, value, "Ssddf===fd ");
    
        // If the changed input is the Board dropdown, update the corresponding state
        if (name == "boardoruniversity") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        } else {
            // For other inputs, update the form data as usual
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleInstitutionTypeChange = (e) => {
        const selectedType = e.target.value;
        setInstitutionType(selectedType);

        // Reset the selected institution when the institution type changes
        setSelectedInstitution('');

        setFormData((prevData) => ({
            ...prevData,
            institutiontype: selectedType,
            // institutionname: "",  // Reset institutionname
            // boardoruniversity: "",  // Reset boardoruniversity
        }));
    };
    const handleSelectedInstitutionChange = (e) => {
        const selectedName = e.target.value;
        setSelectedInstitution(selectedName);
        // Update formData with selected institutionname and reset boardoruniversity
        setFormData((prevData) => ({
            ...prevData,
            institutionname: selectedName,
        }));
    };

   const handleSubmit = async (e) => {
    console.log(formData, "fetchDataId :Handle Start");
    e.preventDefault();
    const { StudentCode, stuyear, ...formDataWithoutCodeYear } = formData;
    // Check if any select is not selected
    const errorsObj = {};

    setloading(true);

    try {
        //console.log(formData, searchParams.get('Id'), "before");

        const response = await fetch(`https://nishkamapi.onrender.com/api/v1/updateBasicDetail/${JSON.parse(searchParams.get('Id'))}`, {
            method: "PUT", // Assuming you are using PUT for updating
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: formDataWithoutCodeYear,
            }),
        });
        console.log(formData, "After");
        
        if (!response.ok) {
            console.error("Error:", response.statusText);
            return;
        }


        if(searchParams.get('flag') == "institution"){
            navigate(`/StudentSummaryDetail?id=${JSON.parse(searchParams.get('proId'))}`)
        }else {
            navigate('/StudentInstitutionList')
        }


    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        setloading(false);
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
                    <div className="mt-0 flex flex-col">
                        <p className="font-bold text-orange-900 tracking-tight text-1xl">
                            Edit - Student Institution Data 
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-bold bg-blue-500 leading-6 text-white">
                                                Student Code: {formData.StudentCode} / {formData.AcademicYear} / {formData.FirstName} {formData.MiddleName} {formData.LastName} / {formData.DOB}
                                            </label>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="institutiontype" className="block text-sm font-medium leading-6 text-gray-900">
                                                Institution Type
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="institutiontype"
                                                    name="institutiontype"
                                                    defaultValue={
                                                        formData.institutiontype ||
                                                        (fetchData.Json
                                                            ? JSON.parse(fetchData.Json).institutiontype
                                                            : "No Data")
                                                    }
                                                    // value={formData.institutiontype || (fetchData ? JSON.parse(fetchData.Json).institutiontype : "No Data")}
                                                    // value={institutionType}
                                                    onChange={handleInstitutionTypeChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stubasti ? 'border-red-500' : ''
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

                                                    value={selectedInstitution}
                                                    onChange={handleSelectedInstitutionChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stubasti ? 'border-red-500' : ''
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
                                                        value={boardoruniversity}
                                                        className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stupin ? 'border-red-500' : ''}`}
                                                        onChange={handleInputChange}
                                                    >
                                                        {institutionType === "School" ? (
                                                            <>
                                                                <option value="CBSE">CBSE</option>
                                                                <option value="ICSE">ICSE</option>
                                                                <option value="UP Board">UP Board</option>
                                                                <option value="Punjab Board">Punjab Board</option>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <option value="University_1">University 1</option>
                                                                <option value="University_2">University 2</option>
                                                                <option value="University_3">University 3</option>
                                                            </>
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-end gap-x-6">
                                <button type="button" onClick={() => navigate("/StudentInstitutionList")} className="text-sm font-semibold leading-6 text-grey-900">
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

export default StudentInstitutionEdit