import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';


const StudentAcademicAdd = () => {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    const [userID, setUserId] = useState('')
    const [formData, setFormData] = useState({
        studentcode: "",
        stuyear: "",
        admissionnumber: "",
        rollnumber: "",
        class: "",
        section: "",
        semester: "",
        stream: "",
    })
    const [errors, setErrors] = useState({});
    const [searchStudentCode, setSearchStudentCode] = useState('');
    const [searchStudentYear, setSearchStudentYear] = useState('');


    const [studentDetails, setStudentDetails] = useState([]);
    const [filteredStudentDetails, setFilteredStudentDetails] = useState([]);

    useEffect(() => {
        const filteredDetails = studentDetails.filter(
            (detail) => detail.StudentCode.includes(searchStudentCode)
        );
        setFilteredStudentDetails(filteredDetails);
    }, [searchStudentCode, studentDetails]);

    useEffect(() => {
        fetchAllStudentDetails();

        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        const getUserid = localStorage.getItem("UserId")
        setUserId(getUserid)

    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const fetchAllStudentDetails = () => {
        setloading(true);
        fetch('https://nishkamapi.onrender.com/api/v1/fetchAllStudentDetails')
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
        console.log("Sumbit clicked");
        e.preventDefault();
        setErrors({}); // Reset errors
        setloading(true);
        const { studentcode, stuyear, ...formDataWithoutCodeYear } = formData;
        console.log("formData====", JSON.stringify(formData));
        console.log("formData2====", JSON.stringify(formDataWithoutCodeYear));
        // Proceed with the second API call
        try {
            const response = await fetch("https://nishkamapi.onrender.com/api/v1/addStudentData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    UserId: userID,
                    StudentCode: formData.studentcode,
                    AcademicYear: formData.stuyear,
                    CatgCode: "ACAD",
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
        catch (error) {
            setloading(false);
            console.error("Error:", error.message);
        }

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
                    <div className="mt-2 flex flex-col">
                        <p className="font-bold text-orange-900 tracking-tight text-1xl">
                            Academic Detail
                        </p>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="space-y-2">
                                <div className="border-b border-gray-900/10 pb-4">
                                    <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">

                                        <div className="sm:col-span-3">
                                            <label htmlFor="searchStudentCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                Search Student Code
                                            </label>
                                            <Select
                                                options={studentDetails.map((student) => ({
                                                    value: student.StudentKey,
                                                    label: student.dd_label,
                                                    isDisabled: student.ac_disable === 'Yes'
                                                }))}
                                                //value={searchStudentCode ? { value: searchStudentCode, label: searchStudentCode } : null}
                                                className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                    }`}
                                                onChange={handleSearchChange}
                                            // onChange={(selectedOption) => setSearchStudentCode(selectedOption ? selectedOption.value : '')}
                                            />
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="admissionnumber" className="block text-sm font-medium leading-6 text-gray-900">
                                                Admission Number
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    name="admissionnumber"
                                                    value={formData['admissionnumber']}
                                                    id="admissionnumber"
                                                    placeholder="Admission Number (15)"
                                                    maxLength={15}
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6}`}
                                                />

                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="rollnumber" className="block text-sm font-medium leading-6 text-gray-900">
                                                Roll Number
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    name="rollnumber"
                                                    value={formData['roll']}
                                                    id="rollnumber"
                                                    maxLength={15}
                                                    placeholder="Roll Number (15)"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6}`}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="class" className="block text-sm font-medium leading-6 text-gray-900">
                                                Class
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    name="class"
                                                    value={formData['class']}
                                                    id="class"
                                                    maxLength={10}
                                                    placeholder="Class (10)"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.class ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="section" className="block text-sm font-medium leading-6 text-gray-900">
                                                Section
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    name="section"
                                                    value={formData['section']}
                                                    id="section"
                                                    maxLength={10}
                                                    placeholder="Section (10)"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6}`}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="semester" className="block text-sm font-medium leading-6 text-gray-900">
                                                Semester
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    name="semester"
                                                    value={formData['semester']}
                                                    id="semester"
                                                    maxLength={10}
                                                    placeholder="Semester (10)"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 }`}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="semester" className="block text-sm font-medium leading-6 text-gray-900">
                                                Stream
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    name="stream"
                                                    value={formData['stream']}
                                                    id="stream"
                                                    maxLength={20}
                                                    placeholder="Stream (20)"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 }`}
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
                                    disabled={!formData.studentcode || !formData.stuyear}
                                    style={{ opacity: formData.studentcode && formData.stuyear ? 1 : 0.4 }}
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

export default StudentAcademicAdd