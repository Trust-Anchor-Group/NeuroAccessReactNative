import React from 'react';
import { TouchableOpacityProps, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { verticalScale, horizontalScale } from '@Theme/Metrics';

interface LayerColor extends TouchableOpacityProps {
  textColor?: string;
  logoColor?: string;
}
export const ArrowDownIcon: React.FC<LayerColor> = ({ ...restProps }) => (
  <TouchableOpacity {...restProps}>
    <Svg
      width={horizontalScale(25)}
      height={verticalScale(24)}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M7.91 8.29492L12.5 12.8749L17.09 8.29492L18.5 9.70492L12.5 15.7049L6.5 9.70492L7.91 8.29492Z"
        fill={restProps.logoColor}
      />
    </Svg>
  </TouchableOpacity>
);
