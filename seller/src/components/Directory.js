import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import HowToSell from "./HowToSell";
import WhyChoose from "./WhyChoose";

const Directory = () => {
    const [sellerData,setSellerData]=useState(null);
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    console.log(user);
    const dispatch = useDispatch();

        //fetch seller data using useEffect
       useEffect(() => {
        const fetchData = async () => {
            try {
                if (user != null) {
                const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/seller/fetchSellerByUserId/${user._id}`);
                console.log(response);
                setSellerData(response.data);
                }
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData(); // call the function to fetch data when the component mounts
    }, [user?._id]);




    const checkMark = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25"
            height="25"
            viewBox="0 0 48 48"
        >
            <linearGradient
                id="I9GV0SozQFknxHSR6DCx5a_70yRC8npwT3d_gr1"
                x1="9.858"
                x2="38.142"
                y1="9.858"
                y2="38.142"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0" stopColor="#21ad64"></stop>
                <stop offset="1" stopColor="#088242"></stop>
            </linearGradient>
            <path
                fill="url(#I9GV0SozQFknxHSR6DCx5a_70yRC8npwT3d_gr1)"
                d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
            ></path>
            <path
                d="M32.172,16.172L22,26.344l-5.172-5.172c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l8,8c0.781,0.781,2.047,0.781,2.828,0l13-13c0.781-0.781,0.781-2.047,0-2.828L35,16.172	C34.219,15.391,32.953,15.391,32.172,16.172z"
                opacity=".05"
            ></path>
            <path
                d="M20.939,33.061l-8-8c-0.586-0.586-0.586-1.536,0-2.121l1.414-1.414c0.586-0.586,1.536-0.586,2.121,0	L22,27.051l10.525-10.525c0.586-0.586,1.536-0.586,2.121,0l1.414,1.414c0.586,0.586,0.586,1.536,0,2.121l-13,13	C22.475,33.646,21.525,33.646,20.939,33.061z"
                opacity=".07"
            ></path>
            <path
                fill="#fff"
                d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0	L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414l-13,13	C22.317,33.098,21.683,33.098,21.293,32.707z"
            ></path>
        </svg>
    );

    return (
        <div>

            <div className="relative h-screen w-screen">
                <img
                    className="h-4/6 w-full object-cover"
                    src="https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&h=300&q=80"
                    alt="img"
                />

                <div className="absolute flex justify-center top-40 sm:left-[40px] md:left-[400px] space-y-3">
                    <p className="text-4xl text-black ">
                        Become an BuyBazar seller
                    </p>
                    <p className=" text-xl text-slate-600 font-light">
                        and get more customers!
                    </p>

                    <div className="absolute bg-gray-200 top-72 left-0 w-full h-fit rounded-md shadow-md p-10">
                        <div className="pb-10 space-y-2">
                            <h1 className="text-center text-3xl text-slate-800">
                                Get started with online ordering
                            </h1>
                            <h2 className="text-center text-slate-500">
                                Please keep the documents ready for a smooth signup
                            </h2>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="w-full sm:w-1/2 ">
                                <ul className="sm:pl-10 space-y-4">
                                    <li className="flex gap-2">{checkMark}PAN card copy</li>
                                    <li className="flex gap-2">{checkMark}GST Number</li>
                                </ul>
                            </div>
                            <div className="w-full sm:w-1/2 pt-5 sm:pt-0">
                                <ul className="space-y-4">
                                    <li className="flex gap-2">
                                        {checkMark}Add Products
                                    </li>
                                    <li className="flex gap-2">{checkMark}Bank account details</li>
                                </ul>
                            </div>
                        </div>
                        <div className="pt-5 flex justify-center">
                            {
                                user != null && sellerData==null?
                                    <Link to="/verifySeller" className="bg-yellow-500 text-white px-10 py-2 rounded-md">
                                        Start  Selling
                                    </Link> : <></>
                            }
                        </div>
                    </div>
                </div>

            </div>
            <WhyChoose />
            <HowToSell />

        </div>

    );
};

export default Directory;
