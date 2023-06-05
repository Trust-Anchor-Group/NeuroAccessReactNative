import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {
  View,
  TextInput,
  Image,
  ImageSourcePropType,
  TextInputProps,
} from 'react-native';
import { InfoIcon } from '@src/assets/svg/InfoIcon';
import { TextLabel } from './TextLabel';
import { InputBoxStyle } from './styles/InputBoxStyle';
import { TextLabelVariants } from '@src/utils/enums/TextLabelVariants';

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
          InputBoxStyle.container,
          isFocused ? InputBoxStyle.containerFocused : undefined,
          error ? InputBoxStyle.errorOcurred : undefined,
        ]}
      >
        {leftIcon && (
          <View style={InputBoxStyle.leftIcon}>
            <LeftIcon iconColor={error ? '#F2495C' : leftIconColor.current} />
          </View>
        )}
        <TextInput
          ref={inputRef}
          style={[
            InputBoxStyle.input,
            isFocused && InputBoxStyle.inputFocused,
            error && InputBoxStyle.inputError,
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
        {rightIcon && <Image source={rightIcon} style={InputBoxStyle.rightIcon} />}
      </View>
      {error && (
        <View style={InputBoxStyle.errorContainer}>
          <InfoIcon />
          <TextLabel variant={TextLabelVariants.ERRORLABEL}>{error}</TextLabel>
        </View>
      )}
    </View>
  );
};



export default forwardRef(InputBox);
