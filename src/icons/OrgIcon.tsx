// src/icons/OrgIcon.tsx

import * as React from "react";

export function OrgIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M13.1 23H4.3C2.1 23 1 21.9 1 19.7V10.9C1 8.7 2.1 7.6 4.3 7.6H9.8V19.7C9.8 21.9 10.9 23 13.1 23Z" />
      <path d="M9.921 3.2C9.833 3.53 9.8 3.893 9.8 4.3V7.6H4.3V5.4C4.3 4.19 5.29 3.2 6.5 3.2H9.921Z" />
      <path d="M14.2 7.6V13.1" />
      <path d="M18.601 7.6V13.1" />
      <path d="M17.5 17.5H15.3C14.695 17.5 14.2 17.995 14.2 18.6V23H18.6V18.6C18.6 17.995 18.105 17.5 17.5 17.5Z" />
      <path d="M5.399 13.1V17.5" />
      <path d="M9.8 19.7V4.3C9.8 2.1 10.9 1 13.1 1H19.7C21.9 1 23 2.1 23 4.3V19.7C23 21.9 21.9 23 19.7 23H13.1C10.9 23 9.8 21.9 9.8 19.7Z" />
    </svg>
  );
}
