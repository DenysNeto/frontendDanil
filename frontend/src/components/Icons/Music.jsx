import * as React from "react";
const SvgMusic = (props) => (
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
      d="M6 15a3 3 0 1 0 3 3V5l12-2v13a3 3 0 1 1-3-3"
    />
  </svg>
);
export default SvgMusic;
