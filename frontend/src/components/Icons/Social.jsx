import * as React from "react";
const SvgSocial = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g
      stroke="#303030"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#Social_svg__a)"
    >
      <path d="M16 3.13a4 4 0 0 1 0 7.75M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M13 21.142c1.388-.25 2.489-.63 3-1.142.072-.647 0-1.667 0-1.667 0-.884-.421-1.732-1.171-2.357-2.37-1.974-10.288-1.974-12.657 0C1.422 16.601 1 17.45 1 18.333c0 0-.072 1.02 0 1.667.512.512 1.612.892 3 1.142M20 21.142c1.388-.25 2.488-.63 3-1.142.072-.647 0-1.667 0-1.667 0-.884-.421-1.732-1.172-2.357-.44-.367-1.074-.666-1.828-.897" />
    </g>
    <defs>
      <clipPath id="Social_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgSocial;
