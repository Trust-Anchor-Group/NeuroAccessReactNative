import { StyleSheet } from 'react-native';
import { moderateScale } from '@Theme/Metrics';

export const NeuroTextInputStyle = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    right: moderateScale(10),
    top: '30%',
  },
});
