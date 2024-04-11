import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const StudentSummaryList = () => {
    const [StudentData, setStudentData] = useState([])

    const columns = [
      
        {
            name: '',
            selector: row => (<div>
                {row.ProfileId}
            </div>),
            width: "4rem",
            sortable: false,
            compact: true,
            center: true,
            wrap: true,
        },
        
        {
            name: '',
            selector: row => (<div>
                <Link to={`/StudentSummaryDetail?id=${row.ProfileId}`} className="text-grey-500 hover:text-indigo-600">
                    <span className="inline-flex rounded-full bg-green-100 px-2 py-2  text-xs font-semibold leading-15 text-green-800">
                        View
                    </span>
                </Link>
            </div>),
            sortable: false,
            width: "3rem",
            compact: true,
        },

        {
            name: 'Code',
            selector: row => (<div>
                {row.StudentCode} 
            </div>),
            sortable: false,
            compact: true,
            width: "5rem",
            wrap: true,
        },

        {
            name: 'Year',
            selector: row => (<div>
                {row.AcademicYear}
                
                           </div>),
            sortable: false,
            compact: true,
            width: "5rem",
            wrap: true,
        },

        {
            name: 'Name',
            selector: row => (<div>
                {row.Name}
            </div>),
            sortable: false,
            compact: true,
            width:"9rem",
            wrap: true,
        },
        {
            name: 'DOB',
            selector: row => (<div>
                {row.DOB}
            </div>),
            sortable: false,
            compact: true,
            width:"6rem",
            wrap: true,
        },

        {
            name: 'Class',
            selector: row => (<div>
                {row.Class}
            </div>),
            sortable: false,
            compact: true,
            width:"3rem",
            wrap: true,
        },

        {
            name: 'Gender',
            selector: row => (<div>
                {row.gender}
            </div>),
            sortable: false,
            compact: true,
            width:"4rem",
            wrap: true,
        },

        {
            name: 'Religion',
            selector: row => (<div>
                {row.religion}
            </div>),
            sortable: false,
            compact: true,
            width:"4rem",
            wrap: true,
        },

        {
            name: 'Category',
            selector: row => (<div>
                {row.category}
            </div>),
            sortable: false,
            compact: true,
            width:"4rem",
            wrap: true,
        },
        {
            name: 'Status',
            selector: row => (<div>
                {row.status}
            </div>),
            sortable: false,
            compact: true,
            width:"3rem",
            wrap: true,
        },
       
        {
            name: 'Parents',
            selector: row => (<div>
                {row.Parents}
            </div>),
            sortable: false,
            compact: true,
            width:"10rem",
            wrap: true,
        },
     
        {
            name: 'State',
            selector: row => (<div>
                {row.State}
            </div>),
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
                const response = await fetch('https://nishkamapi.onrender.com/api/v1/fetchAllStudentSummary');
   
                // Check if the response status is ok (200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the response as JSON
                const result = await response.json();
                console.log("result=" , result);
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
                row.Name.toLowerCase().includes(inputValue) ||
                row.Parents.toLowerCase().includes(inputValue) ||
                row.StudentCode.toLowerCase().includes(inputValue)
                // Add more fields here as needed, separated by ||
                // row.field.toLowerCase().includes(inputValue) ||
                // row.anotherField.toLowerCase().includes(inputValue) ||
                // ...
            );
            setFilteredData(newData);
        }
    };
    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-1">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <p className="font-bold text-orange-900 tracking-tight text-1xl">Student Summary List</p>
                </div>
            </div>
            <div className="mt-1 flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-grey-200 md:rounded-lg">
                            <div className="mt-1 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                                <div className="sm:col-span-1">
                                    <div className="mt-0 p-0">
                                        <input type='text'
                                            placeholder='Search'
                                            className='block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' onChange={handleFilter} />
                                    </div>
                                </div>
                            </div>
                            <DataTable
                                columns={columns}
                                data={filteredData}
                                pagination
                                responsive
                                keyField="id"
                                className="custom-table "
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StudentSummaryList