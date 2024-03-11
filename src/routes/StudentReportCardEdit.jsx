import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom'

const StudentReportCardEdit = () => {

    const [userID, setUserId] = useState('')
    const [searchStudentCode, setSearchStudentCode] = useState('');
    const [studentDetails, setStudentDetails] = useState([]);
    const [filteredStudentDetails, setFilteredStudentDetails] = useState([]);
    const [errors, setErrors] = useState({});
    const [fetchData, setfetchData] = useState({ data: { data: [] } });
    const [fetchDataId, setfetchDataId] = useState('');
    const [subjectandmarks_data, setsubjectandmarks_data] = useState([]);
    const [subjecttotalmarks, setsubjecttotalmarks] = useState("0");
    const [maxmarkstotal, setmaxmarkstotal] = useState("0");
    const [maxpercentage, setmaxpercentage] = useState("0");
    const [ResultOption, setResultOption] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setloading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
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
    const { studentCode, year, catgcode } = useParams();

    const [subjectList, setsubjectList] = useState([{ subjectname: "", total_marks: "", max_marks: "" }]);

    const subjecthandleAddClick = () => {
        setsubjectList([...subjectList, { subjectname: "", total_marks: "", max_marks: "" }])
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
        console.log(list, "list")
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
        fetchUserInfo();

        setsubjectList([{ subjectname: "", total_marks: "", max_marks: "" }]);
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        const getUserid = localStorage.getItem("UserId");
        setUserId(getUserid);
    }, [setsubjectList, setUserId, navigate]);

    const fetchUserInfo = async () => {
        console.log('fetch');
        setloading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/v1/getSingleStudentReportCard/${JSON.parse(searchParams.get('Id'))}`);
            if (!response.ok) {
                if (response.status === 404) {
                    // Handle specific HTTP status codes
                    alert("User not found!");
                } else {
                    throw new Error(`Error fetching student details: ${response.statusText}`);
                }
            }

            const data = await response.json();

            // Initialize fetchData with the expected structure
            console.log(data.data, "Data ============")
            if (data.data.length > 0) {
                const subList = JSON.parse(data.data[0].json)
                console.log(subList.subjectList, "subjectList");
                const extractedSubjects = subList.subjectList.map(subject => {
                    return {
                        subjectname: subject.subjectname,
                        max_marks: subject.max_marks,
                        total_marks: subject.total_marks
                    };
                });
                console.log(extractedSubjects, "extractedSubjects");
                setSelectedItems(JSON.parse(data.data[0].json).extra)


                setsubjectList(extractedSubjects);
                setsubjecttotalmarks(subList.markstotal)
                setmaxmarkstotal(subList.marksobtained)
                setmaxpercentage()
                // setsubjectList([{ subjectname: "", total_marks: "", max_marks: "" }])
                // setsubjectList(JSON.parse(data.data.data[0].Json).subjectList)
                setfetchData(data.data[0]);

                setFormData(JSON.parse(data.data[0].json));
                // setfetchDataId(JSON.parse(data.data.data[0].Id));
            } else {
                alert("No such user found!");
            }
        } catch (error) {
            console.error('Error fetching student details:', error);
        } finally {
            setloading(false);
        }
    };

    const handleSubmit = async (e) => {
        console.log(subjectList, "fetchDataId :Handle Start");
        e.preventDefault();

        // Check if any select is not selected
        const errorsObj = {};

        setloading(true);

        try {
            console.log(formData, "before");

            const response = await fetch(`http://localhost:3000/api/v1/updateBasicDetail/${JSON.parse(searchParams.get('Id'))}`, {
                method: "PUT", // Assuming you are using PUT for updating
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({

                    data: JSON.stringify({
                        ...formData,
                        subjectList: subjectList,
                        extra: selectedItems
                    }),
                }),
            });
            console.log(formData, "After");
            if (!response.ok) {
                console.error("Error:", response.statusText);
                return;
            }

            setloading(false);
            navigate('/dashboard')

        } catch (error) {
            setloading(false);
            console.error("Error:", error.message);
        }
    };

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-4">
            {
                loading
                    ?
                    <div className="grid grid-cols-1 lg:grid-cols-1">
                        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md text-center">
                                <div
                                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                    role="status">
                                    <span
                                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                    >Loading...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="mt-0 flex flex-col">
                        <p className="font-bold text-orange-900 tracking-tight text-1xl">
                            Edit - Student Report Card Data {studentCode}, {year}, {catgcode}
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="studentcode" className="block text-sm font-medium leading-6 text-gray-900">
                                                Student Code
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    readOnly={true}
                                                    id="StudentCode"
                                                    name="StudentCode"
                                                    defaultValue={formData.StudentCode || (fetchData ? fetchData.StudentCode : "No Data")}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="stuyear" className="block text-sm font-medium leading-6 text-gray-900">
                                                Year
                                            </label>
                                            <div className="mt-1">
                                                <select
                                                    id="stuyear"
                                                    name="stuyear"
                                                    defaultValue={formData.stuyear || (fetchData ? fetchData.AcademicYear : "No Data")}
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                        }`}
                                                >
                                                    <option >Select Year</option>
                                                    <option value="2023-2024">2023-2024</option>
                                                    <option value="2022-2023">2022-2023</option>
                                                    <option value="2021-2022">2021-2022</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="reportcard" className="block text-sm font-medium leading-6 text-gray-900">
                                                Report Card Received
                                            </label>
                                            <div className="mt-1">
                                                <select
                                                    id="reportcard"
                                                    name="reportcard"
                                                    value={
                                                        formData.reportcard ||
                                                        (fetchData.Json
                                                            ? JSON.parse(fetchData.Json).reportcard
                                                            : "No Data")
                                                    }
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                        }`}
                                                >
                                                    <option >Select Option</option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">NO</option>

                                                </select>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="result" className="block text-sm font-medium leading-6 text-gray-900">
                                                Result
                                            </label>
                                            <div className="mt-1">
                                                <select
                                                    id="result"
                                                    name="result"
                                                    value={
                                                        formData.result ||
                                                        (fetchData.Json
                                                            ? JSON.parse(fetchData.Json).result
                                                            : "No Data")
                                                    }
                                                    onChange={handleInputChange}
                                                    className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                        }`}
                                                >
                                                    <option >Select result</option>
                                                    <option value="Passed">Passed</option>
                                                    <option value="Failed">Failed</option>
                                                    <option value="Re-appear">Re-appear</option>

                                                </select>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label htmlFor="extra" className="block text-sm font-medium leading-6 text-gray-900">
                                                Extra
                                            </label>
                                            <div className="mt-1">
                                                <div className="w-full p-4">
                                                    <ul className="list-none">
                                                        {console.log(selectedItems, "selectedItems")}
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

                                            <div className="mt-1">
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
                                                                    value={subjectList[i].subjectname}
                                                                    defaultValue={
                                                                        subjectandmarks_data.length > 0
                                                                            ? subjectandmarks_data[0]['subjectname' + i] != null && subjectandmarks_data[0]['subjectname' + i] != undefined
                                                                                ? subjectandmarks_data[0]['subjectname' + i]
                                                                                : ""
                                                                            : ""
                                                                    }
                                                                    onChange={(e) => subjectListhandleInputChange(e, i)}
                                                                    placeholder='Subject Name'
                                                                    aria-describedby="SubjectName"
                                                                />
                                                            </div>
                                                            <div className="">
                                                                <label htmlFor={`total_marks-${i}`} className="block text-sm font-medium leading-6 text-gray-900">
                                                                    Total Marks
                                                                </label>
                                                                <input type="text"
                                                                    name={'total_marks' + i}
                                                                    key='total_marks'
                                                                    className="form-control my-2 "
                                                                    value={subjectList[i].total_marks}
                                                                    defaultValue={subjectandmarks_data.length > 0 ? subjectandmarks_data[0]['total_marks' + i] != null && subjectandmarks_data[0]['total_marks' + i] != undefined ? subjectandmarks_data[0]['total_marks' + i] : "" : ""}
                                                                    onChange={(e) => subjectListhandleInputChange(e, i)}
                                                                    placeholder='ex: 100'
                                                                    aria-describedby="Total_Marks" />
                                                            </div>
                                                            <div className="">
                                                                <label htmlFor={`max_marks-${i}`} className="block text-sm font-medium leading-6 text-gray-900">
                                                                    Max Marks
                                                                </label>
                                                                <input type="text"
                                                                    name={'max_marks' + i}
                                                                    key='max_marks'
                                                                    className="form-control my-2"
                                                                    value={subjectList[i].max_marks}
                                                                    defaultValue={subjectandmarks_data.length > 0 ? subjectandmarks_data[0]['max_marks' + i] != null && subjectandmarks_data[0]['max_marks' + i] != undefined ? subjectandmarks_data[0]['max_marks' + i] : "" : ""}
                                                                    onChange={(e) => subjectListhandleInputChange(e, i)}
                                                                    placeholder='ex: 60'
                                                                    aria-describedby="Maximum_Marks" />
                                                            </div>

                                                            <div className=''>
                                                                <div className="add-new-service my-2 ">
                                                                    {subjectList.length !== 1 && <button type="button" className="btn bg-red-500 mb-2 text-white" onClick={() => subjecthandleRemoveClick(i)}>Remove</button>}
                                                                </div>
                                                            </div>

                                                            <div className="add-new-service">
                                                                {subjectList.length - 1 === i && <button type="button" className="btn bg-black text-white" onClick={subjecthandleAddClick}>Add</button>}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='text py-2 fw-bold'>
                                <p className=''>Total Marks:{maxmarkstotal} </p>
                                <p className=''>Maximum  Marks : {subjecttotalmarks}</p>
                                <p className=''>Percentage : {Math.round(maxpercentage, 2)}%</p>
                            </div>
                            <div className="mt-1 flex items-center justify-end gap-x-6">
                                <button type="button" onClick={() => navigate("/")} className="text-sm font-semibold leading-6 text-grey-900">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
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

export default StudentReportCardEdit