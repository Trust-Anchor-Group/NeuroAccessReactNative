import { StyleSheet } from 'react-native';
import { moderateScale } from '@Theme/Metrics';
export const EnterOTPVerifyStyle = (themeColors: any) =>
  StyleSheet.create({
    textLabel: { marginTop: moderateScale(23) },
    label:{
      marginBottom: moderateScale(5)
    },
    bottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    resendButton: {
      width: '48%',
      borderWidth: moderateScale(1),
      borderColor: themeColors.otpVerification.resendButton.borderColor,
      borderRadius: moderateScale(4),
      backgroundColor: themeColors.otpVerification.resendButton.backgroundColor,
    },
    resendText: { color: themeColors.otpVerification.resendButton.textColor },
    sendButton: {
      width: '48%',
    },
    sendText: { color: themeColors.otpVerification.sendTextColor },
  });
