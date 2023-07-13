import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '@Theme/Metrics';

export const MobileInputViewStyle = (themeColors: any) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: verticalScale(50),
      backgroundColor: themeColors.mobileInput.backgroundColor,
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: themeColors.mobileInput.borderColor,
      borderWidth: moderateScale(1),
      borderRadius: moderateScale(4),
      paddingHorizontal: moderateScale(16),
      paddingVertical: moderateScale(8),
    },
    touchableOpacity: { flexDirection: 'row', alignItems: 'center' },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    flagLabel: {
      fontSize: moderateScale(16),
      marginRight: moderateScale(10),
    },
    label: {
      fontFamily: 'Neue Haas Grotesk Text Pro',
      fontSize: moderateScale(16),
      marginRight: moderateScale(10),
    },
    input: {
      flex: 1,
      height: moderateScale(40),
      fontFamily: 'Neue Haas Grotesk Text Pro',
      fontSize: moderateScale(16),
      color: themeColors.mobileInput.color,
      marginLeft: moderateScale(10),
    },
  });
