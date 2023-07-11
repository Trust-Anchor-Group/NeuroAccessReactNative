import { horizontalScale, verticalScale } from '@Theme/Metrics';
import React from 'react';
import { TouchableOpacityProps, TouchableOpacity } from 'react-native';
import { Svg, Path, Rect } from 'react-native-svg';
interface Props extends TouchableOpacityProps {
  iconColor?: string;
}
export const FlashLight: React.FC<Props> = ({ ...restProps }) => (
  <TouchableOpacity {...restProps}>
    <Svg
      width={horizontalScale(56)}
      height={verticalScale(56)}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width={horizontalScale(56)} height={verticalScale(56)} rx={8} fill="#F4F5F7" fillOpacity={0.2} />
      <Path
        d="M34 18H22V24L24 27V38H32V27L34 24V18ZM32 20V21H24V20H32ZM30 26.4V36H26V26.39L24 23.39V23H32V23.39L30 26.4Z"
        fill="#F5F6F7"
      />
      <Path
        d="M28 31.5C28.8284 31.5 29.5 30.8284 29.5 30C29.5 29.1716 28.8284 28.5 28 28.5C27.1716 28.5 26.5 29.1716 26.5 30C26.5 30.8284 27.1716 31.5 28 31.5Z"
        fill="#F5F6F7"
      />
    </Svg>
  </TouchableOpacity>
);
