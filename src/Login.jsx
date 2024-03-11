import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { sikh } from './assets'

const Login = () => {
    const [credentails, setcredentails] = useState({ email: "", password: "" })
    const [messageState, setMessageState] = useState({ show: false, message: '' });
    const [loading, setloading] = useState(false);
    let navigate = useNavigate();
    useEffect(() => {

        if (localStorage.getItem("UserauthToken")) {
            navigate("/dashboard");
        }
    })

    const alertMessage = messageState.show && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <strong className='text-red-500'>{messageState.message}</strong>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );

    const handleSubmit = async (event) => {
        console.log('Start');
        event.preventDefault();
        setloading(true)
        // Add your login logic here

        const response = await fetch("http://localhost:3000/api/v1/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Email: credentails.email, Password: credentails.password })
        });

        const json = await response.json();

        console.log(json, 'sd');

        console.log(json, "json")
        if (json.Userrole == 'user') {

            localStorage.setItem("UserauthToken", json.authToken)
            localStorage.setItem("UserEmail", credentails.email)
            localStorage.setItem("UserId", json.UserId)
            console.log("Login success fully Data")
            navigate("/dashboard");
            window.location.reload(true);
        } else if (json.Userrole == 'admin') {
            navigate("/Admindashboard");
        }
        else {
            setloading(false)
            setMessageState({ show: true, message: json.message });
        }
    };
    const onchange = (event) => {
        setcredentails({ ...credentails, [event.target.name]: event.target.value })
    }
    return (
        <section>

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
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Log in</h2>

                                {alertMessage}



                                <form onSubmit={handleSubmit} className="mt-8">

                                    <div className="space-y-5">

                                        <div>
                                            <label htmlFor="email" className="text-base font-medium text-gray-900">
                                                {' '}
                                                Email address{' '}
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                    type="email"
                                                    placeholder="Email"
                                                    value={credentails.email}
                                                    onChange={onchange}
                                                    name='email'
                                                    id="email"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="password" className="text-base font-medium text-gray-900">
                                                    {' '}
                                                    Password{' '}
                                                </label>
                                            </div>
                                            <div className="mt-2">
                                                <input
                                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                    type="password"
                                                    placeholder="Password"
                                                    id="password"
                                                    name='password'
                                                    value={credentails.password}
                                                    onChange={onchange}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                            >
                                                Login <ArrowRight className="ml-2" size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                        <div className="h-full w-full">
                            <img
                                className="mx-auto h-full w-full rounded-md object-cover"
                                src={sikh}
                                alt=""
                            />
                        </div>
                    </div>

            }



        </section>
    )
}

export default Login