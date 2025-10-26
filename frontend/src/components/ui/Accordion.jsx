import { useState } from "react";
import { FiPlus,FiMinus   } from "react-icons/fi";


export default function Accordion({ data }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {data.map((item, index) => (
        <div key={index} className=" rounded-2xl overflow-hidden mb-4 bg-white shadow-[0_10px_15px_rgba(199,233,255,0.9)] ">
          {/* Заголовок */}
          <button
            onClick={() => toggle(index)}
            className="w-full flex justify-between text-xl   items-center px-4 py-5  hover:bg-gray-100 text-left"
          >
            <span className="font-medium text-gray-800">{item.title}</span>
            {openIndex === index ? <FiMinus/> : <FiPlus/>}
         
          </button>

          {/* Контент */}
          {openIndex === index && (
            <div className="px-4 py-3 text-sm text-gray-700 bg-white ">
              {item.body || "no text provided"}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}