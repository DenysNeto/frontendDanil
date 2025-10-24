import React from "react";

function percentChange(oldVal, newVal) {
  if (oldVal === 0) return newVal === 0 ? 0 : Infinity;
  return ((newVal - oldVal) / oldVal) * 100;
}

export default React.memo(function ComparisonHeader({
  backButton = false,
  price,
  headerData = ["optimized", "baseline"],
}) {
  const hasPrice = price && Object.keys(price).length > 0;
  const input = hasPrice ? Number(price.input_per_million_tokens ?? 0) : null;
  const output = hasPrice ? Number(price.output_per_million_tokens ?? 0) : null;
  const currency = hasPrice ? price.currency ?? "" : "";

  return (
    <div className="flex gap-1 bg-transparent z-20">
      <div className="w-1/5 p-2 flex items-center">
        {backButton === true && <button><HiMiniArrowLeft /></button>}
      </div>

      {headerData.map((item, index) => {
        const key = `hdr-${index}`;
        const lower = item.toLowerCase();
        const showValue =
          hasPrice && lower === "optimized" ? `${output} ${currency}` :
          hasPrice && lower === "baseline" ? `${input} ${currency}` :
          "";

        const pct =
          hasPrice && lower === "optimized" && typeof input === "number" && input !== 0
            ? Math.round(percentChange(input, output) * 100) / 100
            : null;

        return (
          <div key={key} className="w-2/5 text-center  p-4 rounded-t-2xl !bg-[rgba(41,122,151,0.1)] flex justify-between items-center ">
            <div className="text-left">
              <span className="text-sm font-semibold">{item.toUpperCase()}</span>
              {pct !== null && <div className="text-sm">{pct}%</div>}
            </div>
            <div>
              <span className="text-xl font-semibold ">{showValue}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
})