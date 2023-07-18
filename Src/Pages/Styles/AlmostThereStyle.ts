import { horizontalScale, moderateScale, verticalScale } from '@Theme/Metrics';
import { StyleSheet } from 'react-native';

export const AlmostThereStyle = (themeColors: any) =>
  StyleSheet.create({
    informationContainer: {
      alignSelf: 'center',
      marginTop: moderateScale(50),
      justifyContent: 'center',
      alignItems: 'center',
      width: '90%',
      paddingVertical: moderateScale(15),
      paddingHorizontal: moderateScale(20),
      borderRadius: moderateScale(8),
      backgroundColor: themeColors.informationView.informationBg,
    },
    shadowProp: {
      shadowOffset: { width: horizontalScale(-2), height: verticalScale(4) },
      shadowColor: '#171717',
      shadowOpacity: moderateScale(0.2),
      shadowRadius: moderateScale(3),
    },
    imageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '70%',
      height: verticalScale(89),
      gap: moderateScale(16),
    },
    image: {
      borderWidth: moderateScale(1),
      borderRadius: moderateScale(40),
      height: verticalScale(70),
      width: horizontalScale(58),
    },
    userInfo: { justifyContent: 'center', alignItems: 'center' },
    detailContainer: {
      marginTop: moderateScale(5),
      gap: moderateScale(16),
      flexDirection: 'row',
      alignItems: 'center',
    },
    pendingContainer: {
      height: verticalScale(20),
      width: horizontalScale(17),
      borderRadius: moderateScale(10),
      backgroundColor: '#A87AB0',
    },
    checkStatus: {
      borderColor: '#181F25',
      alignItems: 'center',
      borderRadius: moderateScale(4),
      borderWidth: moderateScale(0.5),
      paddingHorizontal: moderateScale(24),
      paddingVertical: moderateScale(10),
      marginTop: moderateScale(20),
      width: '100%',
    },
    headerTxt: {
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: moderateScale(32),
      lineHeight: moderateScale(40.4),
    },
    name: {
      flexWrap: 'wrap',
      alignSelf: 'flex-start',
      textAlign: 'left',
      fontSize: moderateScale(18),
      lineHeight: moderateScale(25.2),
      letterSpacing: moderateScale(0.1),
    },
    mobile: {
      alignSelf: 'flex-start',
      textAlign: 'left',
      fontSize: moderateScale(14),
      lineHeight: moderateScale(19.6),
      letterSpacing: moderateScale(0.1),
    },
    pendingReviewTxt: {
      fontSize: moderateScale(16),
      lineHeight: verticalScale(24),
    },
    remainingPeerTxt: {
      textAlign: 'left',
      marginTop: moderateScale(10),
      fontSize: moderateScale(12),
      lineHeight: verticalScale(17.6),
      letterSpacing: moderateScale(0.1),
      color: '#A87AB0',
    },
    descriptionTxt: {
      marginTop: moderateScale(16),
      textAlign: 'center',
      fontSize: moderateScale(14),
      lineHeight: verticalScale(21.2),
      letterSpacing: moderateScale(0.5),
    },
    checkStatusTxt: {
      fontSize: moderateScale(16),
      lineHeight: verticalScale(23.2),
      letterSpacing: moderateScale(0.1),
    },
    spacer: {
      padding: moderateScale(10),
    },
    providerInfo: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: moderateScale(10),
    },
    bottomContainer:{ position: 'absolute', bottom: moderateScale(20), width: '100%' },
    actionButton:{ width: '90%' },
    infoText: {
      color: themeColors.currentProvider.titleUnSelected,
      fontSize: moderateScale(11),
    },
    sendText: {
      color: themeColors.otpVerification.sendTextColor,
      marginLeft: moderateScale(10),
      fontSize: moderateScale(14),
    },
  });
