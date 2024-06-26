import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import avatar from "../images/avatar.jpg";
import Addresses from "../component/Addresses";
import { logout} from "../redux/user/authSlice";
// import UserAddress from "../components/UserAddress";
// import UpdateProfileDetails from "../components/UpdateProfileDetails";
import axios from "axios";
import OrderComponent from "../component/OrderComponent";
import ChangePasswordPopUp from "../component/ChangePasswordPopUp";
 


const Profile = () => {

const user=useSelector(state=>state.auth.user)
const [openTab,setOpenTab]=useState(1);
const [changePasswordModel,setChangePasswordModel]=useState(false);

const dispatch=useDispatch();
const navigate=useNavigate();

  const handleLogout = async() => {

    try{
      const res=await axios.get(`${process.env.REACT_APP_URL}/api/v1/user/logout`,{withCredentials:true})
      console.log(res.data);
      dispatch(logout())
      navigate("/")
    }
    catch(err){
      console.log(err);
    }
  }



  return (
    <>
      <div className="containerr rounded-md pt-24">

        <h1 className="text-3xl font-semibold text-center mb-5">My Profile </h1>

        <div>
          <div className="flex justify-center relative mb-5">
            <img
              className="rounded-full w-40 h-40 sm:w-52 sm:h-52 object-cover border-solid border-2 border-orange-700 cursor-pointer"
              alt="user pic"
              src={avatar}
            />
          </div>
          <div className="border-b-2 border-black/30"></div>
        </div>

        <div className="row flex">

          <div className="w-full sm:w-1/5 p-5">
            <ul className="space-y-3">
              <li className={`text-lg ${openTab == 1?"border-orange-700 border-2":"bg-orange-200 border-orange-200 border-2" } font-mono font-semibold text-orange-700 pl-5 py-2 cursor-pointer  rounded-xl hover:pl-8 duration-300`} onClick={() => setOpenTab(1)} > Profile</li>
              <li className={`text-lg ${openTab == 2? "border-orange-700 border-2":"bg-orange-200 border-orange-200 border-2"} font-mono font-semibold text-orange-700 pl-5 py-2 cursor-pointer  rounded-xl hover:pl-8 duration-300`} onClick={() => setOpenTab(2)}>Your Orders</li>

              <li className="bg-orange-800 h-1 w-full rounded-full"></li>
              <li className={`text-base ${"bg-orange-100 border-orange-200 border-2"} font-mono font-semibold text-orange-700 pl-5 py-2 cursor-pointer  rounded-xl hover:pl-8 duration-300 hover:border-black hover:text-white hover:bg-black`}>
                <i className="fas fa-repeat"></i> Update Profile
              </li>
              {  user!=null && user.googleId==null &&
                <li onClick={()=>setChangePasswordModel(true)} className={`text-base ${"bg-orange-100 border-orange-200 border-2"} font-mono font-semibold text-orange-700 pl-5 py-2 cursor-pointer  rounded-xl hover:pl-8 duration-300 hover:border-black hover:text-white hover:bg-black`}>
                  Change Password
                </li>
              }
              <li onClick={()=>handleLogout()} className={`text-base ${"bg-orange-100 border-orange-200 border-2"} font-mono font-semibold text-orange-700 pl-5 py-2 cursor-pointer  rounded-xl hover:pl-8 duration-300 hover:border-black hover:text-white hover:bg-black`}>LogOut</li>
            </ul>
          </div>

          {/* profile module  */}
          <div className={`${openTab === 1 ? "block" : "hidden"} w-full sm:w-4/5 p-5`} >

            <div className="mb-2 shadow-md rounded-tl-3xl rounded-br-3xl bg-orange-700 bg-opacity-40 ">
              <h1 className="text-2xl font-normal text-white capitalize border-b-4 border-yellow-300 p-5">
                Your profile
              </h1>
              <div className="bg-orange-200 pl-5 rounded-br-3xl">
                <table className="table-auto border-spacing-y-3 border-separate">
                  <tr className="">
                    <td className="text-orange-500 text-lg text-semibold pr-5 w-1/6">
                      Name
                    </td>
                    <td className="text-slate-500 font-semibold capitalize  bg-orange-50 w-full md:w-5/6 bg-opacity-20 p-2 rounded">
                      {user != null ? user?.name : ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-orange-500 text-lg text-semibold pr-5 ">
                      Mobile No.
                    </td>
                    <td className="text-slate-500 font-semibold capitalize bg-orange-50  w-full md:w-5/6 bg-opacity-20 p-2 rounded ">
                      {user != null ? user?.name : ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-orange-500 text-lg text-semibold pr-5">
                      E-mail
                    </td>
                    <td className="text-slate-500 font-semibold bg-orange-50  w-full md:w-5/6 bg-opacity-20 p-2 rounded ">
                      {user != null ? user?.email : ""}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            
            <div className="mb-2 shadow-md rounded-bl-3xl rounded-tr-3xl bg-orange-700 bg-opacity-40 ">
              <h1 className="text-2xl font-normal text-white capitalize border-b-4 border-yellow-300 p-5">
                Your Address
              </h1>
              <div className="bg-orange-200 pl-5 py-5 rounded-bl-3xl">
                <Addresses /> 
              </div>
            </div> 

          </div>
          {/* order module  */}
          <div className={`${openTab === 2 ? "block" : "hidden"} w-full sm:w-4/5 p-5`}>
             <OrderComponent/>
          </div>
        </div>

        {/* update profile component */}
        {/* {updateProfile ? (
          <UpdateProfileDetails setupdateProfile={setupdateProfile} />
        ) : null} */}

        {/* change password component  */}
        {changePasswordModel? (
          <ChangePasswordPopUp showModal={changePasswordModel} setShowModal={setChangePasswordModel} />
        ) : null}
      </div>
    </>
  );
};

export default Profile;
