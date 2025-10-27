import * as React from "react";
const SvgCntxLength = (props) => (
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
      d="M12 19h8M4 17l4-4m2-2L4 5"
    />
  </svg>
);
export default SvgCntxLength;
