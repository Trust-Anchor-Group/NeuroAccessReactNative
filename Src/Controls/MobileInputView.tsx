import React, {
  useImperativeHandle,
  useState,
  forwardRef,
  useContext,
} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { MobileInputViewStyle as styles } from './Styles';
import { DropDownIcon } from '@Assets/Svgs';
import { ShowError } from './ShowError';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
interface CustomInputBoxProps extends TextInputProps {
  flag: string;
  code: string;
  value: string;
  onChangeText: (text: string) => void;
  onCountrySelect: () => void;
  onAction?: () => void;
  validator?: (text: string) => string | undefined;
}

export interface TextInputRef {
  focus: () => void;
  blur: () => void;
  validate: () => boolean;
}
const MobileInputView: React.ForwardRefRenderFunction<
  TextInputRef,
  CustomInputBoxProps
> = (
  { flag, code, value, onChangeText, onCountrySelect, onAction, validator },
  ref
) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const inputRef = React.createRef<TextInput>();
  const { t } = useTranslation();
  const { themeColors } = useContext(ThemeContext);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    blur: () => {
      inputRef.current?.blur();
    },
    validate: () => {
      const errorMessage = validator ? validator(value) : undefined;
      setError(errorMessage);
      return !errorMessage;
    },
  }));

  const handleFocus = () => {
    setError(undefined);
  };

  const handleBlur = () => {
    const errorMessage = validator ? validator(value) : undefined;
    setError(errorMessage);
  };

  const handleAction = () => {
    if (validator) {
      const isValid = validator(value);
      if (isValid) {
        onAction?.();
      } else {
        setError(isValid);
      }
    } else {
      onAction?.();
    }
  };

  return (
    <View>
      <View style={styles(themeColors).container}>
        <TouchableOpacity
          style={styles(themeColors).touchableOpacity}
          onPress={onCountrySelect}
        >
          <Text style={[styles(themeColors).flagLabel]}>{flag}</Text>
          <Text style={[styles(themeColors).label]}>{code}</Text>
          <DropDownIcon iconColor={themeColors.dropdown} />
        </TouchableOpacity>
        <TextInput
          ref={inputRef}
          style={styles(themeColors).input}
          value={value}
          autoComplete={'off'}
          onChangeText={onChangeText}
          placeholder={t('heading.mobilePlaceHolder')}
          placeholderTextColor={themeColors.dropdown}
          keyboardType="numeric"
          returnKeyType="done"
          onSubmitEditing={handleAction}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
      {error && <ShowError errorMessage={error} />}
    </View>
  );
};
export default forwardRef(MobileInputView);
