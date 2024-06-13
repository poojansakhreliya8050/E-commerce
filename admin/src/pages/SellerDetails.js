import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const SellerDetails = () => {
    let status = "rejected"

    const [seller, setSeller] = useState(null)
    const { userId } = useParams()
    console.log(userId);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userId != null) {
                    const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/seller/fetchSellerByUserId/${userId}`)
                    console.log(response.data)
                    setSeller(response.data)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }
        , [])


    return (
        <div className="flex flex-col h-screen bg-gray-100">

        {
            seller!=null &&
            <div className="flex-1 flex">

                <div className="flex-1 p-4">
                    <div class="flex justify-between">
                        <div class={` ${seller.statusOfVerify == "pending" ? 'bg-yellow-500' : ''} ${seller.statusOfVerify == "approved" ? 'bg-green-500' : ''} ${seller.statusOfVerify == "rejected" ? 'bg-red-500' : ''} mb-2 ml-2 center relative inline-block select-none whitespace-nowrap rounded-lg  py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-black`}>
                            <button class="mt-px" >{seller.statusOfVerify.toUpperCase()} SELLER</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 p-2">

                        <div className="bg-white p-4 rounded-md">
                            <h2 className="text-gray-500 text-lg font-semibold pb-1">Brand</h2>
                            <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px  mb-6"></div>
                            <div className="relative mb-5 flex h-24 w-40 cursor-pointer flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md transition-opacity hover:opacity-90">
                                <img
                                    alt="nature"
                                    className="h-full w-full object-cover object-center"
                                    src={seller.brandImg}
                                />
                            </div>
                            <div className="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
                                <h1 className="text-lg font-semibold">Brand Name : {seller.brandName} </h1>
                            </div>
                            <div className="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
                                Owner Name : {seller.brandOwnerName}
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-md">
                            <h2 className="text-gray-500 text-lg font-semibold pb-1">Address</h2>
                            <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>

                            <div className='w-full h-4/5 flex flex-col justify-evenly '>

                                <div className="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
                                    <h1 className="text-lg font-semibold">Street Name : {seller.address.streetName} </h1>
                                </div>
                                <div className="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
                                    <h1 className="text-lg font-semibold">Area : {seller.address.area} </h1>
                                </div>
                                <div className="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
                                    <h1 className="text-lg font-semibold"> City : {seller.address.city} </h1>
                                </div>
                                <div className="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
                                    <h1 className="text-lg font-semibold">State :  {seller.address.state} </h1>
                                </div>
                                <div className="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
                                    <h1 className="text-lg font-semibold">Pin code : {seller.address.pincode}  </h1>
                                </div>

                            </div>

                        </div>

                        <div className="bg-white p-4 rounded-md">
                            <h2 className="text-gray-500 text-lg font-semibold pb-4">Bank Details</h2>

                            <div className="my-1"></div>
                            <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>

                            <div className="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
                                <h1 className="text-lg font-semibold">Account Number : {seller.bankInfo.accountNumber} </h1>
                            </div>
                            <div className="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
                                Ifsc Number : {seller.bankInfo.ifscCode}
                            </div>
                            <div className="mb-5 text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
                                Account Type : {seller.bankInfo.accountType}
                            </div>

                            <div className="relative flex h-3/6 w-2/3 cursor-pointer flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md transition-opacity hover:opacity-90">
                                <img
                                    alt="nature"
                                    className="h-full w-full object-cover object-center"
                                    src={seller.bankInfo.passbookImg}
                                />
                            </div>


                        </div>

                        <div className="bg-white p-4 rounded-md">
                            <h2 className="text-gray-500 text-lg font-semibold pb-4">Pan Details</h2>

                            <div className="my-1"></div>
                            <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>

                            <div className="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
                                <h1 className="text-lg font-semibold">Pan Number :  {seller.panInfo.panNumber} </h1>
                            </div>
                            <div className="mb-5 text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
                                Pan Holder Name : {seller.panInfo.holderName}
                            </div>

                            <div className="relative flex h-3/6 w-2/3 cursor-pointer flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md transition-opacity hover:opacity-90">
                                <img
                                    alt="nature"
                                    className="h-full w-full object-cover object-center"
                                    src={seller.panInfo.panImg}
                                />
                            </div>


                        </div>

                        <div className="bg-white p-4 rounded-md">
                            <div className="my-1"></div>
                            <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>

                            <div className='w-full flex justify-around'>
                                <button className="hover:bg-red-600 mt-5 uppercase text-sm font-bold tracking-wide bg-gray-600 text-gray-100 p-3 rounded-lg  focus:outline-none focus:shadow-outline">
                                    Reject
                                </button>
                                <button className="hover:bg-green-600 mt-5 uppercase text-sm font-bold tracking-wide bg-gray-600 text-gray-100 p-3 rounded-lg  focus:outline-none focus:shadow-outline">
                                    Approve
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        }
            
        </div>
    )
}

export default SellerDetails