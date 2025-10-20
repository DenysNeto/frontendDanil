export default function ViewTitle({
  title,
  titleCustom,
  children,
  subtitle,
  subtitleCustom,
  uptitle,
  desc,
  actionText,
  onAction=()=>{},
  uptitleSize = 2,
  uptitleSmall = false,
  titleSize = 3,
  subtitleSize = 1,
  align
}) {

const alignmentClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
}[align] || "text-center";

  return (
    <div className={`flex  items-center text-center  px-4 ${alignmentClass} w-full`} >
      <div className={`${alignmentClass=="text-left" ?  '' : 'mx-auto'  } w-full`}>
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
        <div className="flex py-10">
                    <button onClick={onAction} className="bg-gray-900 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-dashed transition hover:bg-gray-800">
                    {actionText} <span className="text-white text-lg">»</span>
                    </button>
                    
            </div>
        }
            
        {children}
      </div>
    </div>
  );
}