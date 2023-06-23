import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { verticalScale, horizontalScale } from '@Theme/Metrics';

interface LayerColor {
  iconColor?: string;
}

export const DropDownIcon = (props: LayerColor) => {
  return (
    <Svg
      width={horizontalScale(11)}
      height={verticalScale(8)}
      viewBox="0 0 11 6"
      fill="none"
    >
      <Path
        d="M0.333496 0.5L5.3335 5.5L10.3335 0.5H0.333496Z"
        fill={props.iconColor}
        fill-opacity="0.5"
      />
    </Svg>
  );
};
