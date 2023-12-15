"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../interceptors/axios";
import Link from "next/link";
import { getUsersList } from "@/app/api/user";

const UsersList: React.FC = () => {
  const [userList, setUserList] = useState([]);


  const router = useRouter();
  useEffect(() => {
    handleUserList();
    console.log("i fire once");
  }, []);


  const handleUserList = async () => {

    const User = await getUsersList();
    setUserList(User);
    // try {
    //   const response = await axiosInstance.get("/get-userlist");
    //   if (response.status === 200) {
    //       console.log(response,"----------config")
    //     const User = response.data.users;
    //     console.log(User.length,"----------config")

    //     if (User && User.length > 0) {
    //         setUserList(User);
    //       console.log("Users getting successfully:", response.data.users);
    //       //  router.refresh();

    //       // console.log(authorization)
    //     } else {
    //       console.log("No Users found in the database.");
    //     }
    //   } else {
    //     // setErrMsg(res.data.error);
    //     console.log(response.data.error);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }

  };

 
  console.log(userList);

  return (
    <div className="grid place-items-center">
      <div className="text-center">
        {/* <div><AddProduct/></div> */}
        <h2 className="text-accent font-bold text-2xl">User List</h2>
        {/* <button onClick={getProducts}>Helllooooooooooo</button> */}

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {userList.length > 0 ? (
                userList.map((item:any, index) => (
                  <tr key={item._id}><Link  className="font-medium text-primary-600 hover:underline dark:text-primary-500" href={`getuserdetails/${item._id}`}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                  </Link>
                    
                  
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

      </div>
    </div>
  );
};

export default UsersList;
