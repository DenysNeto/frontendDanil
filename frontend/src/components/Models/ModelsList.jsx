import React, { useMemo, useState, useEffect, useRef } from "react";
import ModelCard from "./ModelCard";
import { BiArrowFromRight } from "react-icons/bi";
import { BiArrowFromLeft } from "react-icons/bi";
import Icon from "../ui/Icon"

export default function ModelList({ cardsInRow = 3, models = [], pagination = false, onSelect= ()=>{}, compact = false }) {
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

  const prev = () =>
  setPageIndex((p) => (p <= 0 ? pages.length - 1 : p - 1));
  const next = () =>
  setPageIndex((p) => (p >= pages.length - 1 ? 0 : p + 1));
 const goTo = (i) => setPageIndex(() => Math.max(0, Math.min(pages.length - 1, i)));

  if (!pagination) {
    return (
        <div className={`flex flex-row w-full max-w-full flex-wrap gap-3 sm:gap-4 md:gap-6`}>
        {models && models.length > 0 ? models.map((model, index) => (
        <ModelCard key={index} {...model} onSelect={() => onSelect(model.id)} compact={compact}/>
        )) : <ModelCard compact={compact} />}
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
              className="absolute left-0 md:left-[-4vw] top-1/2 -translate-y-1/2 z-10"
            >
                  <Icon name={'ArrowLeft'} className={'w-10 h-10 md:w-14 md:h-14 transition-all duration-300 hover:scale-110 text-gray-500 border border-gray-300 rounded-full p-3 bg-white shadow-sm'} />
                 
            </button>

            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-0 md:right-[-4vw] top-1/2 -translate-y-1/2 z-10"
               >
                <Icon name={'ArrowRight'} className={'w-10 h-10 md:w-14 md:h-14 transition-all duration-300 hover:scale-110 text-gray-500 border border-gray-300 rounded-full p-3 bg-white shadow-sm'} />

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
                className="w-full flex-shrink-0 px-2 sm:px-4 md:px-6 py-4"
                style={{ width: `${100 / pages.length}%` }}
              >
                <div className={`flex flex-row w-full max-w-full flex-wrap gap-3 sm:gap-4 md:gap-6`}>
                  {chunk.map((model, i) => (
                    <ModelCard key={i} {...model} onSelect={() => onSelect(model.id)} compact={compact}/>
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