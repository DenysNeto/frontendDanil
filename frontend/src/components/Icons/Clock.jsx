
import * as React from "react";
const Clock = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
   <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 7.89936 4.46819 4.3752 8 2.83209M12 6V12L16 14" stroke="#303030" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

  </svg>
);
export default Clock;
