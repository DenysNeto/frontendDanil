import { useBenchmarkStore1 } from "../../store/useBenchmarkStore1";


export default function CardsBenchmark({ cardsInRow = 3, benchmarks=[], onSelect =()=>{}}) {
  
  const defaultBenchmarks = useBenchmarkStore1(b=>b.benchmarks)
  benchmarks = benchmarks && benchmarks.length>0 ? benchmarks : defaultBenchmarks
  const gridColsClass = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
  }[cardsInRow] || "lg:grid-cols-3";

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 ${gridColsClass} gap-6 px-6 py-4 w-full`}>
      {benchmarks.map((item, i) => (
        <div
          key={'benchmark' + {i}}
          className="w-full pt-36 pb-6  flex-1 min-h-[300px] max-h-[500px] rounded-[28px] shadow-xl overflow-hidden relative group transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl ring-1 ring-white/6 bg-transparent"
          onClick={()=>onSelect(item.title)}
        >
          {item?.img &&     <img
            src={item.img}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-[1.18] z-0 pointer-events-none rounded-[28px]"
          />}
      
          <div
            className="absolute left-0 right-0 bottom-0 h-[65%] z-10 pointer-events-none rounded-b-[28px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 20%, rgba(0,0,0,0.3)70%, rgba(56, 35, 35, 0.6) 100%)",
            }}
          />
          <div className="relative z-20 p-5 flex flex-col justify-center h-full">
            <div className="mt-2 font-semibold text-white leading-tight text-lg">
              {item.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}