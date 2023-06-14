import { TextInput, View } from 'react-native';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { ThemeContext } from '@Theme/Provider';
import { OtpInputStyle } from './Styles/OtpInputStyle';

interface OTPInputFieldsProps {
  onOTPChange: (otp: string) => void;
  otpValue: string;
  isError: boolean;
  handleSubmit: () => void;
}

export const OtpInput: React.FC<OTPInputFieldsProps> = ({
  onOTPChange,
  otpValue,
  isError,
  handleSubmit,
}) => {
  const { themeColors } = useContext(ThemeContext);
  const styles = OtpInputStyle(themeColors);
  const [otp, setOTP] = useState<string[]>(Array(6).fill(''));
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const prevInputIndex = useRef<number>(-1);
  const refs = useRef<TextInput[]>([]);

  useEffect(() => {
    if (otpValue.length === 6) {
      setOTP(otpValue.split(''));
    }
  }, [otpValue]);

  const handleOTPChange = (index: number, value: string) => {
    if (value.match(/^\d*$/)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);
      onOTPChange(newOTP.join(''));
      setActiveIndex(index < 5 ? index + 1 : 5);
      prevInputIndex.current = index < 5 ? index + 1 : 5;
    }
  };

  const handleBackPress = (index: number) => {
    if (otp[index]) {
      const newOTP = [...otp];
      newOTP[index] = '';
      setOTP(newOTP);
      onOTPChange(newOTP.join(''));
      setActiveIndex(index);
      prevInputIndex.current = index;
    } else if (index > 0) {
      const newOTP = [...otp];
      newOTP[index - 1] = '';
      setOTP(newOTP);
      onOTPChange(newOTP.join(''));
      setActiveIndex(index - 1);
      prevInputIndex.current = index - 1;
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === 'Backspace') {
      handleBackPress(index);
    }
  };

  useEffect(() => {
    return () => {
      refs.current.forEach((ref, index) => {
        if (ref) {
          ref.setNativeProps({ onKeyPress: undefined });
        }
      });
    };
  }, []);

  useEffect(() => {
    if (activeIndex >= 0 && activeIndex < refs.current.length) {
      refs.current[activeIndex]?.focus();
    }
  }, [activeIndex, handleBackPress]);

  useEffect(() => {
    if (otpValue.length === 6) {
      handleSubmit();
    }
  }, [otpValue, handleSubmit]);

  return (
    <View style={styles.container}>
      {Array.from({ length: 6 }, (_, index) => {
        return (
          <TextInput
            key={index}
            ref={(ref) => (refs.current[index] = ref)}
            style={[
              styles.input,
              activeIndex === index ? styles.activeInput : null,
              otp[index] ? styles.enteredInput : null,
              isError ? styles.errorText : null,
            ]}
            value={otp[index]}
            onChangeText={(value) => handleOTPChange(index, value)}
            keyboardType="numeric"
            maxLength={1}
            onFocus={() => setActiveIndex(index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            placeholder="0"
            placeholderTextColor={themeColors.otpInput.placeholderTextColor}
          />
        );
      })}
    </View>
  );
};
