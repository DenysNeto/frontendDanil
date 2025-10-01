import { FaAngleDoubleDown,FaAngleDoubleUp  } from "react-icons/fa";


export default function ScrollButton({ toTop, text, step = 600 }) {
    


    if(toTop) return(
         <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-4 py-2  text-gray-400 rounded"
            >
            {text ? text : <FaAngleDoubleUp/>}
        </button>
    )
    else{
        return(
                <button
        onClick={() => window.scrollBy({ top: step, behavior: "smooth" })}
        className="px-4 py-2  text-gray-400 rounded"
        >
        {text ? text : <FaAngleDoubleDown/>}
        </button>
        )
    }
    
   

}