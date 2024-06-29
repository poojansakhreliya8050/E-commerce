import React, { useState, useEffect } from "react";
import axios from "axios";
import SubCategorySlider from "../component/SubCategorySlider";
import Productcard from "../component/ProductCard";
import { useParams } from "react-router-dom";
import FilterHeader from "../component/FilterHeader";
import socket from "../config/socket";
import ProductSimmer from "../component/ProductSimmer";

const SubCategory = () => {
  const { categoryId } = useParams();
  const [subCategories, setSubCategories] = useState(null);
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [products, setProducts] = useState(null);
  const [filterData, setFilterData] = useState(null);
  console.log(filterData);
  console.log(products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (categoryId == undefined) {
          const response = await axios.get(
            `${process.env.REACT_APP_URL}/api/v1/product/fetchAllProduct`
          );
          console.log(response);
          setProducts(response.data);
          setSubCategories(null);
          setSubCategoryId(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); //call the function to fetch data when the component mounts
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (categoryId != undefined) {
          console.log(categoryId);
          const response = await axios.get(
            `${process.env.REACT_APP_URL}/api/v1/subCategory/fetchSubCategoryByCateroryId/${categoryId}`
          );
          console.log(response);
          setSubCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); //call the function to fetch data when the component mounts
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (categoryId != undefined) {
          const response = await axios.get(
            `${process.env.REACT_APP_URL}/api/v1/product/fetchAllProductByCategoryId/${categoryId}`
          );
          console.log(response);
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // call the function to fetch data when the component mounts
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (subCategoryId != null) {
          const response = await axios.get(
            `${process.env.REACT_APP_URL}/api/v1/product/fetchAllProductBySubCategoryId/${subCategoryId}`
          );
          console.log(response);
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); //call the function to fetch data when the component mounts
  }, [subCategoryId]);

  useEffect(() => {
    if (categoryId != undefined) {
      socket.emit("joinCategory", categoryId);

      socket.on("newProduct", (product) => {
        console.log(product);
        setProducts((prevProducts) => [...prevProducts, product]);
      });

      return () => {
        socket.emit("leaveCategory", categoryId);
        socket.off("newProduct");
      };
    }
  }, [categoryId]);

  return (
    <div className="mt-16">
      {subCategories != null && (
        <SubCategorySlider
          subCategories={subCategories}
          setSubCategoryId={setSubCategoryId}
        />
      )}
      <div className="flex flex-wrap justify-center">
        <FilterHeader
          filterData={filterData}
          products={products}
          setFilterData={setFilterData}
        />

        {products == null ? (
          Array(8)
            .fill()
            .map((_, index) => <ProductSimmer/>)
        ) : filterData != null && filterData.length != 0 ? (
          filterData.map((product) => (
            <Productcard key={product._id} product={product} />
          ))) :
          (
          products.map((product) => (
            <Productcard key={product._id} product={product} />
          ))
        )}

      </div>
    </div>
  );
};

export default SubCategory;
