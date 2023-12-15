"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logOut } from "../const/auth";
import ProductList from "./ProductList";
import Link from "next/link";

const UserProfile: React.FC = () => {
  console.log("Userprofiles called.........");
  // const[user,setUser] = useState({name:"" , email:""})
  const router = useRouter();

  // useEffect(() => {
  //   const authentication  = async() => {
  //     const loggedin = await isLogin();
  //     if(loggedin.auth){
  //       setUser(loggedin.data)
  //       console.log(loggedin.auth)

  //     }else{
  //        router.push("/login")
  //     }
  //   }

  //   authentication();
  // },[])

  const handleLogout = () => {
    logOut();
    console.log("Logout Succesfully");
    router.push("/signup");
  };
  return (
    <div className="h-screen grid place-items-center">
      <div className="text-center">
        {/* <h1 className="text-accent font-bold text-4xl">Welcome  <div >{user.name}</div></h1> */}
        <div>
          <ProductList />
        </div>
             <button
          className="uppercase bg-accent hover:bg-accentDark px-4 py-2 text-white mt-4"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
