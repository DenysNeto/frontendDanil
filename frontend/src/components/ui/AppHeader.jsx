import React from "react";
import logo from  "../../assets/bg/Logo.svg";
import { Link } from 'react-router-dom';
import NavComp from "./NavSide";
export default function AppHeader() {
  return (
    <>
    
        <NavComp/>
<header className="sticky top-0 z-9997">
<div
  className="fixed  w-full h-full pointer-events-none "
  style={{
      transform: "translate(0%, -85%)",
    backgroundColor: "rgba(199, 233, 255, 1)",
    filter: "blur(50px)",
  }}
></div>

 
  
   
      <Link to="/">
        <img
        src={logo}
        className="relative h-24  p-6" 
        alt="logo"/>
      </Link>

  </header>
    </>
  );
}