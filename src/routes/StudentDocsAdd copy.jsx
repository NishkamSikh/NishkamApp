import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const StudentDocsAdd = () => {
    const [userID, setUserId] = useState([])
    const [loading, setloading] = useState(false);
    const [searchStudentCode, setSearchStudentCode] = useState('');
    const [studentDetails, setStudentDetails] = useState([]);
    const [filteredStudentDetails, setFilteredStudentDetails] = useState([]);
    const [formData, setFormData] = useState({
        studentcode: "",
        profilePhoto: "",
        identityDoc: "",
        FatherAadharCard: "",
        MotherAadharCard: "",
        ReportCard: "",
    })

    const [profilePhotoPreview, setProfilePhotoPreview] = useState('');
    const [identityDocPreview, setIdentityDocPreview] = useState('');
    const [fatherAadharCardPreview, setFatherAadharCardPreview] = useState('');
    const [motherAadharCardPreview, setMotherAadharCardPreview] = useState('');
    const [reportCardPreview, setReportCardPreview] = useState('');

    const [errors, setErrors] = useState({});
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

    useEffect(() => {
        fetchAllStudentDetails();


        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        const getUserid = localStorage.getItem("UserId")
        setUserId(getUserid)

    }, [])

    const fetchAllStudentDetails = () => {
        setloading(true);
        fetch('https://apisikligar.azurewebsites.net/api/v1/fetchAllStudentDetails')
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

        try {
            const profilePhotoUrl = await imageupload(formData.profilePhoto, "profilePhoto");
            const identityDocUrl = await imageupload(formData.identityDoc, "identityDoc");
            const fatherAadharCardUrl = await imageupload(formData.FatherAadharCard, "FatherAadharCard");
            const motherAadharCardUrl = await imageupload(formData.MotherAadharCard, "MotherAadharCard");
            const reportCardUrl = await imageupload(formData.ReportCard, "ReportCard");
            setFormData((prevData) => ({
                ...prevData,
                profilePhoto: profilePhotoUrl,
                identityDoc: identityDocUrl,
                FatherAadharCard: fatherAadharCardUrl,
                MotherAadharCard: motherAadharCardUrl,
                ReportCard: reportCardUrl,
            }));


            const { studentcode, stuyear, ...formDataWithoutCodeYear } = formData;

            // Proceed with the second API call
            const response = await fetch("https://apisikligar.azurewebsites.net/api/v1/addStudentData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    UserId: userID,
                    StudentCode: formData.studentcode,
                    AcademicYear: formData.stuyear,
                    CatgCode: "DOCM",
                    data: JSON.stringify({
                        ...formDataWithoutCodeYear,
                        profilePhoto: profilePhotoUrl,
                        identityDoc: identityDocUrl,
                        FatherAadharCard: fatherAadharCardUrl,
                        MotherAadharCard: motherAadharCardUrl,
                        ReportCard: reportCardUrl,
                    }),

                }),
            });

            if (!response.ok) {
                console.error("Error:", response.statusText);
                return;
            }

            console.log(formData, "==");
            setloading(false);


            console.log("Final FormData with URLs:", formData);
        } catch (error) {
            console.error("Error uploading images:", error.message);
            // Handle error (e.g., show an error message to the user)
        }
    };
    useEffect(() => {
        const filteredDetails = studentDetails.filter(
            (detail) => detail.StudentCode.includes(searchStudentCode)
        );
        setFilteredStudentDetails(filteredDetails);
    }, [searchStudentCode, studentDetails]);

    const handleInputChange = (e) => {
        const { name } = e.target;
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const allowedTypes = ["image/png", "image/jpeg", "image/gif"];
            const maxSizeMB = 10;

            if (!allowedTypes.includes(selectedFile.type)) {
                alert(`Invalid file type for ${name}. Please select a PNG, JPG, or GIF file.`);
                return;
            }

            const maxSizeBytes = maxSizeMB * 1024 * 1024;
            if (selectedFile.size > maxSizeBytes) {
                alert(`File size for ${name} exceeds the maximum limit of ${maxSizeMB} MB.`);
                return;
            }

            // Set the corresponding file in formData
            setFormData((prevData) => ({ ...prevData, [name]: selectedFile }));

            // Set the corresponding image preview
            const previewURL = URL.createObjectURL(selectedFile);
            switch (name) {
                case 'profilePhoto':
                    setProfilePhotoPreview(previewURL);
                    break;
                case 'identityDoc':
                    setIdentityDocPreview(previewURL);
                    break;
                case 'FatherAadharCard':
                    setFatherAadharCardPreview(previewURL);
                    break;
                case 'MotherAadharCard':
                    setMotherAadharCardPreview(previewURL);
                    break;
                case 'ReportCard':
                    setReportCardPreview(previewURL);
                    break;
                default:
                    break;
            }
        }
    };

    const imageupload = async (imageFile, fieldName) => {

        const data = new FormData();

        if (!imageFile) {
            alert(`No ${fieldName} selected.`);
            throw new Error(`No ${fieldName} selected.`);
        }
        // Check the file type
        const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/svg+xml"];
        if (!allowedTypes.includes(imageFile.type)) {
            console.log("Selected file type:", imageFile);
            alert("Invalid file type. Please select a PNG or JPG file.");
            throw new Error("Invalid file type. Please select a PNG or JPG file.");
        }

        // Check the file size (in bytes)
        const maxSizeMB = 5; // Set the maximum file size in megabytes
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        if (imageFile.size > maxSizeBytes) {
            alert(`File size exceeds the maximum limit of ${maxSizeMB} MB.`)
            throw new Error(`File size exceeds the maximum limit of ${maxSizeMB} MB.`);
        }
        data.append("file", imageFile);
        data.append("upload_preset", "employeeApp");
        data.append("cloud_name", "dxwge5g8f");

        try {
            const cloudinaryResponse = await fetch(
                "https://api.cloudinary.com/v1_1/dxwge5g8f/image/upload",
                {
                    method: "post",
                    body: data,
                }
            );

            if (!cloudinaryResponse.ok) {
                console.error("Error uploading image to Cloudinary:", cloudinaryResponse.statusText);
                return;
            }

            const cloudinaryData = await cloudinaryResponse.json();
            console.log(`${fieldName} Cloudinary URL:`, cloudinaryData.url);
            return cloudinaryData.url;
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error.message);
            return null;
        }
    };

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-0">
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
                            Add - Upload documents
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">

                                        <div className="sm:col-span-3">
                                            <label htmlFor="searchStudentCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                Student Code
                                            </label>
                                            <Select

                                                options={studentDetails.map((student) => ({
                                                    value: student.StudentKey,
                                                    label: student.dd_label,
                                                    isDisabled: student.ad_disable === 'Yes'
                                                }))}
                                                className={`block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                    }`}
                                                onChange={handleSearchChange}

                                            />
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="institutiontype" className="block text-sm font-medium leading-6 text-gray-900">
                                                Profile Photo
                                            </label>
                                            <div className="mt-2">
                                                <input type="file"
                                                    name='profilePhoto'
                                                    onChange={handleInputChange}
                                                    id="profilePhoto" />
                                                {profilePhotoPreview && (
                                                    <div className="mt-2">
                                                        <p className="text-sm font-medium leading-6 text-gray-900">Image Preview:</p>
                                                        <img src={profilePhotoPreview} alt="Profile Preview" width='200px' className="mt-2 max-w-full h-auto" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="identityDoc" className="block text-sm font-medium leading-6 text-gray-900">
                                                Identity Document Photo
                                            </label>
                                            <div className="mt-2">
                                                <input type="file"
                                                    name='identityDoc'
                                                    onChange={handleInputChange}
                                                    id="identityDoc" />

                                                {identityDocPreview && (
                                                    <div className="mt-2">
                                                        <p className="text-sm font-medium leading-6 text-gray-900">Image Preview:</p>
                                                        <img src={identityDocPreview} alt="Profile Preview" width='200px' className="mt-2 max-w-full h-auto" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="FatherAadharCard" className="block text-sm font-medium leading-6 text-gray-900">
                                                Father Aadhar Photo
                                            </label>
                                            <div className="mt-2">
                                                <input type="file"
                                                    name='FatherAadharCard'
                                                    onChange={handleInputChange}
                                                    id="FatherAadharCard" />

                                                {fatherAadharCardPreview && (
                                                    <div className="mt-2">
                                                        <p className="text-sm font-medium leading-6 text-gray-900">Image Preview:</p>
                                                        <img src={fatherAadharCardPreview} alt="Profile Preview" width='200px' className="mt-2 max-w-full h-auto" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>


                                        <div className="sm:col-span-3">
                                            <label htmlFor="MotherAadharCard" className="block text-sm font-medium leading-6 text-gray-900">
                                                Mother Aadhar Photo
                                            </label>
                                            <div className="mt-2">
                                                <input type="file"
                                                    name='MotherAadharCard'
                                                    onChange={handleInputChange}
                                                    id="MotherAadharCard" />

                                                {motherAadharCardPreview && (
                                                    <div className="mt-2">
                                                        <p className="text-sm font-medium leading-6 text-gray-900">Image Preview:</p>
                                                        <img src={motherAadharCardPreview} alt="Profile Preview" width='200px' className="mt-2 max-w-full h-auto" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="ReportCard" className="block text-sm font-medium leading-6 text-gray-900">
                                                Report Card Photo
                                            </label>
                                            <div className="mt-2">
                                                <input type="file"
                                                    name='ReportCard'
                                                    onChange={handleInputChange}
                                                    id="ReportCard" />

                                                {reportCardPreview && (
                                                    <div className="mt-2">
                                                        <p className="text-sm font-medium leading-6 text-gray-900">Image Preview:</p>
                                                        <img src={reportCardPreview} alt="Profile Preview" width='200px' className="mt-2 max-w-full h-auto" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
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

export default StudentDocsAdd