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
            width: "4rem",
            sortable: false,
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
            width: "4rem",
            compact: true,
        },
        {
            selector: row => (<div>
                <b>Name:</b> {row.IN_InstitutionName} <br />
                <b>Type:</b> {row.IN_InstitutionType} <br />
                <b>Catg:</b> {row.IN_InstitutionCatg} <br />
                <b>Board:</b> {row.IN_InstitutionBoard} <br />
                <b>P.:</b> {row.IN_PrincipalName} <br />
                <b>P.#:</b> {row.IN_PrincipalPhone} <br />
            </div>),
            sortable: false,
            compact: true,
            wrap: true,
        },
        {
            selector: row => (<div>
                <b>Email:</b> {row.IN_InstitutionEmail} <br />
                <b>Ph#:</b> {row.IN_InstitutionPhone} <br />
                <b>Alt #:</b> {row.IN_AlternatePhone} <br />
                <b>Medium:</b> {row.IN_InstitutionMedium} <br />
                <b>www:</b> {row.IN_Website} <br />
            </div>),
            sortable: false,
            compact: true,
            wrap: true,
        },
        {
            selector: row => (<div>
                <b>Cont-1#:</b> {row.IN_ContactPhone_1} <br />
                <b>Desig:</b> {row.IN_ContactDesignation_1} <br />
                <b>Cont-2#:</b> {row.IN_ContactPhone_2} <br />
                <b>Desig:</b> {row.IN_ContactDesignation_2} <br />

            </div>),
            sortable: false,
            compact: true,
            wrap: true,
        },


        {
            selector: row => (<div>
                <b>State:</b> {row.IN_State} <br />
                <b>Dist:</b> {row.IN_District} <br />
                <b>Tehsil:</b> {row.IN_Tehsil} <br />
                <b>Addr:</b>  {row.IN_Address} <br />
                <b>PIN:</b> {row.IN_Pincode} <br />

            </div>),
            sortable: false,
            compact: true,
            wrap: true,
        },
        {
            selector: row => (<div>
                <b>Bank:</b> {row.IN_BankName} <br />
                <b>Acct Name:</b> {row.IN_AccountName} <br />
                <b>IFSC Code:</b> {row.IN_IFSCCode} <br />
                <b>Acct#:</b> {row.IN_AccountNumber} <br />
            </div>),
            sortable: false,
            compact: true,
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
                //const response = await fetch('https://nishkamapi.onrender.com/api/v1/instlist2');
                const response = await fetch('https://nishkamapi.onrender.com/api/v1/instlist2');

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

    const handleFilter2 = (event) => {
        const inputValue = event.target.value.toLowerCase();

        if (inputValue === '') {
            setFilteredData(instData);
        } else {
            const newData = instData.filter(row => row.IN_InstitutionName.toLowerCase().includes(inputValue));
            setFilteredData(newData);
        }
    };
    const handleFilter = (event) => {
        const inputValue = event.target.value.toLowerCase();

        if (inputValue === '') {
            setFilteredData(instData);
        } else {
            const newData = instData.filter(row =>
                row.IN_InstitutionName.toLowerCase().includes(inputValue) ||
                row.IN_InstitutionType.toLowerCase().includes(inputValue)
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