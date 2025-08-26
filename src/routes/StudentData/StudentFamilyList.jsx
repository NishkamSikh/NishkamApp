import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const StudentFamilyList = () => {
    const [StudentData, setStudentData] = useState([]);
    const [FetchData, setFetchData] = useState(true);

    const columns = [
        {
            name: 'Id',
            selector: row => row.StudentId,
            width: "3rem",
            sortable: true,
            compact: true,
            center: true,
            wrap: true,
        },
        {
            //name: 'Column 2',
            selector: row => (<div>
                <Link to={`/StudentFamilyEdit?Id=${row.StudentId}`} className="text-grey-500 hover:text-indigo-600">
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
            name: 'Code',
            selector: row => row.StudentCode,
            sortable: true,
            width: "4rem",
            compact: true,
            wrap: true,
        },

        {
            name: 'Year',
            selector: row => row.AcademicYear,
            sortable: true,
            width: "5rem",
            compact: true,
            wrap: true,
        },

     
        {
            id: '5',
            name: 'Name',
            selector: row => row.FirstName + ' ' + row.MiddleName + ' ' + row.LastName,
            width: "10rem",
            sortable: true,
            compact: true,
            wrap: true,
        },

        {
            name: 'Catg.',
            selector: row => row.category,
            sortable: true,
            width: "6rem",
            compact: true,
            wrap: true,
        },


        {
            name: 'Father Name',
            selector: row => row.Father_Name,
            sortable: true,
            width: "10rem",
            compact: true,
            wrap: true,
        },


        {
            name: 'Phone',
            selector: row => (<div>{row.F_Mobile_No}<br/>{row.M_Mobile_No}</div>),
            sortable: false,
            width: "15rem",
            compact: true,
            wrap: true,
        },

        {
            name: 'F-Aadhar',
            selector: row => row.F_Aadhar_No,
            sortable: true,
            width: "8rem",
            compact: true,
            wrap: true,
        },

        {
            name: 'Assistance',
            selector: row => row.Assistance,
            sortable: true,
            width: "7rem",
            compact: true,
            wrap: true,
        },
        {
            name: 'Grand Father',
            selector: row => row.Grandfather_Name,
            sortable: true,
            width: "10rem",
            compact: true,
            wrap: true,
        },

        {
            name: 'Guardian',
            selector: row => row.Guardian_Name + ' ' + row.Guardian_Mobile_No + ' ' + row.Guardian_Gross_Income,
            sortable: false,
            width: "10rem",
            compact: true,
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
                const response = await fetch('https://sikligarapi-fpe3b0bjfhgsadg5.centralindia-01.azurewebsites.net/api/v1/studentfamilylist');
                setFetchData(false);
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
                (row.FirstName?.toLowerCase().includes(inputValue)) ||
                (row.LastName?.toLowerCase().includes(inputValue)) ||
                (row.StudentCode?.toLowerCase().includes(inputValue)) ||
                (row.Father_Name?.toLowerCase().includes(inputValue))
                                
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

        filename = 'Student_Family_Data' + ' ' + new Date().toLocaleString() + '.csv';

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
                            <p className="font-bold text-orange-900 tracking-tight text-1xl">List - Student Family Data</p>
                        </div>
                    </div>
                    <div className="mt-1 flex flex-col">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-grey-200 md:rounded-lg">
                                    <div className="mt-1 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                                        <div className="sm:col-span-1">
                                            <div className="mt-0 p-0">
                                                <input type='text'
                                                    placeholder='Search by Code, Name, Father Name'
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

export default StudentFamilyList