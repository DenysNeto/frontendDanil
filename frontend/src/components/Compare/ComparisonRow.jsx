import Icon from "../ui/Icon.jsx";
import Metric from "../ui/Metric.jsx"
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ComparisonRow({name, metric, compareTypes =["optimized","baseline"] ,isPrompt}) {

let rowName = name?.toUpperCase() || metric?.name?.toUpperCase()
let rowIcon = name?.toUpperCase() == "LIVE DATA" ? 'Wifi' : name?.toUpperCase() == "LATENCY" ? "Clock"  : name?.toUpperCase() == "THROUGHPUT" ? "Clipboard" : "Zap"

// Calculate max value for progress bars from the metric data
const getMaxValue = () => {
  if (!metric || !metric.unit) return 100;

  // Accuracy should always be out of 100
  if (name?.toUpperCase() === "ACCURACY" || metric.unit === '%') {
    return 100;
  }

  const val1 = metric[compareTypes[0]];
  const val2 = metric[compareTypes[1]];

  const num1 = typeof val1 === 'number' ? val1 : Number(String(val1).replace(/[^0-9.]/g, ''));
  const num2 = typeof val2 === 'number' ? val2 : Number(String(val2).replace(/[^0-9.]/g, ''));

  if (Number.isFinite(num1) && Number.isFinite(num2)) {
    return Math.max(num1, num2);
  }

  return 100;
};

const maxValue = getMaxValue();

 return (
  <div
        key={name+Math.random()}
        className={` flex text-xs border-b border-gray-50 last:border-b-0   rounded-3xl `}
      >



<div className="w-[250px] flex flex-col ">
  <div className="flex p-6 items-center w-full text-base font-bold text-gray-800 ">
    <Icon name={rowIcon} className="w-6 h-6 mr-2" />
    <span>{rowName}</span>
  </div>

  {metric?.improvement || metric?.change ? (
    <div className="text-xs p-6 text-blue-600 font-medium">
      {metric.improvement || metric.change}
    </div>
  ) : null}
</div>


        <div className="flex-1 border-l p-6 border-gray-100  ">
          <div className={`${!isPrompt &&  "w-1/2" }`}>
            {metric && metric.unit ? (
              <Metric
                value={metric[compareTypes[0]]}
                unit={metric.unit}
                max={maxValue}
              />
            ) : name?.toUpperCase() === "LIVE DATA" ? (
              <div className="prose prose-lg max-w-none text-gray-800 text-base leading-relaxed break-words overflow-wrap-anywhere">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {metric[compareTypes[0]] || ""}
                </ReactMarkdown>
              </div>
            ) : (
              <span className="text-lg [&>*]:m-0">{metric[compareTypes[0]]} </span>
            )}
          </div>

        </div>


        <div className="flex-1 border-l p-6  border-gray-100 ">
          <div className={`${!isPrompt &&  "w-1/2" }`} >
            {metric && metric.unit ? (
              <Metric
                color='rgba(224, 158, 248, 1)'
                value={metric[compareTypes[1]]}
                unit={metric.unit}
                max={maxValue}
              />
            ) : name?.toUpperCase() === "LIVE DATA" ? (
              <div className="prose prose-lg max-w-none text-gray-800 text-base leading-relaxed break-words overflow-wrap-anywhere">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {metric[compareTypes[1]] || ""}
                </ReactMarkdown>
              </div>
            ) : (
              <span className="text-lg [&>*]:m-0">{metric[compareTypes[1]]} </span>
            )}
          </div>

        </div>
      </div>
);
}