import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale, horizontalScale } from '@Theme/Metrics';

export const TellUsAboutYouStyle = (themeColors: any) =>
  StyleSheet.create({
    header: {
      width: '90%',
      alignSelf: 'center',
    },
    label: { marginTop: moderateScale(10), marginBottom: moderateScale(3) },
    detailHeight: {
      width: '90%',
      marginBottom: moderateScale(10),
      alignSelf: 'center',
      textAlign: 'left',
      lineHeight: moderateScale(15.2),
      letterSpacing: moderateScale(0.5),
      fontSize: moderateScale(12),
    },
    viewContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: moderateScale(10),
    },
    imageContainer: {
      backgroundColor: themeColors.tellUsAboutYou.background,
      width: horizontalScale(115),
      height: verticalScale(115),
      borderRadius: moderateScale(8),
      borderWidth: moderateScale(2),
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageView: {
      position: 'absolute',
      width: horizontalScale(112),
      height: verticalScale(112),
      borderRadius: moderateScale(8),
    },
    actionView: {
      marginLeft: moderateScale(5),
      justifyContent: 'space-evenly',
    },
    clickAction: {
      borderRadius: moderateScale(4),
      borderWidth: moderateScale(2),
      borderColor: themeColors.tellUsAboutYou.imageBorder,
      backgroundColor: themeColors.tellUsAboutYou.background,
      padding: moderateScale(8),
      width: horizontalScale(38),
      height: verticalScale(38),
      justifyContent: 'center',
      alignItems: 'center',
    },
    cameraMargin: {
      marginTop: moderateScale(5),
    },
    cameraNote: {
      width: '90%',
      marginTop: moderateScale(5),
      alignSelf: 'center',
      textAlign: 'center',
      lineHeight: moderateScale(15.2),
      letterSpacing: moderateScale(0.5),
      fontSize: moderateScale(12),
    },
    formView: { width: '90%', alignSelf: 'center' },
    textInput: {
      width: '100%',
      height: verticalScale(50),
      marginTop: moderateScale(2),
      borderRadius: moderateScale(4),
      borderWidth: moderateScale(1),
      padding: moderateScale(10),
      fontSize: moderateScale(16),
      fontFamily: 'SpaceGrotesk-Regular',
      color: themeColors.tellUsAboutYou.color,
      backgroundColor: themeColors.tellUsAboutYou.background,
      borderColor: themeColors.tellUsAboutYou.defaultBorder,
    },
    errorText: {
      color: themeColors.tellUsAboutYou.error,
    },
    error: {
      color: themeColors.tellUsAboutYou.error,
      marginTop: 0,
      marginBottom: moderateScale(1),
    },
    linkText: {
      alignSelf: 'center',
      color: themeColors.currentProvider.link,
      fontSize: moderateScale(18),
    },
    linkTextDetail: {
      textAlign: 'left',
      color: themeColors.currentProvider.link,
      fontSize: moderateScale(12),
    },
    detailText: {
      textAlign: 'left',
      lineHeight: moderateScale(15.2),
      letterSpacing: moderateScale(0.5),
      fontSize: moderateScale(12),
    },
    checkView: {
      flexDirection: 'row',
      marginTop: moderateScale(7),
      marginBottom: moderateScale(15),
    },
    checkBox: { flex: 0.1, justifyContent: 'center' },
    term: { flex: 0.9 },
    sendText: { color: themeColors.otpVerification.sendTextColor },
    button: {
      marginBottom: moderateScale(20),
    },
    actionButtonContainer: { height: '90%', justifyContent: 'flex-end' },
  });
