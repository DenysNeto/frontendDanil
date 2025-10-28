import * as React from "react";

const ArrowRight = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    {...props}
  >
    <path
      d="M5 12H19L12 19M12 5L16 9"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowRight;
