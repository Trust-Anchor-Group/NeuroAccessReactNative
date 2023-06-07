import { StyleSheet } from "react-native";

export const NeuroAccessBackgroundStyle = (themeColors: { background: string; })=> StyleSheet.create({
  parentContainer:{
    height: '100%',
    width: '100%',
    backgroundColor: themeColors.background,
  },
  container:{
    flex:1,
  },
})