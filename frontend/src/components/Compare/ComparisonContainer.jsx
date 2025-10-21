import ComparisonRow from "./ComparisonRow";
import ComparisonHeader from "./ComparisonHeader"
import { HiMiniArrowLeft } from "react-icons/hi2";





export default function ComparisonContainer({backButton=false, header = true, data }) {


  console.log("INSIEDE COMPONENT" , data)
  return (
    <>

   
  <div className="w-full  mx-auto max-h-[60vh] bg-transparent rounded-2xl" >
    
    {header &&   <ComparisonHeader price={data.price} headerData={data && data?.compareTypes ? data.compareTypes:false} /> }


    {Object.entries(data && data.compareFields ? data.compareFields: data).map(([metricName, metricObj], index) => (
  <div key={metricName} className="shadow-[0_10px_20px_rgba(199,233,255,0.3)] rounded-2xl !bg-white z-20">
    <ComparisonRow
      name={metricName}
      metric={metricObj}
      first={index === 0}
      compareTypes={data.compareTypes}
    />
  </div>
))}

  </div>
  
   </>
);
}