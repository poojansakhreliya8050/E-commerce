import React from 'react'
import { useSearchParams,useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios  from 'axios'
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/user/authSlice';

const VerifyUser = () => {
    const [searchparams] = useSearchParams();
    console.log(searchparams.get("email"));
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const { register, handleSubmit } = useForm();

    const onSubmit = async data => {
        try {

            const user= await axios.post(`${process.env.REACT_APP_URL}/api/v1/user/verifyUser`, {email:searchparams.get("email"),...data})
            console.log(user)
            if(user.status==200)
            {
                dispatch(setCredentials(user?.data))
                navigate("/")
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='h-screen w-screen border-2 flex justify-center items-center bg-slate-200'>
            <div className='bg-slate-300 rounded-md h-2/3 w-1/2 flex flex-col items-center'>
                <h1 className="mt-10 text-3xl font-bold">Verify Page</h1>

                <form onSubmit={handleSubmit(onSubmit)} className=' mt-10 flex w-full h-1/2 flex-col items-center justify-between'>
                    <div className='flex flex-col w-1/2'>
                        <lable>Get your OTP on :</lable>
                        <label>{searchparams.get("email")}</label>
                    </div>
                    <div className=' flex flex-col w-1/2'>
                        <lable>otp</lable>
                        <input {...register("otp", { required: true })} className='h-9 border-2 p-5 border-gray-400 rounded-sm' />
                    </div>
                    <button type='submit' className='h-9 border-gray-500 rounded-sm w-1/2 bg-pink-400 hover:bg-pink-500 transition-all'>Verify</button>
                </form>
            </div>
        </div>
    )
}

export default VerifyUser