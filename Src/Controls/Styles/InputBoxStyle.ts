import { StyleSheet } from 'react-native';
import { inputBoxSize, inputIconSize,  } from 'Theme/Dimensions';

export const InputBoxStyle = (themeColors: any) =>
  StyleSheet.create({
    container: {
      marginTop: inputBoxSize.marginTop,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: inputBoxSize.borderWidth,
      borderColor: themeColors.inputBox.inputBorder,
      backgroundColor: themeColors.inputBox.inputBackground,
      borderRadius: inputBoxSize.borderRadius,
      paddingHorizontal: inputBoxSize.paddingHorizontal,
      paddingVertical: inputBoxSize.paddingVertical,
    },
    containerFocused: {
      borderColor: themeColors.inputBox.inputFocus,
    },
    errorOcurred: {
      borderColor: themeColors.inputBox.error,
    },
    input: {
      flex: 1,
      height: inputIconSize[40],
      color: themeColors.inputBox.activeText,
      fontSize: inputBoxSize.fontSize,
    },
    leftIcon: {
      marginRight: inputBoxSize.leftIcon.marginRight,
    },
    leftIconFocused: {
      color: 'blue',
    },
    leftIconBlurred: {
      color: 'gray',
    },
    rightIcon: {
      width: inputBoxSize.rightIcon.width,
      height: inputBoxSize.rightIcon.height,
      marginLeft: inputBoxSize.rightIcon.marginLeft,
    },
    inputFocused: {
      borderColor: 'blue',
    },
    inputError: {
      borderColor: themeColors.inputBox.error,
      color: themeColors.inputBox.error,
    },
    errorContainer: {
      marginTop: inputBoxSize.error.marginTop,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
