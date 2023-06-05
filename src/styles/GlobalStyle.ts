import { Colors } from "@src/theme/Colors";
import { StyleSheet } from "react-native";

export const GlobalStyle = StyleSheet.create({
  appButtonContainer: {
    height: 50,
    backgroundColor: Colors.light.actionButtonBgColor,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appButtonText: {
    fontSize: 18,
    fontFamily: 'Neue Haas Grotesk Text Pro',
    fontStyle: 'normal',
    letterSpacing: 0.1,
    color: Colors.light.actionButtonTitleColor,
    fontWeight: '700',
    alignSelf: 'center',
  },
})
