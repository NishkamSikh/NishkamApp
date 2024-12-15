import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';


const StudentSummaryCard = () => {

    const [StudentData, setStudentData] = useState([]);
    const [FetchData, setFetchData] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {

                // Make API request using fetch
                ///SELECT * FROM v_StudentDataSummary
                const response = await fetch('https://sikligarapi.azurewebsites.net/api/v1/fetchAllStudentSummary');
                setFetchData(false);
                // Check if the response status is ok (200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the response as JSON
                const result = await response.json();
                setStudentData(result.data);
                setFilteredData(result.data);

                //setFilteredData(result.data);
            } catch (error) {
                // Handle errors here
                setError(error.message);
            }
        };

        fetchData()
    }, []);

    const [filteredData, setFilteredData] = useState(StudentData);
    
    const handleFilter = (event) => {
        const inputValue = event.target.value.toLowerCase();
        if (inputValue === '') {
            setFilteredData(StudentData);
        } else {
            const newData = StudentData.filter(row =>
                (row.Name && row.Name.toLowerCase().includes(inputValue)) ||
                (row.Parents && row.Parents.toLowerCase().includes(inputValue)) ||
                (row.StudentCode && row.StudentCode.toLowerCase().includes(inputValue)) ||
                (row.Basti && row.Basti.toLowerCase().includes(inputValue)) ||
                (row.Institution && row.Institution.toLowerCase().includes(inputValue)) 

            );
            setFilteredData(newData);
        }
    };
    return (


        <div className="w-1/3 m-auto">
            <input type='text'
                placeholder='Search by Code, Name, Parents, Basti, School'
                className='block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' onChange={handleFilter} />
            <div className="mt-5">
                {filteredData.map((d) => (
                    <div className="bg-white h-[470px] text-black rounded-xl">
                        <div className="h-56 rounded-t-xl bg-indigo-500 flex justify-center items-center">
                            <img src={d.DocumentURL} alt="" className="h-44 w-44 rounded-full" />
                        </div>
                        <div className="flex flex-col justify-left items-left gap-1 p-1">
                            <p className="text-xl">Name: {d.Name} ({d.StudentCode})</p>
                            <p className="text-xl">DOB: {d.DOB}</p>
                            <p className="text-xl">District: {d.District}</p>
                            <p className="text-xl">Class: {d.ClassName}</p>

                            <p className="text-xl">School: {d.Institution}</p>
                            <button className="bg-indigo-500 text-white text-lg px-6 py-1 rounded">Read More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}




export default StudentSummaryCard