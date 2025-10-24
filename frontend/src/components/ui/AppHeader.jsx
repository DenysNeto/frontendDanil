import React from "react";
import logo from  "../../assets/bg/Logo.png";
import { Link } from 'react-router-dom';
import NavComp from "./NavSide";
export default function AppHeader() {
  return (
    <>
    
        <NavComp/>
<header
  className="sticky top-0 z-10 h-[20vh]"
  style={{
   background:" linear-gradient(to bottom, rgba(156, 211, 248, 0.8), rgba(255, 255, 255, 0.06))",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(10px)",
  }}
>

 
  
   
      <Link to="/">
        <img
        src={logo}
        className="relative w-50 py-8 px-6 z-20"
        alt="logo"/>
      </Link>

        <div className=" flex items-center justify-between">
         <div className="flex items-center gap-3">

        </div>
        </div>

  </header>
    </>
  );
}