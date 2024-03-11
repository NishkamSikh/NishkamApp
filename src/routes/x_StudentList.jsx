import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
const StudentList = () => {
  const [userID, setUserId] = useState('')
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("UserauthToken")) {
      navigate("/");
    }

    const getUserid = localStorage.getItem("UserId")
    console.log(typeof getUserid);
    console.log({ getUserid }, "tes")
    setUserId(getUserid)
    // Check if userId exists
    if (getUserid) {
      // Make API request
      fetch('http://localhost:3000/api/v1/fetchStudentDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserId: getUserid.toString() })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.data, "Datazsd");
          setUserData(data.data)
        }) // Assuming the data is available in 'data'
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, [])

  const fetchData = async () => {

    console.log({ userID }, "userID")
    try {
      // Assuming your API endpoint is "/api/v1/fetchStudentDetails"
      const response = await fetch(`http://localhost:3000/api/v1/fetchStudentDetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data, "Data");
      setStudentDetails(data.data); // Assuming the data is available in 'data'
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    // <div>
    //   {userData ? (
    //     <table>
    //       <thead>
    //         <tr>
    //           <th>User ID</th>
    //           <th>Name</th>
    //           <th>Email</th>
    //           {/* Add more table headers based on your API response */}
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {userData.map((item, index)=> (

    //           <tr>

    //            <td key={index}>{item.id}</td>


    //           </tr>
    //         ))}

    //       </tbody>
    //     </table>
    //   ) : (
    //     <p>Loading user data...</p>
    //   )}
    // </div>
    <section className="mx-auto w-full max-w-7xl px-4 py-4">
      <div class="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 class="text-lg font-semibold">Student List</h2>
          <p class="mt-1 text-sm text-gray-700">
            See all records
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">



              {userData ?


                (<table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr className="divide-x divide-gray-200">
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        <span>Student Code</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Student Name
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Gender
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        DOB
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {console.log(userData, "user Data")}
                    {userData.map((item, index) => (
                      <tr className="divide-x divide-gray-200">
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center">

                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{item.StudentCode}</div>
                              <div className="text-sm font-medium text-gray-900">{item.CatgCode}</div>

                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm font-medium text-gray-900">{JSON.parse(item.Json).firstname}</div>

                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm font-medium text-gray-900">{JSON.parse(item.Json).gender}</div>
                        </td>
                        <td className="whitespace-nowrap  px-4 py-4 text-sm text-gray-500">
                          <div className="text-sm font-medium text-gray-900">{JSON.parse(item.Json).dob}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">

                          <Link to="/studentAllData" className="text-gray-500 hover:text-indigo-600">
                            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                              View
                            </span>
                            <span className="inline-flex rounded-full bg-red-100 px-2 mx-2 text-xs font-semibold leading-5 text-green-800">
                              Delete
                            </span>
                          </Link>
                        </td>
                      </tr>

                    ))}


                  </tbody>
                </table>)

                :

                (
                  <p>Loading user data...</p>
                )

              }
            </div>
          </div>
        </div>
      </div>

    </section>

  )
}

export default StudentList