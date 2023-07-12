import { StyleSheet } from 'react-native';
import { button } from '@Theme/Dimensions';
import { moderateScale } from '@Theme/Metrics';

export const GlobalStyle = (themeColors?: any) =>
  StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
    },
    scrollViewContainer: {
      flexGrow: 1,
      justifyContent: 'space-around',
    },
    spaceContainer: {
      alignItems: 'center',
      height: '12%',
      justifyContent: 'space-around',
    },
    logoContainer: {
      alignItems: 'center',
      height: '18%',
      justifyContent: 'space-around',
    },
    informationContainer: {
      height: '16%',
      width: '90%',
      alignSelf: 'center',
      justifyContent: 'space-evenly',
    },
    inputContainer: {
      height: '42%',
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
      backgroundColor: themeColors?.button?.bg,
      borderRadius: button.borderRadius,
      justifyContent: 'center',
      alignItems: 'center',
    },
    appButtonText: {
      fontSize: button.fontSize,
      fontFamily: 'Neue Haas Grotesk Text Pro',
      fontStyle: 'normal',
      letterSpacing: 0.1,
      color: themeColors?.button?.text,
      fontWeight: '700',
      alignSelf: 'center',
    },
    space: {
      width: '100%',
      height: moderateScale(20),
      backgroundColor: 'transparant',
    },
  });
