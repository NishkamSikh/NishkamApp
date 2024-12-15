import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const ProgressReport = () => {
    const [StudentData, setStudentData] = useState([])

    const columns = [
      
        {
            selector: row => row.Description,
            sortable: false,
            width: "10rem",
            wrap: true,
        },
        {
            selector: row => row.Total,
            sortable: false,
            width: "5rem",
            wrap: true,
        },
    ];

    const [filteredData, setFilteredData] = useState(StudentData);
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }

        const fetchData = async () => {
            try {
                // Make API request using fetch
                const response = await fetch('https://sikligarapi.azurewebsites.net/api/v1/fetchProgressReport');
   
                // Check if the response status is ok (200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // Parse the response as JSON
                const result = await response.json();
                setStudentData(result);
                setFilteredData(result);
            } catch (error) {
                // Handle errors here
                setError(error.message);
            }
        };

        fetchData()
    }, []);
    const handleFilter = (event) => {
        const inputValue = event.target.value.toLowerCase();
        if (inputValue === '') {
            setFilteredData(StudentData);
        } else {
            const newData = StudentData.filter(row =>
                row.Name.toLowerCase().includes(inputValue) ||
                row.Parents.toLowerCase().includes(inputValue) ||
                row.StudentCode.toLowerCase().includes(inputValue)
            );
            setFilteredData(newData);
        }
    };
    return (
        <section className="mx-auto w-full max-w-2xl py-1">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div className='mb-2'>
                    <p className="font-bold text-orange-900 tracking-tight text-1xl">Progress Report - Data capturing</p>
                </div>
            </div>
            <div className="mt-1 flex flex-col">
                        <div className="overflow-hidden border border-grey-200 md:rounded-lg">
                            <DataTable
                                columns={columns}
                                data={filteredData}
                                pagination
                                responsive
                                paginationPerPage={50}
                                paginationRowsPerPageOptions={[50,75,100,10000]}
                                keyField="id"
                                className="custom-table "
                            />
                        </div>
            </div>
        </section>
    )
}

export default ProgressReport