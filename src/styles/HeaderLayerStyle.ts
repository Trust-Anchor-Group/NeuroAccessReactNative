import { StyleSheet } from 'react-native';
import { backgroundLayerSize } from '@src/theme/Dimensions';

export const HeaderLayerStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    marginTop: backgroundLayerSize.lMarginTop,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});
