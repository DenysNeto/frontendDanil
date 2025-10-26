import React from "react";
import ComparisonRow from "./ComparisonRow";
import ComparisonHeader from "./ComparisonHeader"
import { HiMiniArrowLeft } from "react-icons/hi2";


const ComparisonContainer = React.memo(function ComparisonContainer({backButton=false, header = true, data }) {
  const dataRows = data?.compareFields ? data.compareFields : data;

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
});

export default ComparisonContainer;