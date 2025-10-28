import Icon from "../ui/Icon.jsx";
import Metric from "../ui/Metric.jsx"
import React from "react";
export default function ComparisonRow({name, metric, compareTypes =["optimized","baseline"] ,isPrompt}) {

let rowName = name?.toUpperCase() || metric?.name?.toUpperCase()
let rowIcon = name?.toUpperCase() == "LIVE DATA" ? 'Wifi' : name?.toUpperCase() == "LATENCY" ? "Clock"  : name?.toUpperCase() == "THROUGHPUT" ? "Clipboard" : "Zap" 

 return (
  <div
        key={name+Math.random()}
        className={` flex text-xs border-b border-gray-50 last:border-b-0 rounded-2xl`}
      >



<div className="w-[18%] w-[250px] flex flex-col gap-1 p-6 rounded-2xl">
  <div className="flex items-center w-full text-base font-bold text-gray-800 gap-2">
    <Icon name={rowIcon} className="w-6 h-6" />
    <span>{rowName}</span>
  </div>

  {metric?.improvement || metric?.change ? (
    <div className="text-xs text-blue-600 font-medium">
      {metric.improvement || metric.change}
    </div>
  ) : null}
</div>


        <div className="w-1/2 border-l p-6 border-gray-100  ">
          <div className={`${!isPrompt &&  "w-1/2" }`}>
            {metric && metric.unit ? <Metric
            
                      value={metric[compareTypes[0]]}
                      unit={metric.unit}
                    /> : <span className="text-lg">{metric[compareTypes[0]]} </span>}
          </div>
       
        </div>
         

        <div className="w-1/2 border-l p-6  border-gray-100 ">
          <div className={`${!isPrompt &&  "w-1/2" }`} >
          {metric && metric.unit ? <Metric color='rgba(224, 158, 248, 1)'
                  value={metric[compareTypes[1]]}
            unit={metric.unit}
          /> : <span className="p-6 text-lg">{metric[compareTypes[1]]} </span>}
          </div>

        </div>
      </div>
);
}