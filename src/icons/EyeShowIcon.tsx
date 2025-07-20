import * as React from "react";

export function EyeShowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.6782 9.62475C13.6782 11.5277 12.1405 13.0654 10.2375 13.0654C8.3346 13.0654 6.79688 11.5277 6.79688 9.62475C6.79688 7.72181 8.3346 6.18408 10.2375 6.18408C12.1405 6.18408 13.6782 7.72181 13.6782 9.62475Z"
        stroke="url(#paint0_linear)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.2375 17.5726C13.6302 17.5726 16.7921 15.5736 18.993 12.1137C19.8579 10.7586 19.8579 8.4808 18.993 7.12568C16.7921 3.66579 13.6302 1.66675 10.2375 1.66675C6.84493 1.66675 3.68298 3.66579 1.4821 7.12568C0.617131 8.4808 0.617131 10.7586 1.4821 12.1137C3.68298 15.5736 6.84493 17.5726 10.2375 17.5726Z"
        stroke="url(#paint1_linear)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="6.79688"
          y1="6.18408"
          x2="13.6782"
          y2="13.0654"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#007A8B" />
          <stop offset="0.370071" stopColor="#3AAF4D" />
          <stop offset="0.855716" stopColor="#A8CB38" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="0.833374"
          y1="1.66675"
          x2="16.5184"
          y2="20.2139"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#007A8B" />
          <stop offset="0.370071" stopColor="#3AAF4D" />
          <stop offset="0.855716" stopColor="#A8CB38" />
        </linearGradient>
      </defs>
    </svg>
  );
}
