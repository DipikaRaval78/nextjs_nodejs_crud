"use client"
import  React from 'react';
import AddProduct from '../components/AddProduct';
const page = () =>{
    return(
        <div>  
            <AddProduct setModalOpen={function (value: React.SetStateAction<boolean>): void {
                throw new Error('Function not implemented.');
            } } loadProducts={function (): void {
                throw new Error('Function not implemented.');
            } }/>
        </div>
    )
}

export default page