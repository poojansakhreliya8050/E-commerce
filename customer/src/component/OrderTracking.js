import React from 'react'
import pendingIcon from '../images/icons/pending.gif'
import dispatchIcon from '../images/icons/dispatch.gif'
import scooterIcon from '../images/icons/delivery-scooter.png'
import deliveredIcon from '../images/icons/delivered.png'

const OrderTracking = ({ status }) => {
    // console.log(status);
    return (

        <div className="w-full py-6">
            <div className="flex">

                {
                    status == "cancelled" ? 
                    <div class="ml-44 py-4 center rounded-lg bg-red-500 px-6 align-baseline font-sans text-xl font-bold uppercase  text-black">
                        <button class="mt-px" >Order Cancelled</button>
                    </div> :

                        <>
                            <div className="w-1/4">
                                <div className="relative mb-2">
                                    <div className="w-10 h-10 mx-auto bg-green-500 rounded-full text-lg text-white flex items-center">
                                        <span className="text-center text-white w-full">

                                            <img className="w-full fill-current" src={pendingIcon} width="24" height="24" />

                                        </span>
                                    </div>
                                </div>

                                <div className="text-xs text-center md:text-base">Pending</div>
                            </div>

                            <div className="w-1/4">

                                <div className="relative mb-2">

                                    {
                                        status == "pending" ?
                                            <div className="absolute flex align-center items-center align-middle content-center" style={{ "width": "calc(100% - 2.5rem - 1rem)", "top": "50%", "transform": "translate(-50%, -50%)" }}>
                                                <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                                    <div className="w-0 bg-green-300 py-1 rounded" style={{ "width": "40%" }}></div>
                                                </div>
                                            </div> :
                                            <div className="absolute flex align-center items-center align-middle content-center" style={{ "width": "calc(100% - 2.5rem - 1rem)", "top": "50%", "transform": "translate(-50%, -50%)" }}>
                                                <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                                    <div className="w-0 bg-green-300 py-1 rounded" style={{ "width": "100%" }}></div>
                                                </div>
                                            </div>
                                    }

                                    <div className="w-10 h-10 mx-auto bg-green-500 rounded-full text-lg text-white flex items-center">
                                        <span className="text-center text-white w-full">
                                            <img className="w-full fill-current" src={dispatchIcon} width="24" height="24" />

                                        </span>
                                    </div>
                                </div>

                                <div className="text-xs text-center md:text-base">Dispatched</div>
                            </div>

                            <div className="w-1/4">
                                <div className="relative mb-2">
                                    {
                                        status == "pending" ?
                                            <div className="absolute flex align-center items-center align-middle content-center" style={{ "width": "calc(100% - 2.5rem - 1rem)", "top": "50%", "transform": "translate(-50%, -50%)" }}>
                                                <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                                    <div className="w-0 bg-green-300 py-1 rounded" style={{ "width": "0%" }}></div>
                                                </div>
                                            </div> : <div className="absolute flex align-center items-center align-middle content-center" style={{ "width": "calc(100% - 2.5rem - 1rem)", "top": "50%", "transform": "translate(-50%, -50%)" }}>
                                                <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                                    <div className="w-0 bg-green-300 py-1 rounded" style={{ "width": "100%" }}></div>
                                                </div>
                                            </div>
                                    }

                                    {
                                        status == "dispatched" ?
                                            <div className="absolute flex align-center items-center align-middle content-center" style={{ "width": "calc(100% - 2.5rem - 1rem)", "top": "50%", "transform": "translate(-50%, -50%)" }}>
                                                <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                                    <div className="w-0 bg-green-300 py-1 rounded" style={{ "width": "40%" }}></div>
                                                </div>
                                            </div> : <></>
                                    }

                                    <div className="w-10 h-10 mx-auto bg-white border-2 border-gray-200 rounded-full text-lg text-white flex items-center">
                                        <span className="text-center text-gray-600 w-full">
                                            <img className="w-full fill-current" src={scooterIcon} width="20" height="20" />
                                        </span>
                                    </div>
                                </div>

                                <div className="text-xs text-center md:text-base">On the way</div>
                            </div>

                            <div className="w-1/4">
                                <div className="relative mb-2">


                                    {

                                        status == "delivered" ?
                                            <div className="absolute flex align-center items-center align-middle content-center" style={{ "width": "calc(100% - 2.5rem - 1rem)", "top": "50%", "transform": "translate(-50%, -50%)" }}>
                                                <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                                    <div className="w-0 bg-green-300 py-1 rounded" style={{ "width": "100%" }}></div>
                                                </div>
                                            </div> : <div className="absolute flex align-center items-center align-middle content-center" style={{ "width": "calc(100% - 2.5rem - 1rem)", "top": "50%", "transform": "translate(-50%, -50%)" }}>
                                                <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                                    <div className="w-0 bg-green-300 py-1 rounded" style={{ "width": "0%" }}></div>
                                                </div>
                                            </div>
                                    }
                                    {
                                        status == "ontheway" ?
                                            <div className="absolute flex align-center items-center align-middle content-center" style={{ "width": "calc(100% - 2.5rem - 1rem)", "top": "50%", "transform": "translate(-50%, -50%)" }}>
                                                <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                                    <div className="w-0 bg-green-300 py-1 rounded" style={{ "width": "40%" }}></div>
                                                </div>
                                            </div> : <></>
                                    }

                                    <div className="w-10 h-10 mx-auto bg-white border-2 border-gray-200 rounded-full text-lg text-white flex items-center">
                                        <span className="text-center text-gray-600 w-full">
                                            <img className="w-full fill-current" src={deliveredIcon} width="24" height="24" />

                                        </span>
                                    </div>
                                </div>

                                <div className="text-xs text-center md:text-base">Delivered</div>
                            </div>

                        </>
                }


            </div>
        </div>
    )
}

export default OrderTracking