import React, { useEffect,useState} from 'react'
import { useForm } from "react-hook-form";

const BrandInfo = ({ setTabOpen, brandInfo, setBrandInfo,brandImage, setBrandImage }) => {

    const [selectedFile, setSelectedFile] = useState();
    const [checkFile, setCheckFile] = useState(false);

    const imageHandler = (e) => {
        setBrandImage(e.target.files[0])
        setSelectedFile(e.target.files[0]);
        setCheckFile(true);
    }


    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleBrandInfo = (data) => {
        console.log(data);
        if (!errors.brandName && !errors.address && !errors.area && !errors.pincode && !errors.city && !errors.state && !errors.ownerName) {
            setTabOpen(2);
            setBrandInfo(data);
            // console.log(brandInfo);
        }
    }
    //reset form-hook-form on alredy filled data
    useEffect(() => {
        console.log(brandInfo);
        if (brandInfo != null) {
            reset(brandInfo);
        }
        if(brandImage!=null){
            setSelectedFile(brandImage);
        }
    }, []);
    return (
        <div className="w-full sm:w-3/4">

            <form className="lg:px-16 lg:py-10 p-5 bg-slate-200 lg:w-10/12 hover:shadow-2xl duration-300 shadow-lg lg:mx-10 rounded-2xl my-5">
                <h1 className="font-bold text-2xl">&bull; Brand Details</h1>
                <h3 className="text-slate-500 mb-10 pl-5 text-xs">
                    Name, Address and location
                </h3>
                <div className="flex flex-wrap mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Brand name
                        </label>
                        <input
                            className="appearance-none duration-300 focus:shadow-2xl block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                            id="grid-first-name"
                            type="text"
                            placeholder="Brand name"
                            {...register('brandName', { required: true })}
                        />
                        <span className="text-sm text-red-500">
                            {errors.brandName && errors.brandName.type === "required" && <span>This is required</span>}
                        </span>
                    </div>
                </div>
                <div className="flex flex-wrap mb-2">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Upload Brand photo
                        </label>
                        <div className="mt-4">
                            <label className="block">
                                <span className="sr-only">Choose profile photo</span>
                                <div className="w-[320px] grid gap-2">
                                    <div className="h-24 cursor-pointer relative flex justify-center items-center border-2 rounded-md bg-gray-200">
                                        <input type="file" name="image" onChange={imageHandler} className="z-20 opacity-0 cursor-pointer h-full w-full" />
                                        <div className="absolute flex justify-center items-center gap-2">
                                            <img className={`h-20 w-20 rounded-full `} src={selectedFile ? URL.createObjectURL(selectedFile) : null} />
                                            <span className="text-[16px] w-56 truncate">{checkFile ? selectedFile.name : 'choose a file'}</span>
                                        </div>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Address
                        </label>
                        <textarea
                            className="appearance-none duration-300 focus:shadow-2xl block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                            type="text"
                            placeholder="Address"
                            {...register('streetName', { required: true })}
                        />
                        <span className="text-sm text-red-500">
                            {errors.address && errors.address.type === "required" && <span>This is required</span>}
                        </span>
                    </div>
                </div>
                <h1 className="font-bold text-2xl">
                    &bull; Brand address details
                </h1>
                <h3 className="text-slate-500 mb-5 pl-5 text-xs">
                    Address details are basis the restaurant location mentioned
                    above
                </h3>
                <div className="flex flex-wrap mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Area
                        </label>
                        <input
                            className="appearance-none duration-300 focus:shadow-2xl block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                            id="grid-first-name"
                            type="text"
                            placeholder="Area"
                            {...register('area', { required: true })}

                        />
                        <span className="text-sm text-red-500">
                            {errors.area && errors.area.type === "required" && <span>This is required</span>}
                        </span>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Pin code
                        </label>
                        <input
                            className="appearance-none duration-300 focus:shadow-2xl block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                            id="grid-first-name"
                            type="text"
                            placeholder="Pin code"
                            {...register('pincode', { required: true, pattern: { value: /^\d{6}$/, message: 'Invalid Pincode' } })}
                        />
                        <span className="text-sm text-red-500">
                            {errors.pincode && errors.pincode.type === "required" && <span>This is required</span>}
                            {errors.pincode && errors.pincode.type === "pattern" && <span>Invalid Pincode</span>}
                        </span>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            City
                        </label>
                        <input
                            className="appearance-none block duration-300 focus:shadow-2xl w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                            id="grid-first-name"
                            type="text"
                            placeholder="City"
                            {...register('city', { required: true })}

                        />
                        <span className="text-sm text-red-500">
                            {errors.city && errors.city.type === "required" && <span>This is required</span>}

                        </span>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            State
                        </label>
                        <input
                            className="appearance-none duration-300 block focus:shadow-2xl w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                            id="grid-first-name"
                            type="text"
                            placeholder="State"
                            {...register('state', { required: true })}

                        />
                        <span className="text-sm text-red-500">
                            {errors.state && errors.state.type === "required" && <span>This is required</span>}

                        </span>
                    </div>
                </div>
                <h1 className="font-bold text-2xl">
                    &bull; Brand Owner name
                </h1>
                <h3 className="text-slate-500 mb-5 pl-5 text-xs">
                    Your Customer will call on this name for general enquiries
                </h3>
                <div className="flex flex-wrap mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Brand Owner name
                        </label>
                        <input
                            className="appearance-none duration-300 focus:shadow-2xl block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"

                            type="text"
                            id="name"
                            placeholder="Owner full name"
                            {...register('brandOwnerName', { required: true })}

                        />
                        <span className="text-sm text-red-500">
                            {errors.ownerName && errors.ownerName.type === "required" && <span>This is required</span>}
                        </span>
                        <div className="flex justify-end pt-12">
                            <button onClick={handleSubmit(handleBrandInfo)} className={`hover:bg-white hover:text-black md:w-1/3 w-full bg-black text-white p-2 rounded-lg mt-4 hover:border duration-200 border border-gray-300`}>
                                save and Next {">"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default BrandInfo