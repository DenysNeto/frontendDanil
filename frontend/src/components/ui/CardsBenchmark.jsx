import { useBenchmarkStore1 } from "../../store/useBenchmarkStore1";
import Icon from "./Icon.jsx"

export default function CardsBenchmark({ cardsInRow = 3, benchmarks, onSelect =()=>{}}) {
  
  const defaultBenchmarks = useBenchmarkStore1(b=>b.benchmarks)
  benchmarks = benchmarks ?  benchmarks.length>0 ? benchmarks : [] : defaultBenchmarks
const gridColsClass = {
  1: "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
}[cardsInRow] || "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3";

  return (
    <div className={`grid   ${gridColsClass} gap-4 py-4 w-full `}>
      {benchmarks.map((item, i) => (
        <div
          key={'benchmark' + Math.random()*100}
          className="w-[220px] h-[290px] rounded-3xl  overflow-hidden relative group transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl ring-1 ring-white/6 bg-transparent"
          onClick={()=>onSelect(item.title)}
        >
          {item?.img &&     <img
            src={item.img}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-[1.18] z-0 pointer-events-none rounded-3xl"
          />}
      
          <div
            className="absolute   left-0 right-0 bottom-0 h-[70%] z-10 pointer-events-none rounded-b-[28px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.44)70%, rgba(56, 35, 35, 0.6) 100%)",
            }}
          />

          <div className=" relative z-20 p-4 flex flex-col  h-full">
            <div className="flex-1">
            <div className="bg-white  w-max p-4 rounded-full"><Icon name={item.icon || "Code"} className={'min-w-[24px] min-h-[24px] '} /> </div>
            </div>
            <div className="min-h-[35%] flex flex-col justify-end ">
                <div className="text-xl w-1/2 font-semibold text-white leading-tight mb-4">
                {item.title}
              </div >
              <div className="flex w-1/2 justify-end transform transition duration-500 opacity-0 group-hover:translate-x-2/2 group-hover:opacity-100">
              <Icon name="ChevronsRight"  style={{ color:"white"}} />
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}