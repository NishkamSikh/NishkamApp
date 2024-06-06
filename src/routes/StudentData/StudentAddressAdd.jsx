import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const StudentAddress = () => {
    const [userID, setUserId] = useState([])
    const [loading, setloading] = useState(false);

    const [selectedBasti, setSelectedBasti] = useState('');
    const [stateValue, setStateValue] = useState('');
    const [districtValue, setDistrictValue] = useState('');
    const [tehsilValue, setTehsilValue] = useState('');
    const [options, setOptions] = useState([]);
    const [bastiError, setBastiError] = useState(false);
    const [searchStudentCode, setSearchStudentCode] = useState('');
    const [studentDetails, setStudentDetails] = useState([]);
    const [filteredStudentDetails, setFilteredStudentDetails] = useState([]);

    const [formData, setFormData] = useState({
        studentcode: "",
        stuyear: "",
        stustate: "",
        studistrict: "",
        stutehsil: "",
        stubasti: "",
        stuvillage: "",
        stuaddress: "",
        stupin: "",
        rep1: "",
        rep2: "",

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

    const navigate = useNavigate();
    useEffect(() => {
        fetchAllStudentDetails();

        fetchBastiData();
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        const getUserid = localStorage.getItem("UserId")
        setUserId(getUserid)

    }, [])

    useEffect(() => {
        const filteredDetails = studentDetails.filter(
            (detail) => detail.StudentCode.includes(searchStudentCode)
        );
        setFilteredStudentDetails(filteredDetails);
    }, [searchStudentCode, studentDetails]);


    const fetchAllStudentDetails = () => {
        setloading(true);
        fetch('https://nishkamapi.onrender.com/api/v1/fetchAllStudentDetails_dd')
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
    const fetchBastiData = () => {
        fetch('https://nishkamapi.onrender.com/api/v1/bastilist2')
            .then(response => response.json())
            .then(data => {
                // Assuming the API response contains basti name, state, and city
                const bastiData = data;
                // Parse the json string within the data object and setOptions
                const parsedData = bastiData.data.map(item => item);
                console.log(parsedData, "basti data====");
                setOptions(parsedData);
                if (parsedData.length > 0) {
                    // Assuming the API response contains basti name, state, and city
                    const { BastiId, State, District, Tehsil } = parsedData[0];
                    // setSelectedBasti(BastiId);
                    // setStateValue(State);
                    // setDistrictValue(District);
                    // setTehsilValue(Tehsil);
                }

            })
            .catch(error => {
                console.error('Error fetching basti data:', error);
            });
    };

    const handleBastiChange = (event) => {
        const selectedBasti = event.target.value;
        setSelectedBasti(selectedBasti);

        const selectedBastiData = options.find(item => item.BastiId == selectedBasti);

        if (selectedBastiData) {
            // Update form data with selected basti details
            setFormData((prevData) => ({
                ...prevData,
                stustate: selectedBastiData.State,
                studistrict: selectedBastiData.District,
                stutehsil: selectedBastiData.Tehsil,
                stubasti: selectedBastiData.BastiId,
            }));
            setBastiError(false); // Clear the error flag
        } else {
            setBastiError(true); // Set the error flag if basti is empty
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        const { studentcode, stuyear, ...formDataWithoutCodeYear } = formData;
        // Log the form data
        console.log('Form Data:==', formData);

        // Proceed with the second API call
        const response = await fetch("https://nishkamapi.onrender.com/api/v1/addStudentData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                UserId: userID,
                StudentCode: formData.studentcode,
                AcademicYear: formData.stuyear,
                CatgCode: "ADDR",
                data: JSON.stringify(formDataWithoutCodeYear),
            }),
        });

        if (!response.ok) {
            console.error("Error:", response.statusText);
            return;
        }

        setloading(false);
        navigate('../');
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
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
                        <p className="font-bold text-orange-900 tracking-tight text-1xl">
                            Add - Student Address Data
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">

                                        <div className="sm:col-span-3">
                                            <label htmlFor="searchStudentCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                Student Code
                                            </label>
                                            <Select

                                                options={studentDetails.map((student) => ({
                                                    value: student.StudentKey,
                                                    label: student.dd_label,
                                                    isDisabled: student.ad_disable === 'Yes'
                                                }))}
                                                className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                    }`}
                                                onChange={handleSearchChange}

                                            />
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="stubasti" className="block text-sm font-medium leading-6 text-gray-900">
                                                Basti* {console.log("options Data from ADD", options)}
                                            </label>
                                            <div className="mt-0">
                                                <select
                                                    id="stubasti"
                                                    name="stubasti"
                                                    // value={formData['stubasti']}
                                                    onChange={handleBastiChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stubasti ? 'border-red-500' : ''
                                                        }`}

                                                ><option value="">Select Basti</option>
                                                    {options.map((option, index) => (
                                                        <option
                                                            key={index}
                                                            value={option.BastiId
                                                            }
                                                        >
                                                            {option.BastiName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                State
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    name="stustate"
                                                    id="stustate"
                                                    readOnly
                                                    value={selectedBasti ? options.find((b) => b.BastiId == selectedBasti).State : ''}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.studentcode ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                District
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    name="studistrict"
                                                    id="studistrict"
                                                    readOnly
                                                    value={selectedBasti ? options.find((b) => b.BastiId == selectedBasti).District : ''}

                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.studentcode ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Tehsil
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    name="stutehsil"
                                                    id="stutehsil"
                                                    readOnly
                                                    value={selectedBasti ? options.find((b) => b.BastiId == selectedBasti).Tehsil : ''}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.studentcode ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="stuvillage" className="block text-sm font-medium leading-6 text-gray-900">
                                                Village
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    name="stuvillage"
                                                    value={formData['stuvillage']}
                                                    id="stuvillage"
                                                    maxLength={25}
                                                    placeholder='Enter Village (25)'
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuvillage ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="stuaddress" className="block text-sm font-medium leading-6 text-gray-900">
                                                Address*
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="text"
                                                    name="stuaddress"
                                                    value={formData['stuaddress']}
                                                    id="stuaddress"
                                                    onChange={handleInputChange}
                                                    maxLength={80}
                                                    placeholder='Enter Address (80)'
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuaddress ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="stupin" className="block text-sm font-medium leading-6 text-gray-900">
                                                PIN
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="Number"
                                                    name="stupin"
                                                    value={formData['stupin']}
                                                    id="stupin"
                                                    maxLength={6}
                                                    placeholder='PIN (6)'
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stupin ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="rep1" className="block text-sm font-medium leading-6 text-gray-900">
                                                Rep-1 &#9742;
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="Number"
                                                    name="rep1"
                                                    id="rep1"
                                                    value={formData['rep1']}
                                                    placeholder={10}
                                                    maxlength={10}
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.rep1 ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="rep2" className="block text-sm font-medium leading-6 text-gray-900">
                                                Rep-2 &#9742;
                                            </label>
                                            <div className="mt-0">
                                                <input
                                                    type="Number"
                                                    name="rep2"
                                                    value={formData['rep2']}
                                                    id="rep2"
                                                    placeholder={10}
                                                    maxLength={10}
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.rep2 ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 flex items-center justify-end gap-x-6">
                                <button type="button" onClick={() => navigate("/")} className="text-sm font-semibold leading-6 text-grey-900">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!formData.stustate || !formData.stubasti}
                                    style={{ opacity: formData.stustate && formData.stubasti ? 1 : 0.5 }}
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

export default StudentAddress