import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom'

const StudentProfileEdit = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log("Id= ", JSON.parse(searchParams.get('Id')));
  console.log("Id= ", JSON.parse(searchParams.get('Flag')));


  const [userID, setUserId] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [stuCodeYear, setstuCodeYear] = useState([]);
  const [fetchData, setfetchData] = useState({ data: { data: [] } });
  const [fetchDataId, setfetchDataId] = useState('');

  const [formData, setFormData] = useState({
    StudentCode: "",
    AcademicYear: "",
    CatgCode: "",

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
    fetchUserInfo();

    setUserId(getUserid)
    if (!localStorage.getItem("UserauthToken")) {
      navigate("/");
    }
  }, [])

  const fetchUserInfo = async () => {

    setloading(true);
    try {
      const response = await fetch(`https://nishkamapi.onrender.com/api/v1/getSingleStudentById/${JSON.parse(searchParams.get('Id'))}`);

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

      } else {
        alert("No such user found!");
      }
    } catch (error) {
      console.error('Error fetching student details:', error);
    } finally {
      setloading(false);
    }
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { StudentCode, StudentId, AcademicYear, CatgCode, StudentLabel, ProfileId, ...formDataWithoutCodeYear } = formData;
    
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

          data: JSON.stringify(formDataWithoutCodeYear),
        }),
      });
      if (!response.ok) {
        console.error("Error:", response.statusText);
        return;
      }
      if (searchParams.get('flag') == "profile") {
        navigate(`/StudentSummaryDetail?id=${JSON.parse(searchParams.get('Id'))}`)
      } else {
        navigate('/StudentProfileList')
      }

      setloading(false);
      // navigate('/studentProfileList')

    } catch (error) {
      setloading(false);
      console.error("Error:", error.message);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;


    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

          <div className="mt-0 flex flex-col">
            <p className="font-bold text-orange-900 tracking-tight text-1xl">
              Edit - Student Profile Data
            </p>
            <form onSubmit={handleSubmit}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-bold bg-blue-500 leading-6 text-white">
                        Student Code: {formData.StudentCode} / {formData.AcademicYear} / {formData.firstname} {formData.middlename} {formData.lastname} / {formData.dob}

                      </label>

                    </div>



                    <div className="sm:col-span-2 sm:col-start-1">
                      <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                        First name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="firstname"
                          placeholder='First Name'
                          id="firstname"
                          defaultValue={formData.firstname}
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
                      <div className="mt-1">
                        <input
                          type="text"
                          name="middlename"
                          placeholder='Middle Name'
                          id="middlename"
                          defaultValue={formData.middlename}
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
                      <div className="mt-1">
                        <input
                          type="text"
                          name="lastname"
                          placeholder='Last Name'
                          id="lastname"
                          defaultValue={formData.lastname}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.lastname ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                        Gender
                      </label>
                      <div className="mt-1">
                        <select
                          id="gender"
                          name="gender"
                          defaultValue={formData.gender || (fetchData.Json ? JSON.parse(fetchData.Json).gender : "No Data")}
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
                      <div className="mt-1">
                        <input
                          type="date"
                          name="dob"
                          defaultValue={formData.dob || (fetchData.Json ? JSON.parse(fetchData.Json).dob : "No Data")}
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
                      <div className="mt-1">
                        <input
                          type="date"
                          name="joindate"
                          defaultValue={formData.joindate || (fetchData.Json ? JSON.parse(fetchData.Json).joindate : "No Data")}
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
                      <div className="mt-1">
                        <select
                          id="religion"
                          name="religion"
                          defaultValue={formData.religion || (fetchData.Json ? JSON.parse(fetchData.Json).religion : "No Data")}
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
                      <div className="mt-1">
                        <input
                          type="text"
                          name="refby"
                          defaultValue={formData.refby}
                          placeholder='Referred By'
                          id="refby"
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
                      <div className="mt-1">
                        <input
                          type="text"
                          name="approveby"
                          placeholder='Approved By'
                          defaultValue={formData.approveby}
                          onChange={handleInputChange}
                          id="approveby"
                          className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.approveby ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="sikligar" className="block text-sm font-medium leading-6 text-gray-900">
                        Sikligar
                      </label>
                      <div className="mt-1">
                        <select
                          id="sikligar"
                          name="sikligar"
                          defaultValue={formData.sikligar}
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
                        Status
                      </label>
                      <div className="mt-1">
                        <select
                          id="status"
                          name="status"
                          defaultValue={formData.status}
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
                      <div className="mt-1">
                        <select
                          id="contact1type"
                          name="contact1type"
                          defaultValue={formData.contact1type}
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
                      <div className="mt-1">
                        <input
                          type="Number"
                          name="contact1"
                          defaultValue={formData.contact1}
                          placeholder='Contact #1'
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
                      <div className="mt-1">
                        <select
                          id="contact2type"
                          name="contact2type"
                          defaultValue={formData.contact2type}
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
                      <div className="mt-1">
                        <input
                          type="Number"
                          name="contact2"
                          id="contact2"
                          defaultValue={formData.contact2}
                          placeholder='Contact Number 2'
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.contact2 ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor="identity" className="block text-sm font-medium leading-6 text-gray-900">
                        Identity Document Type
                      </label>
                      <div className="mt-1">
                        <select
                          id="identity"
                          name="identity"
                          defaultValue={formData.identity}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.identity ? 'border-red-500' : ''
                            }`}
                        >
                          <option>Select Identity Option</option>
                          <option value="Adhard Card">Adhard Card</option>
                          <option value="Birth Certificate">Birth Certificate</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {errors.gender && <p className="text-red-500">Please select a gender.</p>}
              <div className="mt-4 flex items-center justify-end gap-x-6">
                <button type="button" onClick={() => navigate("/StudentProfileList")} className="text-sm font-semibold leading-6 text-grey-900">
                  Cancel
                </button>
                <button
                  type="submit"
                  //disabled={!formData.studentcode || !formData.stuyear || !formData.firstname || !formData.status || !formData.gender}
                  //style={{ opacity: formData.studentcode && formData.stuyear && formData.firstname && formData.gender && formData.status ? 1 : 0.5 }}
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

export default StudentProfileEdit