import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { verticalScale, horizontalScale } from '@Theme/Metrics';

interface LayerColor {
  iconColor?: string;
}

export const GalleryIcon = (props: LayerColor) => {
  return (
    <Svg
      width={horizontalScale(18)}
      height={verticalScale(18)}
      viewBox="0 0 18 18"
      fill="none"
    >
      <Path
        d="M16 2V16H2V2H16ZM16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM11.14 8.86L8.14 12.73L6 10.14L3 14H15L11.14 8.86Z"
        fill={props.iconColor}
      />
    </Svg>
  );
};
