import { StyleSheet } from 'react-native';
import { inputIconSize, inputBoxSize } from '@src/theme/Dimensions';

export const ShowErrorStyle =
  StyleSheet.create({
    Container: {
      marginTop: inputBoxSize.error.marginTop,
      flexDirection: 'row',
      alignItems: 'center',
    },
    label:{
      //paddingLeft:2
      paddingLeft: inputBoxSize.error.marginRight
    }
  });
