"use client";

import { useId, type ReactNode, type SVGProps } from "react";

export const ORBIT_STUDIO_LOGO_VIEWBOX = 1000;
export const ORBIT_STUDIO_LOGO_ORBIT_CY = 375;

/** Shift the logo down so the SVG orbit ring sits on the 3D globe center. */
export function getLogoOrbitVerticalOffset(logoWidth: number): number {
  return logoWidth * (0.5 - ORBIT_STUDIO_LOGO_ORBIT_CY / ORBIT_STUDIO_LOGO_VIEWBOX);
}

type OrbitStudioLogoProps = SVGProps<SVGSVGElement>;

export function OrbitStudioLogo({
  className,
  ...props
}: OrbitStudioLogoProps): ReactNode {
  const id = useId().replace(/:/g, "");
  const mainGradientId = `${id}-orbitMain`;
  const thinGradientId = `${id}-orbitThin`;
  const glowGradientId = `${id}-orbitGlow`;
  const glowFilterId = `${id}-softGlow`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient
          id={mainGradientId}
          x1="310"
          y1="195"
          x2="705"
          y2="590"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.42" stopColor="#D9DDE2" />
          <stop offset="0.72" stopColor="#7D838B" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
        <linearGradient
          id={thinGradientId}
          x1="270"
          y1="500"
          x2="745"
          y2="285"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#777D85" />
          <stop offset="0.28" stopColor="#FFFFFF" />
          <stop offset="0.72" stopColor="#E7E9EC" />
          <stop offset="1" stopColor="#777D85" />
        </linearGradient>
        <radialGradient id={glowGradientId}>
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="0.35" stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <filter
          id={glowFilterId}
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      <circle
        cx="500"
        cy="375"
        r="184"
        stroke={`url(#${mainGradientId})`}
        strokeWidth="13"
        strokeLinecap="round"
        transform="rotate(-18 500 375)"
      />
      <ellipse
        cx="500"
        cy="400"
        rx="252"
        ry="92"
        stroke={`url(#${thinGradientId})`}
        strokeWidth="4"
        transform="rotate(-25 500 400)"
      />
      <circle
        cx="641"
        cy="267"
        r="38"
        fill={`url(#${glowGradientId})`}
        filter={`url(#${glowFilterId})`}
      />
      <circle cx="641" cy="267" r="11" fill="#FFFFFF" />

      <text
        x="500"
        y="705"
        fill="#FFFFFF"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="112"
        fontWeight="300"
        letterSpacing="46"
        textAnchor="middle"
      >
        TESLER
      </text>

      <line
        x1="178"
        y1="773"
        x2="282"
        y2="773"
        stroke="#BFC4CA"
        strokeWidth="2"
      />
      <line
        x1="718"
        y1="773"
        x2="822"
        y2="773"
        stroke="#BFC4CA"
        strokeWidth="2"
      />
      <text
        x="500"
        y="790"
        fill="#FFFFFF"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="42"
        fontWeight="300"
        letterSpacing="31"
        textAnchor="middle"
      >
        STUDIO
      </text>
    </svg>
  );
}
