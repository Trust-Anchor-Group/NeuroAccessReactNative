import React from 'react';
import { TouchableOpacityProps, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { verticalScale, horizontalScale } from '@Theme/Metrics';

interface LayerColor extends TouchableOpacityProps {
  textColor?: string;
  logoColor?: string;
}
export const ArrowUpIcon: React.FC<LayerColor> = ({ ...restProps }) => (
  <TouchableOpacity {...restProps}>
    <Svg
      width={horizontalScale(13)}
      height={verticalScale(8)}
      viewBox="0 0 13 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M11.09 7.70508L6.5 3.12508L1.91 7.70508L0.5 6.29508L6.5 0.295078L12.5 6.29508L11.09 7.70508Z"
        fill="black"
      />
    </Svg>
  </TouchableOpacity>
);
