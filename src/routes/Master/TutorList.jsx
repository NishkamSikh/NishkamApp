import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { AlignCenter } from 'lucide-react';

const TutorList = () => {
    const [TutorData, setTutorData] = useState([])
    const [errors, setError] = useState({});
    const columns = [
        {
            name: 'Id',
            selector: row => row.TutorId,
            width: "4rem",
            sortable: true,
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
            name: 'Name',
            selector: row => row.TutorName,
            width: "6rem",
            sortable: true,
            compact: true,
            wrap: true,
        },

        {
            name: 'Phone',
            selector: row => row.PhoneNumber,
            width: "6rem",
            sortable: true,
            compact: true,
            wrap: true,
        },

        {
            name: <strong>Email</strong>,
            selector: row => (<div>
                {row.Email}
            </div>),
            width: "10rem",
            sortable: false,
            compact: true,
            wrap: true,
        },

        {
            name: <strong>Address</strong>,
            selector: row => (<div>
                {row.State} {row.District} {row.Tehsil} {row.Basti}
            </div>),
            sortable: false,
            compact: true,
            width: "10rem",
            wrap: true,
        },

        {
            name: <strong>Subject</strong>,
            selector: row => (<div>
                {row.Subject}
            </div>),
            sortable: false,
            compact: true,
            width: "8rem",
            wrap: true,
        },


        {
            name: <strong>Class</strong>,
            selector: row => (<div>
                {row.Class}
            </div>),
            sortable: false,
            compact: true,
            width: "9rem",
            wrap: true,
        },

        {
            name: <strong>Bank</strong>,
            selector: row => (<div>
                {row.BankName}
            </div>),
            sortable: false,
            compact: true,
            width: "6rem",
            wrap: true,
        },

        {
            name: <strong>Acct Name</strong>,
            selector: row => (<div>
                {row.AccountName}
            </div>),
            sortable: false,
            compact: true,
            width: "6rem",
            wrap: true,
        },

        {
            name: <strong>IFSCCode</strong>,
            selector: row => (<div>
                {row.IFSCCode}
            </div>),
            sortable: false,
            compact: true,
            width: "6rem",
            wrap: true,
        },

        {
            name: <strong>Acct#</strong>,
            selector: row => (<div>
                {row.AccountNumber}
            </div>),
            sortable: false,
            compact: true,
            width: "8rem",
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
                //const response = await fetch('https://nishkamapi.onrender.com/api/v1/tutorlist');
                const response = await fetch('https://nishkamapi.onrender.com/api/v1/tutorlist');


                // Check if the response status is ok (200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // Parse the response as JSON
                const result = await response.json();
                // Sort the data alphabetically by VendorName
                // const sortedData = result.data.sort((a, b) => {
                //     return a.TutorName.localeCompare(b.TutorName);
                // });
                
                setTutorData(result.data);
                setFilteredData(result.data);

            } catch (error) {
                // Handle errors here
                setError(error.message);
            }
        };

        fetchData()
    }, []);


    const tableHeaderstyle = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "14px",
                backgroundColor: "#eee"
            },
        },
    }


    const handleFilter = (event) => {
        const inputValue = event.target.value.toLowerCase();

        if (inputValue === '') {
            setFilteredData(TutorData);
        } else {
            const newData = TutorData.filter(row =>
                row.TutorName.toLowerCase().includes(inputValue) ||
                row.PhoneNumber.toLowerCase().includes(inputValue)
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
                    <h2 className="text-lg font-semibold">Tutor List</h2>
                </div>
            </div>
            <div className="mt-4 flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-grey-200 md:rounded-lg">
                            <div className="mt-1 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                                <div className="sm:col-span-2">
                                    <div className="mt-1 p-2">
                                        <input type='text'
                                            placeholder='Search by Tutor Name / Phone'
                                            className='block w-full rounded-md border-0 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' onChange={handleFilter} />
                                    </div>
                                </div>
                            </div>
                            <DataTable
                                columns={columns}
                                data={filteredData}
                                customStyles={tableHeaderstyle}
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