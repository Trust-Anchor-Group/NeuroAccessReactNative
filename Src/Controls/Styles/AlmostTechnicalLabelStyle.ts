import { moderateScale } from '@Theme/Metrics';
import { StyleSheet } from 'react-native';

export const AlmostTechnicalLabelStyle = (themeColors: any) =>
  StyleSheet.create({
    Container: { width: '100%', flexWrap: 'wrap' },
    detailContainer: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
      paddingVertical: moderateScale(7),
    },
    label: {
      flex: 0.9,
      textAlign: 'left',
      color: themeColors.almost.label,
      fontSize: moderateScale(14),
      letterSpacing: moderateScale(0.1),
      lineHeight: moderateScale(19.6),
    },
    value: {
      width: '100%',
      flexWrap: 'wrap',
      color: themeColors.almost.link,
      textAlign: 'auto',
      fontSize: moderateScale(14),
      letterSpacing: moderateScale(0.5),
      lineHeight: moderateScale(25.2),
    },
    icon: { flex: 0.1 },
  });
