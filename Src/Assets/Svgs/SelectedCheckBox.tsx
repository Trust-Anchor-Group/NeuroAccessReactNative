import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { verticalScale, horizontalScale } from '@Theme/Metrics';

interface LayerColor {
  iconColor?: string;
}

export const SelectedCheckBox = (props: LayerColor) => {
  return (
    <Svg
      width={horizontalScale(24)}
      height={verticalScale(25)}
      viewBox="0 0 24 25"
      fill="none"
    >
      <Path
        d="M19 3.5H5C3.9 3.5 3 4.4 3 5.5V19.5C3 20.6 3.9 21.5 5 21.5H19C20.1 21.5 21 20.6 21 19.5V5.5C21 4.4 20.1 3.5 19 3.5ZM19 19.5H5V5.5H19V19.5ZM17.99 9.5L16.58 8.08L9.99 14.67L7.41 12.1L5.99 13.51L9.99 17.5L17.99 9.5Z"
        fill={props.iconColor}
      />
    </Svg>
  );
};
