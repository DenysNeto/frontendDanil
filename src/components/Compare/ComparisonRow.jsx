import Metric from "../UI/Metric.jsx"

export default function ComparisonRow({name, metric, compareTypes =[0,1], first }) {

  
 return (
  <div
        key={metric.id || Date.now() }
        className={` flex text-xs rounded-2xl ${first? 'rounded-tr-none' : 'rounded-2xl'}  m-1 z-20 `}
      >
        <div className="w-1/5 flex flex-col gap-1 p-4 ">
          <div className="text-md font-semibold text-gray-800">{ name.toUpperCase() || metric.name.toUpperCase() }</div>
          {metric.improvement || metric.change ? (
            <div className="text-xs text-blue-600 font-medium">
              {metric.improvement || metric.change}
            </div>
          ) : null}
        </div>

        <div className="w-2/5 border-l p-6 border-gray-100  ">
          <div className="w-1/2">
            {metric && metric.unit ? <Metric
            
                      value={metric[compareTypes[0]]}
                      unit={metric.unit}
                    /> : <span>{metric[compareTypes[0]]} </span>}
          </div>
       
        </div>
         

        <div className="w-2/5 border-l p-6  border-gray-100 ">
           <div className="w-1/2 ">
          {metric && metric.unit ? <Metric color='rgba(224, 158, 248, 1)'
                  value={metric[compareTypes[1]]}
            unit={metric.unit}
          /> : <span className="p-6">{metric[compareTypes[1]]} </span>}
          </div>

        </div>
      </div>
);
}