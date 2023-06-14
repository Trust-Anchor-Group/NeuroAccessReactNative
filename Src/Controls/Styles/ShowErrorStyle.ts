import { StyleSheet } from 'react-native';
import { inputBoxSize } from '@Theme/Dimensions';

export const ShowErrorStyle = StyleSheet.create({
  Container: {
    marginTop: inputBoxSize.error.marginTop,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    paddingLeft: inputBoxSize.error.marginRight,
  },
});
