import React, { useState } from 'react';
import Modal from './Modal';
import axiosInstance from '../interceptors/axios';
import { useRouter } from 'next/navigation';
import { updateProduct } from '../api/products';


interface UpdateProductProps {
  productToEdit: any; // Define the type for productToEdit
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loadProducts:()=> void;
}
const UpdateProduct :React.FC<UpdateProductProps> =  ({productToEdit, setModalOpen,loadProducts} ) => {

 
  const [name, setName] = useState(productToEdit.name);
  const [price, setPrice] = useState(productToEdit.price);
  const [category, setCategory] = useState(productToEdit.category);
  const [userId, setUserId] = useState(productToEdit.userId);
  const [company, setCompany] = useState(productToEdit.company);

  const router = useRouter()

  const handleUpdate = async () => {

     const updatedProductData = {
      _id: productToEdit._id,
      name,
      price,
      category,
      userId,
      company,
    };

    const success = await updateProduct(productToEdit._id, updatedProductData);
    if (success) {
      loadProducts();
      setModalOpen(false);
    }
    // try {
    //   const response = await axiosInstance.put(`/update-product/${updatedProductData._id}`, updatedProductData);
    //   if (response.status === 200) {
    //     console.log('Product updated successfully:', response.data.products);
    //     loadProducts();
    //     setModalOpen(false);
    //     // router.refresh();
    //   } else {
    //     console.error('Error updating product:', response.data.error);
    //   }
    // } catch (error) {
    //   console.error('Error updating product:', error);
    // }
    // Call your API endpoint to update the product using updatedProduct state
    // Example API call using axios:
    // axios.put(`/update-product/${updatedProduct._id}`, updatedProduct)
    //   .then((response) => {
    //     onUpdate(response.data.updatedProduct);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  return (
    <div className="update-product-form">
        {/* <form> */}
          <h3 className='font-bold text-lg'>Update Product</h3>
          <div className=''>
          <input
             value={name}
              type="text"
              placeholder="Enter Product Name"
              required
              onChange={(e) => setName(e.target.value)}
              className='my-5 input input-bordered w-full '
           />
            <input
            value={price}
             type='number'
              placeholder="Enter Product Price"
              required
              onChange={(e) => setPrice(e.target.value)}
              className=' my-5 input input-bordered w-full '
            />
            <input
              value={category}
              type='text'
              placeholder="Enter Product category"
              required
              onChange={(e) => setCategory(e.target.value)}
              className='input input-bordered w-full my-5'
            />
            <input
            value={userId}
            placeholder='Enter userId'
            required
            onChange={(e) => setUserId(e.target.value)}
            className='input input-bordered w-full my-5'
            />
             {/* <input
             value={ProductId}
            placeholder='Enter ProductId'
            required
            onChange={(e) => setProductId(e.target.value)}
            className='input input-bordered w-full my-5'
            /> */}
             <input
              type='text'
             value={company}
            placeholder='Enter Product Company Name'
            required
            onChange={(e) => setCompany(e.target.value)}
            className='input input-bordered w-full my-5'
            />

      <button type="submit" onClick={handleUpdate} className='btn my-2'>
          Update Product
        </button>
          </div>

        {/* </form> */}
     
    
    </div>
  );
};

export default UpdateProduct;
