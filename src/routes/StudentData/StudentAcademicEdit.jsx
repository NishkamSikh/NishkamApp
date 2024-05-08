import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom'
import Select from 'react-select';
const StudentAcademicEdit = () => {

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
        stream: ""
    })
    const [errors, setErrors] = useState({});
    const [fetchData, setfetchData] = useState({ data: { data: [] } });
    const [fetchDataId, setfetchDataId] = useState('');
    const { studentCode, year, catgcode } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [allClass, setallClass] = useState([]);
    const [selectedallClass, setSelectedallClass] = useState([]);
    const [allStrem, setallStrem] = useState([]);
    const [selectedallStrem, setSelectedallStrem] = useState('');


    useEffect(() => {


        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        const getUserid = localStorage.getItem("UserId")
        setUserId(getUserid)
        fetchUserInfo()
        fetchAllClass()
        fetchAllStream()

    }, []);

    const fetchAllClass = () => {
        fetch('https://nishkamapi.onrender.com/api/v1/fetchAllClassess')
            .then(response => response.json())
            .then(data => {
                // console.log(data, "data");
                if (Array.isArray(data.data)) {
                    const parsedData = data.data.map(item => JSON.parse(item.Json)); // Parse the inner JSON strings
                    console.log(parsedData, "Data");
                    // Save the parsed data into state
                    setallClass(parsedData);
                } else {
                    console.error('Error: Data fetched is not an array');
                }
            })
            .catch(error => {
                console.error('Error fetching Donor data:', error);
            });
    };
    const fetchAllStream = () => {
        console.log("fetchAllStream");
        fetch('http://nishkamapi.onrender.com/api/v1/fetchAllStream')
            .then(response => response.json())
            .then(data => {
                console.log(data, "data ============");
                if (Array.isArray(data.data)) {
                    // const parsedData = data.data.map(item => JSON.parse(item.Stream)); // Parse the inner JSON strings
                    console.log(data.data, "Data parsedData");
                    // Save the parsed data into state
                    setallStrem(data.data);
                } else {
                    console.error('Error: Data fetched is not an array');
                }
            })
            .catch(error => {
                console.error('Error fetching Donor data:', error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const fetchUserInfo = async () => {
        console.log('fetch');
        setloading(true);
        try {
            const response = await fetch(`https://nishkamapi.onrender.com/api/v1/getSingleStudentAcademic/${JSON.parse(searchParams.get('Id'))}`);
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
               setSelectedallClass({value:data.data[0].class, label:data.data[0].class});
               setSelectedallStrem({value:data.data[0].stream, label:data.data[0].stream});
               
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { StudentCode, StudentId, AcademicYear, CatgCode, FirstName, LastName, MiddleName, DOB,json,AcademicId, ...formDataWithoutCodeYear } = formData;
        // Check if any select is not selected
        const errorsObj = {};

        setloading(true);

        try {
            const response = await fetch(`https://nishkamapi.onrender.com/api/v1/updateBasicDetail/${JSON.parse(searchParams.get('Id'))}`, {
                method: "PUT", // Assuming you are using PUT for updating
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data: JSON.stringify(
                        {
                            ...formDataWithoutCodeYear,
                            stream: selectedallStrem.value,
                            class:selectedallClass.value
                        }
                       ),
                    // data: JSON.stringify(formDataWithoutCodeYear),
                }),
            });
            if (!response.ok) {
                console.error("Error:", response.statusText);
                return;
            }
            if(searchParams.get('flag') == "academic"){
                navigate(`/StudentSummaryDetail?id=${JSON.parse(searchParams.get('proId'))}`)
            }else {
                navigate('/StudentAcademicList')
            }

            setloading(false);
            // navigate('/dashboard')

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
                        <div className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
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
                    <div className="mt-1 flex flex-col">
                        <p className="font-bold text-orange-900 tracking-tight text-1xl">
                            Edit - Student Academic Data
                        </p>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="space-y-2">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-bold bg-blue-500 leading-6 text-white">
                                                Student Code: {formData.StudentCode} / {formData.AcademicYear} / {formData.FirstName} {formData.MiddleName} {formData.LastName} / {formData.DOB}
                                            </label>
                                        </div>


                                        <div className="sm:col-span-3">
                                            <label htmlFor="admissionnumber" className="block text-sm font-medium leading-6 text-gray-900">
                                                Admission Number
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="admissionnumber"
                                                    value={formData.admissionnumber}
                                                    id="admissionnumber"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stupin ? 'border-red-500' : ''
                                                        }`}
                                                />

                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="rollnumber" className="block text-sm font-medium leading-6 text-gray-900">
                                                Roll Number
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="rollnumber"
                                                    value={formData.rollnumber}
                                                    id="rollnumber"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stupin ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="class" className="block text-sm font-medium leading-6 text-gray-900">
                                                Class
                                            </label>
                                            <div className="mt-1">
                                            <Select
                                                    options={allClass.map(donor => ({ value: donor.class, label: donor.class }))}
                                                    id="class"
                                                    name="class"
                                                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    value={selectedallClass}
                                                    onChange={(selectedOption) => setSelectedallClass(selectedOption)}
                                                />
                                                {/* <input
                                                    type="text"
                                                    name="class"
                                                    value={formData.class}
                                                    id="class"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stupin ? 'border-red-500' : ''
                                                        }`}
                                                /> */}
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="section" className="block text-sm font-medium leading-6 text-gray-900">
                                                Section
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="section"
                                                    value={formData.section}
                                                    id="section"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stupin ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="section" className="block text-sm font-medium leading-6 text-gray-900">
                                                Semester
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="semester"
                                                    value={formData.semester}
                                                    id="semester"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stupin ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="stream" className="block text-sm font-medium leading-6 text-gray-900">
                                                Stream
                                            </label>
                                            <div className="mt-1">
                                            <Select
                                                    options={allStrem.map(donor => ({ value: donor.Stream, label: donor.Stream }))}
                                                    id="class"
                                                    name="class"
                                                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                                    value={selectedallStrem}
                                                    onChange={(selectedOption) => setSelectedallStrem(selectedOption)}
                                                />
                                                {/* <input
                                                    type="text"
                                                    name="stream"
                                                    value={formData.stream}
                                                    id="stream"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stupin ? 'border-red-500' : ''
                                                        }`}
                                                /> */}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-end gap-x-6">
                                <button type="button" onClick={() => navigate("/")} className="text-sm font-semibold leading-6 text-grey-900">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    //disabled={!formData.studentcode || !formData.stuyear || !formData.class}
                                    //style={{ opacity: formData.studentcode && formData.stuyear && formData.class? 1 : 0.4 }}
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

export default StudentAcademicEdit