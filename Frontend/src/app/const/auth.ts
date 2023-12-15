import cookie from "js-cookie";
import axios from "axios";
import { baseURL } from "./constant";


// export const setCookie = (key, value) => {
//     cookie.set(key, value, { expires: 1 });
//   };
  
  export const removeCookie = (key: string) : void => {
    cookie.remove(key);
  };
  
  export const getCookie = (key: string) : string | undefined => {
    return cookie.get(key);
  };
  
  export const setAuthentication = (token: string): void  => {
    cookie.set('token', token, { expires: 1 });
  };
  // export const setAuthentication = (token) => {
  //   setCookie("token", token);
  // };
  
  export const logOut = () => {
    removeCookie("token");
  };
  
  // export const isLogin = async () => {
  //   const token = getCookie("token");
  
  //   if (token) {
  //     const res = await axios.post(`${baseURL}/auth`, { token });
  //     return res.data;
  //   }
  //   return false;
  // };