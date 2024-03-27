import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';


const StudentDocsList = () => {
    const [StudentData, setStudentData] = useState([])

    const columns = [
        {
            selector: row => (<div>
                {row.StudentId}
            </div>),
            width: "4rem",
            sortable: false,
            compact: true,
            center: true,
            wrap: true,
        },

        {
            selector: row => (<div>
                <strong>Id:</strong> {row.id} <br />
                <strong>Code:</strong> {row.StudentCode} Year: {row.AcademicYear} <br />
                <strong>Name:</strong> {row.StudentName} <br />
                <strong>DOB:</strong> {row.dob} <br />
            </div>),
            sortable: false,
            compact: true,
            wrap: true,
        },

        {
            selector: row => (<div>
                <strong>Doc Desc:</strong> {row.DocumentDesc} ({row.DocumentType}) <br />
                <strong>Upload Dt:</strong> {row.created} <br />

            </div>),
            sortable: false,
            compact: true,
            wrap: true,
        },
        {
            selector: row => (<div>
                <a href={row.DocumentURL} target="_blank" download>View PDF</a>
            </div>),
            sortable: false,
            compact: true,
            wrap: true,
        },

        /*         {
            selector: row => {
                // If there are documents for the StudentCode, return the div
                if (row.DocumentURL!='') {
                    const documentsForCode = row.map(item => (
                        <a key={item.id} href={item.DocumentURL} target="_blank" rel="noopener noreferrer">
                            {item.DocumentType},
                        </a>
                    ));

                    return (
                        <div>
                            {documentsForCode}
                        </div>
                    );
                }

                // Otherwise, return null to avoid rendering empty rows
                return null;
            },
            sortable: false,
            compact: true,
            wrap: true,
        }, */

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
                const response = await fetch('https://apisikligar.azurewebsites.net/api/v1/studentDocsList');

                // Check if the response status is ok (200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the response as JSON
                const result = await response.json();
                console.log(result.data);
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
                row.StudentName.toLowerCase().includes(inputValue)
                // row.IN_InstitutionType.toLowerCase().includes(inputValue)
                // row.MiddleName.toLowerCase().includes(inputValue)
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
                    <p className="font-bold text-orange-900 tracking-tight text-1xl">List - Student Documents</p>
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
                                            placeholder='Search by Name'
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

export default StudentDocsList