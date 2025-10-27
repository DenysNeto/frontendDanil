import { useNavigate } from "react-router-dom";
import { HiMiniArrowLeft } from "react-icons/hi2";
import { Button } from "./Buttons";
import Icon from "./Icon"
export default function ViewTitle({
  title,
  titleFontSize,
  titleCustom,
  children,
  subtitle,
  subtitleFontSize,
  subtitleCustom,
  uptitle,
  desc,
  actionText,
  actionVariant= "secondary",
  onAction=()=>{},
  uptitleSize,
  uptitleFontSize = '70px',
  uptitleSmall = false,
  uptitleBold = false,
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
    <div className={`flex   ${verticalAlignmentClass} ${alignmentClass}   w-full `} >


      <div className={`${alignmentClass=="text-left" ?  '' : 'mx-auto'  } w-full `}>
               {backButton && ( <button
            onClick={() => navigate(-1)}
            className="mb-2 flex items-center gap-2 text-gray-700 hover:text-black transition"
          >
            <Icon name={'ArrowLeft'} className={'w-7 h-7 mb-6'} />
          </button>)}
        {uptitle && (
          <p className={`mb-3 ${uptitleSize ? `text-${uptitleSize}xl` : 'text-s'}  ${uptitleBold ? 'font-bold' : 'font-semibold '} `}
          >
           {uptitle}
          </p>
        )}

        {titleCustom ? (
          titleCustom
        ) :  titleCustom != "" ? (
          <p className={`text-${titleSize}xl font-semibold`}>
            {title || ""}
          </p>
        ): null}

        {subtitleCustom ? subtitleCustom : (    <h4 className={`text-${subtitleSize}xl  mt-4`}>
            {subtitle}
          </h4>)}

        <div className="mt-4 text-xl">
          {desc
            ? desc.split("\n").map((line, index) => (
                <div key={index} className="mb-2 text-xl">
                  {line}
                </div>
              ))
            : ""}
        </div>

        {actionText && 
        <div className={` flex py-6 ${align=='center' ? 'justify-center items-center' : 'items-center'} `} >
          <Button onSelect={onAction} size={'lg'} variant={actionVariant}><span className="flex justify-center items-center"> {actionText} <Icon name='ChevronsRight' style={{ paddingLeft:"5px" }} /> </span> </Button>
                    
            </div>
        }
            
        {children}
      </div>
    </div>
  );
}