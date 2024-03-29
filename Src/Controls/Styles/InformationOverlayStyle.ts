import { horizontalScale, moderateScale } from '@Theme/Metrics';
import { StyleSheet } from 'react-native';

export const InformationOverlayStyle = (themeColors: any) =>
  StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: themeColors.informationView.blurBg,
      justifyContent: 'center',
      alignItems: 'center',
    },
    informationContainer: {
      marginHorizontal: horizontalScale(24),
      padding: moderateScale(20),
      borderRadius: moderateScale(8),
      backgroundColor: themeColors.informationView.informationBg,
    },
    title: {
      textAlign: 'center',
      marginBottom: moderateScale(8),
    },
    spacer: {
      padding: moderateScale(10),
    },
    actionButton: {
      width: moderateScale(300),
      flexWrap: 'wrap',
      marginBottom: moderateScale(10),
    },
    sendText: {
      color: themeColors.otpVerification.sendTextColor,
      marginLeft: moderateScale(10),
      fontSize: moderateScale(14),
    },
  });
