import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
// import swal from "sweetalert";
import { HiOutlineLocationMarker } from "react-icons/hi";
// import { FiEdit, FiTrash2 } from "react-icons/fi";
import AddAddressPopUp from "./AddAddressPopUp";

// import { set, useForm } from "react-hook-form";


// import InlineButtonLoader from "./InlineButtonLoader";
// import { toast } from "react-toastify";

const Addresses = () => {


    const user = useSelector((state) => state.userData.user);

    const [showModal, setShowModal] = useState(false);
    const [address, setaddress] = useState(null);

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



    //   const handelChangeAddress = async (e) => {
    //     e.preventDefault();
    //     setIsValidLoading(true);
    //     try {
    //       const response = await axios.put(
    //         `${process.env.REACT_APP_BASEURL}/user/editAddress`,
    //         {
    //           itemId: changeAddress,
    //           userId: user._id,
    //           area: address,
    //           city: city,
    //           state: state,
    //           pincode: pincode,
    //         }
    //       );
    //       console.log(response.data);
    //       dispatch(userData(response.data.response));
    //       localStorage.setItem(
    //         "userData",
    //         JSON.stringify(response?.data?.response)
    //       );
    //       setaddress("");
    //       setCity("");
    //       setState("");
    //       setPincode("");
    //       setChangeAddress("");
    //       swal("Address changed successfully", "", "success");
    //       setIsValidLoading(false);
    //     } catch (err) {
    //       if (err.response.status == 500) {
    //         swal(`${err.response.data.message}`, "", "error");
    //       }
    //       setIsValidLoading(false);
    //     }
    //   };

    //   const handleDelete = (ids) => {
    //     swal({
    //       title: "Are you sure! you want to delete this address?",
    //       icon: "warning",
    //       buttons: ["NO", "YES"],
    //       cancelButtonColor: "#DD6B55",
    //       confirmButtonColor: "#DD6B55",
    //       dangerMode: true,
    //     }).then(async (willDelete) => {
    //       if (willDelete) {
    //         addressDelete(ids);
    //       }
    //     });
    //   };

    //   const addressDelete = async (id) => {
    //     try {
    //       const response = await axios.get(
    //         `${process.env.REACT_APP_BASEURL}/user/delteAddress?userId=${user._id}&itemId=${id}`
    //       );
    //       dispatch(userData(response.data.response));
    //       localStorage.setItem(
    //         "userData",
    //         JSON.stringify(response?.data?.response)
    //       );
    //     //   toast.success("🔥Address deleted successfully.");
    //     } catch (err) {
    //       if (err) {
    //         swal("something went wrong", "", "error");
    //       }
    //     }
    //   };


    return (
        <div>
            <div className="flex flex-wrap gap-2 justify-center">
                {address != null ? (
                    address.map((address, i) => (
                        <div className=" w-full md:w-[32%] sm:w-[49%] flex shadow-black hover:shadow-xl bg-orange-100 p-3 rounded-3xl">
                            <div className="flex flex-row w-full sm:block justify-between">
                                <div className="flex flex-col">
                                    <HiOutlineLocationMarker className="text-center" />
                                    <p className="font-semibold text-xl">Address {i + 1}</p>
                                    <p className="w-10/12 font-[350] text-slate-500">
                                        {address.streetName + " " +address.area +" " +address.city +" " +address.state +"-" +address.pincode}
                                    </p>
                                    <p className="font-semibold text-sm uppercase py-5 ">
                                        16 mins
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : <></>
                }

                <AddAddressPopUp showModal={showModal} setShowModal={setShowModal} setaddress={setaddress} />
            </div>


        </div>
    );
};

export default Addresses;
