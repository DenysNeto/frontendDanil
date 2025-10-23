import React, { useEffect, useRef } from "react";

export default React.memo(function Metric({
  type,
  value,
  unit,
  color = "rgba(46,140,255,1)",
  max = 100,
  animate = true,
  className = "",
}) {
  const hasAnimatedRef = useRef(false);
  const circleRef = useRef(null);
  const halfRef = useRef(null);
  const barRef = useRef(null);

  const c = color;
  const numeric = (() => {
    if (typeof value === "number") return value;
    const num = Number(String(value).replace("%", ""));
    return Number.isFinite(num) ? num : 0;
  })();

  const pct = Math.max(0, Math.min(100, Math.round((numeric / (max || 100)) * 100)));
  type = type ?? (unit === "%" ? "circle" : "progress");

  const SVG_SIZE = 100;
  const strokeWidth = 8;
  const R = SVG_SIZE / 2 - strokeWidth / 2;
  const CIRCUMFERENCE = 2 * Math.PI * R;
  const circleOffset = Math.round(CIRCUMFERENCE * (1 - pct / 100));
  const HALF_LENGTH = CIRCUMFERENCE / 2;
  const halfOffset = Math.round(HALF_LENGTH * (1 - pct / 100));

  useEffect(() => {
    if (!animate || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    if (type === "circle" && circleRef.current) {
      const el = circleRef.current;
      el.style.transition = "stroke-dashoffset 700ms cubic-bezier(.2,.9,.2,1)";
      requestAnimationFrame(() => {
        el.style.strokeDashoffset = circleOffset;
      });
    }

    if (type === "half-circle" && halfRef.current) {
      const el = halfRef.current;
      el.style.transition = "stroke-dashoffset 700ms cubic-bezier(.2,.9,.2,1)";
      requestAnimationFrame(() => {
        el.style.strokeDashoffset = halfOffset;
      });
    }

    if (type === "progress" && barRef.current) {
      const el = barRef.current;
      el.style.transition = "width 600ms ease";
      requestAnimationFrame(() => {
        el.style.width = `${pct}%`;
      });
    }
  }, []);

  if (type === "circle") {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <div className="relative w-24 h-24">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}>
            <circle
              cx={SVG_SIZE / 2}
              cy={SVG_SIZE / 2}
              r={R}
              stroke="#e5e7eb"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            <circle
              ref={circleRef}
              cx={SVG_SIZE / 2}
              cy={SVG_SIZE / 2}
              r={R}
              stroke={c}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE}
              strokeLinecap="round"
              transform={`rotate(-90 ${SVG_SIZE / 2} ${SVG_SIZE / 2})`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-semibold text-gray-700">{numeric}</span>
            {unit && <span className="text-md text-gray-500">{unit}</span>}
          </div>
        </div>
      </div>
    );
  }

  if (type === "half-circle") {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <svg viewBox="0 0 100 50" className="w-32 h-16" preserveAspectRatio="xMidYMid meet">
          <path
            d="M10,50 A40,40 0 0,1 90,50"
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
          />
          <path
            ref={halfRef}
            d="M10,50 A40,40 0 0,1 90,50"
            stroke={c}
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={HALF_LENGTH}
            strokeDashoffset={HALF_LENGTH}
          />
        </svg>
        <div className="mt-2 text-sm font-semibold" style={{ color: c }}>
          {numeric} {unit}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className="bg-gray-200 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-3 rounded-full"
          style={{
            width: "0%",
            background: c,
          }}
        />
      </div>
      <span className="mt-4 text-xl text-black">
        {numeric} {unit}
      </span>
    </div>
  );
});