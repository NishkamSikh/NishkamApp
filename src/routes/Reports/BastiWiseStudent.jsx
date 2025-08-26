import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import ReportForm from '../../components/ReportForm';

const stateMapping = {
    'Punjab': 'PB',
    'Haryana': 'HR',
    'Delhi': 'DL',
    'Karnataka': 'KA',
    'Maharashtra': 'MH',
    'Uttar Pradesh': 'UP',
    'Rajasthan': 'RJ'
};

const BastiWiseStudent = () => {
    const [loading, setLoading] = useState(false);
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedTehsil, setSelectedTehsil] = useState('');
    const [selectedBasti, setSelectedBasti] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [bastiOptions, setBastiOptions] = useState([]);
    const navigate = useNavigate();

    const handleStateChange = (value) => {
        setSelectedState(value);
        setSelectedDistrict('');
        setSelectedTehsil('');
        setSelectedBasti('');
    };

    const handleDistrictChange = (value) => {
        setSelectedDistrict(value);
        setSelectedTehsil('');
        setSelectedBasti('');
    };

    const handleTehsilChange = (value) => {
        setSelectedTehsil(value);
    };

    const handleBastiChange = (value) => {
        setSelectedBasti(value);
    };

    useEffect(() => {
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchFilteredStudents = async (state, district) => {
            try {
                setLoading(true);
                const response = await fetch('https://sikligarapi-fpe3b0bjfhgsadg5.centralindia-01.azurewebsites.net/api/v1/fetchAllStudentSummary');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const jsonResponse = await response.json();
                const data = jsonResponse.data;

                const stateCode = stateMapping[state];

                const filteredStudents = data.filter(student =>
                    student.State === stateCode &&
                    (!district || student.District === district) &&
                    (!selectedBasti || student.Basti === selectedBasti)
                );

                setFilteredStudents(filteredStudents);

                // Extract unique bastis from filtered students
                const bastis = [...new Set(filteredStudents.map(student => student.Basti))].map(basti => ({ value: basti, label: basti }));
                setBastiOptions(bastis);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching students:', error);
                setLoading(false);
            }
        };

        if (selectedState) {
            fetchFilteredStudents(selectedState, selectedDistrict);
        } else {
            setFilteredStudents([]);
            setBastiOptions([]);
        }
    }, [selectedState, selectedDistrict, selectedBasti]);

    const convertArrayOfObjectsToCSV = (data) => {
        if (!data || !data.length) {
            return null;
        }

        const keys = Object.keys(data[0]);
        const columnDelimiter = ',';
        const lineDelimiter = '\n';

        const header = keys.join(columnDelimiter);
        const csvData = data.map(row => {
            return keys.map(key => row[key]).join(columnDelimiter);
        }).join(lineDelimiter);

        return `${header}${lineDelimiter}${csvData}`;
    };

    const downloadCSV = () => {
        const csv = convertArrayOfObjectsToCSV(filteredStudents);
        if (!csv) return;

        const filename = `BastiWiseStudents_${new Date().toLocaleString()}.csv`;
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const columns = [
        { name: 'Name', selector: row => row.Name, sortable: true },
        { name: 'Student Code', selector: row => row.StudentCode, sortable: true },
        { name: 'Class', selector: row => row.ClassName, sortable: true },
        { name: 'Gender', selector: row => row.gender, sortable: true },
        { name: 'Result', selector: row => row.result, sortable: true },
        { name: 'Basti', selector: row => row.Basti, sortable: true },
    ];

    const handleFilter = (event) => {
        const inputValue = event.target.value.toLowerCase();
        if (inputValue === '') {
            setFilteredStudents(filteredStudents);
        } else {
            const newData = filteredStudents.filter(row =>
                (row.Name && row.Name.toLowerCase().includes(inputValue)) ||
                (row.StudentCode && row.StudentCode.toLowerCase().includes(inputValue)) ||
                (row.Basti && row.Basti.toLowerCase().includes(inputValue))
            );
            setFilteredStudents(newData);
        }
    };

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-0">
            {loading ? (
                <div className="grid grid-cols-1 lg:grid-cols-1">
                    <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md text-center">
                            <div
                                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status">
                                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                        <div>
                            <h2 className="text-lg font-semibold pb-3">Basti Wise Students</h2>
                        </div>
                    </div>
                    <div className="space-y-12">
                        <div className="border-b border-grey-900/10 pb-12">
                            <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                                <ReportForm
                                    selectedState={selectedState}
                                    selectedDistrict={selectedDistrict}
                                    selectedTehsil={selectedTehsil}
                                    handleStateChange={handleStateChange}
                                    handleDistrictChange={handleDistrictChange}
                                    handleTehsilChange={handleTehsilChange}
                                />
                            </div>
                            <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                                <div className="sm:col-span-2">
                                    <label htmlFor="basti" className="block text-sm font-medium text-gray-700">Basti</label>
                                    <Select
                                        id="basti"
                                        value={selectedBasti ? { value: selectedBasti, label: selectedBasti } : null}
                                        onChange={option => handleBastiChange(option ? option.value : '')}
                                        options={bastiOptions}
                                        isClearable
                                        placeholder="Select Basti"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-1 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-2">
                            <div className="mt-0 p-2">
                                <input type='text'
                                    placeholder='Search by Code, Name, Parents, Basti, School'
                                    className='block w-full rounded-md border-1 py-1 text-grey-900 shadow-sm ring-1 ring-inset ring-grey-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' onChange={handleFilter} />
                                <button type="button" onClick={downloadCSV} className="rounded-md bg-blue-200 px-1 py-0 text-sm font-semibold  shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-100">Download</button>
                            </div>
                        </div>
                    </div>
                    <DataTable
                        title="Student List"
                        columns={columns}
                        data={filteredStudents}
                        pagination
                    />
                </div>
            )}
        </section>
    );
};

export default BastiWiseStudent;
