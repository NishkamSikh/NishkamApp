import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const TutorList = () => {
    const [TutorData, setTutorData] = useState([]);
    const [errors, setError] = useState({});
    const [FetchData, setFetchData] = useState(true);
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
            width: "8rem",
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
            name: 'Email',
            selector: row => row.Email,
            width: "12rem",
            sortable: false,
            compact: true,
            wrap: true,
        },

        {
            name: 'Basti',
            selector: row => row.Basti,
            sortable: false,
            compact: true,
            width: "8rem",
            wrap: true,
        },


        {
            name: 'State/District/Tehsil',
            selector: row => row.State + ', ' + row.District + ', ' + row.Tehsil ,
            sortable: false,
            compact: true,
            width: "13rem",
            wrap: true,
        },

        {
            name: 'Subject',
            selector: row => row.Subject,
            sortable: false,
            compact: true,
            width: "10rem",
            wrap: true,
        },

        {
            name: 'Class',
            selector: row => row.Class,
            sortable: false,
            compact: true,
            width: "10rem",
            wrap: true,
        },

        {
            name: 'M.Fee',
            selector: row => row.MonthlyFee,
            sortable: false,
            compact: true,
            width: "4rem",
            wrap: true,
        },

        {
            name: 'Bank',
            selector: row => row.BankName,
            sortable: false,
            compact: true,
            width: "8rem",
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

    const [filteredData, setFilteredData] = useState(TutorData);
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }

        const fetchData = async () => {
            try {
                // Make API request using fetch
                const response = await fetch('https://sikligarapi.azurewebsites.net/api/v1/tutorlist');
                setFetchData(false);
                // Check if the response status is ok (200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // Parse the response as JSON
                const result = await response.json();

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
            );
            setFilteredData(newData);
        }
    };


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

        filename = 'TutorList' + new Date() + '.csv';

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
                            <h2 className="text-lg font-semibold">Tutor List</h2>
                        </div>
                    </div>
                    <div className="mt-1 flex flex-col">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-grey-200 md:rounded-lg">
                                    <div className="mt-1 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                                        <div className="sm:col-span-2">
                                            <div className="mt-1 p-2">
                                                <input type='text'
                                                    placeholder='Search by Tutor Name, Phone'
                                                    className='block w-full rounded-md border-0 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' onChange={handleFilter} 
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

export default TutorList