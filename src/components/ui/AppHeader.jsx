import React from "react";
import logo from  "../../assets/bg/Logo.png";
import { Link } from 'react-router-dom';
import BgImgPaste from "./BgImgPaste";

export default function AppHeader() {
  return (
    <>
    

      <header className="sticky top-0 z-10 relative">
        
      <BgImgPaste position={"top"}/>    
   
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