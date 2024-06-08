import React,{useEffect} from 'react'
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useForm} from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";



const ChangePasswordPopUp = ({showModal,setShowModal}) => {
  // console.log(addressId);
  const { register, handleSubmit, reset } = useForm();
  const user = useSelector((state) => state.userData.user);
  
  const handleChangePassword = async (data) => {
    try {
      if (data.newpassword !== data.confirmpassword) 
        alert("Password and Confirm Password should be same");
        
        if(user!=null && user.accessToken!=null && user.accessToken!==""){
        console.log(data);
        await axios.post(`${process.env.REACT_APP_URL}/api/v1/user/changePassword`, {"oldPassword":data.oldpassword,"newPassword":data.newpassword,"email":user.userdata.email})
        alert("Password Changed Successfully");
        setShowModal(false);
        reset();
    }
      
    } catch (err) {
      console.log(err);
    }
  };

 

  return (
    <div className="w-full md:w-[32%] sm::w-[49%] flex shadow-black hover:shadow-xl  bg-orange-100 p-3 rounded-3xl">

      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto md:w-1/3">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Change New Password
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                    }}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div className="relative p-6 flex-auto space-x-4">

                  <form className="flex flex-col">

                    <label htmlFor="oldPassword">Old Password</label>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                      <span className="z-10 h-full leading-snug font-normal text-center flex  text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                        <i className="fas fa-location"></i>
                      </span>
                      <input
                        type="text"
                        id="oldPassword"
                        placeholder="Enter your oldPassword"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10"
                        {...register("oldpassword", { required: true })}
                      ></input>
                    </div>

                    <label htmlFor="newPassword">New Password</label>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                      <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                        <i className="fas fa-map"></i>
                      </span>
                      <input
                        type="text"
                        placeholder="Enter New Password"
                        id="newPassword"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10"
                        {...register("newpassword", { required: true })}
                      />
                    </div>

                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                      <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                        <i className="fas fa-map"></i>
                      </span>
                      <input
                        type="text"
                        id="confirmpassword"
                        placeholder="Your city name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10"
                        {...register("confirmpassword", { required: true })}
                      />
                    </div>



                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                     
                      <button
                        type="button"
                        className={`"hover:bg-white hover:text-black w-full bg-orange-500 text-white p-2 rounded-lg hover:border duration-200 border border-gray-300`}
                        onClick={handleSubmit(handleChangePassword)}>Change Password
                      </button>
                     
                    </div>

                  </form>
                </div>

              </div>
            </div>
          </div>
        </>
      )}
    </div>

  )
}

export default ChangePasswordPopUp