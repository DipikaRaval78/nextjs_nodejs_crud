"use client"

import  React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import {setAuthentication} from "../const/auth"
import axiosInstance from "../interceptors/axios"
import { loginUser } from '../api/user';


const Login: React.FC = () =>{

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent) =>{

        e.preventDefault()
        const userData = {
            
            email,
            password,
        };
     await  loginUser(userData, router);
     
        // try {
        //   const response = await axiosInstance.post('/login',userData,);
        //   console.log(response.data);
        //   if (response.status === 200 ) {
        //     console.log(response.data);
        //     // window.location = '/home';    
        //     console.log("Login Succefully")
        //     setAuthentication(response.data.token)
        //     router.push("/userprofile")    
        //   } else {
        //     // setErrMsg(res.data.error);
        //     console.log(response.data.error)
        //   }
        // } catch (error) {
        //   console.error(error);
        // }

        // axios.post(`${baseURL}/login`,userData).then((res) => {
          

        //   if (res.status === 200 ) {
        //     console.log(res.data);
        //     // window.location = '/home';    
        //     console.log("Login Succefully")
        //     setAuthentication(res.data.token)
        //     router.push("/userprofile")    
        //   } else {
        //     // setErrMsg(res.data.error);
        //     console.log(res.data.error)
        //   }
           
        // }).catch(err => {
        //   // setErrMsg(err.response.data.error)
        // console.log(err.resopnse.data);
        // });
    }

    return(
      <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login to your account
          </h1>
          <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit}
       
      >
              <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input
        value={email}
        type='email'
         placeholder="Email"
         required
         onChange={(e) => setEmail(e.target.value)}
          className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
              </div>
              <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input
          value={password}
          type='password'
          placeholder="*********"
          required
          onChange={(e) => setPassword(e.target.value)}
          className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Login
        </button>
        <div className="text-sm font-light text-gray-500 dark:text-gray-400">Not Registered Registered
        <div><Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/signup">Register Here</Link></div></div>
        </form>
        </div>
        </div>
 </div>
    </section>
      
    )
}

export default Login