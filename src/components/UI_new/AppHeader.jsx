import React from "react";
import { Sun, Moon } from "lucide-react";
import ellipse from "../../assets/bg/ellipse.png";
import logo from  "../../assets/bg/Logo.png";
import { Link } from 'react-router-dom';
import BgImgPaste from "./BgImgPaste";

export default function AppHeader({ isDarkMode = false, onThemeToggle }) {
  return (
    <>
      <header
        className="sticky top-0 z-10 relative"

        
      >
{/*         
        <img
        src={ellipse}
        alt="Top ellipse"
        className="absolute top-[0px] z-10 left-1/2 transform -translate-x-1/2 scale-[8] w-[800px] opacity-80 pointer-events-none max-h-20"
        /> */}

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
          {/* Переключатель темы */}
          {/* <div className="flex items-center gap-3">
            <button
              onClick={onThemeToggle}
              className={`p-2 rounded-lg transition-all duration-300 border shadow-[0_0_20px_rgba(255,255,255,0.2)] ${
                isDarkMode
                  ? "bg-gray-700/50 border-blue-400/40 hover:bg-gray-700/80"
                  : "bg-white/30 border-white/20 hover:bg-white/50"
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div> */}
        </div>
  </header>
    </>
  );
}