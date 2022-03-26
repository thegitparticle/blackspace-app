import React from "react";

import Svg, { Ellipse, G, Rect } from "react-native-svg";

export default function GradientBgBehindGlass(props) {
  return (
    <Svg
      width="375"
      height="949"
      viewBox="0 0 375 949"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G clip-path="url(#clip0_113_6061)">
        <Rect y="-1" width="375" height="950" fill="#050505" />
        <G filter="url(#filter0_f_113_6061)">
          <Ellipse
            cx="-418.441"
            cy="763.916"
            rx="760.779"
            ry="258.856"
            transform="rotate(-9.66573 -418.441 763.916)"
            fill="#00FFFF"
            fill-opacity="0.5"
          />
        </G>
        <G filter="url(#filter1_f_113_6061)">
          <Ellipse
            cx="375.457"
            cy="218.988"
            rx="230.5"
            ry="187"
            transform="rotate(-8.7784 375.457 218.988)"
            fill="#FFB39B"
          />
        </G>
      </G>
      <defs>
        <filter
          id="filter0_f_113_6061"
          x="-1469.7"
          y="178.488"
          width="2102.52"
          height="1170.86"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="150"
            result="effect1_foregroundBlur_113_6061"
          />
        </filter>
        <filter
          id="filter1_f_113_6061"
          x="-54.1481"
          y="-169.174"
          width="859.21"
          height="776.324"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="100"
            result="effect1_foregroundBlur_113_6061"
          />
        </filter>
        <clipPath id="clip0_113_6061">
          <Rect
            width="375"
            height="950"
            fill="white"
            transform="translate(0 -1)"
          />
        </clipPath>
      </defs>
    </Svg>
  );
}
