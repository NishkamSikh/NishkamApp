import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const StudentTutorAdd = () => {
    const [loading, setloading] = useState(false);
    const [userID, setUserId] = useState('')
    const [academicgetdata, setacademicgetdata] = useState([]);
    const [searchStudentCode, setSearchStudentCode] = useState('');
    const [searchTutorStudentCode, setSearchTutorStudentCode] = useState('');
    const [studentDetails, setStudentDetails] = useState([]);
    const [tutorDetails, setTutorDetails] = useState([]);
    const [filteredStudentDetails, setFilteredStudentDetails] = useState([]);
    const [academicData, setAcademicData] = useState([]);

    const [stuStatus, setStuStatus] = useState('');
    const [selectedInstitution, setSelectedInstitution] = useState('');

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        studentcode: "",
        stuyear: "",
        institutiontype: "",
        institutionname: "",
        institutionid: "",
        boardoruniversity: ""
    })
    const [errors, setErrors] = useState({});

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
    const handleTutorSearchChange = (selectedOption) => {
        console.log("selectedOption:", selectedOption.value);
        setSearchTutorStudentCode(selectedOption.value);

        // const studentkey = selectedOption.value.split("/");
        // const studentcode = studentkey[0];
        // const stuyear = studentkey[1];
        // setFormData((prevData) => ({
        //     ...prevData,
        //     studentcode: studentcode,
        //     stuyear: stuyear,
        // }));
    };

    // const filteredInstitutions = academicData.filter(
    //     (item) => JSON.parse(item.Json).Institution_Type === institutionType
    // );

    useEffect(() => {
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        const getUserid = localStorage.getItem("UserId")
        setUserId(getUserid)
        fetchAllStudentDetails()
        fetchAllTutors()
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
    useEffect(() => {

        const filteredDetails = studentDetails.filter(
            (detail) => detail.StudentCode.includes(searchStudentCode)
        );
        setFilteredStudentDetails(filteredDetails);
    }, [searchStudentCode, studentDetails]);

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

    const fetchAllTutors = () => {
        setloading(true);
        fetch('https://nishkamapi.onrender.com/api/v1/tutorlist')
            .then(response => response.json())
            .then(data => {
                console.log(data, "Tutor data");
                setTutorDetails(data.data);
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

    const handlestuStatusChange = (e) => {
        const selectedType = e.target.value;
        setStuStatus(selectedType);

    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        const { studentcode, stuyear, ...formDataWithoutCodeYear } = formData;

        // Proceed with the second API call
        const response = await fetch("https://nishkamapi.onrender.com/api/v1/addTutorRecord", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                UserId: userID,
                StudentCode: formData.studentcode,
                TutorId: searchTutorStudentCode.toString(),
                isActive: stuStatus
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
        <section className="mx-auto w-full max-w-7xl px-4 py-0">
            {
                loading
                    ?
                    <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                        <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-4 h-10 w-10"></div>
                    </div>
                    :
                    <div className="mt-0 flex flex-col">
                        <p className="font-bold text-gray-900 tracking-tight text-1xl">
                            Add - Student Tutor Data
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                        <div className="sm:col-span-3">
                                            <label htmlFor="searchStudentCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                Search Student Code
                                            </label>
                                            <Select
                                                options={studentDetails.map((student) => ({
                                                    value: student.StudentKey,
                                                    label: student.dd_label,
                                                    isDisabled: student.in_disable === 'Yes'

                                                }))}
                                                //value={searchStudentCode ? { value: searchStudentCode, label: searchStudentCode } : null}
                                                className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                    }`}
                                                onChange={handleSearchChange}
                                            // onChange={(selectedOption) => setSearchStudentCode(selectedOption ? selectedOption.value : '')}
                                            />
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="searchTutorStudentCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                Select Tutor
                                            </label>
                                            <Select
                                                options={tutorDetails.map((student) => ({
                                                    value: student.TutorId,
                                                    label: student.TutorName

                                                }))}
                                                //value={searchStudentCode ? { value: searchStudentCode, label: searchStudentCode } : null}
                                                className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                    }`}
                                                onChange={handleTutorSearchChange}
                                            // onChange={(selectedOption) => setSearchStudentCode(selectedOption ? selectedOption.value : '')}
                                            />
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="stustatus" className="block text-sm font-medium leading-6 text-gray-900">
                                                Status
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="stustatus"
                                                    name="stustatus"
                                                    value={stuStatus}
                                                    onChange={handlestuStatusChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stubasti ? 'border-red-500' : ''
                                                        }`}
                                                ><option >Select Status</option>
                                                <option value="1">Active</option>
                                                <option value="0">Inactive</option>
                                                    
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="button" onClick={() => navigate("/")} className="text-sm font-semibold leading-6 text-grey-900">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!formData.studentcode}
                                    style={{ opacity: formData.studentcode ? 1 : 0.5 }}



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

export default StudentTutorAdd