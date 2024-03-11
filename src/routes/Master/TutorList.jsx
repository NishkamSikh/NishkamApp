import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { AlignCenter } from 'lucide-react';

const TutorList = () => {
    const [TutorData, setTutorData] = useState([])
    const columns = [
        {
            //name: 'Column 1',
            selector: row => (<div>
                {row.TutorId}
            </div>),
            width: "4rem",
            sortable: false,
            compact: true,
            center: true,
            wrap: true,
        },
        {
            //name: 'Column 2',
            selector: row => (<div>
                <Link to={`/TutorEdit?id=${row.TutorId}`} className="text-grey-500 hover:text-indigo-600">
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
            //name: 'Column 3',
            selector: row => (<div>
                <strong>Name:</strong> {row.TutorName} <br />
                <strong>Phone:</strong> {row.PhoneNumber} <br />
                <strong>Email:</strong> {row.Email} <br />
            </div>),
            sortable: false,
            compact: true,
            wrap: true,
        },
        {
            //name: 'Column 4',
            selector: row => (<div>
                <strong>State:</strong> {row.State} <br />
                <strong>District:</strong> {row.District} <br />
                <strong>Tehsil:</strong> {row.Tehsil} <br />
                <strong>Basti:</strong> {row.Basti} <br />

            </div>),
            sortable: false,
            compact: true,
            wrap: true,
        },

        {
            //name: 'Column 5',
            selector: row => (<div>
                <strong>Subject:</strong> {row.TutorSubject} <br />
                <strong>Class:</strong> {Array.isArray(row.Class) ? (
                    row.Class.map((classItem, index) => (
                        <span key={index}>{classItem.value}</span>
                    ))
                ) : (
                    <span>{console.log(JSON.stringify(row.Class), "Class")}{row.Class}</span>
                )} <br />
                <strong>Monthly Fee:</strong> {row.MonthlyFee} <br />
            </div>),
            sortable: false,
            compact: true,
            wrap: true,
        },

        {
            //name: 'Column 6',
            selector: row => (<div>
                <strong>Bank Name:</strong> {row.BankName} <br />
                <strong>Acct Name:</strong> {row.AccountName} <br />
                <strong>IFSC Code:</strong> {row.IFSCCode} <br />
                <strong>Acct:</strong> {row.AccountNumber} <br />


            </div>),
            sortable: false,
            compact: true,
            wrap: true,
        },

    ];

    const [filteredData, setFilteredData] = useState(TutorData);
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }

        const fetchData = async () => {
            try {
                // Make API request using fetch
                const response = await fetch('http://localhost:3000/api/v1/tutorlist');

                // Check if the response status is ok (200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the response as JSON
                const result = await response.json();
                console.log(result);
                setTutorData(result.data);
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
            setFilteredData(TutorData);
        } else {
            const newData = TutorData.filter(row => row.TutorName.toLowerCase().includes(inputValue));
            setFilteredData(newData);
        }
    };
    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-1">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <h2 className="text-lg font-semibold">Tutor List</h2>
                </div>
            </div>
            <div className="mt-4 flex flex-col">
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

export default TutorList