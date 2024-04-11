import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { useSearchParams } from 'react-router-dom'



const StudentDetail = () => {
    const [StudentData, setStudentData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    console.log("Id= ", JSON.parse(searchParams.get('id')));
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }

        const fetchData = async () => {
            try {
                // Make API request using fetch
                //              const response = await fetch(`https://nishkamapi.onrender.com/api/v1/fetchSingleStudentDetail/${JSON.parse(searchParams.get('id'))}`);
                const response = await fetch(`https://nishkamapi.onrender.com/api/v1/fetchSingleStudentDetail/${JSON.parse(searchParams.get('id'))}`);

                // Check if the response status is ok (200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the response as JSON
                const result = await response.json();
                console.log("result=", result);
                setStudentData(result);
            } catch (error) {
                // Handle errors here
                setError(error.message);
            }
        };

        fetchData()

    }, []);

    return (
        <section className="mx-auto w-full max-w-3xl px-1 py-0">
            {/* <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0"> */}
            <div className="space-y-1 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <Link to={`/StudentSummaryList`} className="text-grey-500 hover:text-indigo-600">
                        <span className="inline-flex rounded-full px-2 py-1 text-medium font-semibold leading-15 text-red">
                            Go Back
                        </span>
                    </Link>
                </div>

                <div class="p-2 bg-green-100 text-sm">

                    {StudentData.map((data, index) => (
                        <div>
                            <p>
                                <Link to={`/StudentProfileEdit?Id=${data.ProfileId}&flag=profile`} className="text-grey-500 hover:text-indigo-600">
                                    <span className="inline-flex rounded-full bg-blue-400 px-5 py-1  text-medium font-semibold leading-15 text-white">
                                        Edit-Profile data
                                    </span>
                                </Link>
                            </p>
                            <p><b>ProfileId:</b> {data.ProfileId} </p>
                            <p><b>Student:</b> {data.StudentCode} / {data.firstname} {data.lastname}</p>
                            <p><b>DOB:</b> {data.dob} <b>Gender:</b> {data.gender}</p>
                            <p><b>Join Dt:</b> {data.joindate} <b>Status:</b> {data.status}</p>
                            <p><b>Religion:</b> {data.religion} <b>Sikligar:</b> {data.sikligar}</p>
                            <p><b>Contact#:</b> {data.contact1} <b>Ref By:</b> {data.refby}</p>
                            <p><b>Assistance:</b> {data.assistance}   <b>Category:</b> {data.category}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-1 md:flex-row md:items-center md:justify-between md:space-y-0 mt-2">
                <div class="p-2 bg-orange-100 text-sm">
                    {StudentData.map((data, index) => (
                        <div>

                            <p>
                                <Link to={`/StudentAddressEdit?Id=${data.AddressId}&flag=address&proId=${data.ProfileId}`} className="text-grey-500 hover:text-indigo-600">
                                    <span className="inline-flex rounded-full bg-blue-400 px-5 py-1  text-medium font-semibold leading-15 text-white">
                                        Edit-Address data
                                    </span>
                                </Link>
                            </p>

                            <p><b>AddressId:</b> {data.AddressId} </p>
                            <p><b>State:</b> {data.stustate} <b>District:</b> {data.studistrict}</p>
                            <p><b>Tehsil:</b> {data.stutehsil} <b>Basti:</b> {data.ad_bastiname}</p>
                            <p><b>Address:</b> {data.stuaddress}</p>
                            <p><b>Village:</b> {data.stuvillage} <b>PIN:</b>{data.stupin}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mt-2">
                <div class="p-2 bg-teal-100  text-sm">
                    {StudentData.map((data, index) => (
                        <div>
                            <p>
                                <Link to={`/StudentFamilyEdit?Id=${data.FamilyId}&flag=family&proId=${data.ProfileId}`} className="text-grey-500 hover:text-indigo-600">
                                    <span className="inline-flex rounded-full bg-blue-400 px-5 py-1  text-medium font-semibold leading-15 text-white">
                                        Edit-Family data
                                    </span>
                                </Link>
                            </p>
                            <p><b>FamilyId:</b> {data.FamilyId} </p>
                            <p><b>Parents:</b> {data.Father_Name} {data.Mother_Name}</p>
                            <p><b>F-Education</b>: {data.Father_Education} <b>Occupation:</b> {data.Father_Occupation} <b>Grs.Income:</b> {data.F_Gross_Income}</p>
                            <p><b>M-Education</b>: {data.Mother_Education} <b>Occupation:</b> {data.Mother_Occupation} <b>Grs.Income:</b> {data.M_Gross_Income}</p>
                            <p><b>Grand Father Name:</b> {data.Grandfather_Name}</p>
                            <p><b>F-Aadhar: </b>{data.F_Aadhar_No} <b>M-Aadhar: </b>{data.M_Aadhar_No}</p>
                            <p><b>F-Mobile: </b>{data.F_Mobile_No} <b>M-Mobile: </b>{data.M_Mobile_No}</p>
                            <p><b>G-Name: </b>{data.Guardian_Name}<b>Education</b>: {data.Guardian_Education} <b>Occupation:</b> {data.Guardian_Occupation} <b>Grs.Income:</b> {data.Guardian_Gross_Income}</p>
                            <p><b>G-Aadhar: </b>{data.Guardian_Aadhar_No}<b>Mobile# </b>: {data.Guardian_Mobile_No}</p>
                        </div>
                    ))}

                </div>
            </div>

            <div className="space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mt-2">
                <div class="p-2 bg-indigo-100  text-sm">
                    {StudentData.map((data, index) => (
                        <div>
                            <p>
                                <Link to={`/StudentInstitutionEdit?Id=${data.InstitutionId}&flag=institution&proId=${data.ProfileId}`} className="text-grey-500 hover:text-indigo-600">
                                    <span className="inline-flex rounded-full bg-blue-400 px-5 py-1  text-medium font-semibold leading-15 text-white">
                                        Edit-Institution data
                                    </span>
                                </Link>
                            </p>
                            <p><b>InstitutionId:</b> {data.InstitutionId} </p>
                            <p><b>INST type:</b> {data.in_institutiontype}</p>
                            <p><b>INST Name:</b> {data.in_institutionname}</p>
                            <p><b>INST Board:</b> {data.boardoruniversity}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mt-2">
                <div class="p-2 bg-pink-100  text-sm">
                    {StudentData.map((data, index) => (
                        <div>
                            <p>
                                <Link to={`/StudentAcademicEdit?Id=${data.AcademicId}&flag=academic&proId=${data.ProfileId}`} className="text-grey-500 hover:text-indigo-600">
                                    <span className="inline-flex rounded-full bg-blue-400 px-5 py-1  text-medium font-semibold leading-15 text-white">
                                        Edit-Academic data
                                    </span>
                                </Link>
                            </p>
                            <p><b>AcademicId:</b> {data.AcademicId} </p>
                            <p><b>Admission#:</b> {data.admissionnumber} <b>Roll#:</b> {data.rollnumber}</p>
                            <p><b>Class:</b> {data.class} <b>Section:</b> {data.section}</p>
                            <p><b>Semester:</b> {data.semester} <b>Stream:</b> {data.stream}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mt-2">
                <div class="p-2 bg-orange-100  text-sm">
                    {StudentData.map((data, index) => (
                        <div>
                            <p>
                                <Link to={`/StudentAcademicEdit?Id=${data.AcademicId}&flag=academic&proId=${data.ProfileId}`} className="text-grey-500 hover:text-indigo-600">
                                    <span className="inline-flex rounded-full bg-blue-400 px-5 py-1  text-medium font-semibold leading-15 text-white">
                                        Edit-ReportCard data
                                    </span>
                                </Link>
                            </p>
                            <p><b>ReportCardId:</b> {data.AcademicId} </p>
                            <p><b>Result:</b> {data.Result}</p>
                            <p><b>Marks Obtained:</b> {data.MarksObtained}</p>
                            <p><b>Marks Total:</b> {data.MarksTotal}</p>
                            <p><b>Marks %:</b> {data.MarksPercentage}</p>


                        </div>
                    ))}
                </div>
            </div>

        </section>
    )
}

export default StudentDetail