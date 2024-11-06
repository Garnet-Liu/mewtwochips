import * as React from "react";
import type { SVGProps } from "react";
const SvgPhotos = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1em" height="1em" {...props}>
    <path d="M26 7h-1V6c0-1.654-1.346-3-3-3H6C4.346 3 3 4.346 3 6v16c0 1.654 1.346 3 3 3h1v1c0 1.654 1.346 3 3 3h16c1.654 0 3-1.346 3-3V10c0-1.654-1.346-3-3-3zM6 5h16a1 1 0 0 1 1 1v5.624l-6.1 6.973-6.25-5.356a.998.998 0 0 0-1.357.052L5 17.586V6a1 1 0 0 1 1-1zm21 21a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1v-1h13c1.654 0 3-1.346 3-3V9h1a1 1 0 0 1 1 1v16z" />
    <path d="M16 13c1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3 1.346 3 3 3z" />
  </svg>
);
export default SvgPhotos;
