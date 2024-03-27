import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const VoulnteerList = () => {
    const [VolnData, setVolnData] = useState([])
    const columns = [
        {
            selector: row => (<div>
                {row.VolnId}
            </div>),
            width: "4rem",
            sortable: false,
            compact: true,
            center: true,
            wrap: true,
        },
        {
            selector: row => (<div>
                <Link to={`/VoulnteerEdit?id=${row.VolnId}`} className="text-grey-500 hover:text-indigo-600">
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
            selector: row => (<div>
                <strong>Name:</strong> {row.VolunteerName} <br />
                <strong>Phone:</strong> {row.phone} <br />
                <strong> Email:</strong> {row.Email} <br />

            </div>),
            sortable: false,
            compact: true,
            wrap: true,
        },
        {
            selector: row => (<div>
                <strong>State:</strong> {row.State} <br />
                <strong>District:</strong> {row.District} <br />
                <strong>Tehsil:</strong> {row.Tehsil} <br />
                <strong>Basti Name:</strong> {row.BastiName} <br />

            </div>),
            sortable: false,
            compact: true,
            wrap: true,
        },

        {
            selector: row => (<div> {console.log(row)}
                <strong>Address:</strong> {row.Address} <br />
                <strong>Village:</strong> {row.Village} <br />
                <strong>Pin Code:</strong> {row.Pincode} <br />

            </div>),
            sortable: false,
            compact: true,
            wrap: true,
        },
        {
            selector: row => (<div>
                <strong>Bank Name:</strong> {row.BankName} <br />
                <strong>Acct Name:</strong> {row.AccountName} <br />
                <strong>IFSC Code:</strong> {row.IFSCCode} <br />
                <strong>Acct:</strong> {row.AccountNumber} <br />
            </div>),

            sortable: false,
            compact: true,
            wrap: true,
            // style: {
            //     whiteSpace: 'normal', // Allow text to wrap
            //     wordWrap: 'break-word', // Break words if they exceed the container width
            // },
        },

    ];

    const [filteredData, setFilteredData] = useState(VolnData);

    useEffect(() => {
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }

        const fetchData = async () => {
            try {
                // Make API request using fetch
                const response = await fetch('https://apisikligar.azurewebsites.net/api/v1/volunteerlist2');

                // Check if the response status is ok (200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the response as JSON
                const result = await response.json();
                setVolnData(result.data);
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
        setFilteredData(VolnData);

        if (inputValue === '') {
            setFilteredData(VolnData);
        } else {
            const newData = VolnData.filter(row => row.VolunteerName.toLowerCase().includes(inputValue));
            setFilteredData(newData);
        }
    };

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-4">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <h2 className="text-lg font-semibold">Volunteer List</h2>
                </div>
            </div>
            <div className="mt-2 flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-grey-200 md:rounded-lg">
                            <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">

                                <div className="sm:col-span-2">
                                    <div className="mt-0 p-2 ml-10">
                                        <input type='text'
                                            placeholder='Search by Volunteer Name'
                                            className='block w-full rounded-md border-0 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' onChange={handleFilter} />
                                    </div>
                                </div>
                            </div>
                            <DataTable
                                columns={columns}
                                data={filteredData}
                                pagination
                                keyField="id"
                                responsive
                                className="custom-table "
                            />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VoulnteerList