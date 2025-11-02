import * as React from "react";
const SvgStore = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#303030"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 12h4M6 8h12m3 0v13H3V8H1V3h22v5z"
    />
  </svg>
);
export default SvgStore;
