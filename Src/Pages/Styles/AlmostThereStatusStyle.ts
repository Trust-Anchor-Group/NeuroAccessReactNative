import { horizontalScale, moderateScale, verticalScale } from '@Theme/Metrics';
import { StyleSheet } from 'react-native';

export const AlmostThereStatusStyle = (themeColors: any) =>
  StyleSheet.create({
    informationContainer: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      width: '90%',
      height: '90%',
      paddingVertical: moderateScale(15),
      paddingHorizontal: moderateScale(20),
      borderRadius: moderateScale(8),
      backgroundColor: themeColors.informationView.informationBg,
    },
    scrollView: { width: '100%', marginTop: moderateScale(5) },
    line: {
      width: '100%',
      height: moderateScale(0.5),
      backgroundColor: themeColors.almost.horizontalLine,
      marginVertical: moderateScale(5),
    },
    shadowProp: {
      shadowOffset: { width: horizontalScale(-2), height: verticalScale(4) },
      shadowColor: themeColors.informationView.shadowColor,
      shadowOpacity: moderateScale(0.2),
      shadowRadius: moderateScale(3),
    },
    imageContainer: {
      marginTop: moderateScale(20),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    imageView: {
      flex: 0.4,
      alignItems: 'flex-end',
      paddingRight: moderateScale(10),
    },
    image: {
      borderWidth: moderateScale(1),
      borderColor: themeColors.almost.borderColor,
      height: moderateScale(69),
      width: moderateScale(69),
      overflow: 'hidden',
      borderRadius: moderateScale(35),
    },
    userInfo: {
      flex: 0.6,
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
    },
    name: {
      marginRight: moderateScale(0),
      flexWrap: 'wrap',
      alignSelf: 'flex-start',
      textAlign: 'left',
      fontSize: moderateScale(18),
      lineHeight: moderateScale(25.2),
      letterSpacing: moderateScale(0.1),
    },
    detailContainer: {
      marginTop: moderateScale(5),
      gap: moderateScale(16),
      flexDirection: 'row',
      alignItems: 'center',
    },
    technical: { flexDirection: 'row', padding: moderateScale(16) },
    pendingContainer: {
      height: moderateScale(18),
      width: moderateScale(18),
      borderRadius: moderateScale(9),
    },
    upIcon: { justifyContent: 'center', paddingLeft: moderateScale(5) },
    downIcon: { justifyContent: 'center' },
    toggle: {
      width: '100%',
      flexWrap: 'wrap',
      gap: moderateScale(8),
      marginBottom: moderateScale(15),
    },
    headerTxt: {
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: moderateScale(32),
      lineHeight: moderateScale(40.4),
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
      color: themeColors.almost.remainingPeer,
      marginBottom: moderateScale(10),
    },
    spacer: {
      padding: moderateScale(10),
    },
    providerInfo: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: moderateScale(10),
    },
    actionButton: { width: '90%' },
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
