import { StyleSheet } from 'react-native';
import { button } from '@Theme/Dimensions';

export const GlobalStyle = (themeColors?: any) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      height: '100%',
      width: '100%',
    },
    spaceContainer: {
      alignItems: 'center',
      height: '12%',
    },
    logoContainer: {
      alignItems: 'center',
      height: '18%',
    },
    informationContainer: {
      height: '14%',
      width: '90%',
      alignSelf: 'center',
    },
    inputContainer: {
      height: '44%',
      width: '90%',
      alignSelf: 'center',
    },
    buttonContainer: {
      height: '12%',
      bottom: 0,
      alignSelf: 'center',
      width: '90%',
    },
    appButtonContainer: {
      height: button.height,
      backgroundColor: themeColors.button.bg,
      borderRadius: button.borderRadius,
      justifyContent: 'center',
      alignItems: 'center',
    },
    appButtonText: {
      fontSize: button.fontSize,
      fontFamily: 'Neue Haas Grotesk Text Pro',
      fontStyle: 'normal',
      letterSpacing: 0.1,
      color: themeColors.button.text,
      fontWeight: '700',
      alignSelf: 'center',
    },
  });
