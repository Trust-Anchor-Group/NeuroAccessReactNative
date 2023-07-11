import { moderateScale } from '@Theme/Metrics';
import * as React from 'react';
import { View, ViewProps } from 'react-native';
import Svg, { G, Path, Defs, Rect } from 'react-native-svg';

interface Props extends ViewProps {
  iconColor?: string;
}
export const ScannerBlurBg: React.FC<Props> = ({ ...restProps }) => (
  <View {...restProps}>
    <Svg
      width={'100%'}
      height={'100%'}
      viewBox={`0 0 ${moderateScale(430)} ${moderateScale(900)}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <G filter="url(#filter0_b_1528_19523)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M430 0H0V932H430V0ZM60 219C55.5817 219 52 222.582 52 227V537C52 541.418 55.5817 545 60 545H370C374.418 545 378 541.418 378 537V227C378 222.582 374.418 219 370 219H60Z"
          fill="#181F25"
          fillOpacity={0.7}
        />
      </G>
      <G x={moderateScale(50)} y={moderateScale(217)} filter="url(#filter0_b_1528_19523)">
        {insideView()}
      </G>
    </Svg>
  </View>
);

const insideView = () => {
  return (
    <Svg
      x={moderateScale(50)}
      y={moderateScale(217)}
      width={moderateScale(334)}
      height={moderateScale(334)}
      viewBox={`0 0 ${moderateScale(334)} ${moderateScale(334)}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      // {...props}
    >
      <Path
        d="M70.1797 33.4141L35.4128 33.4141C34.3082 33.4141 33.4128 34.3095 33.4128 35.4141L33.4128 70.181"
        stroke="#F4F5F7"
        strokeOpacity={0.7}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <Path
        d="M33.4131 263.82L33.4131 298.587C33.4131 299.692 34.3085 300.587 35.4131 300.587H70.18"
        stroke="#F4F5F7"
        strokeOpacity={0.7}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <Path
        d="M300.586 70.1816L300.586 35.4147C300.586 34.3101 299.691 33.4147 298.586 33.4147L263.819 33.4147"
        stroke="#F4F5F7"
        strokeOpacity={0.7}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <Path
        d="M263.819 300.588L298.586 300.588C299.691 300.588 300.586 299.692 300.586 298.588L300.586 263.821"
        stroke="#F4F5F7"
        strokeOpacity={0.7}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <Rect
        x={moderateScale(2)}
        y={moderateScale(2)}
        width={moderateScale(324)}
        height={moderateScale(322)}
        rx={10}
        stroke="#F4F5F7"
        strokeOpacity={0.7}
        strokeWidth={4}
      />
    </Svg>
  );
};
