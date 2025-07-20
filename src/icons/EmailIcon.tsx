import * as React from "react";

interface EmailIconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Controls the stroke color of the icon.
   * Can be a CSS color string (e.g., "red", "#HEXCODE")
   * or a URL to an SVG gradient (e.g., "url(#paint0_linear_3041_23579)").
   * Defaults to "none" if not provided, making the stroke invisible.
   */
  stroke?: string;
}

export function EmailIcon({ stroke, ...props }: EmailIconProps) {
  // Determine the base stroke value. If 'stroke' prop is provided, use it.
  // Otherwise, default to 'none' for no stroke.
  const defaultStrokeValue = "none"; // Default if no stroke prop is passed at all

  // Helper function to get the stroke for a specific path
  const getPathStroke = (defaultGradientId: string): string => {
    // If the 'stroke' prop was provided, use it.
    if (stroke !== undefined) {
      return stroke;
    }
    // If no 'stroke' prop was provided, default to the original gradient.
    return `url(#${defaultGradientId})`;
  };

  // Check if any gradient IDs are being used, either by default or explicitly.
  const usesGradient =
    (stroke?.startsWith("url(") || stroke === undefined);

  return (
    <svg
      width="22"
      height="21"
      viewBox="0 0 22 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.83331 7.58333C1.83331 4.375 3.66665 3 6.41665 3H15.5833C18.3333 3 20.1666 4.375 20.1666 7.58333V14C20.1666 17.2083 18.3333 18.5833 15.5833 18.5833H6.41665"
        stroke={getPathStroke("paint0_linear_3041_23579")}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5834 8.04199L12.7142 10.3337C11.77 11.0853 10.2208 11.0853 9.27668 10.3337L6.41669 8.04199"
        stroke={getPathStroke("paint1_linear_3041_23579")}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.83331 14.917H7.33331"
        stroke={getPathStroke("paint2_linear_3041_23579")}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.83331 11.2502H4.58331"
        stroke={getPathStroke("paint3_linear_3041_23579")}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        {/* Only include gradients if the stroke prop indicates their use or if no stroke is provided (defaulting to gradient) */}
        {usesGradient && (
          <>
            <linearGradient
              id="paint0_linear_3041_23579"
              x1="1.83331"
              y1="3"
              x2="17.2131"
              y2="21.0939"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#007A8B" />
              <stop offset="0.370071" stopColor="#3AAF4D" />
              <stop offset="0.855716" stopColor="#A8CB38" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_3041_23579"
              x1="6.41669"
              y1="8.04199"
              x2="8.03827"
              y2="13.2477"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#007A8B" />
              <stop offset="0.370071" stopColor="#3AAF4D" />
              <stop offset="0.855716" stopColor="#A8CB38" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_3041_23579"
              x1="1.83331"
              y1="14.917"
              x2="2.18531"
              y2="16.853"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#007A8B" />
              <stop offset="0.370071" stopColor="#3AAF4D" />
              <stop offset="0.855716" stopColor="#A8CB38" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_3041_23579"
              x1="1.83331"
              y1="11.2502"
              x2="2.47565"
              y2="13.0167"
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