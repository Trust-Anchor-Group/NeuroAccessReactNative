import { StyleSheet } from 'react-native';
import { moderateScale } from '@Theme/Metrics';
export const ShowAlertMessageStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerView: {
    backgroundColor: 'white',
    padding: moderateScale(16),
    borderRadius: moderateScale(8),
  },
  modalText: {
    fontSize: moderateScale(18),
    marginBottom: moderateScale(8),
  },
  closeButton: {
    marginTop: moderateScale(16),
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'blue',
    fontSize: moderateScale(16),
  },
});
