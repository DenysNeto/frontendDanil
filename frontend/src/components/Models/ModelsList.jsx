import React, { useMemo, useState, useEffect, useRef } from "react";
import ModelCard from "./ModelCard";
import { BiArrowFromRight } from "react-icons/bi";
import { BiArrowFromLeft } from "react-icons/bi";


export default function ModelList({ cardsInRow = 3, models = [], pagination = false,onSelect= ()=>{} }) {
  const gridColsClass = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
  }[cardsInRow] || "lg:grid-cols-3";




  const itemsPerPage = Math.max(1, cardsInRow);

  const pages = useMemo(() => {
    if (!models || models.length === 0) return [[]];
    const chunks = [];
    for (let i = 0; i < models.length; i += itemsPerPage) {
      chunks.push(models.slice(i, i + itemsPerPage));
    }
    return chunks;
  }, [models, itemsPerPage]);

  const [pageIndex, setPageIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    setPageIndex(0);
  }, [models, itemsPerPage, pagination]);

  const prev = () => setPageIndex((p) => Math.max(0, p - 1));
  const next = () => setPageIndex((p) => Math.min(pages.length - 1, p + 1));
  const goTo = (i) => setPageIndex(() => Math.max(0, Math.min(pages.length - 1, i)));

  if (!pagination) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 ${gridColsClass} gap-6 p-6 w-full`}>
        {models && models.length > 0 ? models.map((model, index) => (
          <ModelCard key={index} {...model} onSelect={() => onSelect(model.id)}/>
        )) : <ModelCard />}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative max-w-full mx-auto">
        {pages.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute translate-x-[-20px]  top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white shadow-sm hover:shadow-md"
            >
              <BiArrowFromRight/>
            </button>

            <button
              onClick={next}
              aria-label="Next"
              className="absolute translate-x-[20px] right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white shadow-sm hover:shadow-md"
            >
              <BiArrowFromLeft/>
            </button>
          </>
        )}

        <div className="overflow-hidden" ref={containerRef}>
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              width: `${pages.length * 100}%`,
              transform: `translateX(-${pageIndex * (100 / pages.length)}%)`,
            }}
          >
            {pages.map((chunk, pageIdx) => (
              <div
                key={pageIdx}
                className="w-full flex-shrink-0 px-6 py-4"
                style={{ width: `${100 / pages.length}%` }}
              >
                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 ${gridColsClass} gap-6`}>
                  {chunk.map((model, i) => (
                    <ModelCard key={i} {...model} onSelect={() => onSelect(model.id)}/>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {pages.length > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full ${i === pageIndex ? "bg-gray-800" : "bg-gray-300"}`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}