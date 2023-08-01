import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useContext,
} from 'react';
import {
  View,
  TextInput,
  Image,
  ImageSourcePropType,
  TextInputProps,
} from 'react-native';
import { ShowError } from './ShowError';
import { InputBoxStyle } from './Styles/InputBoxStyle';
import { ThemeContext } from '@Theme/Provider/ThemeContext';

interface InputBoxProps extends TextInputProps {
  leftIcon?: any;
  rightIcon?: ImageSourcePropType;
  onFocusColor?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  actionType?: 'none' | 'next' | 'done';
  onAction?: () => void;
  validator?: (text: string) => string | undefined;
}

export interface TextInputRef {
  focus: () => void;
  blur: () => void;
  validate: () => boolean;
}

const InputBox: React.ForwardRefRenderFunction<TextInputRef, InputBoxProps> = (
  {
    leftIcon,
    rightIcon,
    onFocusColor,
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default',
    actionType = 'none',
    onAction,
    validator,
    ...rest
  },
  ref
) => {
  const { themeColors } = useContext(ThemeContext);
  const styles = InputBoxStyle(themeColors);
  const iconColor = themeColors.inputBox.leftIconDefault;
  const inputRef = React.createRef<TextInput>();
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const leftIconColor = React.useRef<string>(
    themeColors.inputBox.leftIconDefault
  );
  const LeftIcon = leftIcon;

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
    leftIconColor.current = themeColors.inputBox.leftIconActive;
    setIsFocused(true);
    setError(undefined);
  };

  const handleBlur = () => {
    setIsFocused(false);
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
      <View
        style={[
          styles.container,
          isFocused ? styles.containerFocused : undefined,
          error ? styles.errorOcurred : undefined,
        ]}
      >
        {leftIcon && (
          <View style={styles.leftIcon}>
            <LeftIcon
              iconColor={
                error ? themeColors.inputBox.error : leftIconColor.current
              }
            />
          </View>
        )}
        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            error && styles.inputError,
          ]}
          autoComplete={'off'}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={themeColors.inputBox.inactiveText}
          keyboardType={keyboardType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={handleAction}
          returnKeyType={actionType === 'next' ? 'next' : 'done'}
          {...rest}
        />
        {rightIcon && <Image source={rightIcon} style={styles.rightIcon} />}
      </View>
      {error && <ShowError errorMessage={error} />}
    </View>
  );
};

export default forwardRef(InputBox);
