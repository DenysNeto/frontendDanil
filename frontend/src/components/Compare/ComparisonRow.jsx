import Icon from "../ui/Icon.jsx";
import Metric from "../ui/Metric.jsx"
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { HiMiniArrowUp, HiMiniArrowDown } from "react-icons/hi2";

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

// Calculate improvement with arrow and value based on metric type
const getImprovement = () => {
  if (!metric || !metric.unit || name?.toUpperCase() === "LIVE DATA") {
    return null;
  }

  const optimizedValue = metric[compareTypes[0]]; // optimized
  const baselineValue = metric[compareTypes[1]]; // baseline

  // Extract numeric values
  const optimizedNum = typeof optimizedValue === 'number' 
    ? optimizedValue 
    : Number(String(optimizedValue).replace(/[^0-9.]/g, ''));
  const baselineNum = typeof baselineValue === 'number' 
    ? baselineValue 
    : Number(String(baselineValue).replace(/[^0-9.]/g, ''));

  if (!Number.isFinite(optimizedNum) || !Number.isFinite(baselineNum) || baselineNum === 0) {
    return null;
  }

  const metricName = name?.toUpperCase() || '';

  // For LATENCY: lower is better, so show times less and arrow down
  if (metricName === "LATENCY") {
    if (optimizedNum === 0) return null;
    const timesFaster = baselineNum / optimizedNum;
    return {
      value: `${timesFaster.toFixed(2)}x`,
      arrow: <HiMiniArrowDown className="inline" />
    };
  }

  // For THROUGHPUT and ACCURACY: higher is better, show percentage and arrow up
  if (metricName === "THROUGHPUT" || metricName === "ACCURACY") {
    const percentIncrease = ((optimizedNum - baselineNum) / baselineNum) * 100;
    if (percentIncrease > 0) {
      return {
        value: `${percentIncrease.toFixed(1)}%`,
        arrow: <HiMiniArrowUp className="inline" />
      };
    } else if (percentIncrease < 0) {
      return {
        value: `${Math.abs(percentIncrease).toFixed(1)}%`,
        arrow: <HiMiniArrowDown className="inline" />
      };
    }
    return null;
  }

  return null;
};

const improvement = getImprovement();

 return (
  <div
        key={name+Math.random()}
        className={` flex text-xs border-b border-gray-50 last:border-b-0 rounded-3xl ${isPrompt ? 'max-h-[50vw]' : ''}`}
      >



<div className="w-[250px] flex flex-col gap-2">
  <div className="flex p-6 items-center w-full text-base font-bold text-gray-800 ">
    <Icon name={rowIcon} className="w-6 h-6 mr-2" />
    <span>{rowName}</span>
  </div>

  {improvement && (
    <div className="px-6 pb-6 text-green-600 font-bold flex items-center gap-1" style={{fontSize: '30px'}}>
      <span>{improvement.value}</span>
      {improvement.arrow}
    </div>
  )}
</div>


        <div className={`flex-1 border-l border-gray-100 ${isPrompt ? 'overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]' : 'p-6'}`} style={isPrompt ? {scrollbarWidth: 'none'} : {}}>
          <div className={`${!isPrompt &&  "w-1/2" } ${isPrompt ? 'p-6' : ''}`}>
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


        <div className={`flex-1 border-l border-gray-100 ${isPrompt ? 'overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]' : 'p-6'}`} style={isPrompt ? {scrollbarWidth: 'none'} : {}}>
          <div className={`${!isPrompt &&  "w-1/2" } ${isPrompt ? 'p-6' : ''}`} >
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