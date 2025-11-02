// components/dataTabs.jsx
import React, { useState } from "react";


function Tab({data,isActive, onTabClick}){
  return (
    <button
      onClick={() => onTabClick(data.value)}
      className={` group text-[14px] rounded-full px-6 py-3 transition-all duration-800 text-black ${
        isActive && "bg-white font-bold pointer-events-none" 
      }`}
    >
      <span
        class="text-md transition-all duration-300 hover:font-bold hover:bg-gradient-to-r hover:from-purple-400 hover:via-blue-500 hover:to-pink-400 hover:bg-clip-text hover:text-transparent"
      >



        {data.label}
      </span>
    </button>
  );
}



export default function Tabs({ data, activeTab, onTabClick, align = "center"}) {

  const [selectedIndex, setSelectedIndex] = useState(
    data.findIndex((tab) => tab.value === activeTab)
  );
  if(selectedIndex == -1) setSelectedIndex(0)
 
    const alignmentClass = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
}[align] || "justify-center";



  const handleTabClick = (index, value) => {
    setSelectedIndex(index);
    onTabClick?.(value);
  };

return (
  <div className={`flex items-center ${alignmentClass}`}>
    <div
      style={{ backgroundColor: "rgba(41, 122, 151, 0.1)" }}
      className="rounded-full flex z-40 px-0.5 py-0.5"
    >
      {data.map((tab, index) => (
        <Tab
          key={tab.value}
          data={tab}
          isActive={selectedIndex === index}
          onTabClick={() => handleTabClick(index, tab.value)}
        />
      ))}
    </div>
  </div>
);

}