import ComparisonRow from "./ComparisonRow";
import { HiMiniArrowLeft } from "react-icons/hi2";

const comparisonData = [
  {
    id: 1,
    type: "Latency",
    unit: "ms",
    values: [458, 824],
    improvement: "3x faster"
  },
  {
    id: 2,
    type: "Throughput",
    unit: "tok/s",
    values: [136, 45],
    improvement: "+193%"
  },
  {
    id: 3,
    type: "Accuracy",
    unit: "%",
    values: [46.2, 82.6],
    change: "-26.23pp"
  }
];



const comparisonData1 = [
  {
    id: 1,
    type: "",
    values: ["Qwen3-Next Thinking features the same highly sparse MoE architecture but specialized for complex reasoning tasks. Supports only thinking mode  with automatic  tag inclusion, delivering exceptional analytical  performance while maintaining extreme efficiency with 10x+ higher  throughput on long contexts and may generate longer thinking content  than predecessors.", "Qwen3-Next Thinking features the same highly sparse MoE architecture but specialized for complex reasoning tasks. Supports only thinking mode  with automatic  tag inclusion, delivering exceptional analytical  performance while maintaining extreme efficiency with 10x+ higher  throughput on long contexts and may generate longer thinking content  than predecessors."],

  },
  
];




export default function ComparisonContainer({backButton=false}) {

  return (
  <div className="w-full bg-white mx-auto max-h-[60vh]  rounded-2xl overflow-hidden">
    {/* Header row */}
    <div className="flex  gap-1 ">
      <div className="w-1/4 p-2 flex items-center">
          {backButton==true && <button><HiMiniArrowLeft/></button>}
      </div>

      <div className="w-3/8 bg-[rgba(41,122,151,0.1)]  text-center p-2 rounded-t-2xl font-semibold text-sm">
        OPTIMIZED
      </div>

      <div className="w-3/8 bg-[rgba(41,122,151,0.1)] text-center p-2 rounded-t-2xl font-semibold text-sm">
        BASELINE
      </div>
    </div>

    {/* Data rows */}
    {comparisonData.map((metric, index) => (
      <div className="shadow-md rounded-2xl">     <ComparisonRow metric={metric} first={index==0}/></div>
 
    ))}
  </div>
);
}