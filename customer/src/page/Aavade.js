import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
export const Aavade = () => {

  const categories = [
    {
      "categoryTitle": "Electronics",
      "description": "Explore a wide range of electronic gadgets, appliances, and accessories."
    },
    {
      "categoryTitle": "Clothing & Accessories",
      "description": "Discover trendy fashion apparel, footwear, and accessories for all occasions."
    },
    {
      "categoryTitle": "Home & Kitchen",
      "description": "Find everything you need to furnish your home and enhance your kitchen."
    },
    {
      "categoryTitle": "Beauty & Personal Care",
      "description": "Shop for skincare, haircare, and personal grooming products for a radiant look."
    },
    {
      "categoryTitle": "Books & Stationery",
      "description": "Dive into a world of knowledge with our extensive collection of books and stationery."
    },
    {
      "categoryTitle": "Sports & Outdoors",
      "description": "Equip yourself for your favorite sports and outdoor adventures."
    },
    {
      "categoryTitle": "Toys & Games",
      "description": "Browse through a variety of toys and games for children of all ages."
    },
    {
      "categoryTitle": "Health & Wellness",
      "description": "Take care of your health and wellness with our selection of supplements and wellness products."
    },
    {
      "categoryTitle": "Automotive",
      "description": "Find automotive parts, accessories, and tools for your vehicle maintenance needs."
    },
    {
      "categoryTitle": "Pet Supplies",
      "description": "Spoil your furry friends with our range of pet supplies and accessories."
    }
  ]

  const { register, handleSubmit } = useForm();
  const onSubmit = async (file) => {
    console.log(file);
    const formData = new FormData();
    formData.append('image', file.image[0]);
    formData.append('categoryTitle', file.categoryTitle);
    formData.append('description', file.description);

    const data = await axios.post(`${process.env.REACT_APP_URL}/api/v1/category/addCategory`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    console.log(data);
  }
  const item=categories[2]

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input value={item.categoryTitle} type="text" {...register('categoryTitle')} placeholder="categoryTitle" />
          <input value={item.description} type="text" {...register('description')} placeholder="Description" />
          <input type='file' {...register("image",)} />
          <button>Submit</button>
        </form>
    </div>
  )
}
