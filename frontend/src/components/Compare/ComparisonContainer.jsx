import React from "react";
import ComparisonRow from "./ComparisonRow";
import ComparisonHeader from "./ComparisonHeader"
import { HiMiniArrowLeft } from "react-icons/hi2";


const ComparisonContainer = React.memo(function ComparisonContainer({data ,isPrompt}) {
  const dataRows = data?.compareFields ? data.compareFields : data;
  const price = data?.price;

  console.log("SSS" , data)
  // Only log when data changes (using JSON stringify to compare deep equality)
  React.useEffect(() => {
    console.log("📊 ComparisonContainer data changed:", data?.id || 'no-id', "has compareFields:", !!data?.compareFields, "data keys:", Object.keys(data || {}), "dataRows keys:", Object.keys(dataRows || {}));
  }, [JSON.stringify(data)]);

  // If no data to display, show a message
  if (!dataRows || Object.keys(dataRows).length === 0) {
    return (
      <div className="w-full mx-auto max-h-[60vh] bg-transparent rounded-2xl p-4">
        <div className="text-center text-gray-500">
          No benchmark data to display
        </div>
      </div>
    );
  }

  return (
    <>
 
  <div className="w-full mx-auto bg-transparent rounded-3xl shadow-[0_10px_20px_rgba(199,233,255,0.3)] !bg-white z-20 ">

    <ComparisonHeader headerData={data?.compareTypes} price={price} />

    <div className="border-t border-gray-100 flex flex-col ">
      {/* Define display order: Latency, Throughput, Accuracy */}
    {[
      ['latency', dataRows?.latency],
      ['throughput', dataRows?.throughput],
      ['accuracy', dataRows?.accuracy]
    ]
      .filter(([, value]) => value) // Only show metrics that exist
      .map(([metricName, metricObj], index) => (
        <ComparisonRow
          key={metricName + index}
          name={metricName}
          metric={metricObj}
          compareTypes={data?.compareTypes}
          isPrompt={isPrompt}
        />
      ))}
    </div>

  </div>

   </>
);
});

export default ComparisonContainer;