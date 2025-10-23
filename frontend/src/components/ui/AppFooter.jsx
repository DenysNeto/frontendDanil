import React from "react";
import ellipse from "/e_bg.png";
import logo from "../../assets/bg/bg_footer.png";
import { Link } from "react-router-dom";
import Template from "./Template";
import ViewTitle from "./ViewTitle";
import { BgFooter } from "./BgImgPaste";


let footerColumns = [
  ["Platform", "Models", "Developers", "Pricing", "Partners", "Company"],
  ["Cookie Policy", "Privacy Policy", "Terms of service"],
  ["© 2025 Fireworks AI, Inc. All rights reserved."]
]

export default function AppFooter({isFull = false}) {

  return (
   <footer className={` ${isFull ? "bg-[#303030] mt-30  py-10" : ""}  text-white `}>
      {!isFull  && <BgFooter/>   }
      
      <Template type="action">
         {isFull && <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 ">
            <div className="flex flex-col gap-6 ">
              <img src={logo} alt="Logo" className="w-10 m-4 mt-10" />
              <ViewTitle  align={"left"}
              uptitle={"We are always improving."}
                  subtitle={"Subscribe to newsletter"}
              />
              
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="EMAIL"
                  className="px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-700 w-full sm:w-auto"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-semibold"
                >
                  SEND
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-lg">
          {footerColumns.map((column, colIndex) => (
            <ul key={colIndex}  className="flex flex-col-reverse space-y-1 border-l-1 pl-4 border-white/20 text-sm">
              {column.reverse().map((item, itemIndex) => (
                <li key={itemIndex}>
                  {item.startsWith("©") ? (
                    <span className="text-gray-400">{item}</span>
                  ) : (
                    <p  className="hover:underline">{item}</p>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>

          </div>}
      </Template>


    </footer>

  );
}