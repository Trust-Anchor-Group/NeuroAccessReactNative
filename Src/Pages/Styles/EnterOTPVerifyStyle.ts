import { StyleSheet } from 'react-native';
import { otpVerification } from '@Theme/Dimensions';
export const EnterOTPVerifyStyle = (themeColors: any) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      height: '100%',
      width: '100%',
      flexDirection: 'column',
    },
    containerSpace: {
      alignItems: 'center',
      height: '12%',
    },
    containerLogo: {
      alignItems: 'center',
      height: '25%',
    },
    containerInput: {
      height: '56%',
      width: '90%',
      alignSelf: 'center',
    },
    bottom: {
      width: '100%',
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
      justifyContent: 'space-between',
    },
    resendButton: {
      width: '48%',
      borderWidth: otpVerification.borderWidth,
      borderColor: themeColors.otpVerification.resendButton.borderColor,
      borderRadius: otpVerification.borderRadius,
      backgroundColor: themeColors.otpVerification.resendButton.backgroundColor,
    },
    resendText: { color: themeColors.otpVerification.resendButton.textColor },
    sendButton: {
      width: '48%',
    },
    sendText: { color: themeColors.otpVerification.sendTextColor },
  });
