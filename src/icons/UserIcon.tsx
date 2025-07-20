// src/icons/UserIcon.tsx

import * as React from "react";

interface UserIconProps extends React.SVGProps<SVGSVGElement> {

  stroke?: string; // This prop will directly control the stroke color/gradient URL
}

export function UserIcon({ stroke, ...props }: UserIconProps) {
  const currentStroke = stroke || "url(#paint0_linear_2974_2154)";

  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.63992 9.54183C9.54738 9.53257 9.43632 9.53257 9.33452 9.54183C7.13193 9.46779 5.38281 7.66314 5.38281 5.44204C5.38281 3.17467 7.21522 1.33301 9.49185 1.33301C11.7592 1.33301 13.6009 3.17467 13.6009 5.44204C13.5916 7.66314 11.8425 9.46779 9.63992 9.54183Z"
        stroke={currentStroke} // Apply the stroke prop here
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.01174 12.9567C2.77213 14.456 2.77213 16.8992 5.01174 18.3892C7.55675 20.092 11.7306 20.092 14.2756 18.3892C16.5152 16.8899 16.5152 14.4467 14.2756 12.9567C11.7398 11.2631 7.566 11.2631 5.01174 12.9567Z"
        stroke={currentStroke} // Apply the same stroke prop here
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        {/* Only include gradients if the stroke prop indicates their use */}
        {currentStroke.startsWith("url(") && (
          <>
            <linearGradient
              id="paint0_linear_2974_2154"
              x1="5.38281"
              y1="1.33301"
              x2="13.5916"
              y2="9.55108"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#007A8B" />
              <stop offset="0.370071" stopColor="#3AAF4D" />
              <stop offset="0.855716" stopColor="#A8CB38" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_2974_2154"
              x1="3.33203"
              y1="11.6865"
              x2="10.5403"
              y2="23.0894"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#007A8B" />
              <stop offset="0.370071" stopColor="#3AAF4D" />
              <stop offset="0.855716" stopColor="#A8CB38" />
            </linearGradient>
          </>
        )}
      </defs>
    </svg>
  );
}