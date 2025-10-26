import { useNavigate } from "react-router-dom";
import { HiMiniArrowLeft } from "react-icons/hi2";
import { Button } from "./Buttons";
export default function ViewTitle({
  title,
  titleCustom,
  children,
  subtitle,
  subtitleCustom,
  uptitle,
  desc,
  actionText,
  actionVariant= "secondary",
  onAction=()=>{},
  uptitleSize = 2,
  uptitleSmall = false,
  titleSize = 3,
  subtitleSize = 1,
  align,
  alignV, 
  backButton = false
}) {
const navigate= useNavigate()
const alignmentClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
}[align] || "text-center";

const verticalAlignmentClass = {
  top: "align-top",
  middle: "align-middle",
  bottom: "align-bottom",
}[alignV] || "align-middle";


  return (
    <div className={`flex  items-center ${verticalAlignmentClass} ${alignmentClass}  px-4  w-full mt-8`} >


      <div className={`${alignmentClass=="text-left" ?  '' : 'mx-auto'  } w-full`}>
               {backButton && ( <button
            onClick={() => navigate(-1)}
            className="mb-2 flex items-center gap-2 text-gray-700 hover:text-black transition"
          >
            <HiMiniArrowLeft className="text-xl" />

          </button>)}
        {uptitle && (
          <h2
            className={`${
              uptitleSmall ? "text-xs" : `text-${uptitleSize}xl `
            } font-bold mb-2`}
          >
            {uptitle}
          </h2>
        )}

        {/* если передан titleCustom — отрисовываем его */}
        {titleCustom ? (
          titleCustom
        ) :  titleCustom != "" ? (
          <h1 className={`text-${titleSize}xl font-semibold`}>
            {title || ""}
          </h1>
        ): null}

        {subtitleCustom ? subtitleCustom : (    <h4 className={`text-${subtitleSize}xl font-semibold mt-2`}>
            {subtitle}
          </h4>)}

        <div className="mt-4 text-base">
          {desc
            ? desc.split("\n").map((line, index) => (
                <div key={index} className="mb-2">
                  {line}
                </div>
              ))
            : ""}
        </div>

        {actionText && 
        <div className="flex py-3">
          <Button onSelect={onAction} size={'lg'} variant={actionVariant}><span className="text-white text-lg"> {actionText} »</span> </Button>
                    
            </div>
        }
            
        {children}
      </div>
    </div>
  );
}