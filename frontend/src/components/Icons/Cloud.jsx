import * as React from "react";
const SvgCloud = (props) => (
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
      d="M21.811 12.805a4.38 4.38 0 0 1-.151 2.963c-.19.453-.453.869-.776 1.232-.571.643-1.6 1.138-2.884 1.488L7 18.48c-1.322-.352-2.395-.846-3.009-1.48a7 7 0 0 1-1.081-1.447 7.014 7.014 0 0 1-.23-6.466 7.1 7.1 0 0 1 2.11-2.599 7.25 7.25 0 0 1 3.077-1.365 7.3 7.3 0 0 1 3.371.167 7.2 7.2 0 0 1 2.924 1.664 7.1 7.1 0 0 1 1.832 2.795l1.13-.095a4.55 4.55 0 0 1 2.91.755 4.44 4.44 0 0 1 1.777 2.396"
    />
  </svg>
);
export default SvgCloud;
