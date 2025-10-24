import React from "react";
import ComparisonRow from "./ComparisonRow";
import ComparisonHeader from "./ComparisonHeader"
import { HiMiniArrowLeft } from "react-icons/hi2";


export default function ComparisonContainer({backButton=false, header = true, data }) {

  const dataRows = data?.compareFields ? data.compareFields    : data
  console.log("INSIEDE COMPONENT" , data)
  return (
    <> 
  <div className="w-full  mx-auto max-h-[60vh] bg-transparent rounded-2xl" >
    
    <ComparisonHeader  headerData={data?.compareTypes} />


    {Object.entries(dataRows).map(([metricName, metricObj], index) => (
  <div key={metricName + index} className="shadow-[0_10px_20px_rgba(199,233,255,0.3)] rounded-2xl !bg-white z-20">
    <ComparisonRow
      name={metricName}
      metric={metricObj}
      first={index === 0}
      compareTypes={data?.compareTypes}
    />
  </div>
))}

  </div>
  
   </>
);
}