import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const StudentInstitutionList = () => {
    const [StudentData, setStudentData] = useState([])

    const columns = [
        {
            name:<strong>Id</strong>,
            selector: row => (<div>
                {row.StudentId}
            </div>),
            width: "4rem",
            sortable: false,
            compact: true,
            wrap: true,
        },
        {
            //name: 'Column 2',
            selector: row => (<div>
                <Link to={`/StudentInstitutionEdit?Id=${row.StudentId}`} className="text-grey-500 hover:text-indigo-600">
                    <span className="inline-flex rounded-full bg-green-100 px-2 py-2  text-xs font-semibold leading-15 text-green-800">
                        Edit
                    </span>
                </Link>
            </div>),
            sortable: false,
            width: "4rem",
            compact: true,
        },

        {
            name:<strong>Code</strong>,
            selector: row => (<div>
                {row.StudentCode}
            </div>),
            width: "4rem",
            sortable: false,
            compact: true,
            wrap: true,
        },

        {
            name:<strong>Year</strong>,
            selector: row => (<div>
                {row.AcademicYear}
            </div>),
            width: "6rem",
            sortable: false,
            compact: true,
            wrap: true,
        },


        {
            name:<strong>Name</strong>,
            selector: row => (<div>
                {row.FirstName} {row.MiddleName} {row.LastName}
            </div>),
            width: "10rem",
            sortable: false,
            compact: true,
            wrap: true,
        },

        {
            name:<strong>Institute Type</strong>,
            selector: row => (<div>
                {row.institutiontype} 
            </div>),
            width: "10rem",
            sortable: false,
            compact: true,
            wrap: true,
        },

        {
            name:<strong>Institute Board</strong>,
            selector: row => (<div>
                {row.boardoruniversity} 
            </div>),
            width: "10rem",
            sortable: false,
            compact: true,
            wrap: true,
        },        

        {
            name:<strong>Institute Name</strong>,
            selector: row => (<div>
                {row.IN_InstitutionName} 
            </div>),
            width: "15rem",
            sortable: false,
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
//                const response = await fetch('https://nishkamapi.onrender.com/api/v1/studentinstitutionlist');
                const response = await fetch('https://nishkamapi.onrender.com/api/v1/studentinstitutionlist');

                // Check if the response status is ok (200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the response as JSON
                const result = await response.json();
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
                row.FirstName.toLowerCase().includes(inputValue) ||
                row.LastName.toLowerCase().includes(inputValue) ||
                row.IN_InstitutionName.toLowerCase().includes(inputValue) ||
                (row.StudentCode && row.StudentCode.toLowerCase().includes(inputValue)) 
             );
            setFilteredData(newData);
        }
    };
    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-1">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <p className="font-bold text-orange-900 tracking-tight text-1xl">Student Institution List</p>
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
                                            placeholder='Search by Code, Name, Institution'
                                            className='block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' onChange={handleFilter} />
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: '100%' }}>
                            <DataTable
                                columns={columns}
                                data={filteredData}
                                pagination
                                paginationPerPage={10}
                                paginationRowsPerPageOptions={[10, 25, 50, 75, 100, 10000]}                                  
                                responsive
                                keyField="id"
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

export default StudentInstitutionList