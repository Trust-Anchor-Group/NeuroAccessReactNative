import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { verticalScale, horizontalScale } from '@Theme/Metrics';

interface LayerColor {
  iconColor?: string;
}

export const LargeUserIcon = (props: LayerColor) => {
  return (
    <Svg
      width={horizontalScale(40)}
      height={verticalScale(40)}
      viewBox="0 0 40 40"
      fill="none"
    >
      <Path
        d="M20 5C22.75 5 25 7.25 25 10C25 12.75 22.75 15 20 15C17.25 15 15 12.75 15 10C15 7.25 17.25 5 20 5ZM20 30C26.75 30 34.5 33.225 35 35H5C5.575 33.2 13.275 30 20 30ZM20 0C14.475 0 10 4.475 10 10C10 15.525 14.475 20 20 20C25.525 20 30 15.525 30 10C30 4.475 25.525 0 20 0ZM20 25C13.325 25 0 28.35 0 35V40H40V35C40 28.35 26.675 25 20 25Z"
        fill={props.iconColor}
        fill-opacity="0.5"
      />
    </Svg>
  );
};
