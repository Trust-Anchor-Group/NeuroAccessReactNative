import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { informationLogoSize } from '@theme/dimensions';

interface LayerColor {
  textColor?: string;
  logoColor?: string;
}

export const InformationIcon = (props: LayerColor) => {
  return (
    <Svg
      width={informationLogoSize.logoWidth}
      height={informationLogoSize.logoHeight}
      viewBox="0 0 20 20"
      fill="none"
    >
      <Path
        d="M9 5H11V7H9V5ZM9 9H11V15H9V9ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z"
        fill={props.textColor}
        fill-opacity="0.5"
      />
    </Svg>
  );
};
