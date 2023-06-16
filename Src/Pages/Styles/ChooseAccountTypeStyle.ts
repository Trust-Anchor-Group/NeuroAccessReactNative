import { StyleSheet } from 'react-native';
import { moderateScale } from '@Theme/Metrics';

export const ChooseAccountTypeStyle = (themeColors: any) =>
  StyleSheet.create({
    sendText: { color: themeColors.otpVerification.sendTextColor },
    textLabel: {
      marginTop: moderateScale(20),
    },
  });
