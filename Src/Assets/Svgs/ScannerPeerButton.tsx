import { horizontalScale, verticalScale } from '@Theme/Metrics';
import * as React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Svg, { Rect, Path, Circle } from 'react-native-svg';

interface Props extends TouchableOpacityProps {
  iconColor?: string;
  bgColor?: string;
  enabled?: boolean;
}

export const ScannerPeerButton: React.FC<Props> = ({enabled, ...restProps }) => (
  <TouchableOpacity {...restProps}>
    <Svg
      width={horizontalScale(55)}
      height={verticalScale(56)}
      viewBox="0 0 55 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Circle
        cx={27.5}
        cy={28}
        r={28}
        fill="#ffffff"
      />
      <Path
        d="M27.4545 0.869141C12.5044 0.869141 0.371094 13.0025 0.371094 27.9525C0.371094 42.9025 12.5044 55.0359 27.4545 55.0359C42.4045 55.0359 54.5378 42.9025 54.5378 27.9525C54.5378 13.0025 42.4045 0.869141 27.4545 0.869141ZM27.4545 8.99415C31.9503 8.99415 35.5795 12.6233 35.5795 17.1192C35.5795 21.615 31.9503 25.2442 27.4545 25.2442C22.9586 25.2442 19.3294 21.615 19.3294 17.1192C19.3294 12.6233 22.9586 8.99415 27.4545 8.99415ZM27.4545 47.4525C20.6836 47.4525 14.6982 43.9858 11.2044 38.7317C11.2857 33.3421 22.0378 30.39 27.4545 30.39C32.844 30.39 43.6232 33.3421 43.7045 38.7317C40.2107 43.9858 34.2253 47.4525 27.4545 47.4525Z"
       // fill={restProps.iconColor}
        fill="#1E69B2"
      />
    </Svg>
  </TouchableOpacity>
);
