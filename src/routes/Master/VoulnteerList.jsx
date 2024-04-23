import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const VoulnteerList = () => {
    const [VolnData, setVolnData] = useState([])
    const [errors, setError] = useState({});
    const columns = [
        {
            id: 'Id',
            name: 'Id',
            selector: row => row.VolnId,
            width: "3rem",
            sortable: true,
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
            width: "3rem",
            compact: true,
        },

        {
            id: '2',
            name: 'Name',
            selector: row => row.VolunteerName,
            sortable: true,
            compact: true,
            width: "6rem",
            wrap: true,
        },

        {
            id: '3',
            name: 'Phone',
            selector: row => row.phone,
            sortable: true,
            compact: true,
            width: "6rem",
            wrap: true,
        },

        {
            id: '4',
            name: 'Email',
            selector: row => row.Email,
            sortable: true,
            compact: true,
            width: "8rem",
            wrap: true,
        },

        {
            id: '5',
            name: 'State',
            selector: row => row.State,
            sortable: true,
            compact: true,
            width: "5rem",
            wrap: true,
        },


        {
            id: '6',
            name: 'District',
            selector: row => row.District,
            sortable: true,
            compact: true,
            width: "5rem",
            wrap: true,
        },

        {
            id: '7',
            name: 'Tehsil',
            selector: row => row.Tehsil,
            sortable: true,
            compact: true,
            width: "5rem",
            wrap: true,
        },

        {
            id: '8',
            name: 'Basti',
            selector: row => row.BastiName,
            sortable: true,
            compact: true,
            width: "5rem",
            wrap: true,
        },


        {
            id:'9',
            name:'Address',
            selector: row => row.Address + ' ' + row.Village + row.Pincode,
            sortable: false,
            compact: true,
            width: "8rem",
            wrap: true,
        },

        {
            name: 'Bank',
            selector: row => row.BankName,
            sortable: false,
            compact: true,
            width: "6rem",
            wrap: true,
        },

        {
            name: 'Acct Name',
            selector: row => row.AccountName,
            sortable: false,
            compact: true,
            width: "6rem",
            wrap: true,
        },

        {
            name: 'IFSCCode',
            selector: row => row.IFSCCode,
            sortable: false,
            compact: true,
            width: "6rem",
            wrap: true,
        },

        {
            name: 'Acct#',
            selector: row => row.AccountNumber,
            sortable: false,
            compact: true,
            width: "8rem",
            wrap: true,
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
                const response = await fetch('https://nishkamapi.onrender.com/api/v1/volunteerlist2');

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

    const tableHeaderstyle = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "14px",
                backgroundColor: "#eee"
            },
        },
    }

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
                            <div className="mt-1 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">

                                <div className="sm:col-span-2">
                                    <div className="mt-0 p-2 ml-10">
                                        <input type='text'
                                            placeholder='Search by Volunteer'
                                            className='block w-full rounded-md border-0 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-1' onChange={handleFilter} />
                                    </div>
                                </div>
                            </div>

                            <div style={{ width: '100%' }}>

                                <DataTable
                                    columns={columns}
                                    data={filteredData}
                                    customStyles={tableHeaderstyle}
                                    fixedHeader
                                    highlightOnHover
                                    pagination
                                    paginationPerPage={10}
                                    paginationRowsPerPageOptions={[10, 25, 50, 75, 100, 10000]}
                                    responsive
                                    striped
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

export default VoulnteerList