import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { verticalScale, horizontalScale } from '@Theme/Metrics';

interface LayerColor {
  iconColor?: string;
}

export const InvitePeerIcon = (props: LayerColor) => {
  return (
    <Svg
      width={horizontalScale(20)}
      height={verticalScale(20)}
      viewBox="0 0 20 20"
      fill="none"
    >
      <Path
        d="M20 5H18V2H15V0H20V5ZM20 20V15H18V18H15V20H20ZM0 20H5V18H2V15H0V20ZM0 0V5H2V2H5V0H0Z"
        fill={props.iconColor} 
      />
      <Path
        d="M10 10C11.9338 10 13.5 8.43375 13.5 6.5C13.5 4.56625 11.9338 3 10 3C8.06625 3 6.5 4.56625 6.5 6.5C6.5 8.43375 8.06625 10 10 10ZM10 11.75C7.66375 11.75 3 12.9225 3 15.25V16.125C3 16.6063 3.39375 17 3.875 17H16.125C16.6063 17 17 16.6063 17 16.125V15.25C17 12.9225 12.3363 11.75 10 11.75Z"
        fill={props.iconColor} 
      />
    </Svg>
  );
};
