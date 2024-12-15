import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const Institution_Student = () => {
    const [StudentData, setStudentData] = useState([]);
    const [FetchData, setFetchData] = useState(true);
    const [AcademicYear, setAcademicYear] = useState('2024-2025');    


    const columns = [

        //{ id:'1', name: 'Id', selector: row => row.Id, sortable: false, compact: true, width: "3rem", wrap: true, },
        { id: '0', name: '#', selector: row => row.sno, sortable: true, compact: true, width: "2rem", wrap: true,   center: true, },

        { id: '1', name: 'Institution', selector: row => row.in_institutionname, sortable: true, compact: true, width: "20rem", wrap: true, },
       
        { id: '2', name: 'Total', selector: row => row.Total, sortable: false, compact: true, width: "4rem", wrap: true, },
        { name: 'Male', selector: row => row.Male, sortable: false, compact: true, width: "4rem", wrap: true, },
        { name: 'Female', selector: row => row.Female, sortable: false, compact: true, width: "4rem", wrap: true, },
        //{ name: 'SPNSR', selector: row => row.hasSponsor, sortable: true, compact: true, width: "4rem", wrap: true, },

        { name: 'Nur', selector: row => row.Nur, sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'LKG', selector: row => row.LKG, sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'UKG', selector: row => row.UKG, sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'I', selector: row => row.I, sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'II', selector: row => row.II, sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'III', selector: row => row.III, sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'IV', selector: row => row.IV, sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'V', selector: row => row.V, sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'VI', selector: row => row.VI, sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'VII', selector: row => row.VII, sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'VIII', selector: row => row.VIII, sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'IX', selector: row => row.IX, sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'X', selector: row => row.X, sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'XI', selector: row => row.XI, sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'XII', selector: row => row.XII, sortable: false, compact: true, width: "3rem", wrap: true, },
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
                ///v_ReportInstitutionStudent
                const response = await fetch('https://sikligarapi.azurewebsites.net/api/v1/InstitutionStudent');
                //const response = await fetch('https://sikligarapi.azurewebsites.net/api/v1/AreaSummary_State');
                setFetchData(false);
                // Check if the response status is ok (200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the response as JSON
                const result = await response.json();
                setStudentData(result);
                setFilteredData(result);
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
            setFilteredData(StudentData);
        } else {
            const newData = StudentData.filter(row =>
                (row.in_institutionname.includes(inputValue))

            );
            setFilteredData(newData);
            console.log("xxxx=",newData)
        }
    };
     const handleFilter = (event) => {
        const inputValue = event.target.value.toLowerCase();

        if (inputValue === '') {
            setFilteredData(StudentData);
        } else {
            const newData = StudentData.filter(row =>

                (row.in_institutionname?.toLowerCase().includes(inputValue))
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

        filename = 'Institution Student' + ' ' + new Date().toLocaleString() + '.csv';

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
            {FetchData ?
             <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                  <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-4 h-10 w-10"></div>
                </div>
                :
                <div>
                    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                        <div>
                            <h2 className="text-lg font-semibold pb-3">Institution Wise Number of Students</h2>
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
                                                    placeholder='Search by Institution'
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

export default Institution_Student