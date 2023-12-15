"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "../../interceptors/axios";
import { getUserDetails } from "@/app/api/user";

interface Params {
  userid: string;
}

const User: React.FC<{params: Params }> =  ({params}) => {
  console.log(params.userid,"===============")
  const [user, setUser] = useState([]);

  useEffect(() => {
    handleUser();
    console.log("i fire once");
  }, [params.userid]);

  const handleUser = async () => {

    const userData = await getUserDetails(params.userid);
    if (userData) {
      setUser(userData);
    } else {
      console.log('No User found in the database.');
      // Handle the case when no user data is found, e.g., redirect to an error page.
      // router.push('/error');
    }
    // try {
    //   const response = await axiosInstance.get(`/get-user/${params.userid}`);
    //   if (response.status === 200) {
    //     const  userData  = response.data;
    //     if (userData.users.length >= 1) {
    //       console.log("user data getting successfully:", userData.users);
    //      setUser(response.data.users)

    //       } else {
    //       console.log("No User found in the database.");
    //     }
    //   } else {
    //     // setErrMsg(res.data.error);
    //     console.log(response.data.error);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };
  return (

    <div>
    <h1>User Details</h1>
    <div>
      {user.map((item: any, index: any) => (
        <div key={index}>
          <h4>Email: {item.email}</h4>
          <h4>Name: {item.name}</h4>
          <h4>Password:{item.password}</h4>
        </div>
      ))}
    </div>
  </div>
  );
};

export default User;
