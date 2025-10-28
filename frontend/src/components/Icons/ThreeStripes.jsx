import * as React from "react";
const Svg3Stripes = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 18h18M3 12h18M3 6h18"
    />
  </svg>
);
export default Svg3Stripes;
