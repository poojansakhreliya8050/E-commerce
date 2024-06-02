import React,{useEffect} from 'react'
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useForm} from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";



const AddAddressPopUp = ({ showModal, setShowModal, setaddress,isUpdate,setIsUpdate,addressId,setAddressId}) => {
  // console.log(addressId);
  const { register, handleSubmit, reset } = useForm();
  const user = useSelector((state) => state.userData.user);
  
  const handleSubmitForAddress = async (data) => {
    try {
      if (user != null && user.accessToken != null) {
        console.log(data);
        const addresses = await axios.post(`${process.env.REACT_APP_URL}/api/v1/address/createAddress`, { ...data, "userId": user.userdata._id }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        })
        console.log(addresses)
        setaddress(addresses.data.address);
        setShowModal(false);
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateAddress = async (data) => {
    try {
      if (user != null && user.accessToken != null) {
        console.log(data,user.userdata._id,addressId);
        const addresses = await axios.put(`${process.env.REACT_APP_URL}/api/v1/address/updateAddress`, { ...data, "userId": user.userdata._id,addressId}, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        })
        console.log(addresses)
        setaddress(addresses.data.address);
        setAddressId(null)
        setShowModal(false);
        setIsUpdate(false);
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            if (isUpdate==true && addressId!= null ) {
                const addresses = await axios.get(`${process.env.REACT_APP_URL}/api/v1/address/getAddressByAddressId/${addressId}`);
                console.log(addresses);
                reset(addresses.data.address);
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData(); 
}, []);

  return (
    <div className="w-full md:w-[32%] sm::w-[49%] flex shadow-black hover:shadow-xl  bg-orange-100 p-3 rounded-3xl">

      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto md:w-1/3">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {isUpdate==true?"Update Address":"Add New Address"}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setAddressId(null);
                      setIsUpdate(false);
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
                    <label htmlFor="street">Street Name</label>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                      <span className="z-10 h-full leading-snug font-normal text-center flex  text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                        <i className="fas fa-location"></i>
                      </span>
                      <input
                        type="text"
                        id="street"
                        placeholder="Enter your street name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10"
                        {...register("streetName", { required: true })}
                      ></input>
                    </div>

                    <label htmlFor="area">Area</label>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                      <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                        <i className="fas fa-map"></i>
                      </span>
                      <input
                        type="text"
                        placeholder="Your area name"
                        id="area"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10"
                        {...register("area", { required: true })}
                      />
                    </div>

                    <label htmlFor="city">City</label>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                      <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                        <i className="fas fa-map"></i>
                      </span>
                      <input
                        type="text"
                        id="city"
                        placeholder="Your city name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10"
                        {...register("city", { required: true })}
                      />
                    </div>

                    <label htmlFor="state">state</label>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                      <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                        <i className="fas fa-map"></i>
                      </span>
                      <input
                        type="text"
                        id="state"
                        placeholder="Your state name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10"
                        {...register("state", { required: true })}

                      />

                    </div>

                    <label htmlFor="pincode">Pincode</label>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                      <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                        <i className="fas fa-location"></i>
                      </span>
                      <input
                        type="number"
                        maxLength={6}
                        placeholder="Enter picode"
                        id="pincode"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10"
                        {...register("pincode", { required: true })}

                      />
                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      {isUpdate?
                      <button
                        type="button"
                        className={`"hover:bg-white hover:text-black w-full bg-orange-500 text-white p-2 rounded-lg hover:border duration-200 border border-gray-300`}
                        onClick={handleSubmit(handleUpdateAddress)}>Update Address
                      </button>:
                      <button
                        type="button"
                        className={`"hover:bg-white hover:text-black w-full bg-orange-500 text-white p-2 rounded-lg hover:border duration-200 border border-gray-300`}
                        onClick={handleSubmit(handleSubmitForAddress)}>Save Address
                      </button>
                     }
                    </div>

                  </form>
                </div>

              </div>
            </div>
          </div>
          {/* <div className="opacity-25 fixed inset-0 z-40 bg-black"></div> */}
        </>
      )}
    </div>

  )
}

export default AddAddressPopUp