import { horizontalScale, verticalScale } from '@Theme/Metrics';
import * as React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

interface Props extends TouchableOpacityProps {
  iconColor?: string;
  bgColor?: string;
  enabled?: boolean;
}
export const ServiceProvider: React.FC<Props> = ({error, enabled, ...restProps }) => (
  <TouchableOpacity {...restProps}>
    <Svg
      width={horizontalScale(66)}
      height={verticalScale(65)}
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Circle
        cx={33.0003}
        cy={32.5003}
        r={32.5003}
        fill={restProps.bgColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.2743 59.6795C48.1331 59.6795 60.1785 47.6341 60.1785 32.7753C60.1785 17.9165 48.1331 5.87109 33.2743 5.87109C18.4155 5.87109 6.37012 17.9165 6.37012 32.7753C6.37012 47.6341 18.4155 59.6795 33.2743 59.6795ZM19.958 34.6775H46.5904C48.6829 34.6775 50.395 36.3896 50.395 38.4821V46.0914C50.395 48.1839 48.6829 49.896 46.5904 49.896H19.958C17.8654 49.896 16.1533 48.1839 16.1533 46.0914V38.4821C16.1533 36.3896 17.8654 34.6775 19.958 34.6775ZM19.958 42.2867C19.958 44.3793 21.67 46.0914 23.7626 46.0914C25.8551 46.0914 27.5672 44.3793 27.5672 42.2867C27.5672 40.1942 25.8551 38.4821 23.7626 38.4821C21.67 38.4821 19.958 40.1942 19.958 42.2867ZM19.958 15.6543H46.5904C48.6829 15.6543 50.395 17.3664 50.395 19.4589V27.0682C50.395 29.1607 48.6829 30.8728 46.5904 30.8728H19.958C17.8654 30.8728 16.1533 29.1607 16.1533 27.0682V19.4589C16.1533 17.3664 17.8654 15.6543 19.958 15.6543ZM19.958 23.2636C19.958 25.3561 21.67 27.0682 23.7626 27.0682C25.8551 27.0682 27.5672 25.3561 27.5672 23.2636C27.5672 21.171 25.8551 19.4589 23.7626 19.4589C21.67 19.4589 19.958 21.171 19.958 23.2636Z"
        fill={restProps.iconColor}
      />
    </Svg>
  </TouchableOpacity>
);
