import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {
  View,
  TextInput,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { InfoIcon } from '@src/assets/svg/InfoIcon';
import { TextLabel } from './TextLabel';
import { inputIconSize } from '@src/theme/Dimensions';
interface InputBoxProps extends TextInputProps {
  leftIcon: any;
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
  const inputRef = React.createRef<TextInput>();
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const leftIconColor = React.useRef<string>('#181F25');
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
    leftIconColor.current = '#3E776D';
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
            <LeftIcon iconColor={error ? '#F2495C' : leftIconColor.current} />
          </View>
        )}
        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            error && styles.inputError,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={handleAction}
          returnKeyType={actionType === 'next' ? 'next' : 'done'}
          {...rest}
        />
        {rightIcon && <Image source={rightIcon} style={styles.rightIcon} />}
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <InfoIcon />
          <TextLabel variant="errorLabel">{error}</TextLabel>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(24, 31, 37, 0.5)',
    backgroundColor: '#F5F6F7',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  containerFocused: {
    borderColor: '#3E776D',
  },
  errorOcurred: {
    borderColor: '#F2495C',
  },
  input: {
    flex: 1,
    height: inputIconSize[40],
    color: 'black',
    fontSize: 16,
  },
  leftIcon: {
    marginRight: 8,
  },
  leftIconFocused: {
    color: 'blue',
  },
  leftIconBlurred: {
    color: 'gray',
  },
  rightIcon: {
    width: 20,
    height: 20,
    marginLeft: 8,
  },
  inputFocused: {
    borderColor: 'blue',
  },
  inputError: {
    borderColor: '#F2495C',
    color: '#F2495C',
  },
  errorContainer: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default forwardRef(InputBox);
