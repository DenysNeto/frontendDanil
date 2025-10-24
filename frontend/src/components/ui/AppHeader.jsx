import React from "react";
import logo from  "../../assets/bg/Logo.png";
import { Link } from 'react-router-dom';
import NavComp from "./NavSide";
export default function AppHeader() {
  return (
    <>
    
        <NavComp/>
<header className="sticky top-0 h-[15vh] z-9997">
<div
  className="fixed left-[10vw] mx-auto w-[80vw] h-[40vh] pointer-events-none "
  style={{
      transform: "translate(0%, -60%)",
    backgroundColor: "rgba(199, 233, 255, 1)",
    filter: "blur(100px)",
  }}
></div>

 
  
   
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