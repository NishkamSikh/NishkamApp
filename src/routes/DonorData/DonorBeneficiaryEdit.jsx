import React, { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { useSearchParams } from 'react-router-dom'

const DonorBeneficiaryEdit = () => {
    const [loading, setloading] = useState(false);
    const [userID, setUserId] = useState('')
    const [academicgetdata, setacademicgetdata] = useState([]);
    const [searchStudentCode, setSearchStudentCode] = useState('');
    const [studentDetails, setStudentDetails] = useState([]);
    const [filteredStudentDetails, setFilteredStudentDetails] = useState([]);
    const [academicData, setAcademicData] = useState([]);
    const [fetchData, setfetchData] = useState({ data: { data: [] } });
    const [fetchDataId, setfetchDataId] = useState('');
    const [tutorDetails, setTutorDetails] = useState([]);
    const [stuStatus, setStuStatus] = useState('');
    const [searchTutorStudentCode, setSearchTutorStudentCode] = useState('');

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
            console.log("Data ============", searchParams.get('Id'))
            const response = await fetch(`https://nishkamapi.onrender.com/api/v1/getSingleStudentTutor/${searchParams.get('Id')}`);
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
            console.log("Data:", data.data[0].isActive);
            if (data.data.length > 0) {
                setSearchTutorStudentCode({value:data.data[0].TutorId, label:data.data[0].TutorName})
                setStuStatus(data.data[0].isActive ? "1" : "0");

   
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
    const handleTutorSearchChange = (selectedOption) => {
        console.log("selectedOption:", selectedOption.value);
        setSearchTutorStudentCode(selectedOption);
    };
    useEffect(() => {

        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        const getUserid = localStorage.getItem("UserId")
        setUserId(getUserid)
        fetchAllTutors()
        fetchUserInfo()
        

    }, []);

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
    

   
    const handlestuStatusChange = (e) => {
        const selectedType = e.target.value;
        setStuStatus(selectedType);

    };

   const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { StudentCode, stuyear, ...formDataWithoutCodeYear } = formData;
    
console.log("Form Data=",formDataWithoutCodeYear)

    // Check if any select is not selected
    const errorsObj = {};

    setloading(true);

    try {
        //console.log(formData, searchParams.get('Id'), "before");

        const response = await fetch(`https://nishkamapi.onrender.com/api/v1/updateStudentTutor/${searchParams.get('Id')}`, {
            method: "PUT", // Assuming you are using PUT for updating
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                TutorId: searchTutorStudentCode.value.toString(),
                isActive: stuStatus,
            }),
        });
        
        if (!response.ok) {
            console.error("Error:", response.statusText);
            return;
        }
        navigate('/StudentTutorList')

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
                    <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                        <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-4 h-10 w-10"></div>
                    </div>
                    :
                    <div className="mt-0 flex flex-col">
                        <p className="font-bold text-orange-900 tracking-tight text-1xl">
                            Edit - Student Tutor Data 
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-bold bg-blue-500 leading-6 text-white">
                                                Student Code: {formData.StudentCode} 
                                            </label>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="searchTutorStudentCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                Select Tutor {console.log("tutorDetails:",tutorDetails)}
                                            </label>
                                            <Select
                                                options={tutorDetails && tutorDetails.map((student) => ({
                                                    value: student.TutorId,
                                                    label: student.TutorName
                                                }))}
                                                value={searchTutorStudentCode}
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
                            <div className="mt-1 flex items-center justify-end gap-x-6">
                                <button type="button" onClick={() => navigate("/StudentTutorList")} className="text-sm font-semibold leading-6 text-grey-900">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    //disabled={!formData.studentcode || !formData.stuyear || !formData.institutionid}
                                    //style={{ opacity: formData.studentcode && formData.stuyear && formData.institutionid ? 1 : 0.5 }}                                    
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

export default DonorBeneficiaryEdit