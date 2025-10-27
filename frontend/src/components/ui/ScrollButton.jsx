import { FaAngleDoubleDown,FaAngleDoubleUp  } from "react-icons/fa";


export default function ScrollButton({ toTop, text, step = 800 }) {
    


    if(toTop) return(
         <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-4 py-2  rounded flex text-center items-center mx-auto cursor-pointer hover:text-[#2E8CFF]"
            >
            {text ? text : <><FaAngleDoubleUp/><span className="pl-2"> Jump to top</span>   </>}
        </button>
    )
    else{
        return(
                <button
        onClick={() => window.scrollBy({ top: step, behavior: "smooth" })}
        className="px-4 py-2   rounded cursor-pointer hover:text-[#2E8CFF]"
        >
        {text ? text : <FaAngleDoubleDown/>}
        </button>
        )
    }
    
   

}