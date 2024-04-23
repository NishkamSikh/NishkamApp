import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const ListInstitution = () => {
    const [instData, setInstData] = useState([])
    const [filteredData, setFilteredData] = useState(instData);
    const [errors, setErrors] = useState({});
    const columns = [
        {
            id:'1',
            name:'Id',
            selector: row => row.InstId,
            width: "2rem",
            sortable: true,
            compact: true,
            center: true,
            wrap: true,
        },

         {
            selector: row => (<div>
                <Link to={`/InstitutionEdit?id=${row.InstId}`} className="text-grey-500 hover:text-indigo-600">
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
            id:'3',
            name: 'Name',
            selector: row => row.IN_InstitutionName,
            sortable: true,
            compact: true,
            width: "10rem",
            wrap: true,
        },

        {
            id:'4',
            name: 'Type',
            selector: row => row.IN_InstitutionType,
            sortable: true,
            compact: true,
            width: "4rem",
            wrap: true,
        },

        {
            id:'5',
            name: 'Catg',
            selector: row => row.IN_InstitutionCatg,
            sortable: true,
            compact: true,
            width: "4rem",
            wrap: true,
        },

        {
            id:'6',
            name: 'Board',
            selector: row => row.IN_InstitutionBoard,
            sortable: true,
            compact: true,
            width: "4rem",
            wrap: true,
        },

        {
            name: 'Principal',
            selector: row => row.IN_PrincipalName+' '+row.IN_PrincipalPhone,
            sortable: true,
            compact: true,
            width: "8rem",
            wrap: true,
        },

        {
            name: 'Email',
            selector: row => row.IN_InstitutionEmail,
            sortable: false,
            compact: true,
            width: "6rem",
            wrap: true,
        },

        {
            name: 'Phone',
            selector: row => row.IN_InstitutionPhone +' ' + row.IN_AlternatePhone,
            sortable: false,
            compact: true,
            width: "6rem",
            wrap: true,
        },

        {
            name: 'Medium',
            selector: row => row.IN_InstitutionMedium,
            sortable: true,
            compact: true,
            width: "5rem",
            wrap: true,
        },

        {
            name: 'Contact-1',
            selector: row => row.IN_ContactDesignation_1+' '+ row.IN_ContactPhone_1 ,
            sortable: false,
            compact: true,
            width: "8rem",
            wrap: true,
        },

        {
            name: 'Contact-2',
            selector: row => row.IN_ContactDesignation_2 + ' '+ row.IN_ContactPhone_2,
            sortable: false,
            compact: true,
            width: "6rem",
            wrap: true,
        },

        {
            name: 'Address',
            selector: row => row.IN_State +' ' + row.IN_District + ' ' + row.IN_Tehsil +' ' + row.IN_Address +' '+ row.IN_Pincode,
            sortable: false,
            compact: true,
            width: "10rem",
            wrap: true,
        },

        {
            name: 'Bank',
            selector: row => row.IN_BankName,
            sortable: false,
            compact: true,
            width: "6rem",
            wrap: true,
        },

        {
            name: 'Acct Name',
            selector: row => row.IN_AccountName,
            sortable: false,
            compact: true,
            width: "6rem",
            wrap: true,
        },

        {
            name: 'IFSCCode',
            selector: row => row.IN_IFSCCode,
            sortable: false,
            compact: true,
            width: "6rem",
            wrap: true,
        },

        {
            name: 'Acct#',
            selector: row => row.IN_AccountNumber,
            sortable: false,
            compact: true,
            width: "8rem",
            wrap: true,
        },
 
    ];
    useEffect(() => {
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }

        const fetchData = async () => {
            try {
                // Make API request using fetch
                const response = await fetch('https://nishkamapi.onrender.com/api/v1/instlist2');

                // Check if the response status is ok (200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the response as JSON
                const result = await response.json();
                // const sortedData = result.data.sort((a, b) => {
                //     return a.IN_InstitutionName.localeCompare(b.IN_InstitutionName);
                // });

                setInstData(result.data);
                setFilteredData(result.data);
            } catch (error) {
                // Handle errors here
                setErrors(error.message);
            }
        };

        fetchData()
    }, []);

    const handleFilter = (event) => {
        const inputValue = event.target.value.toLowerCase();
        if (inputValue === '') {
            setFilteredData(instData);
        } else {


            const newData = instData.filter(row =>
                row.IN_InstitutionName.toLowerCase().includes(inputValue) ||
                row.IN_InstitutionType.toLowerCase().includes(inputValue)
            );
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
        <section className="mx-auto w-full max-w-8xl px-4 py-1">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <p className="text-center text-lg font-semibold  bg-blue-100" >Institution List</p>
                </div>

           </div>
            <div className="mt-0 flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-1 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-grey-200 md:rounded-lg">
                            <div className="mt-1 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                                <div className="sm:col-span-1">
                                    <div className="mt-0 p-2 text-sm">
                                        <input type='text'
                                            placeholder='Search by Name'
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
        </section >
    )
}

export default ListInstitution