import { moderateScale } from '@Theme/Metrics';
import { StyleSheet } from 'react-native';

export const AlmostStatusLabelStyle = (themeColors: any) =>
  StyleSheet.create({
    listContainer: {
      flexWrap: 'wrap',
    },
    Container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: moderateScale(7),
    },
    label: {
      flex: 0.4,
      textAlign: 'left',
      flexWrap: 'wrap',
      color: themeColors.almost.label,
      fontSize: moderateScale(14),
      letterSpacing: moderateScale(0.1),
      lineHeight: moderateScale(19.6),
    },
    value: {
      flex: 0.6,
      textAlign: 'right',
      flexWrap: 'wrap',
      fontSize: moderateScale(16),
      letterSpacing: moderateScale(0.5),
      lineHeight: moderateScale(25.2),
    },
  });
