import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form";
import {  NavLink, createSearchParams, useNavigate } from "react-router-dom";

const Register = () => {
    // console.log(process.env.REACT_APP_URL);
    const { register, handleSubmit } = useForm();
    const [userData, setUserData] = useState(null)
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {

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
        userData != null ? <>Loading...</> :
            <div className='h-screen w-screen border-2 flex justify-center items-center bg-slate-200'>
                <div className='bg-slate-300 rounded-md h-4/5 w-1/2 flex flex-col items-center'>
                    <h1 className="mt-10 text-3xl font-bold">Register Page</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className=' mt-10 flex w-full h-full flex-col items-center justify-between'>
                        <div className='flex flex-col w-1/2'>
                            <lable>Name</lable>
                            <input {...register("name", { required: true })} className='h-9 border-2 p-5 border-gray-400 rounded-sm' />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <lable>Email</lable>
                            <input {...register("email", { pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, required: true })} className='h-9 border-2 p-5 border-gray-400 rounded-sm' />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <lable>Mobile Number</lable>
                            <input {...register("mobileNumber", { pattern: /^[1-9]{1}[0-9]{9}$/, required: true })} className='h-9 border-2 p-5 border-gray-400 rounded-sm' />
                        </div>
                        <div className=' flex flex-col w-1/2'>
                            <lable>Password</lable>
                            <input type='password' {...register("password", { required: true })} className='h-9 border-2 p-5 border-gray-400 rounded-sm' />
                        </div>
                        <div className=' flex flex-col w-1/2'>
                            <lable>Conform Password</lable>
                            <input type='password' {...register("cpassword", { required: true })} className='h-9 border-2 p-5 border-gray-400 rounded-sm' />
                        </div>
                        <button type='submit' className='h-9 border-gray-500 rounded-sm w-1/2 bg-pink-400 hover:bg-pink-500 transition-all'>Register</button>
                    </form>
                    <p>Already Account? <NavLink to="/login">login</NavLink></p>
                </div>
            </div>
    )
}

export default Register