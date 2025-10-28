import * as React from "react";
const SvgCube = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={22}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 17.998v-7m0 0-6-3.5m6 3.5 1.006-.576 7.726-4.423a2 2 0 0 1 .268.999v8a2 2 0 0 1-1 1.73l-7 4a2 2 0 0 1-2 0l-7-4a2 2 0 0 1-1-1.73v-8a2 2 0 0 1 1-1.73l7-4a2 2 0 0 1 2 0l5 2.857"
    />
  </svg>
);
export default SvgCube;
