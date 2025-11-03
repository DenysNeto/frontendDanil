import React from "react";
import ComparisonRow from "./ComparisonRow";
import ComparisonHeader from "./ComparisonHeader";


const ComparisonContainer = React.memo(function ComparisonContainer({data ,isPrompt, showHeader = true, stickyHeader = false}) {
  const dataRows = data?.compareFields ? data.compareFields : data;
  const price = data?.price;
  const costSaving = data?.cost_saving;
  const baselinePrice = data?.baseline_price;
  const optimizedPrice = data?.optimized_price;

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

  const headerWrapperClass = stickyHeader ? "sticky top-0 z-30 bg-white" : "";

  return (
    <>

  <div className="w-full mx-auto bg-transparent rounded-3xl shadow-[0_10px_20px_rgba(199,233,255,0.3)] !bg-white z-20 ">

    {showHeader && (
      <div className={headerWrapperClass}>
        <ComparisonHeader headerData={data?.compareTypes} price={price} costSaving={costSaving} baselinePrice={baselinePrice} optimizedPrice={optimizedPrice} />
      </div>
    )}

    <div className={showHeader ? "border-t border-gray-100 flex flex-col " : "flex flex-col "}>
      {/* Define display order: Latency, Throughput, Accuracy, Live Data */}
    {[
      ['latency', dataRows?.latency],
      ['throughput', dataRows?.throughput],
      ['accuracy', dataRows?.accuracy],
      ['Live Data', dataRows?.['Live Data']]
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