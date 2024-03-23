import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const StudentFamilyAdd = () => {
    const [userID, setUserId] = useState('')
    const [searchStudentCode, setSearchStudentCode] = useState('');
    const [studentDetails, setStudentDetails] = useState([]);
    const [filteredStudentDetails, setFilteredStudentDetails] = useState([]);
    const [errors, setErrors] = useState({});
    const [options, setoptions] = useState([]);
    const [family2getdata, setfamily2getdata] = useState([]);

    const [loading, setloading] = useState(false);
    const [formData, setFormData] = useState({
        studentcode: "",
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
        Guardian_Name: "",
        Guardian_Education: "",
        Guardian_Occupation: "",
        Guardian_Gross_Income: "",
        Guardian_Aadhar_No: "",
        Guardian_Mobile_No: ""
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllStudentDetails();
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        const getUserid = localStorage.getItem("UserId");
        setUserId(getUserid);
        setfamily2getdata([])
        setoptions([])
    }, [setUserId, navigate]);


    const fetchAllStudentDetails = () => {
        setloading(true);
        fetch('https://apisikligar.azurewebsites.net/api/v1/fetchAllStudentDetails')
            .then(response => response.json())
            .then(data => {
                setStudentDetails(data.data);
                setloading(false);
            })
            .catch(error => {
                console.error('Error fetching student details:', error);
                setloading(false);
            });
    };

    const handleSearchChange = (selectedOption) => {
        const studentkey = selectedOption.value.split("/");
        const studentcode = studentkey[0];
        const stuyear = studentkey[1];
        setSearchStudentCode(selectedOption ? studentcode : '');
        setFormData((prevData) => ({
            ...prevData,
            studentcode: studentcode,
            stuyear: stuyear,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        const { studentcode, stuyear, ...formDataWithoutCodeYear } = formData;

        // Proceed with the second API call
        const response = await fetch("https://apisikligar.azurewebsites.net/api/v1/addStudentData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                UserId: userID,
                StudentCode: formData.studentcode,
                AcademicYear: formData.stuyear,
                CatgCode: 'FMLY',
                data: JSON.stringify(formDataWithoutCodeYear),
            }),
        });

        if (!response.ok) {
            console.error("Error:", response.statusText);
            return;
        }
        setloading(false);
        navigate('/');
    }

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-4">
            {
                loading
                    ?
                    <div className="grid grid-cols-1 lg:grid-cols-1">
                        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md text-black text-center">
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
                            Student Family Detail
                        </p>
                        <form onSubmit={handleSubmit}>
                            {console.log("Submit: ", formData)}
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">

                                        <div className="sm:col-span-3">
                                            <label htmlFor="searchStudentCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                Search Student Code
                                            </label>
                                            <Select
                                                options={studentDetails.map((student) => ({
                                                    value: student.StudentKey,
                                                    label: student.dd_label,
                                                    isDisabled: student.fm_disable === 'Yes'
                                                }))}
                                                //value={searchStudentCode ? { value: searchStudentCode, label: searchStudentCode } : null}
                                                className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                    }`}
                                                onChange={handleSearchChange}
                                            // onChange={(selectedOption) => setSearchStudentCode(selectedOption ? selectedOption.value : '')}
                                            />
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                                Category
                                            </label>
                                            <div className="mt-0">
                                                <select
                                                    id="category"
                                                    name="category"
                                                    value={formData['category']}
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                        }`}
                                                >
                                                    <option >Select Category</option>
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
                                            <div className="mt-0">
                                                <select
                                                    id="Assistance"
                                                    name="Assistance"
                                                    value={formData['Assistance']}
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                        }`}
                                                >
                                                    <option >Select Assistance</option>
                                                    <option value="Medical">Medical</option>
                                                    <option value="Pension">Pension</option>
                                                    <option value="Other">Other</option>
                                                    <option value="None">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3"></div>


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
                                                            placeholder='Father Name (25)'
                                                            maxLength={25}
                                                            aria-describedby="Father_Name"

                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-0">
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
                                                            placeholder='Father Education (25)'
                                                            maxLength={25}
                                                            aria-describedby="Father_Education" />
                                                    </div>
                                                </div>
                                                <div className="mt-0">
                                                    <div className="my-2">

                                                        <label htmlFor="Father_Occupation" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Father Occupation
                                                        </label>

                                                        <input
                                                            type="text"
                                                            onChange={handleInputChange}
                                                            value={formData['Father_Occupation']}
                                                            name='Father_Occupation'

                                                            maxLength={25}
                                                            defaultValue={family2getdata.length > 0 ? family2getdata[0].Father_Occupation != null && family2getdata[0].Father_Occupation != undefined ? family2getdata[0].Father_Occupation : "" : ""} className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="Father_Occupation" placeholder='Father Occupation (25)' aria-describedby="Father_Occupation" />
                                                    </div>
                                                </div>
                                                <div className="mt-0">
                                                    <div className="my-2">
                                                        <label htmlFor="F_Gross_Income" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Father Gross Income (per year)
                                                        </label>
                                                        <input
                                                            onChange={handleInputChange}
                                                            value={formData['F_Gross_Income']}
                                                            type="number"
                                                            name='F_Gross_Income'
                                                            defaultValue={family2getdata.length > 0 ? family2getdata[0].F_Gross_Income != null && family2getdata[0].F_Gross_Income != undefined ? family2getdata[0].F_Gross_Income : "" : ""} className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="F_Gross_Income"
                                                            placeholder='Father Gross Income (15)'
                                                            maxLength={15}
                                                            aria-describedby="F_Gross_Income" />
                                                    </div>
                                                </div>
                                                <div className="mt-0">
                                                    <div className="my-2">
                                                        <label htmlFor="F_Aadhar_No" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Father Aadhar Card Number
                                                        </label>

                                                        <input
                                                            value={formData['F_Aadhar_No']}
                                                            maxLength={15}
                                                            onChange={handleInputChange} type="number" name='F_Aadhar_No' defaultValue={family2getdata.length > 0 ? family2getdata[0].F_Aadhar_No != null && family2getdata[0].F_Aadhar_No != undefined ? family2getdata[0].F_Aadhar_No : "" : ""} className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="F_Aadhar_No" placeholder='Father Aadhar Card Number (15)' aria-describedby="F_Aadhar_No" />
                                                    </div>
                                                </div>

                                                <div className="mt-0">
                                                    <div className="my-2">
                                                        <label htmlFor="F_Mobile_No" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Father Mobile Number
                                                        </label>

                                                        <input
                                                            value={formData['F_Mobile_No']}
                                                            onChange={handleInputChange}
                                                            type="number"
                                                            name='F_Mobile_No'
                                                            maxLength={15}
                                                            defaultValue={family2getdata.length > 0 ? family2getdata[0].F_Mobile_No != null && family2getdata[0].F_Mobile_No != undefined ? family2getdata[0].F_Mobile_No : "" : ""}
                                                            className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="F_Mobile_No" placeholder='Father &#9742;  (15)' aria-describedby="F_Mobile_No" />
                                                    </div>
                                                </div>
                                                <div className="mt-0">
                                                    <label htmlFor="Grandfather_Name" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Grandfather Name
                                                    </label>
                                                    <div className="my-2">
                                                        <input value={formData['Grandfather_Name']} onChange={handleInputChange} type="text" name='Grandfather_Name' defaultValue={family2getdata.length > 0 ? family2getdata[0].Grandfather_Name != null && family2getdata[0].Grandfather_Name != undefined ? family2getdata[0].Grandfather_Name : "" : ""} className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="Grandfather_Name" placeholder='Grandfather Name (25)' maxlength={25} aria-describedby="Grandfather_Name" />
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
                                                    <div className="my-1">
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
                                                            placeholder='Mother Name (25)'
                                                            maxLength={25}
                                                            aria-describedby="Mother_Name" />
                                                    </div>
                                                </div>
                                                <div className="mt-0">
                                                    <div className="my-2">
                                                        <label onChange={handleInputChange} htmlFor="Mother_Education" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Mother Education
                                                        </label>
                                                        <input
                                                            onChange={handleInputChange}
                                                            value={formData['Mother_Education']}
                                                            type="text" name='Mother_Education'
                                                            maxLength={25}
                                                            // defaultValue={family2getdata.length > 0 ? family2getdata[0].Mother_Education != null && family2getdata[0].Mother_Education != undefined ? family2getdata[0].Mother_Education : "" : ""} 
                                                            className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="Mother_Education" placeholder='Mother Education (25)' aria-describedby="Mother_Education" />

                                                    </div>
                                                </div>
                                                <div className="mt-0">
                                                    <div className="my-2">
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
                                                            placeholder='Mother Occupation (25)'
                                                            maxLength={25}
                                                            aria-describedby="Mother_Occupation"

                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-0">
                                                    <div className="my-2">
                                                        <label htmlFor="M_Gross_Income" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Mother Gross Income (per year)
                                                        </label>

                                                        <input
                                                            value={formData['M_Gross_Income']}
                                                            onChange={handleInputChange} type="number" name='M_Gross_Income'
                                                            maxLength={15}
                                                            //  defaultValue={family2getdata.length > 0 ? family2getdata[0].M_Gross_Income != null && family2getdata[0].M_Gross_Income != undefined ? family2getdata[0].M_Gross_Income : "" : ""} 
                                                            className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="M_Gross_Income" placeholder='Mother Gross Income (15)' aria-describedby="M_Gross_Income" />
                                                    </div>
                                                </div>
                                                <div className="mt-0">
                                                    <div className="my-2">
                                                        <label htmlFor="M_Aadhar_No" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Mother Aadhar Card Number
                                                        </label>

                                                        <input value={formData['M_Aadhar_No']}
                                                            onChange={handleInputChange} type="number" name='M_Aadhar_No'
                                                            maxLength={15}
                                                            defaultValue={family2getdata.length > 0 ? family2getdata[0].M_Aadhar_No != null && family2getdata[0].M_Aadhar_No != undefined ? family2getdata[0].M_Aadhar_No : "" : ""}
                                                            className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="M_Aadhar_No" placeholder='Mother Aadhar Card Number (15)' aria-describedby="M_Aadhar_No" />
                                                    </div>
                                                </div>

                                                <div className="mt-0">
                                                    <div className="my-2">
                                                        <label htmlFor="M_Mobile_No" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Mother Mobile Number
                                                        </label>
                                                        <input value={formData['M_Mobile_No']}
                                                            onChange={handleInputChange} type="number" name='M_Mobile_No' defaultValue={family2getdata.length > 0 ? family2getdata[0].M_Mobile_No != null && family2getdata[0].M_Mobile_No != undefined ? family2getdata[0].M_Mobile_No : "" : ""} className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="M_Mobile_No" placeholder='Mother &#9742; (15)' aria-describedby="M_Mobile_No" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='sm:col-span-3'>
                                            <p className="font-bold text-orange-900 tracking-tight sm:text-l">
                                                For Guardian
                                            </p>


                                            <div className="row">
                                                <div className="mt-0">
                                                    <div className="my-2">
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
                                                            maxLength={25}
                                                            placeholder='Guardian Name (25)'
                                                            aria-describedby="Guardian_Name" />
                                                    </div>
                                                </div>
                                                <div className="mt-0">
                                                    <div className="my-2">
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
                                                            maxLength={25}
                                                            placeholder='Guardian Education (25)'
                                                            aria-describedby="Guardian_Education" />
                                                    </div>
                                                </div>
                                                <div className="mt-0">
                                                    <div className="my-2">
                                                        <label htmlFor="Guardian_Occupation" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Guardian Occupation
                                                        </label>

                                                        <input
                                                            value={formData['Guardian_Occupation']}
                                                            type="text"
                                                            name='Guardian_Occupation'
                                                            maxLength={25}
                                                            onChange={handleInputChange}
                                                            //  defaultValue={family2getdata.length > 0 ? family2getdata[0].Guardian_Occupation != null && family2getdata[0].Guardian_Occupation != undefined ? family2getdata[0].Guardian_Occupation : "" : ""} 
                                                            className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                                            id="Guardian_Occupation"
                                                            placeholder='Guardian Occupation (25)'
                                                            aria-describedby="Guardian_Occupation"

                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-0">
                                                    <div className="my-2">
                                                        <label htmlFor="Guardian_Gross_Income" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Guardian Gross Income (per year)
                                                        </label>
                                                        <label for="Guardian_Gross_Income" className="form-label"></label>
                                                        <input
                                                            type="number"
                                                            value={formData['Guardian_Gross_Income']}
                                                            onChange={handleInputChange}
                                                            name='Guardian_Gross_Income'
                                                            maxlength={15}
                                                            // defaultValue={family2getdata.length > 0 ? family2getdata[0].Guardian_Gross_Income != null && family2getdata[0].Guardian_Gross_Income != undefined ? family2getdata[0].Guardian_Gross_Income : "" : ""} 
                                                            className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' id="Gross_Income" placeholder='Guardian Gross Income (15)' aria-describedby="Gross_Income" />
                                                    </div>
                                                </div>
                                                <div className="mt-0">
                                                    <div className="my-2">
                                                        <label htmlFor="Guardian_Aadhar_No" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Guardian Aadhar Card Number
                                                        </label>
                                                        <input value={formData['Guardian_Aadhar_No']}
                                                            type="number" name='Guardian_Aadhar_No'
                                                            onChange={handleInputChange}
                                                            // defaultValue={family2getdata.length > 0 ? family2getdata[0].Guardian_Aadhar_No != null && family2getdata[0].Guardian_Aadhar_No != undefined ? family2getdata[0].Guardian_Aadhar_No : "" : ""}
                                                            className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                                            id="Guardian_Aadhar_No"
                                                            placeholder='Guardian Aadhar Card Number (15)'
                                                            aria-describedby="Guardian_Aadhar_No" />
                                                    </div>
                                                </div>

                                                <div className="mt-0">
                                                    <div className="my-2">
                                                        <label htmlFor="Guardian_Mobile_No" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Guardian Mobile Number
                                                        </label>
                                                        <input
                                                            value={formData['Guardian_Mobile_No']}
                                                            type="number"
                                                            onChange={handleInputChange}
                                                            name='Guardian_Mobile_No'
                                                            // defaultValue={family2getdata.length > 0 ? family2getdata[0].Guardian_Mobile_No != null && family2getdata[0].Guardian_Mobile_No != undefined ? family2getdata[0].Guardian_Mobile_No : "" : ""}
                                                            className='block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                                            id="Guardian_Mobile_No."
                                                            maxlength={15}
                                                            placeholder='Guardian &#9742; (15)'
                                                            aria-describedby="Guardian_Mobile_No." />
                                                    </div>
                                                </div>
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
                                    disabled={!formData.studentcode || !formData.stuyear}
                                    style={{ opacity: formData.studentcode && formData.stuyear ? 1 : 0.5 }}
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
export default StudentFamilyAdd