import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';


const ForgetPassword = () => {
    const [showField, setShowField] = useState(false)
    const { register, handleSubmit } = useForm();
    const navigate=useNavigate();
   
    const handleForgetPassword = async (data) => {
        console.log(data);
        try {
           const otp= await axios.post(`${process.env.REACT_APP_URL}/api/v1/user/forgetPassword`, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            console.log(otp);
            alert("send otp successfully on your email");
            setShowField(true)
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleResetPassword = async (data) => {
        if(data.password!=data.confirmpassword)
        {
            alert("Password and confirm password should be same")
            return
        }
        try {
            await axios.post(`${process.env.REACT_APP_URL}/api/v1/user/resetPassword`, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            alert("Password reset successfully");
            setShowField(false)
            navigate('/login');
        }
        catch (err) {
            console.log(err);
            alert("Something went wrong")
        }
    }

    return (
        <div className='w-screen h-screen flex justify-center justify-items-center'>
            <div className="flex items-center justify-center w-full bg-gray-400">

                <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 w-1/3">
                    <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Forget Password</h1>

                    <div className="mb-4">
                        <label for="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                        <input {...register("email",{pattern:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,required:true})} disabled={showField} type="email" id="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" />
                    </div>
                    {
                        showField==false &&
                        <button onClick={handleSubmit(handleForgetPassword)} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Send Otp</button>
                    }
                    {
                        showField &&
                        <>
                            <div className="mb-4">
                                <label for="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Otp</label>
                                <input {...register("otp", { required: true })} type="password" id="otp" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your otp" />
                            </div>

                            <div className="mb-4">
                                <label for="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                                <input {...register("password", { required: true })} type="password" id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" />
                            </div>

                            <div className="mb-4">
                                <label for="confirmpassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                                <input {...register("confirmpassword", { required: true })} type="password" id="confirmpassword" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your confirm password" />
                            </div>

                            <button onClick={handleSubmit(handleResetPassword)}  type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Forget Password</button>
                        </>
                    }

                </div>
            </div>
        </div>
    )
}

export default ForgetPassword