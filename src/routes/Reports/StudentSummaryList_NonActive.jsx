import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const StudentSummaryList = () => {
    const [StudentData, setStudentData] = useState([]);
    const [FetchData, setFetchData] = useState(true);
    const [AcademicYear, setAcademicYear] = useState('2024-2025');        

    const columns = [
        
        {
            id: '1',
            name: '#',
            selector: row => row.sno,
            width: "2rem",
            sortable: true,
            compact: true,
            center: true,
            wrap: true,
        },       
        
        { 
            id: '43',
            name: 'Id',
            selector: row => row.ProfileId,
            width: "5rem",
            sortable: true,
            reorder: true,
            wrap: true,
        },

        {
            id: '2',
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

        {
            id:'55',
            name: 'Photo',
            selector: row => <img src={row.DocumentURL} width={40} height={40}></img>,
            sortable: false,
            compact: true,
            width: "4rem",
            wrap: true,
        },

        {
            id: '3',
            name: 'Code',
            selector: row => row.StudentCode,
            sortable: true,
            reorder: true,
            compact: true,
            width: "4rem",
            wrap: true,
        },

        {
            id: '3a',
            name: 'SPNSR',
            selector: row => row.hasSponsor,
            sortable: true,
            reorder: true,
            compact: true,
            width: "4rem",
            wrap: true,
        },


        {
            id: '4',
            name: 'Year',
            selector: row => row.AcademicYear,
            sortable: true,
            reorder: true,
            compact: true,
            width: "4.3rem",
            wrap: true,
        },
/*         {
            id: '5',
            name: 'Name',
            selector: row => (<div>{row.Name}<br/>{row.Father_Name}</div>),
            sortable: true,
            reorder: true,
            compact: true,
            width: "7rem",
            wrap: true,
        }, */


        {
            id: '5',
            name: 'Name',
            selector: row => row.Name,
            sortable: true,
            reorder: true,
            compact: true,
            width: "8rem",
            wrap: true,
        },

        {
            id: '15',
            name: 'F.Name',
            selector: row => row.Father,
            sortable: true,
            reorder: true,
            compact: true,
            width: "8rem",
            wrap: true,
        },
        {
            id: '6',
            name: 'DOB',
            selector: row => row.DOB,
            sortable: true,
            reorder: true,
            compact: true,
            width: "6rem",
            wrap: true,
        },

        {
            id: '7',
            name: 'Join Date',
            selector: row => row.joindate,
            sortable: true,
            reorder: true,
            compact: true,
            width: "7rem",
            wrap: true,
        },

        {
            id: '8',
            name: 'Class',
            selector: row => row.ClassName,
            sortable: true,
            reorder: true,
            compact: true,
            width: "4rem",
            wrap: true,
        },
        {
            id: 'id-9',
            name: 'Result',
            selector: row => row.result,
            sortable: true,
            reorder: true,
            compact: true,
            width: "4rem",
            wrap: true,
        },

        {
            id: '10',
            name: '%',
            selector: row => row.MarksPercentage,
            sortable: true,
            reorder: true,
            compact: true,
            width: "3rem",
            wrap: true,
        },

        {
            id: '11',
            name: 'Gender',
            selector: row => row.gender,
            sortable: true,
            reorder: true,
            compact: true,
            width: "4rem",
            wrap: true,
        },

        {
            id: '12',
            name: 'Religion',
            selector: row => row.religion,
            sortable: true,
            reorder: true,
            compact: true,
            width: "4rem",
            wrap: true,
        },

        {
            id: '13',
            name: 'Catg.',
            selector: row => row.category,
            sortable: true,
            reorder: true,
            compact: true,
            width: "4rem",
            wrap: true,
        },

        {
            id: '14',
            name: 'Status',
            selector: row => row.status,
            sortable: true,
            reorder: true,
            compact: true,
            width: "4rem",
            wrap: true,
        },


/*         {
            id: '16',
            name: 'Mother',
            selector: row => row.Mother,
            sortable: false,
            reorder: true,
            compact: true,
            width: "6rem",
            wrap: true,
        }, */
        {
            id: '17',
            name: 'State',
            selector: row => row.State,
            sortable: true,
            reorder: true,
            width: "3.5rem",
            compact: true,
            wrap: true,
        },

        {
            id: '18',
            name: 'District',
            selector: row => row.District,
            sortable: true,
            reorder: true,
            width: "8rem",
            compact: true,
            wrap: true,
        },

        {
            id: '19',
            name: 'Basti',
            selector: row => row.Basti,
            sortable: true,
            reorder: true,
            width: "10rem",
            compact: true,
            wrap: true,
        },

        {
            id: '20',
            name: 'Institution',
            selector: row => row.Institution,
            sortable: true,
            reorder: true,
            width: "12rem",
            compact: true,
            wrap: true,
        },
    ];

    const tableHeaderstyle = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "14px",
                backgroundColor: "#eee"
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
//                const url = new URL('https://sikligarapi.azurewebsites.net/api/v1/fetchAllStudentSummary?AcademicYear='+AcademicYear);
                   const url = new URL('https://sikligarapi.azurewebsites.net/api/v1/fetchAllStudentSummary_NonActive?AcademicYear='+AcademicYear);
 //                 const url = new URL('http://localhost:3000/api/v1/fetchAllStudentSummary_NonActive?AcademicYear='+AcademicYear);


                const response = await fetch(url);
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
    }, [AcademicYear]);


    const handleFilterYear = (event) => {
        const inputValue = event.target.value.toLowerCase();
        setAcademicYear(inputValue);
    };    

    const handleFilter = (event) => {
        const inputValue = event.target.value.toLowerCase();
        if (inputValue === '') {
            setFilteredData(StudentData);
        } else {
            const newData = StudentData.filter(row =>
                (row.Name && row.Name.toLowerCase().includes(inputValue)) ||
                (row.Parents && row.Parents.toLowerCase().includes(inputValue)) ||
                (row.StudentCode && row.StudentCode.toLowerCase().includes(inputValue)) ||
                (row.Basti && row.Basti.toLowerCase().includes(inputValue)) ||
                (row.Institution && row.Institution.toLowerCase().includes(inputValue)) 

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

        filename = 'StudentDataSummary' + ' ' + new Date().toLocaleString() + '.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }

    const paginationComponentOptions = {
        selectAllRowsItem: true,
        selectAllRowsItemText: 'ALL',
    };


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
                            <p className="font-bold text-orange-900 tracking-tight text-1xl">Student Summary List</p>
                        </div>
                    </div>
                    <div className="mt-0 flex flex-col">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-grey-200 md:rounded-lg">
                                    <div className="mt-1 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                                        <div className="sm:col-span-2">
                                            <div className="mt-0 p-2">
                                                <input type='text'
                                                    placeholder='Search by Code, Name, Parents, Basti, School'
                                                    className='block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' onChange={handleFilter} />
                                                <button type="button" onClick={() => downloadCSV()} className="rounded-md bg-blue-200 px-1 py-0 text-sm font-semibold  shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-100">Download</button>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <div className="mt-2">
                                                <select
                                                    id="AcademicYear"
                                                    name="AcademicYear"
                                                    required
                                                    className='block w-small rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' onChange={handleFilterYear}
                                                >
                                                    <option >Select Academic Year</option>
                                                    <option value="2024-2025">2024-2025</option>
                                                    <option value="2023-2024">2023-2024</option>
                                                </select>
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
                                            defaultSortFieldId={1}
                                            paginationRowsPerPageOptions={[10, 25, 50, 75, 100, 10000]}
                                            // paginationComponentOptions={paginationComponentOptions}
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

export default StudentSummaryList