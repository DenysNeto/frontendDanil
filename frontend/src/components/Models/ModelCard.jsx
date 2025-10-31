import React from "react";
import { Button } from "../ui/Buttons";

import { FaAnglesRight } from "react-icons/fa6";
import defaultModelImage from "../../assets/modelsImage/Model.png";


export default function ModelCard({
  id,
  title = "Untitled",
  context_length = '',
  description = "",
  price = {
    currency: '',
    input_per_million_tokens : '',
    output_per_million_tokens : ''
  },
  imageUrl = {},
  newModel= true,
  onSelect = ()=>{},
}) {

  const truncated = typeof description === "string"
    ? (description.length > 60 ? description.slice(0, 60) + "..." : description)
    : "";


  return (

    <article onClick={() => onSelect(id)}  className="group  w-[340px] h-[340px] p-6 bg-white rounded-3xl border border-gray-100 hover:ring-1 hover:ring-black shadow-sm shadow-md  transition-shadow duration-400  overflow-hidden ">
    
      <div className=" flex w-full h-full flex-col  justify-center ">
          <div className="w-full flex justify-between ">
         {/* Image on top */}
        {imageUrl && typeof imageUrl == "string"? (
          <img
            src={imageUrl}
            alt={title}
            className="w-10 h-10 object-cover"
            style={{ display: "block" }}
          />
        ) : (
          <img
          src={defaultModelImage}
          alt={title}
          className="w-[80px] h-[80px] object-cover"
          style={{ display: "block" }}
        />
        )}
         <div className="flex items-top gap-2 flex-shrink-0">
            {newModel && ( 
              <span className="inline-flex h-1/2 items-center p-2 px-4 text-xs font-bold bg-[#297A971A] text-gray-800 rounded-full">
                  New
                </span>
            )}
         
          </div>
      </div>

      {/* Body */}
      <div className={"grid gap-2"}>
        <div className="flex items-start justify-between ">
          <h2 className="text-xl font-semibold text-gray-900 truncate" title={title}>
            {title}
          </h2>
        </div>

        {/* Description truncated to 20 chars */}
        <p className="text-s text-gray-700 mt-2" title={description}>
          {truncated}
        </p>

        {/* Bottom row: pricing • dot • context */}  
        
    <div className=" flex-col items-center justify-between text-xs">
          <div className="flex items-center gap-4 in-w-0">
           
            <p className="truncate">
              <span className="text-[#303030] ">${price.input_per_million_tokens}/M Tokens</span>
            </p>


            {(price && price.currency !="") && <>
              <span className="w-2 h-2 mx-2 rounded-full bg-[#2E8CFF] inline-block" aria-hidden="true" />

            <p className="truncate">

              <span className="text-[#303030]">{context_length} Context</span>
            </p>
            </> 
            }
          
          </div>






        </div>
      </div>

    <div className="opacity-0 mb-2 group-hover:opacity-100 transition-opacity duration-300 mt-2">
        <Button variant="info" onClick={() => onSelect(id)}>
          <span className=" flex text-[16px] mt-4 items-center whitespace-nowrap ">
            MORE INFO <FaAnglesRight />
          </span>
        </Button>

    </div>
      </div>
    

    </article>
  );
}