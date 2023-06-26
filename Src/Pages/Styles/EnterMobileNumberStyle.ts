import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '@Theme/Metrics';

export const EnterMobileNumberStyle = (themeColors: any) =>
  StyleSheet.create({
    sendText: { color: themeColors.otpVerification.sendTextColor },
    inputLabel: { marginBottom: moderateScale(5) },
    touchableOpacity: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      width: '100%',
      height: verticalScale(50),
      backgroundColor: themeColors.mobileInput.backgroundColor,
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: themeColors.mobileInput.borderColor,
      borderWidth: moderateScale(1),
      borderRadius: moderateScale(4),
      paddingHorizontal: moderateScale(16),
      paddingVertical: moderateScale(12),
    },
    label: {
      marginRight: moderateScale(10),
    },
  });
