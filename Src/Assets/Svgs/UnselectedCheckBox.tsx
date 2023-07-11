import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { verticalScale, horizontalScale } from '@Theme/Metrics';

interface LayerColor {
  iconColor?: string;
}

export const UnselectedCheckBox = (props: LayerColor) => {
  return (
    <Svg
      width={horizontalScale(18)}
      height={verticalScale(19)}
      viewBox="0 0 18 19"
      fill="none"
    >
      <Path
        d="M16 2.5V16.5H2V2.5H16ZM16 0.5H2C0.9 0.5 0 1.4 0 2.5V16.5C0 17.6 0.9 18.5 2 18.5H16C17.1 18.5 18 17.6 18 16.5V2.5C18 1.4 17.1 0.5 16 0.5Z"
        fill={props.iconColor}
      />
    </Svg>
  );
};
