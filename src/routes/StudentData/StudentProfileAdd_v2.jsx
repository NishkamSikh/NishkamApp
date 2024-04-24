import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


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

  const { ...allData } = formData;

  const canSubmit = (allData.firstname && allData.studentcode && allData.stuyear && allData.gender && isValidDate(allData.dob) && isValidDate(allData.joindate) && allData.status) ? true : false;
  console.log("allData=", allData);

  function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  }

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


  /*
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const isCodeExists = studentDetails.some(student => student.StudentCode === value);
    if (isCodeExists) {
      alert('Student code already exists!');
      // You can also handle the error state or display a message in your UI
    }


    // Update the state with the sanitized value
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };
*/

  return (
    <section className="mx-auto w-full max-w-7xl px-2 py-2">
      {
        loading
          ?
          <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
            <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-16 w-16"></div>
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
                          required
                          placeholder='Student Code (8)'
                          maxLength={8}
                          pattern="[0-9a-zA-Z-]{6,}"
                          value={formData['studentcode']}
                          onChange={(e) => { setFormData({ ...formData, studentcode: e.target.value, }); }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                        />
                        <span className="mt-1 hidden text-sm text-red-400">
                          Student code must be at least 6 characters long
                        </span>
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
                          required
                          onChange={(e) => { setFormData({ ...formData, stuyear: e.target.value, }); }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"

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
                      <div className="flex flex-col items-start">
                        <input
                          type="text"
                          id="firstname"
                          name="firstname"
                          required
                          placeholder='First Name(20)'
                          maxLength={20}
                          pattern="[0-9a-zA-Z]{2,}"
                          value={formData['firstname']}
                          onChange={(e) => { setFormData({ ...formData, firstname: e.target.value, }); }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                        />
                        <span className="mt-1 hidden text-sm text-red-400">
                          First name must be at least 2 characters long
                        </span>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="middlename" className="block text-sm font-medium leading-6 text-gray-900">
                        Middle Name
                      </label>
                      <div className="mt-0">
                        <input
                          type="text"
                          id="middlename"
                          name="middlename"
                          placeholder='Middle Name {20}'
                          maxLength={20}
                          value={formData['middlename']}
                          pattern="[0-9a-zA-Z ]{1,}"
                          onChange={(e) => {
                            setFormData({ ...formData, middlename: e.target.value, });
                          }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                        />
                        <span className="mt-1 hidden text-sm text-red-400">
                          Middle name must be at least 1 characters long
                        </span>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                        Last name
                      </label>
                      <div className="mt-0">
                        <input
                          type="text"
                          id="lastname"
                          name="lastname"
                          placeholder='Last Name (20)'
                          maxLength={20}
                          pattern="[0-9a-zA-Z ]{1,}"
                          value={formData['lastname']}
                          onChange={(e) => { setFormData({ ...formData, lastname: e.target.value, }); }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                        />
                        <span className="mt-1 hidden text-sm text-red-400">
                          Last name must be at least 1 characters long
                        </span>
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
                          required
                          value={formData.gender}
                          //placeholder="Gender"
                          onChange={(e) => { setFormData({ ...formData, gender: e.target.value, }); }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                          >
                          <option>Select Gender</option>
                          <option selected value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        <span className="mt-1 hidden text-sm text-red-400">
                          Last name sdssd must be at least 1 characters long
                        </span>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
                        Date of Birth*
                      </label>
                      <div className="mt-0">
                        <input
                          type="date"
                          id="dob"
                          name="dob"
                          required
                          placeholder="Date of Birth"
                          onChange={(e) => { setFormData({ ...formData, dob: e.target.value, }); }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]"

                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="joindate" className="block text-sm font-medium leading-6 text-gray-900">
                        Date of Joining*
                      </label>
                      <div className="mt-0">
                        <input
                          type="date"
                          id="joindate"
                          required
                          name="joindate"
                          onChange={(e) => { setFormData({ ...formData, joindate: e.target.value, }); }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 valid:[&:not(:placeholder-shown)]:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]"
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
                          onChange={(e) => { setFormData({ ...formData, religion: e.target.value, }); }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                          >
                          <option>Select Religion</option>
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
                          id="refby"
                          name="refby"
                          value={formData['refby']}
                          placeholder='Referred By (25)'
                          maxLength={25}
                          onChange={(e) => { setFormData({ ...formData, refby: e.target.value, }); }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
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
                          id="approveby"
                          name="approveby"
                          placeholder='Approved By (25)'
                          maxLength={25}
                          value={formData['approveby']}
                          onChange={(e) => { setFormData({ ...formData, approveby: e.target.value, }); }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
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
                          onChange={(e) => { setFormData({ ...formData, sikligar: e.target.value, }); }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
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
                          onChange={(e) => { setFormData({ ...formData, status: e.target.value, }); }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
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
                          onChange={(e) => { setFormData({ ...formData, contact1type: e.target.value, }); }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
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
                          id="contact1"
                          name="contact1"
                          pattern="[0-9]{10}$"
                          value={formData['contact1']}
                          maxLength={10}
                          placeholder='Contact-1 &#9742; (10)'
                          onChange={(e) => { setFormData({ ...formData, contact1: e.target.value, }); }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
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
                          onChange={(e) => { setFormData({ ...formData, contact2type: e.target.value, }); }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
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
                          pattern="[0-9]{10}$"
                          maxLength={10}
                          value={formData['contact2']}
                          placeholder='Contact-2 &#9742; (10)'
                          onChange={(e) => { setFormData({ ...formData, contact2: e.target.value, }); }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                        />
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div className="mt-1 flex items-center justify-end gap-x-6">
                <button type="button" onClick={() => navigate("/")} className="text-sm font-semibold leading-6 text-grey-900">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!canSubmit}
                  // style={{ opacity: formData.studentcode && formData.stuyear && formData.firstname && formData.gender && formData.status ? 1 : 0.5 }}
                  className="text-white bg-purple-700 hover:bg-purple-600 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center mt-2 disabled:bg-gradient-to-br disabled:from-gray-100 disabled:to-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed group-invalid:bg-gradient-to-br group-invalid:from-gray-100 group-invalid:to-gray-300 group-invalid:text-gray-400 group-invalid:pointer-events-none group-invalid:opacity-70"
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