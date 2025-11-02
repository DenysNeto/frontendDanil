import React from "react";

function percentChange(oldVal, newVal) {
  if (oldVal === 0) return newVal === 0 ? 0 : Infinity;
  return ((newVal - oldVal) / oldVal) * 100;
}

export default function ComparisonHeader({
  backButton = false,
  price,
  baselinePrice = null,
  optimizedPrice = null,
  headerData = ["optimized", "baseline"],
  costSaving = null,
}) {


  const hasPrice = price && Object.keys(price).length > 0;
  const input = hasPrice ? Number(price.input_per_million_tokens ?? 0) : null;
  const output = hasPrice ? Number(price.output_per_million_tokens ?? 0) : null;

  // Use separate prices if provided
  const baselinePriceValue = baselinePrice ? Number(baselinePrice.input_per_million_tokens ?? 0) : input;
  const optimizedPriceValue = optimizedPrice ? Number(optimizedPrice.input_per_million_tokens ?? 0) : output;

  return (

    <div className="flex w-full  z-20 border-b border-gray-100">
      <div className="!w-[250px]   bg-tansparent flex flex-col gap-1 p-6">
        {backButton === true && <button><HiMiniArrowLeft /></button>}

      </div>

      {headerData.map((item, index) => {
        const key = `hdr-${index}`;
        const lower = item.toLowerCase();

        const showValue =
          lower === "optimized" && optimizedPriceValue ? `$ ${optimizedPriceValue}` :
          lower === "baseline" && baselinePriceValue ? `$ ${baselinePriceValue}` :
          "";

        // Use costSaving prop if provided, otherwise calculate
        const pct = lower === "optimized" && costSaving !== null
          ? costSaving
          : hasPrice && lower === "optimized" && typeof input === "number" && input !== 0
            ? Math.round(percentChange(input, output) * 100) / 100
            : null;

        return (


          <div key={key}  className=" flex-1 bg-[#297A971A] p-6 flex justify-between items-center rounded-t-3xl">
            <div className="text-left">
              <span className="text-xl font-semibold text-gray-800">{item.toUpperCase()}</span>
              {pct !== null && <div className="text-sm ">{pct}% cost savings</div>}
            </div>
            <div>
              <span className="font-semibold text-gray-800">
                {showValue.includes('$') ? (
                  <>
                   <span className="text-lg">$</span>
                    <span className="text-[36px]">{showValue.replace('$', '')}</span>
                   
                  </>
                ) : (
                  <span className="text-[36px]">{showValue}</span>
                )}
              </span>
            </div>
          </div>

        );
      })}
    </div>
  );
}