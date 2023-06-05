import { StyleSheet } from 'react-native';
import { Colors } from '@src/theme/Colors';

export const BackGroundLayerStyle = StyleSheet.create({
  parentContainer: {
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
  },
  logoContainer: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: '33%',
  },
});
