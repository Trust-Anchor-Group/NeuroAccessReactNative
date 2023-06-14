import { StyleSheet } from 'react-native';

export const SplashBackgroundStyle= (themeColors:any)=> StyleSheet.create({
  parentContainer: {
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColors.background,
  },
  logoContainer: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: '33%',
  },
});
