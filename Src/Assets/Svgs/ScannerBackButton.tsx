import { horizontalScale, verticalScale } from '@Theme/Metrics';
import * as React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Svg, { Rect, Path } from 'react-native-svg';

interface Props extends TouchableOpacityProps {
  iconColor?: string;
}

export const ScannerBackButton: React.FC<Props> = ({ ...restProps }) => (
  <TouchableOpacity {...restProps}>
    <Svg
      width={horizontalScale(40)}
      height={verticalScale(40)}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width={horizontalScale(40)} height={verticalScale(40)} rx={8} fill="#F4F5F7" fillOpacity={0.2} />
      <Path
        d="M28 19H15.83L21.42 13.41L20 12L12 20L20 28L21.41 26.59L15.83 21H28V19Z"
        fill="#F5F6F7"
      />
    </Svg>
  </TouchableOpacity>
);
