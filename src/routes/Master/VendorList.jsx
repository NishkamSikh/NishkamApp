import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Form from '../../components/Form'
import BankDetails from '../../components/BankDetails'
import DataTable from 'react-data-table-component';

const VendorList = () => {
    const navigate = useNavigate();

    const [vendorData, setVendorData] = useState([])
    const [filteredData, setFilteredData] = useState(vendorData);
    const [errors, setError] = useState({});
    const columns = [
        {
            selector: row => (<div>
                {row.VendorId}
            </div>),
            width: "4rem",
            sortable: false,
            compact: true,
            center: true,
            wrap: true,
        },
        {
            selector: row => (<div>
                <Link to={`/VendorEdit?id=${row.VendorId}`} className="text-grey-500 hover:text-indigo-600">
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
                <b>Name:</b> {row.VendorName} <br />
                <b>Email: </b>{row.Email} <br />
                <b>Ph#:</b> {row.Phone} <br />
                <b>Shop Name:</b> {row.VendorShopName} <br />
            </div>),
            name: 'Name',
            sortable: true, // Enable sorting on this column
            sortFunction: (a, b) => {
                // Custom sort function for alphabetical sorting
                if (a.VendorName < b.VendorName) return -1;
                if (a.VendorName > b.VendorName) return 1;
                return 0;
            },
            compact: true,
            wrap: true,
        },
        {
            selector: row => (<div>
                <b>State:</b> {row.State} <br />
                <b>Dist:</b> {row.District} <br />
                <b>Tehsil:</b> {row.Tehsil} <br />
                <b>Addr:</b> {row.Address} <br />

            </div>),
            sortable: false,
            compact: true,
            wrap: true,
        },
        {
            selector: row => (<div>
                <b>Items:</b> {row.VendorItems} <br />
                <b>INST.</b>: {row.VendorInstitution} <br />
                <b>Vill:</b> {row.Village} <br />
                <b>PIN:</b> {row.Pincode} <br />
            </div>),
            sortable: false,
            compact: true,
            wrap: true,
        },
        {
            selector: row => (<div>
                <b>Bank</b>: {row.BankName} <br />
                <b>Acct Name</b>: {row.AccountName} <br />
                <b>IFSC Code</b>: {row.IFSCCode} <br />
                <b>Acct#</b>: {row.AccountNumber} <br />

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
                //const response = await fetch('https://nishkamapi.onrender.com/api/v1/vendorlist');
                const response = await fetch('https://nishkamapi.onrender.com/api/v1/vendorlist');

                // Check if the response status is ok (200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the response as JSON
                const result = await response.json();
                  // Sort the data alphabetically by VendorName
        const sortedData = result.data.sort((a, b) => {
            return a.VendorName.localeCompare(b.VendorName);
        });

        console.log(sortedData);
        setVendorData(sortedData);
        setFilteredData(sortedData);
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
            setFilteredData(vendorData);
        } else {
            const newData = vendorData.filter(row => row.VendorName.toLowerCase().includes(inputValue));
            setFilteredData(newData);
        }
    };

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-0">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <h2 className="text-lg font-semibold">Vendor List</h2>
                </div>
            </div>
            <div className="mt-2 flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-grey-200 md:rounded-lg">
                            <div className="mt-1 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">

                                <div className="sm:col-span-1">
                                    <div className="mt-0 p-2">
                                        <input type='text'
                                            placeholder='Search by Vendor'
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

export default VendorList
