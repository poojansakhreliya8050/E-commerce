import React from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form";
import { Link, useNavigate, createSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/user/authSlice';

import { useLoginMutation } from '../redux/user/authApiSlice';



const Login = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login,{isLoading}]=useLoginMutation();


    const onSubmit = async data => {
        try {
            const user = await login(data,{withCredentials: true}).unwrap()
            dispatch(setCredentials(user))
            return navigate("/")
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className='h-screen w-screen border-2 flex justify-center items-center bg-slate-200'>
            <div class="max-w-lg lg:w-1/2 sm:w-4/5 mt-12 bg-white p-8 rounded-xl shadow shadow-slate-300">
                <h1 class="text-4xl font-medium">Login</h1>
                <p class="text-slate-500">Hi, Welcome back 👋</p>

                <div class="my-5">
                    <button class="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                        <img src="https://www.svgrepo.com/show/355037/google.svg" class="w-6 h-6" alt="" /> <span>Login with Google</span>
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} class="my-10">
                    <div class="flex flex-col space-y-5">
                        <label for="email">
                            <p class="font-medium text-slate-700 pb-2">Email address</p>
                            <input {...register("email", { pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, required: true })} type="email" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address" />
                            <span className="text-sm text-red-500">
                                {errors.email && errors.email.type === "required" && <span>This is required</span>}
                            </span>
                        </label>
                        <label for="password">
                            <p class="font-medium text-slate-700 pb-2">Password</p>
                            <input {...register("password", { required: true })} type="password" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter your password" />
                            <span className="text-sm text-red-500">
                                {errors.password && errors.password.type === "required" && <span>This is required</span>}
                            </span>
                        </label>
                        <div class="flex flex-row justify-between">
                            <div>
                                <Link to="/forgetPassword" class="font-medium text-indigo-600">Forgot Password?</Link>
                            </div>
                        </div>
                        <button class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            <span>Login</span>
                        </button>
                        <p class="text-center flex">Not registered yet? 
                            &nbsp;
                            <Link to="/register" class="text-indigo-600 font-medium inline-flex space-x-1 items-center"><span>Register now </span><span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></span>
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>



    )
}

export default Login