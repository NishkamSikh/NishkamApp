import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import DataTable from 'react-data-table-component';

const SponsorBeneficiaryList_Sponsored = () => {
 
    const [DonorBeneficiaryData, setDonorBeneficiaryData] = useState([]);
    const [FetchData, setFetchData] = useState(true);
    const [errors, setError] = useState({});
    const columns = [
        {
            id: '1',
            name: '#',
            selector: row => row.sno,
            width: "3rem",
            sortable: true,
            compact: true,
            center: true,
            wrap: true,
        },

        {
            id: '2',
            name: 'Donor',
            selector: row => row.DonorCode,
            width: "6rem",
            sortable: true,
            compact: true,
            wrap: true,
        },

        {
            id: '4',
            name: 'Name',
            selector: row => row.dn_FirstName+' '+row.Name2 ,
            width: "20rem",
            sortable: true,
            compact: true,
            wrap: true,
        },

        {
            id: '2',
            name: 'Beneficiary',
            selector: row => row.studentcode,
            width: "6rem",
            sortable: true,
            compact: true,
            wrap: true,
        },

        {
            id: '4',
            name: 'Name',
            selector: row => row.firstname+' '+row.middlename+ ' '+row.lastname + ' (' + row.Father_Name + ' )',
            width: "20rem",
            sortable: true,
            compact: true,
            wrap: true,
        },

        {
            id: '4',
            name: 'Gender',
            selector: row => row.gender,
            width: "6rem",
            sortable: true,
            compact: true,
            wrap: true,
        },

        {
            id: '4',
            name: 'DOB',
            selector: row => row.dob,
            width: "6rem",
            sortable: true,
            compact: true,
            wrap: true,
        },
        {
            id: '4',
            name: 'Class',
            selector: row => row.ClassName,
            width: "4rem",
            sortable: true,
            compact: true,
            wrap: true,
        },

        {
            id: '4',
            name: 'State',
            selector: row => row.stustate,
            width: "8rem",
            sortable: true,
            compact: true,
            wrap: true,
        },



    ];

    const [filteredData, setFilteredData] = useState(DonorBeneficiaryData);

    useEffect(() => {
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        const fetchData = async () => {
            try {
                // Make API request using fetch
                const response = await fetch('https://sikligarapi.azurewebsites.net/api/v1/fetchDonorBeneficiaryData_Sponsored');
                setFetchData(false);
                // Check if the response status is ok (200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the response as JSON
                const result = await response.json();
                setDonorBeneficiaryData(result);
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
        console.log("input=",inputValue);
        
        if (inputValue === '') {
            setFilteredData(DonorBeneficiaryData);
        } else {
            const newData = DonorBeneficiaryData.filter(row =>
                (row.BeneficiaryCode.toLowerCase().includes(inputValue)) ||
                (row.dn_FirstName.toLowerCase().includes(inputValue)) ||
                (row.firstname.toLowerCase().includes(inputValue)) ||
                (row.stustate.toLowerCase().includes(inputValue)) ||
                (row.studistrict.toLowerCase().includes(inputValue)) ||
                (row.stubastiname.toLowerCase().includes(inputValue))

            )
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

        filename = 'SponsoredChild_Data' + ' ' + new Date().toLocaleString() + '.csv';

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
        <section className="mx-auto w-full max-w-7xl px-4 py-0">
            {FetchData ?

                <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                    <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-4 h-10 w-10"></div>
                </div>
                :
                <div>
                    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                        <div>
                            <h2 className="text-lg font-semibold pb-3">Sponsored Beneficiary List</h2>
                        </div>
                    </div>
                    <div className="mt-0 flex flex-col">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-4 lg:-mx-6">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-grey-200 md:rounded-lg">
                                    <div className="mt-0 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <div className="mt-0 p-2">
                                                <input type='text'
                                                    placeholder='Search by Code, Donor Name, Country, Student Name, State, District, Basti'
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

export default SponsorBeneficiaryList_Sponsored;