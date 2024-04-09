import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const StudentDataDisplay = () => {
    const [StudentData, setStudentData] = useState([])

    useEffect(() => {
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }

        const fetchData = async () => {
            try {
                // Make API request using fetch
                //                const response = await fetch('https://nishkamapi.onrender.com/api/v1/fetchSingleStudentDetail');
                const response = await fetch('https://nishkamapi.onrender.com/api/v1/fetchAllStudentDetails');

                // Check if the response status is ok (200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the response as JSON
                const result = await response.json();
                console.log(result);
                setStudentData(result.data);
            } catch (error) {
                // Handle errors here
                setError(error.message);
            }
        };

        fetchData()

    }, []);



    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-0">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div class="p-2 bg-green-100">
                    <div><h1>List Profile data here....</h1></div>
                    <div>skdjfk jsdkfjsdkj fjsdf jsdfkjs dkjfksjdf ksjdfksjdf sfkj sdfjsdkjfks jdfsdfkjsdkfjskdjfksdj</div>
                    <div>03</div>
                </div>

                <div class="p-2 bg-yellow-100">
                    <div><h1>List Family data here...</h1></div>
                    <div>skjdlkfj skjdfjsdfk jksdjfk jsfkjskd jfksjf kjsfkkfdj ksdjf kjsdfkj</div>
                    <div>03</div>
                </div>
            </div>


            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mt-2">
                <div class="p-2 bg-teal-100">
                    <div><h1>List Address data here...</h1></div>
                    <div>skdjfk jsdkfjsdkj fjsdf jsdfkjs dkjfksjdf ksjdfksjdf sfkj sdfjsdkjfks jdfsdfkjsdkfjskdjfksdj</div>
                    <div>03</div>
                </div>

                <div class="p-2 bg-indigo-100">
                    <div><h1>List Institution data here...</h1></div>
                    <div>skjdlkfj skjdfjsdfk jksdjfk jsfkjskd jfksjf kjsfkkfdj ksdjf kjsdfkj</div>
                    <div>03</div>
                </div>
            </div>

            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mt-2">
                <div class="p-2 bg-pink-100">
                    <div><h1>List Academic data here...</h1></div>
                    <div>skdjfk jsdkfjsdkj fjsdf jsdfkjs dkjfksjdf ksjdfksjdf sfkj sdfjsdkjfks jdfsdfkjsdkfjskdjfksdj</div>
                    <div>03</div>
                </div>

                <div class="p-2 bg-sky-100">
                    <div><h1>List Reportcard data here...</h1></div>
                    <div>skjdlkfj skjdfjsdfk jksdjfk jsfkjskd jfksjf kjsfkkfdj ksdjf kjsdfkj</div>
                    <div>03</div>
                </div>
            </div>




        </section>
    )
}

export default StudentDataDisplay