import { StyleSheet } from 'react-native';
import { headerSize, backgroundLayerSize } from '@src/theme/Dimensions';

export const HeaderLayerStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    marginTop: backgroundLayerSize.lMarginTop,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  backContainer: {
    alignItems: 'center',
    flex: 0.15,
    height: headerSize.Height,
    paddingTop: headerSize.pTop,
  },
  languageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.2,
    height: headerSize.Height,
  },
  middleContainer: { flex: 0.65 },
  emptyContainer: {
    flex: 0.15,
  },
  textMarginTop:{
    marginTop: headerSize.languageTextMTop}
});

