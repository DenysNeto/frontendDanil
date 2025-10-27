import * as React from "react";
const SvgPrice = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={23}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 7.5v5.77l7.617 7.61a1.773 1.773 0 0 0 2.51 0l6.357-6.36a1.774 1.774 0 0 0 0-2.5L9.867 4.4H6m-.99 4s-.007.003-.01 0c-3-3-3-9 2-7"
    />
  </svg>
);
export default SvgPrice;
