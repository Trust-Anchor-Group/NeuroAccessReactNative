import { StyleSheet } from "react-native";
import { Colors } from "@src/theme/Colors";

export const PlaneBackGroundStyle = StyleSheet.create({
  parentContainer:{
    height: '100%',
    width: '100%',
  },
  container:{
    flex:1,
    backgroundColor: Colors.light.background,
  },
  logoContainer:{
    position:'absolute',
    width:'100%',
    marginTop: '8%'
  },
})