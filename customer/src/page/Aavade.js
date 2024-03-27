import  axios  from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
export const Aavade = () => {
    const {register,handleSubmit}=useForm();
    const onSubmit= async(file)=>{
            const formData = new FormData();
            formData.append('image', file.image[0]);

            const data=await axios.post(`${process.env.REACT_APP_URL}/api/aavade`,formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
            console.log(data);
    }

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
                    <input type='file' {...register("image",)} />
                    <button>Submit</button>
        </form>
    </div>
  )
}
