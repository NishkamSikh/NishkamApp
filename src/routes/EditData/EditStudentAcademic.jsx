import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditStudentAcademic = () => {

    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    const [userID, setUserId] = useState('')
    const [formData, setFormData] = useState({
        studentcode: "",
        stuyear: "",
        admissionnumber: "",
        rollnumber: "",
        class: "",
        section: ""
    })
    const [errors, setErrors] = useState({});
    const [fetchData, setfetchData] = useState({ data: { data: [] } });
    const [fetchDataId, setfetchDataId] = useState('');
    const { studentCode, year, catgcode } = useParams();


    useEffect(() => {


        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        const getUserid = localStorage.getItem("UserId")
        setUserId(getUserid)
        fetchUserInfo()

    }, []);

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

    const handleSubmit = async (e) => {
        console.log(formData, "fetchDataId :Handle Start");
        e.preventDefault();

        // Check if any select is not selected
        const errorsObj = {};

        setloading(true);

        try {
            console.log(formData, "before");
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
                    <div className="mt-6 flex flex-col">
                        <h1 className="text-1xl font-bold text-gray-900 tracking-tight sm:text-1xl">
                            Academic Detail {studentCode}, {year}, {catgcode}
                        </h1>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="space-y-2">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">




                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Student Code
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
                                                    value="ACAD"
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
                                            <label htmlFor="admissionnumber" className="block text-sm font-medium leading-6 text-gray-900">
                                                Admission Number
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="admissionnumber"
                                                    value={
                                                        formData.admissionnumber ||
                                                        (fetchData.Json
                                                            ? JSON.parse(fetchData.Json).admissionnumber
                                                            : "No Data")
                                                    }
                                                    id="admissionnumber"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stupin ? 'border-red-500' : ''
                                                        }`}
                                                />

                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="rollnumber" className="block text-sm font-medium leading-6 text-gray-900">
                                                Roll Number
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="rollnumber"
                                                    value={
                                                        formData.rollnumber ||
                                                        (fetchData.Json
                                                            ? JSON.parse(fetchData.Json).rollnumber
                                                            : "No Data")
                                                    }
                                                    id="rollnumber"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stupin ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="class" className="block text-sm font-medium leading-6 text-gray-900">
                                                Class
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="class"
                                                    value={
                                                        formData.class ||
                                                        (fetchData.Json
                                                            ? JSON.parse(fetchData.Json).class
                                                            : "No Data")
                                                    }
                                                    id="class"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stupin ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="section" className="block text-sm font-medium leading-6 text-gray-900">
                                                Section
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="section"
                                                    value={
                                                        formData.section ||
                                                        (fetchData.Json
                                                            ? JSON.parse(fetchData.Json).section
                                                            : "No Data")
                                                    }
                                                    id="section"
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stupin ? 'border-red-500' : ''
                                                        }`}
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

export default EditStudentAcademic