import React, { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/user/authSlice';
import OtpInput from './OtpInput';

const VerifyUser = () => {
    const [searchparams] = useSearchParams();
    const [otpNumber, setOtpNumber] = useState("")
    // console.log(searchparams.get("email"));
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit = async () => {
        try {
            if (otpNumber.length == 4) {
                const user = await axios.post(`${process.env.REACT_APP_URL}/api/v1/user/verifyUser`, { email: searchparams.get("email"), otp: otpNumber })
                console.log(user)
                if (user.status == 200) {
                    dispatch(setCredentials(user?.data))
                    navigate("/")
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    console.log(otpNumber);

    return (
        <div className='h-screen w-screen border-2 flex justify-center items-center bg-slate-200'>
            <div class="max-w-lg lg:w-1/2 sm:w-4/5 mt-12 bg-white p-8 rounded-xl shadow shadow-slate-300">
                <h1 class="text-4xl font-medium">Verify User</h1>
                <form class="my-10">
                    <div class="flex flex-col space-y-5">


                        <div className='flex flex-col w-1/2'>
                            <lable>Get your OTP on :</lable>
                            <label>{searchparams.get("email")}</label>
                        </div>
                        <div className=' flex flex-col w-1/2'>
                            <lable>OTP</lable>
                            <OtpInput setOtpNumber={setOtpNumber} />
                        </div>

                        <button onClick={()=>onSubmit()} type='button' class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            <span>Verify User</span>
                        </button>
                        
                        {/* <p class="text-center flex">Resend?
                            &nbsp;
                            <Link to="/register" class="text-indigo-600 font-medium inline-flex space-x-1 items-center"><span>Register now </span><span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></span>
                            </Link>
                        </p> */}
                    </div>
                </form>
            </div>
        </div>



    )
}

export default VerifyUser