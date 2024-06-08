import React from 'react'
import axios from 'axios' 
import { useForm } from "react-hook-form";
import { NavLink,useNavigate,createSearchParams} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userData } from '../redux/user/userSlice';



const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const onSubmit = async data => {
        try{

            const user=await axios.post(`${process.env.REACT_APP_URL}/api/v1/user/loginUser`,data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                  }})
            console.log(user)
            if(user?.status==203)
            {
               return navigate({
                    pathname:"/verifyUser",
                    search:createSearchParams({
                        email:user.data.email
                    }).toString()
                })
            }
            else{
                dispatch(userData(user?.data))
            return navigate("/")
            }
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className='h-screen w-screen border-2 flex justify-center items-center bg-slate-200'>
            <div className='bg-slate-300 rounded-md h-2/3 w-1/2 flex flex-col items-center'>
                <h1 className="mt-10 text-3xl font-bold">Login Page</h1>

                <form onSubmit={handleSubmit(onSubmit)} className=' mt-10 flex w-full h-1/2 flex-col items-center justify-between'>
                    <div className='flex flex-col w-1/2'>
                        <lable>Email</lable>
                        <input {...register("email",{pattern:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,required:true})} className='h-9 p-5 border-2 border-gray-400 rounded-sm' />
                    </div>
                    <div className=' flex flex-col w-1/2'>
                        <lable>Password</lable>
                        <input type='password' {...register("password", { required: true })} className='h-9 border-2 p-5 border-gray-400 rounded-sm' />
                    </div>
                    <button type='submit' className='h-9 border-gray-500 rounded-sm w-1/2 bg-pink-400 hover:bg-pink-500 transition-all'>Login</button>
                </form>
                <p>No Account? <NavLink to="/register">Register</NavLink></p>
                <NavLink to="/forgetPassword"  className='cursor-pointer hover:text-purple-500'>Forget Password?</NavLink>

            </div>
        </div>
    )
}

export default Login