import { horizontalScale, verticalScale } from '@Theme/Metrics';
import React, { version } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Svg, Path, Rect } from 'react-native-svg';

interface Props extends TouchableOpacityProps {
  iconColor?: string;
}
export const Gallery: React.FC<Props> = ({ ...restProps }) => (
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
        d="M35 21V35H21V21H35ZM35 19H21C19.9 19 19 19.9 19 21V35C19 36.1 19.9 37 21 37H35C36.1 37 37 36.1 37 35V21C37 19.9 36.1 19 35 19ZM30.14 27.86L27.14 31.73L25 29.14L22 33H34L30.14 27.86Z"
        fill="#F5F6F7"
      />
    </Svg>
  </TouchableOpacity>
);
export default Gallery;
