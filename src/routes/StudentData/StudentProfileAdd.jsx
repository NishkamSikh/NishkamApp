import React, { useState, useEffect } from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom';
import { Cloudinary } from "@cloudinary/url-gen";

const StudentProfile = () => {
  const [userID, setUserId] = useState('')
  const [image, setImage] = useState('')
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [studentDetails, setStudentDetails] = useState([]);

  const [formData, setFormData] = useState({
    studentcode: "",
    stuyear: "",
    firstname: "",
    middlename: "",
    lastname: "",
    gender: "",
    dob: "",
    joindate: "",
    religion: "",
    refby: "",
    approveby: "",
    sikligar: "",
    status: "",
    contact1type: "",
    contact1: "",
    contact2type: "",
    contact2: "",
    identity: "",
  }
  );

  useEffect(() => {
    const getUserid = localStorage.getItem("UserId")
    console.log("Updated FormData:", formData);
    // console.log(getUserid);
    // console.log(image, "image");
    fetchAllStudentDetails();

    setUserId(getUserid)
    if (!localStorage.getItem("UserauthToken")) {
      navigate("/");
    }
  }, [formData])


  const fetchAllStudentDetails = () => {
    // setloading(true);
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
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    console.log(image, "Handle Start");
    e.preventDefault();

    // Check if any select is not selected
    const errorsObj = {};
    Object.keys(formData).forEach((fieldName) => {
      if (!formData[fieldName]) {
        errorsObj[fieldName] = true;
      }
    });

    // if (Object.keys(errorsObj).length > 0) {
    //   setErrors(errorsObj);
    //   return;
    // }

    setErrors({}); // Reset errors
    setloading(true);

    console.log("Formdata=", formData)

    const { studentcode, stuyear, ...formDataWithoutCodeYear } = formData;

    try {
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
          CatgCode: "PROF",
          data: JSON.stringify(formDataWithoutCodeYear),
        }),
      });

      if (!response.ok) {
        console.error("Error:", response.statusText);
        return;
      }

      setloading(false);
      navigate('/');

    } catch (error) {
      setloading(false);
      console.error("Error:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const isCodeExists = studentDetails.some(student => student.StudentCode === value);
    if (isCodeExists) {
      alert('Student code already exists!');
      // You can also handle the error state or display a message in your UI
    }
    // Validation based on the field name
    // let updatedValue = value;

    // switch (name) {
    //   case "firstname":
    //   case "middlename":
    //   case "lastname":
    //   case "refby":
    //   case "approveby":
    //     // Allow only alphabets in the name fields
    //     updatedValue = value.replace(/[^a-zA-Z]/g, '');
    //     break;

    //   case "contact1":
    //   case "contact2":
    //     // Allow only numeric values in the contact number fields
    //     updatedValue = value.replace(/[^0-9]/g, '');
    //     break;

    //   // Add additional cases for other fields with specific validation requirements

    //   default:
    //     break;
    // }

    // Update the state with the sanitized value
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };
  return (
    <section className="mx-auto w-full max-w-7xl px-2 py-2">
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
            <p className="text-orange-900 font-medium tracking-tight sm:text-xl">
              Student Profile Information
            </p>
            <form onSubmit={handleSubmit}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                        Student Code*
                      </label>
                      <div className="mt-0">
                        <input
                          type="text"
                          name="studentcode"
                          id="studentcode"
                          placeholder='Student Code (8)'
                          maxLength={8}

                          value={formData['studentcode']}
                          onChange={handleInputChange}

                          className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.studentcode ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="stuyear" className="block text-sm font-medium leading-6 text-gray-900">
                        Academic Year*
                      </label>
                      <div className="mt-0">
                        <select
                          id="stuyear"
                          name="stuyear"
                          value={formData['stuyear']}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                            }`}
                        >
                          <option >Select Year</option>
                          <option value="2023-2024">2023-2024</option>
                          <option value="2022-2023">2022-2023</option>
                          <option value="2021-2022">2021-2022</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                        First name*
                      </label>
                      <div className="mt-0">
                        <input
                          type="text"
                          name="firstname"
                          placeholder='First Name(20)'
                          maxLength={15}
                          id="firstname"
                          value={formData['firstname']}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.firstname ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="middlename" className="block text-sm font-medium leading-6 text-gray-900">
                        Middle Name
                      </label>
                      <div className="mt-0">
                        <input
                          type="text"
                          name="middlename"
                          placeholder='Middle Name {15}'
                          maxLength={15}
                          id="middlename"
                          value={formData['middlename']}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.middlename ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                        Last name
                      </label>
                      <div className="mt-0">
                        <input
                          type="text"
                          name="lastname"
                          placeholder='Last Name (15)'
                          id="lastname"
                          maxLength={15}
                          value={formData['lastname']}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.lastname ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                        Gender*
                      </label>
                      <div className="mt-0">
                        <select
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.gender ? 'border-red-500' : ''
                            }`}
                        >
                          <option >Select Gender</option>
                          <option selected value="Male">Male</option>
                          <option value="Female">Female</option>

                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
                        Date of Birth
                      </label>
                      <div className="mt-0">
                        <input
                          type="date"
                          name="dob"
                          id="dob"
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.dob ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label htmlFor="joindate" className="block text-sm font-medium leading-6 text-gray-900">
                        Date of Joining
                      </label>
                      <div className="mt-0">
                        <input
                          type="date"
                          name="joindate"
                          onChange={handleInputChange}
                          id="joindate"
                          className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.joindate ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="religion" className="block text-sm font-medium leading-6 text-gray-900">
                        Religion
                      </label>
                      <div className="mt-0">
                        <select
                          id="religion"
                          name="religion"
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.religion ? 'border-red-500' : ''
                            }`}
                        >
                          <option >Select Religion</option>
                          <option value="Sikh">Sikh</option>
                          <option value="Hindu">Hindu</option>
                          <option value="Muslim">Muslim</option>
                          <option value="Christian">Christian</option>

                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="refby" className="block text-sm font-medium leading-6 text-gray-900">
                        Referred By
                      </label>
                      <div className="mt-0">
                        <input
                          type="text"
                          name="refby"
                          value={formData['refby']}
                          placeholder='Referred By (25)'
                          id="refby"
                          maxLength={25}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.refby ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="approveby" className="block text-sm font-medium leading-6 text-gray-900">
                        Approved By
                      </label>
                      <div className="mt-0">
                        <input
                          type="text"
                          name="approveby"
                          placeholder='Approved By (25)'
                          value={formData['approveby']}
                          onChange={handleInputChange}
                          maxLength={55}
                          id="approveby"
                          className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.approveby ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="sikligar" className="block text-sm font-medium leading-6 text-gray-900">
                        Is Sikligar
                      </label>
                      <div className="mt-0">
                        <select
                          id="sikligar"
                          name="sikligar"
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.sikligar ? 'border-red-500' : ''
                            }`}
                        >
                          <option >Select Student is Sikligar</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>

                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
                        Status*
                      </label>
                      <div className="mt-0">
                        <select
                          id="status"
                          name="status"
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.status ? 'border-red-500' : ''
                            }`}
                        >
                          <option >Select Student Status</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>

                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor="contact1type" className="block text-sm font-medium leading-6 text-gray-900">
                        Contact Type
                      </label>
                      <div className="mt-0">
                        <select
                          id="contact1type"
                          name="contact1type"
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.contact1type ? 'border-red-500' : ''
                            }`}
                        >
                          <option value="">Select Number belongd to</option>
                          <option value="Self">Self</option>
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="GrandFather">GrandFather</option>
                          <option value="Gurdian">Gurdian</option>
                          <option value="">Not applicable</option>

                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="contact1" className="block text-sm font-medium leading-6 text-gray-900">
                        Contact #1
                      </label>
                      <div className="mt-0">
                        <input
                          type="Number"
                          name="contact1"
                          value={formData['contact1']}
                          maxLength={10}
                          placeholder='Contact-1 &#9742; (10)'
                          onChange={handleInputChange}
                          id="contact1"
                          className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.contact1 ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor="contact2type" className="block text-sm font-medium leading-6 text-gray-900">
                        Contact Type
                      </label>
                      <div className="mt-0">
                        <select
                          id="contact2type"
                          name="contact2type"
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.contact2type ? 'border-red-500' : ''
                            }`}
                        >
                          <option value="">Select Number belongd to</option>
                          <option value="Self">Self</option>
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="GrandFather">GrandFather</option>
                          <option value="Gurdian">Gurdian</option>
                          <option value="">Not applicable</option>

                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="contact2" className="block text-sm font-medium leading-6 text-gray-900">
                        Contact #2
                      </label>
                      <div className="mt-0">
                        <input
                          type="Number"
                          name="contact2"
                          id="contact2"
                          maxLength={10}
                          value={formData['contact2']}
                          placeholder='Contact-2 &#9742; (10)'
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.contact2 ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>

                    {/* <div className="sm:col-span-1">
                      <label htmlFor="identity" className="block text-sm font-medium leading-6 text-gray-900">
                        Identity Document Type
                      </label>
                      <div className="mt-0">
                        <select
                          id="identity"
                          name="identity"
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.identity ? 'border-red-500' : ''
                            }`}
                        >
                          <option>Select Identity Option</option>
                          <option value="Adhard Card">Adhard Card</option>
                          <option value="Birth Certificate">Birth Certificate</option>
                        </select>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" onClick={() => navigate("/")} className="text-sm font-semibold leading-6 text-grey-900">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!formData.studentcode || !formData.stuyear || !formData.firstname || !formData.status || !formData.gender}
                  style={{ opacity: formData.studentcode && formData.stuyear && formData.firstname && formData.gender && formData.status ? 1 : 0.5 }}
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

export default StudentProfile