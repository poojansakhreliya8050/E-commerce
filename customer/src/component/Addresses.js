import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
// import swal from "sweetalert";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import AddAddressPopUp from "./AddAddressPopUp";

// import { set, useForm } from "react-hook-form";


// import InlineButtonLoader from "./InlineButtonLoader";
// import { toast } from "react-toastify";

const Addresses = () => {


    const user = useSelector((state) => state.userData.user);

    const [showModal, setShowModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [address, setaddress] = useState(null);
    const [addressId,setAddressId]=useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user != null && user.accessToken != null) {
                    const addresses = await axios.get(`${process.env.REACT_APP_URL}/api/v1/address/getAddress/${user.userdata._id}`);
                    console.log(addresses);
                    setaddress(addresses.data.address);
                }
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData(); // call the function to fetch data when the component mounts
    }, []);


  const handleDeleteAddress=async(addressId)=>{
    try {
        const userId=user.userdata._id;
        console.log(userId,addressId);
        if(user!=null && user.accessToken!=null && user.accessToken!="" && addressId!=null){
        const deleteAddress = await axios.delete(`${process.env.REACT_APP_URL}/api/v1/address/deleteAddress`, { data: { userId, addressId } });
        setaddress(deleteAddress.data.address);
    }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

    return (
        <div>
            <div className="flex flex-wrap gap-2 justify-center">
                {address != null ? (
                    address.map((address, i) => (
                        <div key={address._id} className=" w-full md:w-[32%] sm:w-[49%] flex shadow-black hover:shadow-xl bg-orange-100 p-3 rounded-3xl">
                            <div className="flex flex-row w-full sm:block justify-between">
                                <div className="flex flex-col">
                                    <HiOutlineLocationMarker className="text-center" />
                                    <p className="font-semibold text-xl">Address {i + 1}</p>
                                    <p className="w-10/12 font-[350] text-slate-500">
                                        {address.streetName + " " + address.area + " " + address.city + " " + address.state + "-" + address.pincode}
                                    </p>
                                    {/* <p className="font-semibold text-sm uppercase py-5 ">
                                        16 mins
                                    </p> */}

                                    <div className="mt-3 flex justify-evenly justify-items-center">
                                        <button type="button" class="h-10 w-10 rounded-lg  items-center gap-x-2  bg-transparent px-2 py-2 text-sm font-semibold text-gray-400 shadow-sm hover:bg-gray-400 hover:text-white" onClick={() => { setIsUpdate(true); setAddressId(address._id);setShowModal(true);}}>
                                            <FiEdit className="w-full h-full" />
                                        </button>

                                        <button type="button" class="h-10 w-10 rounded-lg  items-center gap-x-2  bg-transparent px-2 py-2 text-sm font-semibold text-red-400 shadow-sm hover:bg-gray-400 hover:text-white" onClick={() => {handleDeleteAddress(address._id) }}>
                                            <FiTrash2 className="w-full h-full" />
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))
                ) : <></>
                }


                <div className="py-2 flex-1">
                    <div className="w-full md:w-[32%] sm::w-[49%] flex shadow-black hover:shadow-xl  bg-orange-100 p-3 rounded-3xl">
                        <div className="flex flex-row w-full sm:block justify-between">
                            <HiOutlineLocationMarker className="text-center" />
                            <p className="font-semibold text-xl">Add New Address</p>
                            <button
                                className="w-[50%] text-center hover:bg-black text-black hover:text-white p-2 rounded-lg duration-200 border border-black uppercase mt-5"
                                type="button"
                                onClick={() => {setIsUpdate(false);setShowModal(true)}}>
                                add new
                            </button>
                            </div>
                        </div>
                    </div>


                { 
                    showModal &&
                    <AddAddressPopUp showModal={showModal} setShowModal={setShowModal} setaddress={setaddress} isUpdate={isUpdate} setIsUpdate={setIsUpdate} addressId={addressId} setAddressId={setAddressId}/>
                }
                </div>


            </div>
            );
};

            export default Addresses;
