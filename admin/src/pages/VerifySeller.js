import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const VerifySeller = () => {
    const { status } = useParams()
    const [seller, setSeller] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (status === 'pending')
                    response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/seller/fetchAllPendingSeller`)
                else if (status === 'approved')
                    response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/seller/fetchAllApprovedSeller`)
                else if (status === 'rejected')
                    response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/seller/fetchAllRejectedSeller`)
                setSeller(response.data)
                console.log(response.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData()
    }, [status])

    return (
        <div>
            VerifySeller {status}
            <div class="flex h-screen w-auto items-center justify-center bg-indigo-50 px-4">


                {
                    seller && seller.map((seller) => (
                        <div class="w-2/3 h-52 cursor-pointer overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:scale-105 hover:shadow-xl">
                            <div class="lg:flex shadow rounded-lg border  border-gray-400 h-full">
                                <div class=" rounded-lg lg:w-2/12 py-4 h-full shadow-inner ml-6 w-1/5">
                                    <img src={seller.brandImg} alt="" className="w-32 h-32 object-cover rounded-lg" />
                                </div>

                                <div class="w-4/5 h-full lg:w-4/5 xl:w-4/5 px-1 bg-white py-5 lg:px-2 lg:py-2 tracking-wide ">
                                    <div class="flex justify-between">
                                        <div class={` ${status == "pending" ? 'bg-yellow-500' : ''} ${status == "approved" ? 'bg-green-500' : ''} ${status == "rejected" ? 'bg-red-500' : ''} mb-2 ml-2 center relative inline-block select-none whitespace-nowrap rounded-lg  py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-black`}>
                                            <button class="mt-px" >{status.toUpperCase()} SELLER</button>
                                        </div>
                                    </div>
                                    <div class="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
                                        <h1 className="text-lg font-semibold">Brand Name : {seller.brandName} </h1>
                                    </div>
                                    <div class="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
                                        Owner Name : {seller.brandOwnerName}
                                    </div>

                                    <div className=" flex justify-around my-2 w-4/5">
                                        {
                                            status === 'pending' &&
                                            <>
                                                <button className="hover:bg-red-600 mt-5 uppercase text-sm font-bold tracking-wide bg-gray-600 text-gray-100 p-3 rounded-lg  focus:outline-none focus:shadow-outline">
                                                    Reject
                                                </button>
                                                <button className="hover:bg-green-600 mt-5 uppercase text-sm font-bold tracking-wide bg-gray-600 text-gray-100 p-3 rounded-lg  focus:outline-none focus:shadow-outline">
                                                    Approve
                                                </button>
                                            </>
                                        }
                                        {
                                            status === 'approved' &&
                                            <button className="hover:bg-red-600 mt-5 uppercase text-sm font-bold tracking-wide bg-gray-600 text-gray-100 p-3 rounded-lg  focus:outline-none focus:shadow-outline">
                                                Reject
                                            </button>
                                        }
                                        {
                                            status === 'rejected' &&
                                            <button className="hover:bg-green-600 mt-5 uppercase text-sm font-bold tracking-wide bg-gray-600 text-gray-100 p-3 rounded-lg  focus:outline-none focus:shadow-outline">
                                                Approve
                                            </button>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default VerifySeller