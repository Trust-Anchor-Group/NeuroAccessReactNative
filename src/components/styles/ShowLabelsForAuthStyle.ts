import { StyleSheet } from 'react-native';
import { authLabelsSize } from '@src/theme/Dimensions';

export const ShowLabelsForAuthStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
  },
  textMargin: {
    marginTop: authLabelsSize.marginTop,
  },
});
