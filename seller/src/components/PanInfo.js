import React from 'react'
import { useForm } from "react-hook-form";
import ImageUpload from './ImageUpload'

const PanInfo = ({ setTabOpen,setPanInfo,handleUpload,setPanImage}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handlePanInfo = (data) => {
        console.log(data);
        if(!errors.panno && !errors.panHolderName)
        {
           setPanInfo(data);
           handleUpload();
        }
    }
    return (
        <form className="lg:px-16 lg:py-10 p-5 bg-slate-200 hover:shadow-2xl duration-500 lg:w-10/12 shadow-lg lg:mx-10 rounded-2xl my-5">
            <h1 className="font-bold text-2xl">&bull; PAN detail</h1>
            <h3 className="text-slate-500 mb-10 pl-5 text-xs">
                Let us know where to diposit your money
            </h3>
            <div className="flex flex-wrap mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        PAN Number
                    </label>
                    <input
                        className="appearance-none duration-500 focus:shadow-2xl block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="grid-first-name"
                        type="text"
                        placeholder="PAN Number"
                        {...register('panNumber', { required: true,pattern:{value:/^[A-Z]{5}\d{4}[A-Z]{1}$/,message:"Invalid Pan Number"}})}
                    />
                    <span className="text-sm text-red-500">
                        {errors.panno && errors.panno.type === "required" && <span>This is required</span>}
                        {errors.panno && errors.panno.type === "pattern" && <span>{errors.panno.message}</span>}
                    </span>
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        PAN holder name
                    </label>
                    <input
                        className="appearance-none duration-500 focus:shadow-2xl block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="grid-last-name"
                        type="text"
                        placeholder="PAN holder name"
                        {...register('holderName', { required: true })}

                    />
                    <span className="text-sm text-red-500">
                        {errors.panHolderName && errors.panHolderName.type === "required" && <span>This is required</span>}
                    </span>
                </div>
            </div>
            <div className="flex flex-wrap mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Upload PAN card image
                    </label>
                    <div className="mt-4">
                        <label className="block">
                            <span className="sr-only">Choose PAN card image</span>
                            <ImageUpload setImage={setPanImage}/>
                        </label>
                    </div>
                </div>

            </div>
            <div className="flex justify-between pt-12">
                <button type='button' onClick={() => setTabOpen(2)} className={`hover:bg-white hover:text-black md:w-1/3 w-full bg-black text-white p-2 rounded-lg mt-4 hover:border duration-200 border border-gray-300`}>
                {"<"} Previous 
                </button>

                <button onClick={handleSubmit(handlePanInfo)} type='button' className={`hover:bg-white hover:text-black md:w-1/3 w-full bg-black text-white p-2 rounded-lg mt-4 hover:border duration-200 border border-gray-300`}>
                 Submit {">"}
                </button>
            </div>
        </form>
    )
}

export default PanInfo