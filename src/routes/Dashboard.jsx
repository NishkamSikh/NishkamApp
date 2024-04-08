import React, { useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
    })
    return (
        <section>
            <h2>Dashaboard</h2>

            {/* <div className="">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div class="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                        <div>
                            <h2 class="text-lg font-semibold">Dashboard</h2>
                            <p class="mt-1 text-sm text-gray-700">
                                Dashboard
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        <div className="group relative p-4 rounded-lg bg-white">

                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h2 className="text-lg pb-3 text-gray-700">
                                        <a href="/studentsBasicdetail">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            Add New Student
                                        </a>
                                    </h2>

                                    <a href='#'
                                        className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
                                    >
                                        Add New
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </a>

                                </div>

                            </div>
                        </div>
                        <div className="group relative p-4 rounded-lg bg-white">

                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h2 className="text-lg pb-3 text-gray-700">
                                        <a href="/studentsList">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            Student List
                                        </a>
                                    </h2>

                                    <a href='#'
                                        className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
                                    >
                                        See List
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </a>

                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div> */}
        </section>
    )
}

export default Dashboard