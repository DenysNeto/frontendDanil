import * as React from "react";
const SvgSearch = (props) => (
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
      d="m21 21-4.341-4.345A7.9 7.9 0 0 1 11 19a8 8 0 1 1 7.406-4.968"
    />
  </svg>
);
export default SvgSearch;
