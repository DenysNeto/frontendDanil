// components/dataTabs.jsx
import React, { useState } from "react";


function Tab({data,isActive, onTabClick}){
  return (
    <button
      onClick={() => onTabClick(data.value)}
      className={`group text-xs rounded-full px-4 py-2 transition-all duration-300 ${
        isActive ? "bg-white text-black font-semibold" : "text-white"
      }`}
    >
      <span
        className="p-1 py-0.5 text-black group-hover:font-semibold "
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