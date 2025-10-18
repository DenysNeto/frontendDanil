export default function Metric({type, value, unit}){
    if(type == "circle"){
        return (
                <>
                    <div class="relative w-24 h-24">
                    <svg class="absolute top-0 left-0 w-full h-full">
                        <circle
                        class="text-gray-300"
                        stroke-width="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50%"
                        cy="50%"
                        />
                        <circle
                        class="text-blue-500 progress-ring__circle"
                        stroke-width="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50%"
                        cy="50%"
                        stroke-dasharray="251.2"
                        stroke-dashoffset="75.36"
                        />
                    </svg>

                    <div class="absolute inset-0 flex items-center justify-center">
                        <span class="text-sm font-semibold text-blue-600">{value}</span>
                       {unit && <span class="text-sm font-semibold text-blue-600">{unit}</span> }
                    </div>
                    </div>


                </>
            )
    }
    if(type == "half-circle"){
return (
  <div className="flex flex-col items-center">
    <svg viewBox="0 0 100 50" className="w-32 h-16">
      <path
        d="M10,50 A40,40 0 0,1 90,50"
      stroke="#d1d5db"

        strokeWidth="10"
        fill="none"
      />
      <path
        d="M10,50 A40,40 0 0,1 90,50"
        stroke="blue"
        strokeWidth="10"
        fill="none"
        strokeDasharray="125"
        strokeDashoffset="50"
      />
    </svg>

    <div className="mt-2 text-sm font-semibold text-blue-600">
      {value} {unit}
    </div>
  </div>
);


    }

    if(type == "progress"){
        return(
        <>
            <div className="flex flex-col w-full">
                            <div class="bg-gray-200 rounded-full mx-8">
                    <div class="bg-blue-600 h-3  rounded-full" style={{width:40 + "%"}}></div>
                </div>
                <span className="mt-4">{value} {unit}</span>

            </div>

        </>)
    }
   
}