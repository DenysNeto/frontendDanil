




export default function ComparisonHeader({backButton = false, headerData= ["optimized", "baseline"]}){
 
    return (

        <div className="flex  gap-1  bg-transparent z-20 ">
            <div className="w-1/5 p-2 flex items-center">
                {backButton==true && <button><HiMiniArrowLeft/></button>}
            </div>
        
            {headerData && headerData.map((item, index) => (
                <div  className="w-2/5   text-center p-2 rounded-t-2xl font-semibold text-sm !bg-[rgba(41,122,151,0.1)]" >
                {item.toUpperCase()}
            </div>
          ))}
        </div>


    )
}