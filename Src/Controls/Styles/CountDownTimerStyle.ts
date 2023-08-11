import { horizontalScale, moderateScale } from '@Theme/Metrics';
import { StyleSheet } from 'react-native';

export const CountDownTimerStyle = (themeColors: any) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      height: moderateScale(60),
    },
    timmer: {
      borderRadius: moderateScale(10),
      padding: moderateScale(10),
      backgroundColor: themeColors?.button?.bg,
    },
  });
