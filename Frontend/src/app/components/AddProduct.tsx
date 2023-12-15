"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useRouter } from 'next/router';
import { json } from "stream/consumers";
import axiosInstance from "../interceptors/axios";
import axios from "axios";
import { baseURL } from "../const/constant";
import Modal from "./Modal";
import { addProduct } from "../api/products";

interface ADDProductProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loadProducts: () => void;
}

const AddProduct: React.FC<ADDProductProps> = ({
  setModalOpen,
  loadProducts,
}) => {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [userId, setUserId] = useState("");
  const [company, setCompany] = useState("");
  const [image, setImages] = useState([]);
  // const [image, setImages] = useState<File[]>([]);
  const router = useRouter();

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      console.error("No images selected.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("userId", userId);
    formData.append("company", company);
    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }

    const success = await addProduct(formData);
    if (success) {
      loadProducts();
      setModalOpen(false);
    }
  };

  

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

  //   console.log(e.target.files,"-------------------ClientSide File")
  //   if (e.target.files) {
  //     const selectedImages = Array.from(e.target.files);
  //     setImages(selectedImages);
  //     console.log(selectedImages,"----------------selectedimages");
  //   }

  // };
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setImages(e.target.files);
  //   }
  // };

  // const addProduct = async (e: React.FormEvent) => {
  //   console.log("------nnnn-------------ClientSide File");

  //   e.preventDefault();
  //   if (!image) {
  //     console.error("No images selected.");
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append("name", name);
  //   formData.append("price", price);
  //   formData.append("category", category);
  //   formData.append("userId", userId);
  //   formData.append("company", company);
  //   // formData.append('image', image)

  //   // Append all selected files to FormData
  //   for (let i = 0; i < image.length; i++) {
  //     formData.append("image", image[i]);
  //   }
  //   // for (let i = 0; i < image.length; i++) {
  //   //   formData.append(`image${i + 1}`, image[i]);
  //   // }

  //   // const productImages = images.map((item,id) =>{
  //   //   return
  //   //   item.name;
  //   // })
  //   // console.log(productImages,"----IIIIIII")
  //   // console.log(userDataId)
  //   console.log(formData, "------nnnn-------------productformData File");

  //   try {
  //     const response = await axiosInstance.post("/add-product", formData);
  //     if (response.status === 200) {
  //       console.log("Product added successfully:", response.data);
  //       loadProducts();
  //       setModalOpen(false);
  //     } else {
  //       // setErrMsg(res.data.error);
  //       console.error("Error adding product:", response.data.error);
  //     }
  //   } catch (error) {
  //     console.error("Error adding product:", error);
  //   }

  //   // await  axios.get(`${baseURL}/get-product`).then(function(res) {

  //   //     if (res.status === 200 ) {

  //   //         setProducts(res.data.products)
  //   //         console.log(res.data.products)
  //   //         // console.log(authorization)

  //   //     } else {
  //   //         // setErrMsg(res.data.error);
  //   //         console.log(res.data.error)
  //   //     }

  //   // }).catch(err => {
  //   //     // setErrMsg(err.response.data.error)
  //   //     console.log(err.resopnse.data);
  //   // });
  // };

  return (
    <div className="grid place-items-center">
      <div className="text-center w-full">
        <h3 className="font-bold text-lg">Add New Product</h3>
        <div className="">
          <input
            value={name}
            type="text"
            placeholder="Enter Product Name"
            required
            onChange={(e) => setName(e.target.value)}
            className="my-5 input input-bordered w-full "
          />
          <input
            value={price}
            type="number"
            placeholder="Enter Product Price"
            required
            onChange={(e) => setPrice(e.target.value)}
            className=" my-5 input input-bordered w-full "
          />
          <input
            value={category}
            type="text"
            placeholder="Enter Product category"
            required
            onChange={(e) => setCategory(e.target.value)}
            className="input input-bordered w-full my-5"
          />
          <input
            value={userId}
            placeholder="Enter userId"
            required
            onChange={(e) => setUserId(e.target.value)}
            className="input input-bordered w-full my-5"
          />
          {/* <input
             value={ProductId}
            placeholder='Enter ProductId'
            required
            onChange={(e) => setProductId(e.target.value)}
            className='input input-bordered w-full my-5'
            /> */}
          <input
            type="text"
            value={company}
            placeholder="Enter Product Company Name"
            required
            onChange={(e) => setCompany(e.target.value)}
            className="input input-bordered w-full my-5"
          />
          <input
            type="file"
            multiple
            required
            // onChange={handleImageChange}
            onChange={(e) => setImages(e.target.files)}
            className="input input-bordered w-full my-5"
          />

          <button type="submit" onClick={handleAddProduct} className="btn my-2">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
