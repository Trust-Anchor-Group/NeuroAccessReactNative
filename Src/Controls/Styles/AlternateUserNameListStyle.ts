import { moderateScale } from '@Theme/Metrics';
import { StyleSheet } from 'react-native';

export const AlternateUserNameListStyle = (themeColors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      padding: moderateScale(0),
      marginVertical: moderateScale(5),
      marginHorizontal: moderateScale(5),
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: moderateScale(18),
      color: themeColors.text.link
    },
    titleText: { paddingTop: moderateScale(20), textAlign: 'center' },
  });
