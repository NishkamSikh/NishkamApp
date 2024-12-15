import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const DonorProfileAdd = () => {
  const [userID, setUserId] = useState('')
  //  const [image, setImage] = useState('')
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  // const [studentDetails, setStudentDetails] = useState([]);

  const [formData, setFormData] = useState({
    DonorCode: "",
    Code:"",
    Title: "",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Name_2: "",
    Country: "",
    Status: "",
  }
  );

  const { ...allData } = formData;

  const canSubmit = (allData.Title && allData.FirstName && allData.DonorCode && allData.Country && allData.Status) ? true : false;

  useEffect(() => {
    const getUserid = localStorage.getItem("UserId")
    setUserId(getUserid)
    if (!localStorage.getItem("UserauthToken")) {
      navigate("/");
    }
  }, [])

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
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

    //    const { studentcode, stuyear, ...formDataWithoutCodeYear } = formData;
    try {
      // Proceed with the second API call
      const response = await fetch("https://sikligarapi.azurewebsites.net/api/v1/addDonorData", {
      //const response = await fetch("https://sikligarapi.azurewebsites.net/api/v1/addDonorData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserId: userID,
          DonorCode: formData.DonorCode,
          data: JSON.stringify(formData),
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

  return (
    <section className="mx-auto w-full max-w-4xl px-2 py-2">
      {
        loading
          ?
          <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
            <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-4 h-10 w-10"></div>
          </div>
          :

          <div className="mt-0 flex flex-col">
            <p className="text-orange-900 font-medium tracking-tight sm:text-xl">
              Donor Profile Information
            </p>
            <form onSubmit={handleSubmit}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                        Donor Code*
                      </label>
                      <div className="mt-0">
                        <input
                          type="text"
                          name="DonorCode"
                          id="DonorCode"
                          required
                          placeholder='Donor Code (12)'
                          maxLength={12}
                          pattern="[0-9a-zA-Z-]{5,}"
                          //pattern="/^([A-z]-)*[^\s]\1*$/"
                          value={formData['DonorCode']}
                          onChange={(e) => { setFormData({ ...formData, DonorCode: e.target.value, }); }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                        />
                        <span className="mt-1 hidden text-sm text-red-400">
                          Donor code must be at least 6 characters long with no spaces
                        </span>
                      </div>

                      <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                        Code*
                      </label>
                      <div className="mt-0">
                        <input
                          type="text"
                          name="Code"
                          id="Code"
                          required
                          placeholder='Code (1)'
                          maxLength={2}
                          pattern="[0-9a-zA-Z-]{1,}"
                          //pattern="/^([A-z]-)*[^\s]\1*$/"
                          value={formData['Code']}
                          onChange={(e) => { setFormData({ ...formData, Code: e.target.value, }); }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                        />
                        <span className="mt-1 hidden text-sm text-red-400">
                          Donor code must be at least 1 characters long with no spaces
                        </span>
                      </div>


                      <div className="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                          Title
                        </label>
                        <div className="flex flex-col items-start">
                          <input
                            type="text"
                            id="Title"
                            name="Title"
                            required
                            placeholder='Title(20)'
                            maxLength={20}
                            pattern="[0-9a-zA-Z.]{1,}"
                            value={formData['Title']}
                            onChange={(e) => { setFormData({ ...formData, Title: e.target.value, }); }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                          />
                          <span className="mt-1 hidden text-sm text-red-400">
                            Title must be at least 1 characters long
                          </span>
                        </div>
                      </div>


                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                        First name*
                      </label>
                      <div className="flex flex-col items-start">
                        <input
                          type="text"
                          id="FirstName"
                          name="FirstName"
                          required
                          placeholder='First Name(30)'
                          maxLength={30}
                          //pattern="[0-9a-zA-Z]{30,}"
                          value={formData['FirstName']}
                          onChange={(e) => { setFormData({ ...formData, FirstName: e.target.value, }); }}
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
                          id="MiddleName"
                          name="MiddleName"
                          placeholder='Middle Name {30}'
                          maxLength={20}
                          value={formData['MiddleName']}
                          //pattern="[0-9a-zA-Z ]{30,}"
                          onChange={(e) => {
                            setFormData({ ...formData, MiddleName: e.target.value, });
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
                          id="LastName"
                          name="LastName"
                          placeholder='Last Name (30)'
                          maxLength={30}
                          //pattern="[0-9a-zA-Z ]{30,}"
                          value={formData['LastName']}
                          onChange={(e) => { setFormData({ ...formData, LastName: e.target.value, }); }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                        />
                        <span className="mt-1 hidden text-sm text-red-400">
                          Last name must be at least 1 characters long
                        </span>
                      </div>
                    </div>


                    <div className="sm:col-span-2">
                      <label htmlFor="name2" className="block text-sm font-medium leading-6 text-gray-900">
                        Name c/o
                      </label>
                      <div className="mt-0">
                        <input
                          type="text"
                          id="Name_2"
                          name="Name_2"
                          placeholder='Name-2 (100)'
                          maxLength={100}
                          //pattern="[0-9a-zA-Z ]{100,}"
                          value={formData['Name_2']}
                          onChange={(e) => { setFormData({ ...formData, Name_2: e.target.value, }); }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                        />
                        <span className="mt-1 hidden text-sm text-red-400">
                          Name 2 must be at least 1 characters long
                        </span>
                      </div>
                    </div>



                    <div className="sm:col-span-3">
                      <label htmlFor="Country" className="block text-sm font-medium leading-6 text-gray-900">
                        Country*
                      </label>
                      <div className="mt-0">
                        <select
                          id="Country"
                          name="Country"
                          required
                          value={formData.Country}
                          //placeholder="Gender"
                          onChange={(e) => { setFormData({ ...formData, Country: e.target.value, }); }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
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
                        Status*
                      </label>
                      <div className="mt-0">
                        <select
                          id="Status"
                          name="Status"
                          onChange={(e) => { setFormData({ ...formData, Status: e.target.value, }); }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                        >
                          <option >Select Donor Status</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>

                        </select>
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

export default DonorProfileAdd

