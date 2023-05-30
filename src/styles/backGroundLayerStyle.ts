import { StyleSheet } from "react-native";
import { colors } from "@theme/colors";

export const backGroundLayerStyle = StyleSheet.create({
  parentContainer:{
    height: '100%',
    width: '100%',
  },
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: colors.light.background,
  }
})