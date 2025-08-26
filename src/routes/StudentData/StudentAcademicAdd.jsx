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
    const [allClass, setallClass] = useState([]);
    const [selectedallClass, setSelectedallClass] = useState([]);
    const [allStrem, setallStrem] = useState([]);
    const [selectedallStrem, setSelectedallStrem] = useState('');


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
        fetchAllClass()
        fetchAllStream()
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
        ///SELECT * FROM v_StudentData
       fetch('https://sikligarapi-fpe3b0bjfhgsadg5.centralindia-01.azurewebsites.net/api/v1/fetchAllStudentDetails')  
      // fetch('http://localhost:3000/api/v1/fetchAllStudentDetails')  
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

    const fetchAllClass = () => {
        fetch('https://sikligarapi-fpe3b0bjfhgsadg5.centralindia-01.azurewebsites.net/api/v1/fetchAllClassess')
            .then(response => response.json())
            .then(data => {
                console.log(data, "Fetch Classes");
                if (Array.isArray(data.data)) {
                    const parsedData = data.data.map(item => item); // Parse the inner JSON strings
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
        fetch('https://sikligarapi-fpe3b0bjfhgsadg5.centralindia-01.azurewebsites.net/api/v1/fetchAllStream')
            .then(response => response.json())
            .then(data => {
                //console.log(data, "data ============");
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

    const handleSubmit = async (e) => {
        //console.log("Sumbit clicked");
        e.preventDefault();
        setErrors({}); // Reset errors
        setloading(true);
        const { studentcode, stuyear, ...formDataWithoutCodeYear } = formData;
       // console.log(selectedallClass,selectedallStrem, "formData====", JSON.stringify(formData));
       // console.log("formData2====", JSON.stringify(formDataWithoutCodeYear));
        // Proceed with the second API call
        try {
            const response = await fetch("https://sikligarapi-fpe3b0bjfhgsadg5.centralindia-01.azurewebsites.net/api/v1/addStudentData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    UserId: userID,
                    StudentCode: formData.studentcode,
                    AcademicYear: formData.stuyear,
                    CatgCode: "ACAD",
                    data: JSON.stringify(
                        {
                            ...formDataWithoutCodeYear,
                            stream: selectedallStrem.value,
                            class:selectedallClass.value
                        }
                       ),
                }),
            });

            if (!response.ok) {
                console.error("Error:", response.statusText);
                return;
            }else{
                console.log(formData,"Successfully added!");
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
                    <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                        <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-4 h-10 w-10"></div>
                    </div>
                    :
                    <div className="mt-2 flex flex-col">
                        <p className="font-bold text-orange-900 tracking-tight text-1xl">
                        Add - Academic Detail
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
                                                Class*
                                            </label>
                                            <div className="mt-0">
                                                <Select
                                                    options={allClass.map(donor => ({ value: donor.ClassId, label: donor.Class }))}
                                                    id="class"
                                                    name="class"
                                                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    value={selectedallClass}
                                                    onChange={(selectedOption) => setSelectedallClass(selectedOption)}
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
                                    disabled={!formData.studentcode || !selectedallClass}
                                    style={{ opacity: formData.studentcode && selectedallClass ? 1 : 0.4 }}
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