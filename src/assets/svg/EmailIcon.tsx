import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { inputIconSize } from '@src/theme/Dimensions';

interface LayerColor {
  iconColor?: string;
}

export const EmailIcon = (props: LayerColor) => {
  return (
    <Svg
      width={inputIconSize.iconWidth}
      height={inputIconSize.iconHeight}
      viewBox="0 0 20 16"
      fill="none"
    >
      <Path
        d="M20 2C20 0.9 19.1 0 18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2ZM18 2L10 7L2 2H18ZM18 14H2V4L10 9L18 4V14Z"
        fill={props.iconColor}
        fill-opacity="0.5"
      />
    </Svg>
  );
};
