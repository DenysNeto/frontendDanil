import React from "react";
import ellipse from "/e_bg.png";
import logo from "../../assets/bg/bg_footer.png";
import { Link } from "react-router-dom";
import Template from "./Template";
import ViewTitle from "./ViewTitle";
 



let footerColumns= [
  ["Platform", "Models", "Developers", "Pricing", "Partners", "Company"],
  ["Cookie Policy", "Privacy Policy", "Terms of service"],
  ["© 2025 Fireworks AI, Inc. All rights reserved."]
]


export default function AppFooter({isFull = false}) {

  return (
<footer className={`${
    isFull &&  "bg-[#303030] mt-30 py-10"
  } text-white`}>
<div
  className="fixed bottom-[-10vh] left-[10vw] mx-auto w-[80vw] h-[40vh] pointer-events-none z-[-1]"
  style={{
    transform: "translate(0%, 60%)",
    backgroundColor: "rgba(199, 233, 255, 1)",
    filter: "blur(120px)",
  }}
></div>


    {isFull &&  <Template type="action">
         <div className=" mx-auto grid grid-cols-2  mb-30 mt-10">
            
            
          <div className="">
              <img src={logo} alt="Logo" className="w-[55px] h-[50px]" />
                <div className="flex flex-col my-6">
                  <span className="text-xl">We are always improving. </span>
                  <span className="text-[36px] font-semibold">Subscribe to newsletter</span>
              </div>
    

    
          <form className="w-2/3 flex justify-between py-2 w-2/3 rounded-full text-white placeholder-gray-400 border border-gray-600 ">
              <input
                type="email"
                placeholder="EMAIL"
                className="px-6"
              />
              <button
                type="submit"
                className=" px-4 py-2 mr-2 bg-[#51FFA3]  text-sm text-black rounded-full "
              >
                SEND
              </button>
</form>


            </div>

           <div className="grid grid-cols-3 ">
          {footerColumns.map((column, colIndex) => {
            let nameClass = ''
            switch(colIndex){
              case 0: nameClass='text-lg !justify-between';
              break;
              case 1: nameClass='text-base ';
               break;
              case 2: nameClass='text-base';
              break;
            }

            return (
            <ul key={colIndex}  className={`  flex flex-col justify-end space-y-1 border-l-1 pl-4 border-white/20 ${nameClass}`}>
              {column.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {item.startsWith("©") ? (
                    <span className="text-gray-400 ">{item}</span>
                  ) : (
                    <p  className="hover:underline">{item}</p>
                  )}
                </li>
              ))}
            </ul>
          )
          })}
        </div>

          </div>
      </Template>
      }


    </footer>

  );
}