"use client"
import  React from 'react';
import UpdateProduct from '../components/UpdateProduct';
const page = () =>{
    return(
        <div>  
            <UpdateProduct productToEdit={undefined} setModalOpen={function (value: React.SetStateAction<boolean>): void {
                throw new Error('Function not implemented.');
            } } loadProducts={function (): void {
                throw new Error('Function not implemented.');
            } } />
        </div>
    )
}

export default page