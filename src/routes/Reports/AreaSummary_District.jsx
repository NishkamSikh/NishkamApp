import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const AreaSummary_District = () => {
    const [StudentData, setStudentData] = useState([]);
    const [FetchData, setFetchData] = useState(true);


    const columns = [

        { id:'1', name: 'Id', selector: row => row.Id, sortable: false, compact: true, width: "3rem", wrap: true, },
        { id:'1', name: 'State', selector: row => row.State, sortable: false, compact: true, width: "4rem", wrap: true, },
        { id:'1', name: 'District', selector: row => row.District, sortable: false, compact: true, width: "8rem", wrap: true, },
        { id:'2', name: 'Total', selector: row => row.Total, sortable: false, compact: true, width: "4rem", wrap: true, },
        { name: 'Male', selector: row => (<div>{row.Male}</div>), sortable: false, compact: true, width: "4rem", wrap: true, },
        { name: 'Female', selector: row => (<div>{row.Female}</div>), sortable: false, compact: true, width: "4rem", wrap: true, },
        {name: 'SPNSR', selector: row => (<div>{row.hasSponsor}</div>), sortable: true, compact: true, width: "4rem", wrap: true, },

        { name: 'Nur', selector: row => (<div>{row.Nur}</div>), sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'LKG', selector: row => (<div>{row.LKG}</div>), sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'I', selector: row => (<div>{row.I}</div>), sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'II', selector: row => (<div>{row.II}</div>), sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'III', selector: row => (<div>{row.III}</div>), sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'IV', selector: row => (<div>{row.IV}</div>), sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'V', selector: row => (<div>{row.V}</div>), sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'VI', selector: row => (<div>{row.VI}</div>), sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'VII', selector: row => (<div>{row.VII}</div>), sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'VIII', selector: row => (<div>{row.VIII}</div>), sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'IX', selector: row => (<div>{row.IX}</div>), sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'X', selector: row => (<div>{row.X}</div>), sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'XI', selector: row => (<div>{row.XI}</div>), sortable: false, compact: true, width: "3rem", wrap: true, },
        { name: 'XII', selector: row => (<div>{row.XII}</div>), sortable: false, compact: true, width: "3rem", wrap: true, },
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
                const response = await fetch('https://nishkamapi.onrender.com/api/v1/AreaSummary_District');
 //               const response = await fetch('http://localhost:3000/api/v1/AreaSummary_District');
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

    const handleFilter = (event) => {
        const inputValue = event.target.value.toLowerCase();
        if (inputValue === '') {
            setFilteredData(StudentData);
        } else {
            const newData = StudentData.filter(row =>
                (row.State && row.Basti.toLowerCase().includes(inputValue))

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

        filename = 'AreaSummary_Districtwise' + new Date() + '.csv';

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

        <section className="mx-auto w-full max-w-7xl px-4 py-2">

            {FetchData ?

                <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                    <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-4 h-10 w-10"></div>
                </div>
                :
                <div>
                    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                        <div>
                            <p className="font-bold text-orange-900 tracking-tight text-1xl">Area Summary - District wise</p>
                        </div>
                    </div>
                    <div className="mt-2 flex flex-col">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-grey-200 md:rounded-lg">
                                    <div className="mt-1 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6 ">
                                        <div className="sm:col-span-2">
                                            <div className="mt-0 p-2">
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

export default AreaSummary_District