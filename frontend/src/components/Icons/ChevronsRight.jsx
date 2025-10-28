import * as React from "react";
const SvgChevronsRight = (props) => (
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
      d="m13 16 4-4-4-4m-6 8 4-4-4-4"
    />
  </svg>
);
export default SvgChevronsRight;
