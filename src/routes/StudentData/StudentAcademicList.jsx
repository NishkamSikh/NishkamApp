import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const StudentAcademicList = () => {
    const [StudentData, setStudentData] = useState([]);
    const [FetchData, setFetchData] = useState(true);


    const columns = [
        {
            name: 'Id',
            selector: row => row.StudentId,
            width: "4rem",
            sortable: true,
            compact: true,
            center: true,
            wrap: true,
        },
        {
            //name: 'Column 2',
            selector: row => (<div>
                <Link to={`/StudentAcademicEdit?Id=${row.StudentId}`} className="text-grey-500 hover:text-indigo-600">
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
            name: 'Code',
            selector: row => row.StudentCode,
            sortable: true,
            compact: true,
            width: "4rem",
            wrap: true,
        },
        {
            name: 'Year',
            selector: row => row.AcademicYear,
            sortable: true,
            compact: true,
            width: "5rem",
            wrap: true,
        },
        {
            name: 'Name',
            selector: row => row.FirstName + ' ' + row.MiddleName + ' ' + row.LastName,
            sortable: true,
            compact: true,
            width: "10rem",
            wrap: true,
        },

        {
            id: '5',
            name: 'F.Name',
            selector: row => row.Father_Name,
            sortable: true,
            reorder: true,
            compact: true,
            width: "10rem",
            wrap: true,
        },


        {
            name: 'DOB',
            selector: row => row.DOB,
            sortable: true,
            compact: true,
            width: "7rem",
            wrap: true,
        },


        {
            name: 'Class',
            selector: row => row.class,
            sortable: true,
            compact: true,
            width: "7rem",
            wrap: true,
        },

        {
            name: 'Semester',
            selector: row => row.semester,
            sortable: true,
            compact: true,
            width: "5rem",
            wrap: true,
        },

        {
            name: 'Stream',
            selector: row => row.stream,
            sortable: true,
            compact: true,
            width: "10rem",
            wrap: true,
        },

        {
            name: 'Admission#',
            selector: row => row.admissionnumber,
            sortable: true,
            compact: true,
            width: "6rem",
            wrap: true,
        },

        {
            name: 'Roll#',
            selector: row => row.rollnumber,
            sortable: true,
            compact: true,
            width: "6rem",
            wrap: true,
        },

        {
            name: 'Section',
            selector: row => row.section,
            sortable: true,
            compact: true,
            width: "5rem",
            wrap: true,
        },
    ];

    const [filteredData, setFilteredData] = useState(StudentData);
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }

        const fetchData = async () => {
            try {
                // Make API request using fetch
                const response = await fetch('https://nishkamapi.onrender.com/api/v1/studentacademiclist');
                //const response = await fetch('http://localhost:3000/api/v1/studentacademiclist');

                // Check if the response status is ok (200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the response as JSON
                setFetchData(false);
                const result = await response.json();
                console.log(result);
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
                row.FirstName.toLowerCase().includes(inputValue) ||
                row.LastName.toLowerCase().includes(inputValue) ||
                row.StudentCode.toLowerCase().includes(inputValue)
                // ...
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

        filename = 'Student_Acedamic_Data' + ' ' + new Date().toLocaleString() + '.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }

    const tableHeaderstyle = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "12px",
                backgroundColor: "#ddd"

            },
        },
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
                            <p className="font-bold text-orange-900 tracking-tight text-1xl">List - Student Academic Data</p>
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
                                                    placeholder='Search by Name, Code'
                                                    className='block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' onChange={handleFilter}
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
                                            pagination
                                            paginationPerPage={10}
                                            paginationRowsPerPageOptions={[10, 25, 50, 75, 100, 10000]}
                                            fixedHeader
                                            responsive
                                            highlightOnHover
                                            striped
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

export default StudentAcademicList