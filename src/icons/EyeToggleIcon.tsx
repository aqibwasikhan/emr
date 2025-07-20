// src/icons/EyeToggleIcon.tsx
import * as React from "react";
import { EyeShowIcon } from "./EyeShowIcon";
import { EyeHideIcon } from "./EyehideIcon";

export function EyeToggleIcon({
  show,
  ...props
}: { show: boolean } & React.SVGProps<SVGSVGElement>) {
  if (show) {
    return <EyeShowIcon {...props} />;
  }

  return (
    <EyeHideIcon {...props} />

  );
}
