import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import axiosInstance from "../interceptors/axios";
import { setAuthentication } from "../const/auth";



export const signUpUser = async (userData: { name: string; email: string; password: string; }, router: AppRouterInstance | string[]) => {
  try {
    const response = await axiosInstance.post("/signup", userData);
    console.log(response.data);
    console.log("Account Created Successfully");
    router.push("/login");
  } catch (error) {
    console.error(error);
    // Handle errors, such as displaying an error message to the user
  }
};


export const loginUser = async (userData: { email: string; password: string; },router: AppRouterInstance | string[]) =>{

    try {
        const response = await axiosInstance.post('/login',userData,);
        console.log(response.data);
        if (response.status === 200 ) {
          console.log(response.data);
          // window.location = '/home';    
          console.log("Login Succefully")
          setAuthentication(response.data.token)
          router.push("/userprofile")    
        } else {
          // setErrMsg(res.data.error);
          console.log(response.data.error)
        }
      } catch (error) {
        console.error(error);
      }
}



  export const getUsersList =async () => {
    try {
      const response = await axiosInstance.get("/get-userlist");
      if (response.status === 200) {
        const User = response.data.users;

        if (User && User.length > 0) {
          console.log("Users getting successfully:", response.data.users);
          return User;
         
        } else {
          console.log("No Users found in the database.");
          return [];
        }
      } else {
        // setErrMsg(res.data.error);
        console.log(response.data.error);
      }
    } catch (error) {
      console.error(error);
    }
  }


  export const getUserDetails =async (userid: any) => {
    try {
      const response = await axiosInstance.get(`/get-user/${userid}`);
      if (response.status === 200) {
        const  userData  = response.data;
        if (userData.users.length >= 1) {
          console.log("user data getting successfully:", userData.users);
          return response.data.users;

          } else {
          console.log("No User found in the database.");
          return null;
        }
      } else {
        // setErrMsg(res.data.error);
        console.log(response.data.error);
      }
    } catch (error) {
      console.error(error);
    }
  }



