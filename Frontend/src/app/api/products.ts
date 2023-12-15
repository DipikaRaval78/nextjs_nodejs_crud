import axiosInstance from "../interceptors/axios";

export const getProducts = async() =>{

    try {
        const response = await axiosInstance.get("/get-product");
        console.log(response.config.headers,"----------config")
        if (response.status === 200) {
          const { products } = response.data;
          if (products && products.length > 0) {
            // setProducts(products);
            console.log("Product getting successfully:", response.data.products);
            return products;
  
          } else {
            console.log("No products found in the database.");
            return [];
          }
        } else {
          console.log(response.data.error);
          return [];
        }
      } catch (error) {
        console.error(error);
        return [];
      }
}

export const deleteProduct = async (id: any) => {
    try {
      const response = await axiosInstance.delete(`/delete-product/${id}`);
      if (response.status === 200) {
        return true;
      } else {
        console.error(response.data.error);
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const addProduct = async (formData: FormData) => {
    try {
      const response = await axiosInstance.post("/add-product", formData);
      if (response.status === 200) {
        console.log("Product added successfully:", response.data);
        return true;
      } else {
        console.error("Error adding product:", response.data.error);
        return false;
      }
    } catch (error) {
      console.error("Error adding product:", error);
      return false;
    }
  };

  export const updateProduct =async (productId:any, updatedProductData:any) => {
    try {
      const response = await axiosInstance.put(`/update-product/${productId}`, updatedProductData);
      if (response.status === 200) {
        console.log('Product updated successfully:', response.data.products);
        return true;
      } else {
        console.error('Error updating product:', response.data.error);
        return false;
      }
    } catch (error) {
      console.error('Error updating product:', error);
      return false;
    }
    
  }