import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const VoulnteerList = () => {
    const [VolnData, setVolnData] = useState([]);
    const [errors, setError] = useState({});
    const [FetchData, setFetchData] = useState(true);

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
            width: "8rem",
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
            width: "15rem",
            wrap: true,
        },

        {
            id: '5',
            name: 'State',
            selector: row => row.State,
            sortable: true,
            compact: true,
            width: "6rem",
            wrap: true,
        },


        {
            id: '6',
            name: 'District',
            selector: row => row.District,
            sortable: true,
            compact: true,
            width: "6rem",
            wrap: true,
        },

        {
            id: '7',
            name: 'Tehsil',
            selector: row => row.Tehsil,
            sortable: true,
            compact: true,
            width: "6rem",
            wrap: true,
        },

        {
            id: '8',
            name: 'Basti',
            selector: row => row.BastiName,
            sortable: true,
            compact: true,
            width: "6rem",
            wrap: true,
        },


        {
            id: '9',
            name: 'Address',
            selector: row => row.Address + ' ' + row.Village + row.Pincode,
            sortable: false,
            compact: true,
            width: "10rem",
            wrap: true,
        },

        {
            name: 'Bank',
            selector: row => row.BankName,
            sortable: false,
            compact: true,
            width: "10rem",
            wrap: true,
        },

        {
            name: 'Acct Name',
            selector: row => row.AccountName,
            sortable: false,
            compact: true,
            width: "8rem",
            wrap: true,
        },

        {
            name: 'IFSCCode',
            selector: row => row.IFSCCode,
            sortable: false,
            compact: true,
            width: "8rem",
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
                const response = await fetch('https://sikligarapi-fpe3b0bjfhgsadg5.centralindia-01.azurewebsites.net/api/v1/volunteerlist2');
                setFetchData(false)
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


    function convertArrayOfObjectsToCSV(args) {
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || '|';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function (item) {
            ctr = 0;
            keys.forEach(function (key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

    function downloadCSV() {
        var data, filename, link;
        var csv = convertArrayOfObjectsToCSV({
            data: filteredData
        });
        if (csv == null) return;

        filename = 'VolunteerList' + new Date() + '.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }


    return (
        <section className="mx-auto w-full max-w-8xl px-4 py-1">
            {FetchData ?

                <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                    <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-4 h-10 w-10"></div>
                </div>
                :

                <div>
                    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                        <div>
                            <h2 className="text-lg font-semibold">Volunteer List</h2>
                        </div>
                    </div>
                    <div className="mt-1 flex flex-col">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-grey-200 md:rounded-lg">
                                    <div className="mt-1 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">

                                        <div className="sm:col-span-1">
                                            <div className="mt-0 p-2">
                                                <input type='text'
                                                    placeholder='Search by Name'
                                                    className='block w-full rounded-md border-0 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-1' onChange={handleFilter}
                                                />
                                                <button type="button" onClick={() => downloadCSV()} className="mt-2 rounded-md bg-blue-200 px-1 py-0 text-sm font-semibold  shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-100">Download</button>
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

                </div>
            }
        </section>
    )
}

export default VoulnteerList