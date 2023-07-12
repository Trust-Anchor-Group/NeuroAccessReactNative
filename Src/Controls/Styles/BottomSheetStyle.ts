import { moderateScale } from "@Theme/Metrics";
import { Dimensions, StyleSheet } from "react-native";
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const BottomSheetStyles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: moderateScale(25),
  },
  line: {
    width: moderateScale(75),
    height: moderateScale(4),
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: moderateScale(15),
    borderRadius: moderateScale(2),
  },
});