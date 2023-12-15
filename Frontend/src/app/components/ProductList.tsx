"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UpdateProduct from "./UpdateProduct";
import AddProduct from "./AddProduct";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { getProducts, deleteProduct } from  "../api/products"

const ProductList: React.FC = () => {
  const [getproductslist, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const router = useRouter();
  useEffect(() => {
    loadProducts();
    console.log("i fire once");
  }, []);

  const handleEditClick = (product: React.SetStateAction<null>) => {
    console.log(product, "HandledEdit");
    setSelectedProduct(product);
    setIsUpdateMode(true);
    setModalOpen(true);
  };
  const loadProducts = async () => {
    const productList = await getProducts();
    setProducts(productList);
  };
  // const getProducts = async () => {
  //   try {
  //     const response = await axiosInstance.get("/get-product");
  //     console.log(response.config.headers,"----------config")
  //     if (response.status === 200) {
  //       const { products } = response.data;
  //       if (products && products.length > 0) {
  //         setProducts(products);
  //         console.log("Product getting successfully:", response.data.products);

  //       } else {
  //         console.log("No products found in the database.");
  //       }
  //     } else {
  //       console.log(response.data.error);
  //     }
  //   } catch (error) {
  //     console.error(error);
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
  const handleDeleteClick = async (id: any) => {
    const success = await deleteProduct(id);
    if (success) {
      await loadProducts();
    }
  };
  // const deleteProducts = async (id: any) => {
  //   console.log("hhhhh");
  //   try {
  //     const response = await axiosInstance.delete(`/delete-product/${id}`);
  //     if (response.status === 200) {
  //       console.log(response.data.products);
  //       // console.log(authorization)
  //       getProducts();
  //       // router.refresh();
  //     } else {
  //       // setErrMsg(res.data.error);
  //       console.log(response.data.error);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  console.log(getproductslist);

  return (
    <div className="grid place-items-center">
      <div className="text-center">
        <div className="flex justify-center gap-5">
        <div>
          <button
            onClick={() => {
              setIsUpdateMode(false);
              setModalOpen(true);
            }}
            className="btn btn-primary w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add Product
          </button>
        </div>
        <div><button  onClick={() => router.push('/getuserdetails')} className="btn btn-primary w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
         >User List</button></div>
         </div>

        {/* <div><AddProduct/></div> */}
        <h2 className="text-accent font-bold text-2xl">Product List</h2>
        {/* <button onClick={getProducts}>Helllooooooooooo</button> */}

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>S.No</th>

                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>UserId</th>
                {/* <th>ProductId</th> */}
                <th>Company</th>
                <th>Product Images</th>

                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {getproductslist.length > 0 ? (
                getproductslist.map((item:any, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
                    <td><Link className="font-medium text-primary-600 hover:underline dark:text-primary-500"href={`getuserdetails/${item.userId}`}>{item.userId}</Link></td>
                    {/* <td>{item.productId}</td> */}
                    <td>{item.company}</td>
                    <td className="flex gap-5 h-24 w-24 relative">
                      {item.image &&
                        item.image.map((imageUrl:any, imageIndex:any) => (
                          // <img
                          //   key={imageIndex}
                          //   src={imageUrl}
                          //   alt={`Image ${imageIndex + 1}`}
                          //   className="h-24 w-24"
                          // />
                          <Image
                          key={imageIndex}
                          src={imageUrl}
                          alt={`Image ${imageIndex + 1}`}
                          width={50}
                          height={50}
                          objectFit="cover"
          />
                        ))}
                    </td>
                    <td>
                      <FiEdit
                        cursor="pointer"
                        className="text-blue-500"
                        size={25}
                        onClick={() => handleEditClick(item)}
                      />
                      {/* <UpdateProduct/> */}
                      <FiTrash2
                        onClick={() => handleDeleteClick(item._id)}
                        cursor="pointer"
                        className="text-red-500"
                        size={25}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>
                    <p className="text-accent font-bold text-2xl text-center">
                      No data available
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* {selectedProduct && <UpdateProduct product={selectedProduct} onUpdate={handleUpdateProduct} />} */}
      </div>
      <div>
        {" "}
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          {modalOpen && (
            <div>
              {isUpdateMode ? (
                <UpdateProduct
                  productToEdit={selectedProduct}
                  setModalOpen={setModalOpen}
                  loadProducts={loadProducts}
                />
              ) : (
                <AddProduct
                  setModalOpen={setModalOpen}
                  loadProducts={loadProducts}
                />
              )}
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default ProductList;
