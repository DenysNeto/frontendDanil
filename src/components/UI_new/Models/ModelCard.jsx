import React from "react";
import { Button } from "../Buttons";

import { FaAnglesRight } from "react-icons/fa6";


export default function ModelCard({
  id,
  title = "Untitled",
  description = "",
  imageUrl = {},
  comingSoon = false,
  newModel= false,
  onSelect = ()=>{},
  actionText = "Learn More",
  pricing = "—",
  content = "—",
  onAction,
}) {
  const imgSrc = imageUrl.src  || null;
  const icon = imageUrl.icon || "🔷";
  const iconBg = imageUrl.iconBg || "#E5E7EB";
  const iconColor = imageUrl.color || "#111827";
  const gradient = imageUrl.bg || null;

  const truncated = typeof description === "string"
    ? (description.length > 40 ? description.slice(0, 40) + "..." : description)
    : "";


  return (

    <article className="group  p-6 pb-6 bg-white rounded-3xl border border-gray-100 hover:ring-2 hover:ring-black shadow-sm shadow-md  transition-shadow duration-400  overflow-hidden max-w-sm">
      {/* Image on top */}
      
      <div className="w-full flex justify-between mt-6 mb-6">
       
        {imageUrl && typeof imageUrl == "string"? (
          <img
            src={imageUrl}
            alt={title}
            className="w-10 h-10 object-cover"
            style={{ display: "block" }}
          />
        ) : (
          <div
            className="w-10 h-10  items-center justify-center"
            style={{ background: gradient ?? iconBg, color: iconColor }}
            aria-hidden="true"
          >
            <span className="text-3xl">{icon}</span>
          </div>
        )}
         <div className="flex items-center gap-2 flex-shrink-0">
            {comingSoon && (
              <span className="bg-gradient-to-r text-xs from-purple-400 via-blue-500 to-pink-400 bg-clip-text text-transparent">
               Soon
            </span>
            )}
            {newModel && (
                <span className="inline-flex items-center px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">
                  New
                </span>
            )}
         
          </div>
      </div>

      {/* Body */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate" title={title}>
            {title}
          </h3>
        </div>

        {/* Description truncated to 20 chars */}
        <p className="text-sm text-gray-600" title={description}>
          {truncated}
        </p>

        {/* Bottom row: pricing • dot • context */}  
      </div>

    <div className=" flex-col items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-gray-700 min-w-0">
           
            <p className="truncate">
              <span className="text-gray-600 text-xs">0.2/m Tokens</span>
            </p>

            <span className="w-2 h-2 rounded-full bg-blue-300 inline-block" aria-hidden="true" />

            <p className="truncate">

              <span className="text-gray-600 text-xs">0.2/m Tokens</span>
            </p>
          </div>






        </div>
    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
        <Button variant="info" onClick={() => onSelect(id)}>
          <span className="inline-flex text-s items-center whitespace-nowrap gap-2">
            MORE INFO <FaAnglesRight />
          </span>
        </Button>

    </div>

    </article>
  );
}