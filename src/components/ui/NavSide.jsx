
import React from "react";
import {useNavigate} from "react-router-dom";
import { FaDesktop, FaHome,FaBookmark, FaChartBar, FaUser } from "react-icons/fa";
import { CgShapeHexagon } from "react-icons/cg";


import useNavigationStore from "../../store/useNavStore";

let navBtns = [
  { label: "Platform", link: "/platform" },
  { label: "Models", link: "/models" },
  { label: "Developers", link: "/developers" },
  { label: "Pricing", link: "/pricing" },
  { label: "Partners", link: "/partners" },
  { label: "Company", link: "/company" },
];


let actBtns = [
  { label: "screen", icon: <FaDesktop />, link: "/screen" },
  { label: "book", icon: <FaBookmark />, link: "/book" },
  { label: "chart", icon: <FaChartBar />, link: "/chart" },
  { label: "set", icon: <CgShapeHexagon />, link: "/set" }
]


export default function NavComp({ typeNav }) {
  const navigate = useNavigate();
  const main_nav = useNavigationStore((s) => s.main_nav);
  if(!typeNav) typeNav = "main";
  if (typeNav === 'main') typeNav = "horizontal";
  if (typeNav === 'act') typeNav = 'horizontal';

 let H_style = `
         fixed
          top-5
          left-1/2
          -translate-x-1/2
          bg-gray-900
          rounded-full
          px-6
          py-2
          flex
          gap-4
          shadow-lg
          z-40
        `;     
 let V_style = `
    fixed
          left-6
          top-1/2
          -translate-y-1/2
          w-15
          min-h-[60vh]
          bg-gray-900
          rounded-full
          py-6
          flex
          flex-col
          items-center
          gap-4
          shadow-lg
          z-40 `


  if (typeNav === "horizontal") {
    return (
      <nav
        className={H_style}
        aria-label="Horizontal navigation"
      >
       
        <button
         onClick={() => navigate("/")}
          className={` text-sm rounded-full hover:bg-green-600 transition px-3 py-3 rounded-full hover:bg-green-600 
             ${main_nav === "/" ? "bg-green-500 text-black" : "text-white"}
             `}
 
        >
          <FaHome />
        </button>

        {navBtns.map((btn, index) => (
          <button
            key={index}
            onClick={() => navigate(btn.link)}
            className={`
              ${main_nav === btn.label.toLowerCase() ? " text-green-400" : "text-white"}
              px-4
              py-2
              rounded-full
              hover:bg-gray-800
              text-sm
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
                ${main_nav === btn.label.toLowerCase() ? "bg-green-500 text-black" : "text-white"}
                ${isUser ? "mt-auto" : ""}
                w-10 h-10
                text-white
                flex items-center justify-center
                rounded-full
                hover:bg-gray-800
                text-xs font-medium
              `}
              title={btn.label}
            >
               {btn.icon}
            </button>
          );
        

        })}

          <button
             className={`
              ${main_nav === "user" ? "bg-green-500 text-black" : "text-white"}
               mt-auto
                w-10 h-10
                text-white
                flex items-center justify-center
                rounded-full
                hover:bg-gray-800
                text-xs font-medium
              `
            } title={"FaDesktop"}>
              <FaUser />
          </button>
      </aside>
    );
  }

  return null;
};