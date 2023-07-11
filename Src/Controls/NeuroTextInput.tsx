import React, { useContext, forwardRef } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleProp,
  TextStyle,
  KeyboardTypeOptions,
  TouchableOpacity,
} from 'react-native';
import { NeuroTextInputStyle } from './Styles';
import { ExclamationIcon } from '@Assets/Svgs';
import { ThemeContext } from '@Theme/Provider';

interface CustomTextInputProps extends TextInputProps {
  validation?: (text: string) => boolean;
  errorStyle?: StyleProp<TextStyle>;
  placeholder: string;
  neuroStyle?: any;
  isError?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onIconPress?: () => void;
  onSubmitEditing?: () => void;
}

export const NeuroTextInput: React.FC<CustomTextInputProps> = forwardRef<
  TextInput,
  CustomTextInputProps
>(
  (
    {
      validation,
      errorStyle,
      placeholder,
      neuroStyle,
      isError,
      onIconPress,
      onSubmitEditing,
      ...textInputProps
    },
    ref
  ) => {
    const { themeColors } = useContext(ThemeContext);

    const handleReturnKey = () => {
      if (onSubmitEditing) {
        onSubmitEditing();
      }
    };

    return (
      <View style={NeuroTextInputStyle.container}>
        <TextInput
          {...textInputProps}
          style={neuroStyle}
          placeholder={placeholder}
          keyboardType={textInputProps.keyboardType}
          onSubmitEditing={handleReturnKey}
          ref={ref}
        />

        {isError && (
          <TouchableOpacity
            style={NeuroTextInputStyle.iconContainer}
            onPress={onIconPress}
          >
            <ExclamationIcon logoColor={themeColors.inputBox.error} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
);
