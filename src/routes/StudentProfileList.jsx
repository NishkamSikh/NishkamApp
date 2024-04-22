import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const StudentProfileList = () => {
    const [StudentData, setStudentData] = useState([])

    const columns = [
        {
            name: <strong>Id</strong>,
            selector: row => (<div>
                {row.StudentId}
            </div>),
            width: "4rem",
            sortable: false,
            compact: true,
            center: true,
            wrap: true,
        },
        {

            selector: row => (<div>
                <Link to={`/StudentProfileEdit?Id=${row.StudentId}`} className="text-grey-500 hover:text-indigo-600">
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
            name: <strong>Code</strong>,
            selector: row => (<div>{row.StudentCode}</div>),
            sortable: false,
            compact: true,
            width: "4rem",
            wrap: true,
        },
        {
            name: <strong>Year</strong>,
            selector: row => (<div>{row.AcademicYear}</div>),
            sortable: false,
            compact: true,
            width: "5rem",
            wrap: true,
        },
        {
            name: <strong>Name</strong>,
            selector: row => (<div>{row.firstname + ' ' + row.middlename + ' ' + row.lastname}</div>),
            sortable: false,
            compact: true,
            width: "6rem",
            wrap: true,
        },

        {
            name: <strong>DOB</strong>,
            selector: row => (<div>{row.dob}</div>),
            sortable: false,
            compact: true,
            width: "5rem",
            wrap: true,
        },

        {
            name: <strong>Gender</strong>,
            selector: row => (<div>{row.gender}</div>),
            sortable: false,
            compact: true,
            width: "4rem",
            wrap: true,
        },
        {
            name: <strong>Join Dt</strong>,
            selector: row => (<div>{row.joindate}</div>),
            sortable: false,
            compact: true,
            width: "5rem",
            wrap: true,
        },
        {
            name: <strong>Status</strong>,
            selector: row => (<div>{row.status}</div>),
            sortable: false,
            compact: true,
            width: "4rem",
            wrap: true,
        },

        {
            name: <strong>Religion</strong>,
            selector: row => (<div>
                {row.religion}
            </div>),
            sortable: false,
            compact: true,
            width: "4rem",
            wrap: true,
        },

        {
            name: <strong>Sikligar</strong>,
            selector: row => (<div>{row.sikligar}</div>),
            sortable: false,
            compact: true,
            width: "4rem",
            wrap: true,
        },

        {
            name: <strong>Contact-1</strong>,
            selector: row => (<div>{row.contact1type} {row.contact1}</div>),
            sortable: false,
            compact: true,
            width: "8rem",
            wrap: true,
        },

        {
            name: <strong>Contact-2</strong>,
            selector: row => (<div>
                {row.contact2type} {row.contact2}</div>), sortable: false,
            compact: true,
            width: "8rem",
            wrap: true,
        },

        {
            name: <strong>Ref By</strong>,
            selector: row => (<div>{row.refby}</div>),
            sortable: false,
            compact: true,
            width: "6rem",
            wrap: true,
        },

        {
            name: <strong>Approve By</strong>,
            selector: row => (<div>{row.approveby}</div>),
            sortable: false,
            compact: true,
            width: "6rem",
            wrap: true,
        },
    ];


    const tableHeaderstyle = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "12px",
                backgroundColor: "#ddd"

            },
        },
    }

    const [filteredData, setFilteredData] = useState(StudentData);
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }

        const fetchData = async () => {
            try {
                // Make API request using fetch
                const response = await fetch('https://nishkamapi.onrender.com/api/v1/studentprofilelist');

                // Check if the response status is ok (200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the response as JSON
                const result = await response.json();
                setStudentData(result.data);
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
            setFilteredData(StudentData);
        } else {
            const newData = StudentData.filter(row =>
                row.firstname.toLowerCase().includes(inputValue) ||
                row.lastname.toLowerCase().includes(inputValue) ||
                row.StudentCode.toLowerCase().includes(inputValue)
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

        filename = 'StudentProfileList' + new Date() + '.csv';

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
        <section className="mx-auto w-full max-w-7xl px-4 py-1">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <p className="font-bold text-orange-900 tracking-tight text-1xl">List - Student Profile Data</p>
                </div>
            </div>
            <div className="mt-1 flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-grey-200 md:rounded-lg">
                            <div className="mt-1 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                                <div className="sm:col-span-2">
                                    <div className="mt-0 p-2">
                                        <input type='text'
                                            placeholder='Search by Code, Name'
                                            className='block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' onChange={handleFilter} />
                                            <button type="button" onClick={() => downloadCSV()} className="rounded-md bg-blue-200 px-1 py-0 text-sm font-semibold  shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-100">Download</button>

                                    </div>
                                </div>
                            </div>
                            <div style={{ width: '100%' }}>
                                <DataTable
                                    columns={columns}
                                    data={filteredData}
                                    customStyles={tableHeaderstyle}
                                    pagination
                                    responsive
                                    keyField="id"
                                    // padding="10px"
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

export default StudentProfileList