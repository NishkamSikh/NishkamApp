import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const ListInstitution = () => {
    const [instData, setinstData] = useState([])
    const [filteredData, setFilteredData] = useState(instData);
    const columns = [
        {
            selector: row => (<div>
                {row.InstId}
            </div>),
            width:"4rem",
            sortable: false,
            compact:true,
            center: true,
            wrap:true,
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
            width:"4rem",
            compact:true,
        },
        {
            selector: row => (<div>
                <strong>Name:</strong> {row.IN_InstitutionName} <br />
                <strong>Type:</strong> {row.IN_InstitutionType} <br />
                <strong>Catg:</strong> {row.IN_InstitutionCatg} <br />
                <strong>Board:</strong> {row.IN_InstitutionBoard} <br />
                <strong>Principal:</strong> {row.IN_PrincipalName} <br />
            </div>),
            sortable: false,
            compact:true,
            wrap:true,
        },
        {
            selector: row => (<div>
                <strong>Email:</strong> {row.IN_InstitutionEmail} <br />
                <strong>Phone:</strong> {row.IN_InstitutionPhone} <br />
                <strong>Alt phone:</strong> {row.IN_AlternatePhone} <br />
                <strong>Medium:</strong> {row.IN_InstitutionMedium} <br />
                <strong>Website:</strong> {row.IN_Website} <br />
            </div>),
            sortable: false,
            compact:true,
            wrap:true,
        },
        {
            selector: row => (<div>
                <strong>Contact-1:</strong> {row.IN_ContactPhone_1} <br />
                <strong>Designation:</strong> {row.IN_ContactDesignation_1} <br />
                <strong>Contact-2:</strong> {row.IN_ContactPhone_2} <br />
                <strong>Designation:</strong> {row.IN_ContactDesignation_2} <br />

            </div>),
            sortable: false,
            compact:true,
            wrap:true,
        },


        {
            selector: row => (<div>
                <strong>State:</strong> {row.IN_State} <br />
                <strong>District:</strong> {row.IN_District} <br />
                <strong>Tehsil:</strong> {row.IN_Tehsil} <br />
                <strong>Address:</strong>  {row.IN_Address} <br />
                <strong>Pincode:</strong> {row.IN_Pincode} <br />

            </div>),
            sortable: false,
            compact:true,
            wrap:true,
        },
        {
            selector: row => (<div>
                <strong>Bank:</strong> {row.IN_BankName} <br />
                <strong>Account Name:</strong> {row.IN_AccountName} <br />
                <strong>IFSC_Code:</strong> {row.IN_IFSCCode} <br />
                <strong>Account_Number:</strong> {row.IN_AccountNumber} <br />
            </div>),
            sortable: false,
            compact:true,
            wrap:true,
        },


    ];
    useEffect(() => {
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }

        const fetchData = async () => {
            try {
                // Make API request using fetch
                const response = await fetch('http://localhost:3000/api/v1/instlist2');

                // Check if the response status is ok (200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the response as JSON
                const result = await response.json();
                console.log(result);
                setinstData(result.data);
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
            setFilteredData(instData);
        } else {
            const newData = instData.filter(row => row.IN_InstitutionName.toLowerCase().includes(inputValue));
            setFilteredData(newData);
        }
    };
    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-0">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <h2 className="text-center text-lg font-semibold  bg-blue-100" >Institution List</h2>
                </div>
           
            
            
            </div>
            <div className="mt-2 flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-1 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-grey-200 md:rounded-lg">
                            <div className="mt-1 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                                <div className="sm:col-span-1">
                                    <div className="mt-0 p-2">
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

export default ListInstitution