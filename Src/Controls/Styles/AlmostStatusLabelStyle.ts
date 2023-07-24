import { moderateScale } from '@Theme/Metrics';
import { StyleSheet } from 'react-native';

export const AlmostStatusLabelStyle = (themeColors: any) =>
  StyleSheet.create({
    listContainer: {
      width: '100%',
      flexWrap: 'wrap',
    },
    Container: {
      flexDirection: 'row',
      width: '100%',
      flex: 1,
      justifyContent: 'center',
      paddingVertical: moderateScale(7),
    },
    label: {
      flex: 0.4,
      textAlign: 'left',
      color: themeColors.almost.label,
      fontSize: moderateScale(14),
      letterSpacing: moderateScale(0.1),
      lineHeight: moderateScale(19.6),
    },
    value: {
      flex: 0.6,
      textAlign: 'right',
      fontSize: moderateScale(16),
      letterSpacing: moderateScale(0.5),
      lineHeight: moderateScale(25.2),
    },
  });
