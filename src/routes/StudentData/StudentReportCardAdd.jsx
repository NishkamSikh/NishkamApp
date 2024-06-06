import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
const StudentReportCardAdd = () => {

    const [userID, setUserId] = useState('')
    const [searchStudentCode, setSearchStudentCode] = useState('');
    const [studentDetails, setStudentDetails] = useState([]);
    const [filteredStudentDetails, setFilteredStudentDetails] = useState([]);
    const [errors, setErrors] = useState({});

    const [subjectandmarks_data, setsubjectandmarks_data] = useState([]);
    const [subjecttotalmarks, setsubjecttotalmarks] = useState("0");
    const [maxmarkstotal, setmaxmarkstotal] = useState("0");
    const [maxpercentage, setmaxpercentage] = useState("0");
    const [ResultOption, setResultOption] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setloading] = useState(false);
    const [formData, setFormData] = useState({
        studentcode: "",
        stuyear: "",
        reportcard: "",
        result: "",
        extra: "",
        subjectList: "",
        marksobtained: "",
        markstotal: ""
    })


    const [subjectList, setsubjectList] = useState([{ subjectname: "", total_marks: "0", max_marks: "0" }]);

    const subjecthandleAddClick = () => {
        setsubjectList([...subjectList, { subjectname: "", total_marks: "0", max_marks: "0" }])
    };
    const handleCheckboxChange = (id, name) => {
        setSelectedItems((prevItems) => {
            if (prevItems.includes(id)) {
                return prevItems.filter((item) => item !== id);
            } else {
                return [...prevItems, id];
            }
        });

        setFormData((prevData) => ({
            ...prevData,
            extra: selectedItems.map((itemId) => items.find((item) => item.id === itemId).name).join(','),
        }));
    };
    const items = [
        { id: 1, name: 'Music' },
        { id: 2, name: 'Dance' },
        { id: 3, name: 'Art' },
        { id: 4, name: 'Game' },
    ];

    const subjecthandleRemoveClick = index => {
        const list = [...subjectList];
        //   console.log(index);
        list.splice(index, 1);
        setsubjectList(list);
        subjectmarkscount(list);
    }
    const subjectListhandleInputChange = (e, index) => {
        var { name, value } = e.target;
        if (name.includes("total_marks")) {
            name = "total_marks";
        }
        if (name.includes("subjectname")) {
            name = "subjectname";
        }
        if (name.includes("max_marks")) {
            name = "max_marks";
        }
        const list = [...subjectList];

        list[index][name] = value;
        setsubjectList(list);
        subjectmarkscount(subjectList);
    };
    const subjectmarkscount = (subjectLists) => {

        var lastval = "";

        var ttlmrks = 0;
        var maxmrks = 0;
        var maxperc = 0;
        subjectLists.map((arr, i) => {
            lastval = arr.subjectname;
            if (lastval != "") {
                var total_markstxt = subjectLists[i].total_marks;
                var max_markstxt = subjectLists[i].max_marks;
                //  var max_perctxt = total_markstxt%max_markstxt;
                //  var max_perctxt = (total_markstxt/max_markstxt)*100;
                ttlmrks = ttlmrks + parseInt(total_markstxt);
                maxmrks = maxmrks + parseInt(max_markstxt);
                //   maxperc  = maxperc+parseInt(max_perctxt);
            }
        });

        setsubjecttotalmarks(ttlmrks.toString());
        setmaxmarkstotal(maxmrks.toString());
        setmaxpercentage((maxmrks / ttlmrks) * 100);
        setFormData((prevData) => ({
            ...prevData,
            marksobtained: ttlmrks.toString(),
            markstotal: maxmrks.toString(),
        }));
    }

    const handleSearchChange = (selectedOption) => {
        const studentkey = selectedOption.value.split("/");
        const studentcode = studentkey[0];
        const stuyear = studentkey[1];
        setSearchStudentCode(selectedOption ? studentcode : '');
        setFormData((prevData) => ({
            ...prevData,
            studentcode: studentcode,
            stuyear: stuyear,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            subjectList: [...subjectList]

        }));
    };

    const navigate = useNavigate();

    useEffect(() => {
        fetchAllStudentDetails();

        setsubjectList([{ subjectname: "", total_marks: "", max_marks: "" }]);
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        const getUserid = localStorage.getItem("UserId");
        setUserId(getUserid);
    }, [setsubjectList, setUserId, navigate]);


    const fetchAllStudentDetails = () => {
        setloading(true);
        fetch('https://nishkamapi.onrender.com/api/v1/fetchAllStudentDetails_dropdown')
            .then(response => response.json())
            .then(data => {
                setStudentDetails(data.data);
                setloading(false);
            })
            .catch(error => {
                console.error('Error fetching student details:', error);
                setloading(false);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);

        const { studentcode, stuyear, ...formDataWithoutCodeYear } = formData;
        
        // Proceed with the second API call
        const response = await fetch("https://nishkamapi.onrender.com/api/v1/addStudentData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                UserId: userID,
                StudentCode: formData.studentcode,
                AcademicYear: formData.stuyear,
                CatgCode: "RPTC",
                data: JSON.stringify({
                    ...formDataWithoutCodeYear,
                    subjectList: subjectList,
                    extra: selectedItems
                }),
            }),
        });

        if (!response.ok) {
            console.error("Error:", response.statusText);
            return;
        }

        setloading(false);
        navigate('/');
    }

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-2">
            {
                loading
                    ?
                    <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                        <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-4 h-10 w-10"></div>
                    </div>
                    :
                    <div className="mt-0 flex flex-col">
                        <p className="font-bold text-orange-900 tracking-tight text-1xl">
                            Report Card Detail
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-6">

                                        <div className="sm:col-span-3">
                                            <label htmlFor="searchStudentCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                Search Student Code
                                            </label>
                                            <Select
                                                options={studentDetails.map((student) => ({
                                                    value: student.StudentKey,
                                                    label: student.dd_label,
                                                    isDisabled: student.rp_disable === 'Yes'
                                                }))}
                                                //value={searchStudentCode ? { value: searchStudentCode, label: searchStudentCode } : null}
                                                className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                    }`}
                                                onChange={handleSearchChange}
                                            // onChange={(selectedOption) => setSearchStudentCode(selectedOption ? selectedOption.value : '')}
                                            />
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="reportcard" className="block text-sm font-medium leading-6 text-gray-900">
                                                Report Card Received
                                            </label>
                                            <div className="mt-0">
                                                <select
                                                    id="reportcard"
                                                    name="reportcard"
                                                    value={formData['reportcard']}
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                        }`}
                                                >
                                                    <option >Select Option</option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>

                                                </select>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="result" className="block text-sm font-medium leading-6 text-gray-900">
                                                Result
                                            </label>
                                            <div className="mt-0">
                                                <select
                                                    id="result"
                                                    name="result"
                                                    value={formData['result']}
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                        }`}
                                                >
                                                    <option >Select result</option>
                                                    <option value="Passed">Passed</option>
                                                    <option value="Failed">Failed</option>
                                                    <option value="Dropped">Dropped</option>
                                                    <option value="Re-appear">Re-appear</option>

                                                </select>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label htmlFor="extra" className="block text-sm font-medium leading-6 text-orange-900">
                                                Extra
                                            </label>
                                            <div className="mt-0">
                                                <div className="w-full p-1">
                                                    <ul className="list-none">
                                                        {items.map((item) => (
                                                            <li key={item.id} className="my-2">
                                                                <label className="inline-flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        name='extra'
                                                                        checked={selectedItems.includes(item.id)}
                                                                        onChange={() => handleCheckboxChange(item.id, item.name)}
                                                                        className="form-checkbox text-indigo-600"
                                                                    />
                                                                    <span className="ml-2">{item.name}</span>
                                                                </label>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-6">
                                            <div className="mt-2">
                                                {subjectList.map((input, i) => {
                                                    // console.log(input,i, "Print")
                                                    return (
                                                        <div className="grid grid-cols-4 gap-2" key={i}>
                                                            <div className="">
                                                                <label htmlFor={`subjectname-${i}`} className="block text-sm font-medium leading-6 text-gray-900">
                                                                    Subject Name
                                                                </label>
                                                                <input type="text"
                                                                    name={'subjectname' + i}
                                                                    key='subjectname'
                                                                    className="form-control my-2"
                                                                    defaultValue={subjectandmarks_data.length > 0 ? subjectandmarks_data[0]['subjectname' + i] != null && subjectandmarks_data[0]['subjectname' + i] != undefined ? subjectandmarks_data[0]['subjectname' + i] : "" : ""}
                                                                    onChange={(e) => subjectListhandleInputChange(e, i)}
                                                                    placeholder='Subject Name'
                                                                    required
                                                                    aria-describedby="SubjectName"
                                                                />
                                                            </div>
                                                            <div className="">
                                                                <label htmlFor={`total_marks-${i}`} className="block text-sm font-medium leading-6 text-gray-900">
                                                                    Max. Marks
                                                                </label>
                                                                <input type="text"
                                                                    name={'total_marks' + i}
                                                                    key='total_marks'
                                                                    className="form-control my-2 "
                                                                    defaultValue={subjectandmarks_data.length > 0 ? subjectandmarks_data[0]['total_marks' + i] != null && subjectandmarks_data[0]['total_marks' + i] != undefined ? subjectandmarks_data[0]['total_marks' + i] : "" : ""}
                                                                    onChange={(e) => subjectListhandleInputChange(e, i)}
                                                                    placeholder='ex: 100'
                                                                    pattern="[0-9]*" title="Please enter only numbers" 
                                                                    required
                                                                    aria-describedby="Total_Marks" />
                                                            </div>
                                                            <div className="">
                                                                <label htmlFor={`max_marks-${i}`} className="block text-sm font-medium leading-6 text-gray-900">
                                                                    Marks Obtained
                                                                </label>
                                                                <input type="text"
                                                                    name={'max_marks' + i}
                                                                    key='max_marks'
                                                                    className="form-control my-2"
                                                                    defaultValue={subjectandmarks_data.length > 0 ? subjectandmarks_data[0]['max_marks' + i] != null && subjectandmarks_data[0]['max_marks' + i] != undefined ? subjectandmarks_data[0]['max_marks' + i] : "" : ""}
                                                                    onChange={(e) => subjectListhandleInputChange(e, i)}
                                                                    placeholder='ex: 60'
                                                                    pattern="[0-9]*" title="Please enter only numbers" 
                                                                    required
                                                                    aria-describedby="Maximum_Marks" />
                                                            </div>

                                                            <div className=''>
                                                                <div className="add-new-service my-2 ">
                                                                    {subjectList.length !== 1 && <button type="button" className="btn bg-red-500 p-2 mb-2 text-white" onClick={() => subjecthandleRemoveClick(i)}>Remove</button>}
                                                                </div>
                                                            </div>

                                                            <div className="add-new-service">
                                                                {subjectList.length - 1 === i && <button type="button" className="btn bg-black p-2 text-white" onClick={subjecthandleAddClick}>Add</button>}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='text py-1 fw-bold'>
                                <p className=''>Max. Marks: {subjecttotalmarks}</p>
                                <p className=''>Marks Obtained : {maxmarkstotal}</p>
                                <p className=''>Max. Marks : {Math.round(maxpercentage, 2)}%</p>
                            </div>
                            <div className="mt-2 flex items-center justify-end gap-x-6">
                                <button type="button" onClick={() => navigate("/")} className="text-sm font-semibold leading-6 text-grey-900">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!formData.studentcode || !formData.stuyear}
                                    style={{ opacity: formData.studentcode && formData.stuyear ? 1 : 0.5 }}
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
            }
        </section>
    )
}

export default StudentReportCardAdd