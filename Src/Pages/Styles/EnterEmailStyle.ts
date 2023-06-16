import { StyleSheet } from 'react-native';
import { moderateScale } from '@Theme/Metrics';

export const EnterEmailStyle = (themeColors: any) =>
  StyleSheet.create({
    sendText: { color: themeColors.otpVerification.sendTextColor },
    textLabel: { marginTop: moderateScale(13) },
  });
