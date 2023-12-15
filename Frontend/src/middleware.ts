import { New_Rocker } from "next/font/google";
import { NextResponse } from "next/server";

export const middleware= (request: any)=>{

// return NextResponse.redirect(new URL("/signup",request.url))
// console.log(request)
}

// export const config={
//    matcher:["/userprofile"]
// }

// export function middleware(request) {

//     const path = request.nextUrl.pathname;
  
//     if (path !== "/about") {
  
//       return NextResponse.rewrite(new URL("/movie", request.url));
  
//     }
  
//   }
  
  
  
  //Here we'll configute if the url matches the specific url then redirect to "/movie"
  
  //This method can be used to hide pages from unauthorized users.
  
//   export const config = {
  
//     matcher: "/about/:path*",
  
//   };