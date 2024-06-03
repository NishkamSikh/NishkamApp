import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';


const StudentDocsList = () => {
    const [StudentData, setStudentData] = useState([])

    const columns = [

        {
            id: '1',
            name: '#',
            selector: row => row.sno,
            width: "4rem",
            sortable: true,
            compact: true,
            center: true,
            wrap: true,
        },   

        {
            name: 'Id',
            selector: row =>row.id,
            sortable: true,
            width: "3rem",
            compact: true,
            wrap: true,
        },


        {
            selector: row => <img src={row.DocumentURL} width={40} height={40}></img>,
            sortable: false,
            compact: true,
            width: "5rem",
            wrap: true,
        },

        {
            name: 'Code',
            selector: row =>row.StudentCode,
            sortable: true,
            width: "5rem",
            compact: true,
            wrap: true,
        },
     
        {
            name: 'Year',
            selector: row =>row.AcademicYear,
            sortable: true,
            width: "5rem",
            compact: true,
            wrap: true,
        },

        {
            name: 'Name',
            selector: row =>row.StudentName,
            sortable: true,
            width: "10rem",
            compact: true,
            wrap: true,
        },


        {
            name: 'F.Name',
            selector: row =>row.Father_Name,
            sortable: true,
            width: "10rem",
            compact: true,
            wrap: true,
        },

        {
            name: 'DOB',
            selector: row =>row.dob,
            sortable: true,
            width: "6rem",
            compact: true,
            wrap: true,
        },      

        {
            name: 'Doc Type',
            selector: row =>row.DocumentDesc + '-' + row.DocumentType,
            sortable: true,
            width: "6rem",
            compact: true,
            wrap: true,
        },  

        {
            name: 'Upload Dt',
            selector: row =>row.created,
            sortable: true,
            width: "10rem",
            compact: true,
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
                const response = await fetch('https://nishkamapi.onrender.com/api/v1/studentDocsList');

                // Check if the response status is ok (200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the response as JSON
                const result = await response.json();
                console.log(result.data, "sddsdsds");
                setStudentData(result.data);
                setFilteredData(result.data);
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
                row.StudentName.toLowerCase().includes(inputValue) ||
                row.StudentCode.toLowerCase().includes(inputValue)
                // row.MiddleName.toLowerCase().includes(inputValue)
                // Add more fields here as needed, separated by ||
                // row.field.toLowerCase().includes(inputValue) ||
                // row.anotherField.toLowerCase().includes(inputValue) ||
                // ...
            );
            setFilteredData(newData);
        }
    };

    const tableHeaderstyle = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "12px",
                backgroundColor: "#ddd"

            },
        },
    }

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-1">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <p className="font-bold text-orange-900 tracking-tight text-1xl">List - Student Documents</p>
                </div>
            </div>
            <div className="mt-1 flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-grey-200 md:rounded-lg">
                            <div className="mt-1 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                                <div className="sm:col-span-2">
                                    <div className="mt-0 p-0">
                                        <input type='text'
                                            placeholder='Search by Code, Name'
                                            className='block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' onChange={handleFilter} />
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: '100%' }}>
                                        <DataTable
                                            columns={columns}
                                            data={filteredData}
                                            customStyles={tableHeaderstyle}
                                            pagination
                                            paginationPerPage={10}
                                            paginationRowsPerPageOptions={[10, 25, 50, 75, 100, 10000]}
                                            fixedHeader
                                            responsive
                                            highlightOnHover
                                            striped
                                            className="custom-table "
                                        />
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StudentDocsList