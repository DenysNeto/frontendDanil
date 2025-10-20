import Metric from "../UI/Metric.jsx"

export default function ComparisonRow({ metric, first }) {

  let metricType = metric.unit == 'ms' ? 'half-circle'  : metric.unit == "%" ? 'circle' : "progress" 
 return (
  <div
        key={metric.id}
        className={` flex text-xs rounded-2xl ${first? 'rounded-tr-none' : 'rounded-2xl'}  m-1 z-20 `}
      >
        {/* Metric label + note */}
        <div className="w-1/5 flex flex-col gap-1 pr-4 px-6 py-4">
          <div className="text-xs font-semibold text-gray-800">{metric.type.toUpperCase()}</div>
          {metric.improvement || metric.change ? (
            <div className="text-xs text-blue-600 font-medium">
              {metric.improvement || metric.change}
            </div>
          ) : null}
        </div>

        {/* Optimized */}
        <div className="w-2/5 border-l-1 border-gray-100 px-6 py-4 flex justify-center items-center text-center ">
          {metric && metric.unit ? <Metric
            type = {metricType}
            value={metric.values[0]}
            unit={metric.unit}
          /> : <span>{metric.values[0]} </span>}
        </div>
         

        {/* Baseline */}
        <div className="w-2/5 px-6 py-4 border-l-1 border-gray-100 flex justify-center items-center text-center ">
          {metric && metric.unit ? <Metric
            type = {metricType}
            value={metric.values[1]}
            unit={metric.unit}
          /> : <span className="p-6">{metric.values[1]} </span>}


        </div>
      </div>
);
}