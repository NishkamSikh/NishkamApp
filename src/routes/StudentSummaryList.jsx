import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const StudentSummaryList = () => {
    const [StudentData, setStudentData] = useState([]);

    const columns = [
        {
            id: 'id-1',
            name: <strong>Id</strong>
            , selector: row => (<div><h3>{row.ProfileId}</h3>
            </div>),
            width: "4rem",
            sortable: false,
            wrap: true,
        },

        {
            id: 'id-2',
            name: '',
            selector: row => (<div>
                <Link to={`/StudentSummaryDetail?id=${row.ProfileId}`} className="text-grey-500 hover:text-indigo-600">
                    <span className="inline-flex rounded-full bg-green-100 px-2 py-2  text-xs font-semibold leading-15 text-green-800">
                        View
                    </span>
                </Link>
            </div>),
            sortable: false,
            width: "3rem",
            compact: true,
        },

        { id: 'Code', name: 'Code', cell: row => (<div>{row.StudentCode}</div>), sortable: false, compact: true, width: "4rem", wrap: true, },
        { id: 'id-3', name: 'Year', selector: row => (<div>{row.AcademicYear}</div>), sortable: false, compact: true, width: "5rem", wrap: true, },
        { id: 'id-4', name: 'Name', selector: row => (<div>{row.Name}</div>), sortable: true, compact: true, width: "9rem", wrap: true, },
        { id: 'id-5', name: 'DOB', selector: row => (<div>{row.DOB}</div>), sortable: false,compact: true,width: "7rem",wrap: true,},
        {
            id: 'id-6',
            name: 'Join Date',
            selector: row => (<div>
                {row.joindate}
            </div>),
            sortable: false,
            compact: true,
            width: "7rem",
            wrap: true,
        },

        {
            id: 'id-7',
            name: 'Class',
            selector: row => (<div>{row.Class}</div>),
            sortable: false,
            compact: true,
            width: "3rem",
            wrap: true,
        },
        {
            id: 'id-8',
            name: 'Result', selector: row => (<div>{row.result}</div>),
            sortable: false,
            compact: true,
            width: "4rem",
            wrap: true,
        },

        {
            id: 'id-9',
            name: 'M%',
            selector: row => (<div>{row.MarksPercentage}</div>),
            sortable: false,
            compact: true,
            width: "3rem",
            wrap: true,
        },

        {
            id: 'id-10',
            name: 'Gender',
            selector: row => (<div>{row.gender}</div>),
            sortable: false,
            compact: true,
            width: "4rem",
            wrap: true,
        },

        {
            id: 'id-11',
            name: 'Religion',
            selector: row => (<div>{row.religion}</div>),
            sortable: false,
            compact: true,
            width: "4rem",
            wrap: true,
        },

        {
            id: 'id-12',
            name: 'Catg.',
            selector: row => (<div>{row.category}</div>),
            sortable: false,
            compact: true,
            width: "4rem",
            wrap: true,
        },

        {
            id: 'id-13',
            name: 'Status',
            selector: row => (<div>{row.status}</div>),
            sortable: false,
            compact: true,
            width: "3rem",
            wrap: true,
        },

        {
            id: 'id-14',
            name: 'Father',
            selector: row => (<div>{row.Father}</div>),
            sortable: false,
            compact: true,
            width: "6rem",
            wrap: true,
        },
        {
            id: 'id-15',
            name: 'Mother',
            selector: row => (<div>{row.Mother}</div>),
            sortable: false,
            compact: true,
            width: "6rem",
            wrap: true,
        },
        {
            id: 'id-15',
            name: 'State',
            selector: row => (<div>{row.State}</div>),
            sortable: false,
            width: "3rem",
            compact: true,
            wrap: true,
        },

        {
            id: 'id-15',
            name: 'District',
            selector: row => (<div>{row.District}</div>),
            sortable: false,
            width: "5rem",
            compact: true,
            wrap: true,
        },

        {
            id: 'id-15',
            name: 'Basti',
            selector: row => (<div>{row.Basti}</div>),
            sortable: false,
            width: "6rem",
            compact: true,
            wrap: true,
        },

        {
            id: 'id-16',
            name: 'Institution',
            selector: row => (<div>{row.Institution}</div>),
            sortable: false,
            width: "10rem",
            compact: true,
            wrap: true,
        },
    ];

    const tableHeaderstyle = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "14px",
                backgroundColor: "#ddd"

            },
        },
    }

    const styles = {
        main: {
            backgroundColor: "#f1f1f1",
            width: "100%",
        },
        inputText: {
            padding: "10px",
            color: "red",
        },
    };

    const [filteredData, setFilteredData] = useState(StudentData);
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }

        const fetchData = async () => {
            try {

                // Make API request using fetch
                const response = await fetch('https://nishkamapi.onrender.com/api/v1/fetchAllStudentSummary');

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
                (row.Name && row.Name.toLowerCase().includes(inputValue)) ||
                (row.Parents && row.Parents.toLowerCase().includes(inputValue)) ||
                (row.StudentCode && row.StudentCode.toLowerCase().includes(inputValue))  ||
                (row.Basti && row.Basti.toLowerCase().includes(inputValue)) 

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

        columnDelimiter = args.columnDelimiter || ',';
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

        filename = 'StudentDataSummary' + new Date() + '.csv';

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
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <p className="font-bold text-orange-900 tracking-tight text-1xl">Student Summary List</p>
                </div>
            </div>
            <div className="mt-0 flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-grey-200 md:rounded-lg">
                            <div className="mt-1 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                                <div className="sm:col-span-1">
                                    <div className="mt-0 p-2">
                                        <input type='text'
                                            placeholder='Search by Code, Name, Parents, Basti'
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
                                    //paginationPosition="top"
                                    //selectableRows
                                    pagination
                                    paginationPerPage={10}
                                    paginationRowsPerPageOptions={[10, 25, 50, 75, 100, 10000]}
                                    fixedHeader
                                    responsive
                                    highlightOnHover
                                    //defaultSortFieldId="Name"
                                    striped
                                    defaultSortAsc={true}
                                    //sortFunction={customSort} // Use the custom sort function
                                    //onSort={handleSort} // Handle sort changes
                                    //sortField={sortedField} // Current sorted field
                                    //sortDirection={sortDirection} // Current sort direction
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

export default StudentSummaryList