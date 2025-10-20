import Metric from "../UI/Metric.jsx"

export default function ComparisonRow({name, metric, compareTypes =[0,1], first }) {

  
 return (
  <div
        key={metric.id || Date.now() }
        className={` flex text-xs rounded-2xl ${first? 'rounded-tr-none' : 'rounded-2xl'}  m-1 z-20 `}
      >
        <div className="w-1/5 flex flex-col gap-1 pr-4 px-6 py-4">
          <div className="text-xs font-semibold text-gray-800">{ name.toUpperCase() || metric.name.toUpperCase() }</div>
          {metric.improvement || metric.change ? (
            <div className="text-xs text-blue-600 font-medium">
              {metric.improvement || metric.change}
            </div>
          ) : null}
        </div>

        <div className="w-2/5 border-l-1 border-gray-100 px-6 py-4 flex justify-center items-center text-center ">
          {metric && metric.unit ? <Metric
  
            value={metric[compareTypes[0]]}
            unit={metric.unit}
          /> : <span>{metric[compareTypes[0]]} </span>}
        </div>
         

        <div className="w-2/5 px-6 py-4 border-l-1 border-gray-100 flex justify-center items-center text-center ">
          {metric && metric.unit ? <Metric
                  value={metric[compareTypes[1]]}
            unit={metric.unit}
          /> : <span className="p-6">{metric[compareTypes[1]]} </span>}


        </div>
      </div>
);
}