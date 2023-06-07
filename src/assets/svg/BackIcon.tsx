import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { headerSize } from '@src/theme/Dimensions';

interface LayerColor {
  iconColor?: string;
}

export const BackIcon = (props: LayerColor) => {
  return (
    <Svg width={headerSize.wLeftIcon} height={headerSize.hLeftIcon} viewBox="0 0 16 16" fill="none">
      <Path
        d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z"
        fill={props.iconColor}
      />
    </Svg>
  );
};
