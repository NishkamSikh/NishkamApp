import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const BastiList = () => {
    const [BastiData, setBastiData] = useState([])
    const [errors, setError] = useState({});
    const columns = [
        {
            id:'1',
            name:'Id',
            selector: row => row.BastiId,
            width: "3rem",
            sortable: true,
            compact: true,
            center: true,
            wrap: true,
        },
        {
            selector: row => (<div>
                <Link to={`/bastiedit?id=${row.BastiId}`} className="text-grey-500 hover:text-indigo-600">
                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                        Edit
                    </span>
                </Link>
            </div>),
            sortable: false,
            width: "3rem",
            compact: true,
        },

        {
            id:'2',
            name: 'Basti',
            selector: row => row.BastiName,
            width: "10rem",
            sortable: true,
            compact: true,
            wrap: true,
        },

        {
            id:'3',
            name:'State',
            selector: row => row.State,
            width: "8rem",
            sortable: true,
            compact: true,
            wrap: true,
        },

        {
            id:'4',
            name: 'District',
            selector: row => row.District,
            width: "8rem",
            sortable: true,
            compact: true,
            wrap: true,
        },

        {
            id:'5',
            name: 'Tehsil',
            selector: row => row.Tehsil,
            width: "8rem",
            sortable: true,
            compact: true,
            wrap: true,
        },

        {
            id:'6',
            name: 'Address',
            selector: row => row.Address,
            width: "15rem",
            sortable: true,
            compact: true,
            wrap: true,
        },

        {
            id:'7',
            name: 'Village',
            selector: row => row.Village,
            width: "12rem",
            sortable: true,
            compact: true,
            wrap: true,
        },
        {
            id:'8',
            name: 'PIN',
            selector: row => row.Pincode,
            width: "6rem",
            sortable: true,
            compact: true,
            wrap: true,
        },

    ];

    const [filteredData, setFilteredData] = useState(BastiData);

    useEffect(() => {
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }


        const fetchData = async () => {
            try {
                // Make API request using fetch
                const response = await fetch('https://nishkamapi.onrender.com/api/v1/bastilist2');

                // Check if the response status is ok (200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the response as JSON
                const result = await response.json();
                setBastiData(result.data);
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
            setFilteredData(BastiData);
        } else {
            const newData = BastiData.filter(row => 
                
                (row.BastiName.toLowerCase().includes(inputValue)) ||
                (row.State.toLowerCase().includes(inputValue)) ||
                (row.District.toLowerCase().includes(inputValue)) 
            )
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
        <section className="mx-auto w-full max-w-7xl px-4 py-0">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <h2 className="text-lg font-semibold pb-3">Basti List</h2>
                </div>
            </div>
            <div className="mt-0 flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-4 lg:-mx-6">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-grey-200 md:rounded-lg">
                            <div className="mt-0 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">

                                <div className="sm:col-span-2">
                                    <div className="mt-0 p-2">
                                        <input type='text'
                                            placeholder='Search by State, District, Basti'
                                            className='block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' onChange={handleFilter} />
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

export default BastiList