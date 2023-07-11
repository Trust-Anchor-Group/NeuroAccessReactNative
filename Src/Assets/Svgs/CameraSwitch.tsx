import { horizontalScale, moderateScale, verticalScale } from '@Theme/Metrics';
import React from 'react';
import { TouchableOpacityProps, TouchableOpacity } from 'react-native';
import { Svg, Path, Rect } from 'react-native-svg';

interface Props extends TouchableOpacityProps {
  iconColor?: string;
  bgColor?: string;
}
export const CameraSwitch: React.FC<Props> = ({ ...restProps }) => (
  <TouchableOpacity {...restProps}>
    <Svg
      width={verticalScale(56)}
      height={horizontalScale(56)}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width={verticalScale(56)} height={horizontalScale(56)} rx={moderateScale(8)} fill={restProps.bgColor} fillOpacity={0.2} />
      <Path
        d="M25 28C25 29.66 26.34 31 28 31C29.66 31 31 29.66 31 28C31 26.34 29.66 25 28 25C26.34 25 25 26.34 25 28Z"
        fill={restProps.iconColor}
      />
      <Path
        d="M24 26V24H21.09C22.47 21.61 25.05 20 28 20C31.72 20 34.85 22.56 35.74 26H37.8C36.87 21.44 32.84 18 28 18C24.73 18 21.82 19.58 20 22.01V20H18V26H24Z"
        fill={restProps.iconColor}
      />
      <Path
        d="M32 30V32H34.91C33.53 34.39 30.95 36 28 36C24.28 36 21.15 33.44 20.26 30H18.2C19.13 34.56 23.16 38 28 38C31.27 38 34.18 36.42 36 33.99V36H38V30H32Z"
        fill={restProps.iconColor}
      />
    </Svg>
  </TouchableOpacity>
);
