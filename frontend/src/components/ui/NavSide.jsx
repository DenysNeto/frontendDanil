
import React from "react";
import {useNavigate} from "react-router-dom";
import { FaDesktop, FaHome,FaBookmark, FaChartBar, FaUser } from "react-icons/fa";
import { CgShapeHexagon } from "react-icons/cg";
import { useLocation } from 'react-router-dom';
import Icon from "./Icon";

let navBtns = [
  { label: "Platform", link: "/platform",disabled:true },
  { label: "Models", link: "/models" },
  { label: "Developers", link: "/developers",disabled:true },
  { label: "Pricing", link: "/pricing",disabled:true },
  { label: "Partners", link: "/partners",disabled:true },
  { label: "Company", link: "/company",disabled:true },
];


let actBtns = [
  { label: "screen", icon: <FaDesktop />, link: "/screen",disabled:true },
  { label: "book", icon: <FaBookmark />, link: "/book",disabled:true },
  { label: "chart", icon: <FaChartBar />, link: "/chart",disabled:true },
  { label: "set", icon: <CgShapeHexagon />, link: "/set",disabled:true }
]


export default function NavComp({ typeNav }) {
  const navigate = useNavigate();
  let location = useLocation();
  location = location.pathname
  location = location.slice(1)
  if(!typeNav) typeNav = "main";
  if (typeNav === 'main') typeNav = "horizontal";
  if (typeNav === 'act') typeNav = 'horizontal';

let H_style = "fixed top-5 left-1/2 -translate-x-1/2 bg-gray-900 rounded-full px-1 py-1 flex gap-4 shadow-lg z-[9999]";
let V_style = "fixed left-6 top-1/2 -translate-y-1/2 w-[100px] bg-gray-900 rounded-full py-6 flex flex-col items-center gap-4 shadow-lg z-[40]";
 

if (typeNav === "horizontal") {
    return (
      <nav style={{height : "64px"}}
        className={H_style}
        aria-label="Horizontal navigation"
      >
        <div style={location === "/" ? {backgroundColor:"#51FFA3" , borderRadius:"24px", color:"black"} : {}} className="rounded-full ">
       <button
         onClick={() => navigate("/")}
          className={`rounded-full transition p-4 hover:text-[#51FFA3] w-max
             ${location === "" ? " bg-[#51FFA3] hover:text-gray-600  bg-[#51FFA3] text-black" : "text-white"}
             `}
 
        >
          <Icon name="Home" className={'mr-[2px] w-full'}  style={{ stroke: "white" }} />
        </button>
       </div>
     

        {navBtns.map((btn, index) => (
          <button
            key={index}
            onClick={() => !btn.disabled && navigate(btn.link)}
            className={`
              ${location === btn.label.toLowerCase() ? " bg-[#51FFA3] hover:text-black" : "text-white"}
              ${btn.disabled ? " cursor-not-allowed" : "hover:text-[#51FFA3]"}

              px-4
              py-2
              rounded-full
              text-lg
              font-medium
            `}
            title={btn.label}
          >
            {btn.label}
          </button>
        ))}
      </nav>
    );
  }

  if (typeNav === "horizontal") {
    return (
      <aside
        className={V_style}
        aria-label="horizontal navigation"
      >
        {actBtns.map((btn, index) => {
          const isUser = btn.label === "FaUser";
          return (
            <button
              key={index}
              onClick={() => navigate(btn.link)}
              className={`
                ${location === btn.label.toLowerCase() ? "bg-[#51FFA3] text-black" : "text-white"}
                ${isUser ? "mt-auto" : ""}
                w-10 h-10
                text-white
                flex items-center justify-center
                rounded-full
                hover:bg-gray-800
                text-[18px] font-medium
              `}
              title={btn.label}
            >
               {btn.icon}
            </button>
          );
        

        })}

          <button
             className={`
              ${location === "user" ? "bg-[#51FFA3] text-black" : "text-white"}
               mt-auto
                w-10 h-10
                text-white
                flex items-center justify-center
                rounded-full
                hover:bg-gray-800
                text-[18px] font-medium
              `
            } title={"FaDesktop"}>
              <FaUser />
          </button>
      </aside>
    );
  }

  return null;
};