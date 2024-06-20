import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import Loading from './Loading';

const Register = () => {
    // console.log(process.env.REACT_APP_URL);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [userData, setUserData] = useState(null)
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            console.log(data + "first........");
            const user = await axios.post(`${process.env.REACT_APP_URL}/api/v1/user/createUser`, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            console.log(user)
            if (user?.status == 208) {
                return alert("user already exist !")
            }
            if (user?.status == 200) {
                setUserData(user)
                navigate({
                    pathname: "/verifyUser",
                    search: createSearchParams({
                        email: user.data.email
                    }).toString()
                })
            }
        } catch (err) {
            console.log(err);
        }

    }
    return (
        userData != null ? <Loading /> :
            // <div className='h-screen w-screen border-2 flex justify-center items-center bg-slate-200'>
            //     <div className='bg-slate-300 rounded-md h-4/5 w-1/2 flex flex-col items-center'>
            //         <h1 className="mt-10 text-3xl font-bold">Register Page</h1>

            //         <form onSubmit={handleSubmit(onSubmit)} className=' mt-10 flex w-full h-full flex-col items-center justify-between'>
            //             <div className='flex flex-col w-1/2'>
            //                 <lable>Name</lable>
            //                 <input {...register("name", { required: true })} className='h-9 border-2 p-5 border-gray-400 rounded-sm' />
            //             </div>
            //             <div className='flex flex-col w-1/2'>
            //                 <lable>Email</lable>
            //                 <input {...register("email", { pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, required: true })} className='h-9 border-2 p-5 border-gray-400 rounded-sm' />
            //             </div>
            //             <div className='flex flex-col w-1/2'>
            //                 <lable>Mobile Number</lable>
            //                 <input {...register("mobileNumber", { pattern: /^[1-9]{1}[0-9]{9}$/, required: true })} className='h-9 border-2 p-5 border-gray-400 rounded-sm' />
            //             </div>
            //             <div className=' flex flex-col w-1/2'>
            //                 <lable>Password</lable>
            //                 <input type='password' {...register("password", { required: true })} className='h-9 border-2 p-5 border-gray-400 rounded-sm' />
            //             </div>
            //             <div className=' flex flex-col w-1/2'>
            //                 <lable>Conform Password</lable>
            //                 <input type='password' {...register("cpassword", { required: true })} className='h-9 border-2 p-5 border-gray-400 rounded-sm' />
            //             </div>
            //             <button type='submit' className='h-9 border-gray-500 rounded-sm w-1/2 bg-pink-400 hover:bg-pink-500 transition-all'>Register</button>
            //         </form>
            //         <p>Already Account? <NavLink to="/login">login</NavLink></p>
            //     </div>
            // </div>

            <div className=' w-screen border-2 flex justify-center items-center bg-slate-200'>
                <div class="max-w-lg lg:w-1/2 sm:w-4/5 mt-28 bg-white p-8 rounded-xl shadow shadow-slate-300">
                    <h1 class="text-4xl font-medium">Register</h1>
                    <form onSubmit={handleSubmit(onSubmit)} class="my-10">
                        <div class="flex flex-col space-y-5">
                            <label for="name">
                                <p class="font-medium text-slate-700 pb-2">Name</p>
                                <input {...register("name", { required: true })} type="text" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter your name" />
                                <span className="text-sm text-red-500">
                                    {errors.name && errors.name.type === "required" && <span>This is required</span>}
                                </span>
                            </label>
                            <label for="email">
                                <p class="font-medium text-slate-700 pb-2">Email address</p>
                                <input {...register("email", { pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, required: true })} type="email" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address" />
                                <span className="text-sm text-red-500">
                                    {errors.email && errors.email.type === "required" && <span>This is required</span>}
                                </span>
                            </label>
                            <label for="mobilenumber">
                                <p class="font-medium text-slate-700 pb-2">Mobile Number</p>
                                <input {...register("mobileNumber", { pattern: /^[1-9]{1}[0-9]{9}$/, required: true })}  type="text" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter mobile number" />
                                <span className="text-sm text-red-500">
                                    {errors.mobileNumber && errors.mobileNumber.type === "required" && <span>This is required</span>}
                                </span>
                            </label>
                            <label for="password">
                                <p class="font-medium text-slate-700 pb-2">Password</p>
                                <input type="password" {...register("password", { required: true })}  class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter password" />
                                <span className="text-sm text-red-500">
                                    {errors.password && errors.password.type === "required" && <span>This is required</span>}
                                </span>
                            </label>
                            <label for="cpassword">
                                <p class="font-medium text-slate-700 pb-2">Conform Password</p>
                                <input type='password' {...register("cpassword", { required: true })}class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter conform password" />
                                <span className="text-sm text-red-500">
                                    {errors.email && errors.email.type === "required" && <span>This is required</span>}
                                </span>
                            </label>

                            <button class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                <span>Register</span>
                            </button>
                            <p class="text-center flex">Already Account? 
                                &nbsp;
                                <Link to="/login" class="text-indigo-600 font-medium inline-flex space-x-1 items-center"><span>Login</span><span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></span>
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default Register