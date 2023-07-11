import { horizontalScale, moderateScale, verticalScale } from "@Theme/Metrics";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

export const QRCodeScannerStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  camera: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  blurContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(24, 31, 37, 0.7)',
  },
  blurView: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  scannerTitle: {
    marginHorizontal: horizontalScale(50),
    color: 'white',
    textAlign: 'center',
  },
  scannerActions: {
    height: horizontalScale(280),
    width: '100%',
    position: 'absolute',
    bottom: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutQRButton: {
    marginHorizontal: horizontalScale(50),
    color: 'white',
    textAlign: 'center',
  },
  cameraActivity: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: moderateScale(20),
    flexDirection: 'row',
    marginVertical: verticalScale(5),
  },
  cameraActivityBtnSpace: { margin: moderateScale(5) },
  backButton: { position: 'absolute', margin: moderateScale(20) },
  scanWindow: {
    width: width * 0.6,
    height: moderateScale(200),
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
  },
});
