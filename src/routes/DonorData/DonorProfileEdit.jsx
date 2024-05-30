import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom'

const DonorProfileEdit = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  //console.log("Id= ", JSON.parse(searchParams.get('Id')));
  //console.log("Id= ", JSON.parse(searchParams.get('Flag')));

  const [userID, setUserId] = useState('');
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [fetchData, setfetchData] = useState({ data: { data: [] } });

  const [formData, setFormData] = useState({
    DonorCode: "",
    Code: "",
    Title: "",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Name_2: "",
    Country: "",
    Status: "",
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
      //const response = await fetch(`https://nishkamapi.onrender.com/api/v1/getSingleStudentById/${JSON.parse(searchParams.get('Id'))}`);
      const response = await fetch(`http://localhost:3000/api/v1/getSingleDonorById/${JSON.parse(searchParams.get('Id'))}`);

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
    const { Id, DonorCode, ...formDataWithoutDonorCode } = formData;

    // Check if any select is not selected
    const errorsObj = {};
    setloading(true);

    try {
      //const response = await fetch(`https://nishkamapi.onrender.com/api/v1/updateDonorData/${JSON.parse(searchParams.get('Id'))}`, {
      const response = await fetch(`http://localhost:3000/api/v1/updateDonorData/${JSON.parse(searchParams.get('Id'))}`, {
        method: "PUT", // Assuming you are using PUT for updating
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          data: JSON.stringify(formDataWithoutDonorCode),
        }),
      });
      if (!response.ok) {
        console.error("Error:", response.statusText);
        return;
      }
      if (searchParams.get('flag') == "profile") {
        navigate(`/StudentSummaryDetail?id=${JSON.parse(searchParams.get('Id'))}`)
      } else {
        navigate('/DonorProfileList')
      }

      setloading(false);

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
          <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
            <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-4 h-10 w-10"></div>
          </div>
          :

          <div className="mt-0 flex flex-col">
            <p className="font-bold text-orange-900 tracking-tight text-1xl">
              Edit - Donor Profile Data
            </p>
            <form onSubmit={handleSubmit}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-bold bg-blue-500 leading-6 text-white">
                        Donor Code: {formData.DonorCode}

                      </label>

                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                        Code*
                      </label>
                      <div className="mt-0">
                        <input
                          type="text"
                          name="Code"
                          id="Code"
                          defaultValue={formData.Code}
                          placeholder='Code (1)'
                          maxLength={1}
                          pattern="[0-9a-zA-Z-]{5,}"
                          //pattern="/^([A-z]-)*[^\s]\1*$/"
                          value={formData['Code']}
                          onChange={handleInputChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                        />
                        <span className="mt-1 hidden text-sm text-red-400">
                          Donor code must be at least 1 characters long with no spaces
                        </span>
                      </div>

                    </div>


                    <div className="sm:col-span-2 sm:col-start-1">
                      <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                        First name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="FirstName"
                          name="FirstName"
                          placeholder='First Name'
                          defaultValue={formData.FirstName}
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
                          name="MiddleName"
                          placeholder='Middle Name'
                          id="MiddleName"
                          defaultValue={formData.MiddleName}
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
                          name="LastName"
                          placeholder='Last Name'
                          id="LastName"
                          defaultValue={formData.LastName}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.lastname ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>


                    <div className="sm:col-span-3">
                      <label htmlFor="Name_2" className="block text-sm font-medium leading-6 text-gray-900">
                        C/O (Name2)
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="Name_2"
                          defaultValue={formData.Name2}
                          placeholder='Name2'
                          id="Name_2"
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.refby ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>


                    <div className="sm:col-span-3">
                      <label htmlFor="Country" className="block text-sm font-medium leading-6 text-gray-900">
                        Country
                      </label>
                      <div className="mt-1">
                        <select
                          id="Country"
                          name="Country"
                          defaultValue={formData.Country}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.sikligar ? 'border-red-500' : ''
                            }`}
                        >
                          <option>Select Country</option>
                          <option value="India">India</option>
                          <option value="USA">USA</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                          <option value="Other">Other</option>

                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
                        Status
                      </label>
                      <div className="mt-1">
                        <select
                          id="Status"
                          name="Status"
                          defaultValue={formData.Status}
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




                  </div>
                </div>
              </div>

              {errors.gender && <p className="text-red-500">Please select a gender.</p>}
              <div className="mt-4 flex items-center justify-end gap-x-6">
                <button type="button" onClick={() => navigate("/DonorProfileList")} className="text-sm font-semibold leading-6 text-grey-900">
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

export default DonorProfileEdit