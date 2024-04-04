import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const StudentInstitutionAdd = () => {
    const [loading, setloading] = useState(false);
    const [userID, setUserId] = useState('')
    const [academicgetdata, setacademicgetdata] = useState([]);
    const [searchStudentCode, setSearchStudentCode] = useState('');
    const [studentDetails, setStudentDetails] = useState([]);
    const [filteredStudentDetails, setFilteredStudentDetails] = useState([]);
    const [academicData, setAcademicData] = useState([]);

    const [institutionType, setInstitutionType] = useState('');
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

    const filteredInstitutions = academicData.filter(
        (item) => JSON.parse(item.Json).Institution_Type === institutionType
    );

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
            // institutionname: "",  // Reset institutionname
            // boardoruniversity: "",  // Reset boardoruniversity
        }));
    };
    const handleSelectedInstitutionChange = (e) => {
        const selectedId = e.target.value;

        //setSelectedInstitution(selectedName);
        setSelectedInstitution(selectedId);
        // Update formData with selected institutionname and reset boardoruniversity
        setFormData((prevData) => ({
            ...prevData,
            institutionid: selectedId
            // boardoruniversity: "",  // Reset boardoruniversity
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
                CatgCode: "INST",
                data: JSON.stringify(formDataWithoutCodeYear),
            }),
        });

        if (!response.ok) {
            console.error("Error:", response.statusText);
            return;
        }

        console.log(formData, "==");
        setloading(false);
        navigate('/');

    }
    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-0">
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
                        <p className="font-bold text-gray-900 tracking-tight text-1xl">
                            Add - Student Institution Data
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
                                            <label htmlFor="institutiontype" className="block text-sm font-medium leading-6 text-gray-900">
                                                Institution Type
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="institutiontype"
                                                    name="institutiontype"
                                                    value={institutionType}
                                                    onChange={handleInstitutionTypeChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stubasti ? 'border-red-500' : ''
                                                        }`}
                                                ><option >Select Institution Type</option>
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
                                            <label htmlFor="institutionid" className="block text-sm font-medium leading-6 text-gray-900">
                                                Institution Name
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="institutionid"
                                                    name="institutionid"
                                                    value={selectedInstitution}
                                                    onChange={handleSelectedInstitutionChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stubasti ? 'border-red-500' : ''
                                                        }`}
                                                ><option >Select Institution Name</option>
                                                    {filteredInstitutions.map((item, index) => (
                                                        <option
                                                            key={index}
                                                            value={item.Id}
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
                                                            <><option >Select School Board</option>
                                                                <option value="CBSE">CBSE</option>
                                                                <option value="ICSE">ICSE</option>
                                                                <option value="U.P. Board">UP Board</option>
                                                                <option value="Punjab Board">Punjab Board</option>
                                                            </>
                                                        ) : (
                                                            <><option >Select University</option>
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
                                    //disabled={!formData.studentcode || !formData.stuyear || !formData.institutionname}
                                    style={{ opacity: formData.studentcode && formData.stuyear && formData.institutionid ? 1 : 0.5 }}



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

export default StudentInstitutionAdd