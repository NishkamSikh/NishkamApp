import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom'
import Select from 'react-select';

const StudentFamilyEdit = () => {
    const [userID, setUserId] = useState('')
    const [searchStudentCode, setSearchStudentCode] = useState('');
    const [studentDetails, setStudentDetails] = useState([]);
    const [filteredStudentDetails, setFilteredStudentDetails] = useState([]);
    const [errors, setErrors] = useState({});
    const [options, setoptions] = useState([]);
    const [family2getdata, setfamily2getdata] = useState([]);
    const [fetchData, setfetchData] = useState({ data: { data: [] } });
    const [fetchDataId, setfetchDataId] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [AnyAssi, setAnyAssi] = useState([]);
    const [selectedAssistanceOptions, setSelectedAssistanceOptions] = useState([]);
    const [loading, setloading] = useState(false);
    const [formData, setFormData] = useState({
        StudentCode: "",
        stuyear: "",
        category: "",
        Assistance: "",
        Father_Name: "",
        Father_Education: "",
        Father_Occupation: "",
        F_Gross_Income: "",
        F_Aadhar_No: "",
        F_Mobile_No: "",
        Grandfather_Name: "",
        Mother_Name: "",
        Mother_Education: "",
        Mother_Occupation: "",
        M_Aadhar_No: "",
        M_Mobile_No: "",
        M_Gross_Income: "",
        Guardian_Name: "",
        Guardian_Education: "",
        Guardian_Occupation: "",
        Guardian_Gross_Income: "",
        Guardian_Aadhar_No: "",
        Guardian_Mobile_No: ""
    })
    const anyAssistance = [
        {
            id: "1",
            option: "Medical",
        },
        {
            id: "2",
            option: "Pension",
        },
        {
            id: "3",
            option: "Other",
        },
        {
            id: "3",
            option: "None",
        }

    ];
    const { studentCode, year, catgcode } = useParams();
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserInfo();
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        const getUserid = localStorage.getItem("UserId");
        setUserId(getUserid);
        setfamily2getdata([])
        setoptions([])
    }, [setUserId, navigate]);


    const fetchUserInfo = async () => {
        console.log('fetch');
        setloading(true);
        try {
            const response = await fetch(`https://sikligarapi.azurewebsites.net/api/v1/getSingleStudentFamily/${JSON.parse(searchParams.get('Id'))}`);
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
            if (data.data.length > 0) {
                setfetchData(data.data[0]);
                setFormData(data.data[0]);
                setSelectedAssistanceOptions(JSON.parse(data.data[0].AssistanceArray));
            } else {
                alert("No such user found!");
            }
        } catch (error) {
            console.error('Error fetching student details:', error);
        } finally {
            setloading(false);
        }
    };


const isEmpty = function(obj) {
    if (obj == null) return true;
    if (obj.constructor.name == "Array" || obj.constructor.name == "String") return obj.length === 0;
    for (var key in obj) if (isEmpty(obj[key])) return true;
    return false;
  }

    const handleAssistanceChange = (selectedOptions) => {
        if(!isEmpty(selectedOptions))  setSelectedAssistanceOptions(selectedOptions);

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { StudentCode, StudentId, AcademicYear, CatgCode, FirstName, LastName, MiddleName, DOB, FamilyId,AssistanceArray, ...formDataWithoutCodeYear } = formData;

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
                    data: JSON.stringify(
                        {
                            ...formDataWithoutCodeYear,
                            Assistance: selectedAssistanceOptions,
                        }
                    ),
                }),
            });
            if (!response.ok) {
                console.error("Error:", response.statusText);
                return;
            }
            if (searchParams.get('flag') == "family") {
                navigate(`/StudentSummaryDetail?id=${JSON.parse(searchParams.get('proId'))}`)
            } else {
                navigate('/StudentFamilyList')
            }

            setloading(false);
            // navigate('/StudentFamilyList')

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
                    <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                        <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-4 h-10 w-10"></div>
                    </div>
                    :
                    <div className="mt-0 flex flex-col">
                        <p className="font-bold text-orange-900 tracking-tight text-1xl">
                            Edit - Student Family Data
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-bold bg-blue-500 leading-6 text-white">
                                                Student Code: {formData.StudentCode} / {formData.AcademicYear} / {formData.FirstName} {formData.MiddleName} {formData.LastName} / {formData.DOB}

                                            </label>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <div className="mt-1">

                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                            Category
                                            </label>
                                            <div className="mt-1">
                                                <select
                                                    id="category"
                                                    name="category"
                                                    value={
                                                        formData.category ||
                                                        (fetchData.Json
                                                            ? JSON.parse(fetchData.Json).Category
                                                            : "No Data")
                                                    }
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                        }`}
                                                >
                                                    <option value="">Select Category</option>
                                                    <option value="SC">SC</option>
                                                    <option value="ST">ST</option>
                                                    <option value="OBC">OBC</option>
                                                    <option value="General">General</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="Assistance" className="block text-sm font-medium leading-6 text-gray-900">
                                                Any Assistance
                                            </label>
                                           {/* { alert(typeof JSON.parse(selectedAssistanceOptions)) } */}
                                            <div className="mt-0">
                                                <Select
                                                    options={anyAssistance && anyAssistance.map((student) => ({
                                                        value: student.option,
                                                        label: student.option,
                                                    }))}
                                                    id="Assistance"
                                                    name="Assistance"
                                                    className='block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                                    isMulti={true}
                                                    value={selectedAssistanceOptions}
                                                    onChange={handleAssistanceChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <p className="font-bold text-orange-900 tracking-tight text-1xl">
                                                For Father
                                            </p>
                                            <div >
                                                <div className="mt-1">
                                                    <div className="">
                                                        <label htmlFor="Father_Name" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Father Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            onChange={handleInputChange}
                                                            name='Father_Name'
                                                            value={formData['Father_Name']}
                                                            defaultValue={family2getdata.length > 0 ? family2getdata[0].Father_Name != null && family2getdata[0].Father_Name != undefined ? family2getdata[0].Father_Name : "" : ""}
                                                            className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                                }`}
                                                            id="form-control"
                                                            placeholder='Father Name'
                                                            aria-describedby="Father_Name"

                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-1">
                                                    <div className="">
                                                        <label htmlFor="Father_Education" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Father Education
                                                        </label>
                                                        <input
                                                            type="text"
                                                            onChange={handleInputChange}
                                                            name='Father_Education'
                                                            value={formData['Father_Education']}
                                                            defaultValue={family2getdata.length > 0 ? family2getdata[0].Father_Education != null && family2getdata[0].Father_Education != undefined ? family2getdata[0].Father_Education : "" : ""}
                                                            className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                                            id="Father_Education"
                                                            placeholder='Father Education'
                                                            aria-describedby="Father_Education" />
                                                    </div>
                                                </div>
                                                <div className="mt-1">
                                                    <div className="">

                                                        <label htmlFor="Father_Occupation" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Father Occupation
                                                        </label>

                                                        <input
                                                            type="text"
                                                            onChange={handleInputChange}
                                                            value={formData['Father_Occupation']}
                                                            name='Father_Occupation'
                                                            defaultValue={family2getdata.length > 0 ? family2getdata[0].Father_Occupation != null && family2getdata[0].Father_Occupation != undefined ? family2getdata[0].Father_Occupation : "" : ""} className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="Father_Occupation" placeholder='Father Occupation' aria-describedby="Father_Occupation" />
                                                    </div>
                                                </div>
                                                <div className="mt-1">
                                                    <div className="">
                                                        <label htmlFor="F_Gross_Income" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Father Gross Income (per year)
                                                        </label>
                                                        <input
                                                            onChange={handleInputChange}
                                                            value={formData['F_Gross_Income']}
                                                            type="text" name='F_Gross_Income' defaultValue={family2getdata.length > 0 ? family2getdata[0].F_Gross_Income != null && family2getdata[0].F_Gross_Income != undefined ? family2getdata[0].F_Gross_Income : "" : ""} className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="F_Gross_Income" placeholder='Father Gross Income' aria-describedby="F_Gross_Income" />
                                                    </div>
                                                </div>
                                                <div className="mt-1">
                                                    <div className="">
                                                        <label htmlFor="F_Aadhar_No" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Father Aadhar Card Number
                                                        </label>

                                                        <input
                                                            value={formData['F_Aadhar_No']}
                                                            onChange={handleInputChange} type="text" name='F_Aadhar_No' defaultValue={family2getdata.length > 0 ? family2getdata[0].F_Aadhar_No != null && family2getdata[0].F_Aadhar_No != undefined ? family2getdata[0].F_Aadhar_No : "" : ""} className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="F_Aadhar_No" placeholder='Father Aadhar Card Number' aria-describedby="F_Aadhar_No" />
                                                    </div>
                                                </div>

                                                <div className="mt-1">
                                                    <div className="">
                                                        <label htmlFor="F_Mobile_No" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Father Mobile Number
                                                        </label>

                                                        <input value={formData['F_Mobile_No']}
                                                            onChange={handleInputChange} type="text" name='F_Mobile_No' defaultValue={family2getdata.length > 0 ? family2getdata[0].F_Mobile_No != null && family2getdata[0].F_Mobile_No != undefined ? family2getdata[0].F_Mobile_No : "" : ""} className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="F_Mobile_No" placeholder='Father Mobile Number' aria-describedby="F_Mobile_No" />
                                                    </div>
                                                </div>
                                                <div className="hidden mt-1">
                                                    <label htmlFor="Grandfather_Name" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Grandfather Name
                                                    </label>
                                                    <div className="">
                                                        <input value={formData['Grandfather_Name']} onChange={handleInputChange} type="text" name='Grandfather_Name' defaultValue={family2getdata.length > 0 ? family2getdata[0].Grandfather_Name != null && family2getdata[0].Grandfather_Name != undefined ? family2getdata[0].Grandfather_Name : "" : ""} className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="Grandfather_Name" placeholder='Grandfather Name' aria-describedby="Grandfather_Name" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="sm:col-span-3">
                                            <p className="font-bold text-orange-900 tracking-tight text-1xl">
                                                For Mother
                                            </p>

                                            <div className="row">
                                                <div className="mt-1">
                                                    <div className="">
                                                        <label onChange={handleInputChange} htmlFor="Mother_Name" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Mother Name
                                                        </label>
                                                        <input
                                                            value={formData['Mother_Name']}
                                                            type="text"
                                                            name='Mother_Name'
                                                            onChange={handleInputChange}
                                                            // defaultValue={family2getdata.length > 0 ? family2getdata[0].Mother_Name != null && family2getdata[0].Mother_Name != undefined ? family2getdata[0].Mother_Name : "" : ""} 
                                                            className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                                            id="form-control"
                                                            placeholder='Mother Name'
                                                            aria-describedby="Mother_Name" />
                                                    </div>
                                                </div>
                                                <div className="hidden mt-1">
                                                    <div className="">
                                                        <label onChange={handleInputChange} htmlFor="Mother_Education" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Mother Education
                                                        </label>
                                                        <input
                                                            onChange={handleInputChange}
                                                            value={formData['Mother_Education']}
                                                            type="text" name='Mother_Education'
                                                            // defaultValue={family2getdata.length > 0 ? family2getdata[0].Mother_Education != null && family2getdata[0].Mother_Education != undefined ? family2getdata[0].Mother_Education : "" : ""} 
                                                            className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="Mother_Education" placeholder='Mother Education' aria-describedby="Mother_Education" />

                                                    </div>
                                                </div>
                                                <div className="mt-1">
                                                    <div className="">
                                                        <label htmlFor="Mother_Occupation" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Mother Occupation
                                                        </label>

                                                        <input
                                                            type="text"
                                                            name='Mother_Occupation'
                                                            // defaultValue={family2getdata.length > 0 ? family2getdata[0].Mother_Occupation != null && family2getdata[0].Mother_Occupation != undefined ? family2getdata[0].Mother_Occupation : "" : ""} 
                                                            className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                                            id="Mother_Occupation"
                                                            onChange={handleInputChange}
                                                            value={formData['Mother_Occupation']}
                                                            placeholder='Mother Occupation'
                                                            aria-describedby="Mother_Occupation"

                                                        />
                                                    </div>
                                                </div>
                                                <div className="hidden mt-1">
                                                    <div className="">
                                                        <label htmlFor="M_Gross_Income" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Mother Gross Income (per year)
                                                        </label>

                                                        <input
                                                            value={formData['M_Gross_Income']}
                                                            onChange={handleInputChange} type="text" name='M_Gross_Income'
                                                            //  defaultValue={family2getdata.length > 0 ? family2getdata[0].M_Gross_Income != null && family2getdata[0].M_Gross_Income != undefined ? family2getdata[0].M_Gross_Income : "" : ""} 
                                                            className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="M_Gross_Income" placeholder='Mother Gross Income' aria-describedby="M_Gross_Income" />
                                                    </div>
                                                </div>
                                                <div className="hidden mt-1">
                                                    <div className="">
                                                        <label htmlFor="M_Aadhar_No" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Mother Aadhar Card Number
                                                        </label>

                                                        <input value={formData['M_Aadhar_No']}
                                                            onChange={handleInputChange} type="text" name='M_Aadhar_No'
                                                            defaultValue={family2getdata.length > 0 ? family2getdata[0].M_Aadhar_No != null && family2getdata[0].M_Aadhar_No != undefined ? family2getdata[0].M_Aadhar_No : "" : ""}
                                                            className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="M_Aadhar_No" placeholder='Mother Aadhar Card Number' aria-describedby="M_Aadhar_No" />
                                                    </div>
                                                </div>

                                                <div className="hidden mt-1">
                                                    <div className="">
                                                        <label htmlFor="M_Mobile_No" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Mother Mobile Number
                                                        </label>
                                                        <input value={formData['M_Mobile_No']}
                                                            onChange={handleInputChange} type="text" name='M_Mobile_No' defaultValue={family2getdata.length > 0 ? family2getdata[0].M_Mobile_No != null && family2getdata[0].M_Mobile_No != undefined ? family2getdata[0].M_Mobile_No : "" : ""} className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="M_Mobile_No" placeholder='Mother Mobile Number' aria-describedby="M_Mobile_No" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='hidden sm:col-span-3'>
                                            <p className="font-bold text-orange-900 tracking-tight text-1xl">
                                                For Guardian
                                            </p>


                                            <div className="row">
                                                <div className="mt-1">
                                                    <div className="">
                                                        <label htmlFor="Guardian_Name" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Guardian Name
                                                        </label>

                                                        <input
                                                            value={formData['Guardian_Name']}
                                                            type="text"
                                                            name='Guardian_Name'
                                                            onChange={handleInputChange}
                                                            //  defaultValue={family2getdata.length > 0 ? family2getdata[0].Guardian_Name != null && family2getdata[0].Guardian_Name != undefined ? family2getdata[0].Guardian_Name : "" : ""} 
                                                            className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                                            id="form-control"
                                                            placeholder='Guardian Name'
                                                            aria-describedby="Guardian_Name" />
                                                    </div>
                                                </div>
                                                <div className="mt-1">
                                                    <div className="">
                                                        <label htmlFor="Guardian_Education" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Guardian Education
                                                        </label>

                                                        <input
                                                            value={formData['Guardian_Education']}
                                                            type="text"
                                                            name='Guardian_Education'
                                                            onChange={handleInputChange}
                                                            //  defaultValue={family2getdata.length > 0 ? family2getdata[0].Guardian_Education != null && family2getdata[0].Guardian_Education != undefined ? family2getdata[0].Guardian_Education : "" : ""} 
                                                            className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                                            id="form-control"
                                                            placeholder='Guardian Education'
                                                            aria-describedby="Guardian_Education" />
                                                    </div>
                                                </div>
                                                <div className="mt-1">
                                                    <div className="">
                                                        <label htmlFor="Guardian_Occupation" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Guardian Occupation
                                                        </label>

                                                        <input
                                                            value={formData['Guardian_Occupation']}
                                                            type="text"
                                                            name='Guardian_Occupation'
                                                            onChange={handleInputChange}
                                                            //  defaultValue={family2getdata.length > 0 ? family2getdata[0].Guardian_Occupation != null && family2getdata[0].Guardian_Occupation != undefined ? family2getdata[0].Guardian_Occupation : "" : ""} 
                                                            className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                                            id="Guardian_Occupation"
                                                            placeholder='Guardian Occupation'
                                                            aria-describedby="Guardian_Occupation"

                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-1">
                                                    <div className="">
                                                        <label htmlFor="Guardian_Gross_Income" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Guardian Gross Income (per year)
                                                        </label>
                                                        <label for="Guardian_Gross_Income" className="form-label"></label>
                                                        <input
                                                            type="text"
                                                            value={formData['Guardian_Gross_Income']}
                                                            onChange={handleInputChange}
                                                            name='Guardian_Gross_Income'
                                                            // defaultValue={family2getdata.length > 0 ? family2getdata[0].Guardian_Gross_Income != null && family2getdata[0].Guardian_Gross_Income != undefined ? family2getdata[0].Guardian_Gross_Income : "" : ""} 
                                                            className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="Gross_Income" placeholder='Guardian Gross Income' aria-describedby="Gross_Income" />
                                                    </div>
                                                </div>
                                                <div className="mt-1">
                                                    <div className="">
                                                        <label htmlFor="Guardian_Aadhar_No" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Guardian Aadhar Card Number
                                                        </label>
                                                        <input value={formData['Guardian_Aadhar_No']}
                                                            type="text" name='Guardian_Aadhar_No'
                                                            onChange={handleInputChange}
                                                            // defaultValue={family2getdata.length > 0 ? family2getdata[0].Guardian_Aadhar_No != null && family2getdata[0].Guardian_Aadhar_No != undefined ? family2getdata[0].Guardian_Aadhar_No : "" : ""}
                                                            className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                                            id="Guardian_Aadhar_No"
                                                            placeholder='Guardian Aadhar Card Number'
                                                            aria-describedby="Guardian_Aadhar_No" />
                                                    </div>
                                                </div>

                                                <div className="mt-1">
                                                    <div className="">
                                                        <label htmlFor="Guardian_Mobile_No" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Guardian Mobile Number
                                                        </label>
                                                        <input
                                                            value={formData['Guardian_Mobile_No']}
                                                            type="text"
                                                            onChange={handleInputChange}
                                                            name='Guardian_Mobile_No'
                                                            // defaultValue={family2getdata.length > 0 ? family2getdata[0].Guardian_Mobile_No != null && family2getdata[0].Guardian_Mobile_No != undefined ? family2getdata[0].Guardian_Mobile_No : "" : ""}
                                                            className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                                            id="Guardian_Mobile_No."
                                                            placeholder='Guardian Mobile Number'
                                                            aria-describedby="Guardian_Mobile_No." />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-1 flex items-center justify-end gap-x-6">
                                <button type="button" onClick={() => navigate("/StudentFamilyList")} className="text-sm font-semibold leading-6 text-grey-900">
                                    Cancel
                                </button>
                               
                                <button
                                    type="submit"
                                    disabled={!formData.Father_Name}
                                    style={{ opacity: formData.Father_Name ? 1 : 0.5 }}                                   
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

export default StudentFamilyEdit