import React,{useEffect} from 'react'
import { useForm } from "react-hook-form";
import ImageUpload from './ImageUpload';


const BankInfo = ({setTabOpen,bankInfo,setBankInfo}) => {
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const handleBankInfo = (data) => {
      console.log(data);
      if(!errors.accountno && !errors.confirmAccountno && !errors.accountType && !errors.ifscCode)
      {
      setTabOpen(3);
      setBankInfo(data);
      console.log(bankInfo);
      }
  }
  
  useEffect(() => {
      console.log(bankInfo);
      if(bankInfo!=null){
         reset(bankInfo);
      }
  }, []);
  return (
    <form className="lg:px-16 lg:py-10 p-5 bg-slate-200 hover:shadow-2xl duration-500 lg:w-10/12 shadow-lg lg:mx-10 rounded-2xl my-5">
              <h1 className="font-bold text-2xl">&bull; Bank details</h1>
              <h3 className="text-slate-500 mb-10 pl-5 text-xs">
                Let us know where to diposit your money
              </h3>
              <div className="flex flex-wrap mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Account number
                  </label>
                  <input
                    className="appearance-none duration-500 focus:shadow-2xl block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    id="grid-first-name"
                    type="text"
                    {...register('accountno', { required: true,pattern:{value:/^[0-9]{9,18}$/,message:"Invalid account number"}})}
                    placeholder="Bank account number"
                  />
                  <span className="text-sm text-red-500">
                  {errors.accountno && errors.accountno.type === "required" && <span>This is required</span>}
                  {errors.accountno && errors.accountno.type === "pattern" && <span>{errors.accountno.message}</span>}

                  </span>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Re-enter Account number
                  </label>
                  <input
                    className="appearance-none duration-500 focus:shadow-2xl block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    id="grid-last-name"
                    type="text"
                    placeholder="Re-enter account number"
                    {...register('confirmAccountno', { required: true,pattern:{value:/^[0-9]{9,18}$/,message:"Invalid account number"}})}
                  />

                  <span className="text-sm text-red-500">
                  {errors.confirmAccountno && errors.confirmAccountno.type === "required" && <span>This is required</span>}
                  {errors.confirmAccountno && errors.confirmAccountno.type === "pattern" && <span>{errors.confirmAccountno.message}</span>}
                  </span>
                </div>
                <div className="w-full lg:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Account type
                  </label>
                  <div className="relative">
                    <select
                      className="block duration-500 focus:shadow-2xl appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                      {...register('accountType', { required: true})}
                    >
                      <option value="">Select account type</option>
                      <option value="saving">Saving account</option>
                      <option value="current">Current account</option>
                    </select>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    IFSC code
                  </label>
                  <input
                    className="appearance-none duration-500 focus:shadow-2xl block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    id="grid-first-name"
                    type="text"
                    placeholder="Bank IFSC code"
                    {...register('ifscCode', { required: true,pattern:{value:/^[A-Z]{4}0[A-Z0-9]{6}$/,message:"Invalid ifsc code"}})}
                  />
                  <span className="text-sm text-red-500">
                  {errors.ifscCode && errors.ifscCode.type === "required" && <span>This is required</span>}
                  {errors.ifscCode && errors.ifscCode.type === "pattern" && <span>{errors.ifscCode.message}</span>}

                  </span>
                </div>
              </div>
              <div className="flex flex-wrap mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Upload passbook photo
                  </label>
                  <div className="mt-4">
                    <label className="block">
                      <span className="sr-only">Choose profile photo</span>
                      <ImageUpload/>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-12">
                <button type='button' onClick={() => setTabOpen(1)} className={`hover:bg-white hover:text-black md:w-1/3 w-full bg-black text-white p-2 rounded-lg mt-4 hover:border duration-200 border border-gray-300`}>
                {"<"} Previous 
                </button>

                <button type='button'  onClick={handleSubmit(handleBankInfo)} className={`hover:bg-white hover:text-black md:w-1/3 w-full bg-black text-white p-2 rounded-lg mt-4 hover:border duration-200 border border-gray-300`}>
                 Save and next {">"}
                </button>
            </div>
            </form>
  )
}

export default BankInfo