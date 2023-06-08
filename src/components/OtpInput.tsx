import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';

interface OTPInputProps {
  onOTPChange: (otp: string) => void;
  otpValue: string;
  isError: boolean;
  isMisMatch: boolean;
}

export const OtpInput:React.FC<OTPInputProps> = ({onOTPChange, isError, otpValue, isMisMatch}) => {
  // const [otp, setOTP] = useState<string[]>(Array(6).fill(''));

  // const handleOTPChange = (index: number, value: string) => {
  //   if (value.match(/^\d*$/)) {
  //     const newOTP = [...otp];
  //     newOTP[index] = value;
  //     setOTP(newOTP);
  //     onOTPChange(newOTP.join(''));
  //   }
  // };
   const [otp, setOTP] = useState<string[]>(Array(6).fill(''));
   const [isValid, setIsValid] = useState<boolean[]>(Array(6).fill(true));
   const otpInputRefs = useRef<TextInput[]>([]);


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
      setIsValid((prevValidity) => {
        const newValidity = [...prevValidity];
        newValidity[index] = true;
        return newValidity;
      });
      if (index < otp.length - 1 && value === '') {
        otpInputRefs.current[index - 1].focus();
      }
      if (value !== '') {
        otpInputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOTPKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && otp[index] === '' && index > 0) {
      otpInputRefs.current[index - 1].focus();
    }
  };

  // const handleSubmit = () => {
  //   const isOTPValid = otp.every((digit) => digit !== '');
  //   setIsValid(
  //     otp.map((digit, index) => digit !== '' || isValid[index])
  //   );
  //   if (isOTPValid) {
  //     console.log('Valid OTP:', otp.join(''));
  //   } else {
  //     console.log('Please enter a valid OTP.');
  //   }
  // };

  // const handleSubmit = () => {
  //   const isOTPValid = otp.every((digit) => digit !== '');
  //   setIsValid(
  //     otp.map((digit, index) => digit !== '' || isValid[index])
  //   );
  //   if (isOTPValid) {
  //     onSubmit(otp.join(''));
  //   } else {
  //     console.log('Please enter a valid OTP.');
  //   }
  // };

  return (
    // <View style={styles.container}>
    //   {Array.from({ length: 6 }, (_, index) => (
    //     <TextInput
    //       key={index}
    //       style={styles.input}
    //       value={otp[index]}
    //       onChangeText={(value) => handleOTPChange(index, value)}
    //       keyboardType="numeric"
    //       maxLength={1}
    //     />
    //   ))}
    // </View>
    <View style={styles.container}>
      {Array.from({ length: 6 }, (_, index) => (
        <TextInput
          key={index}
          // style={[
          //   styles.input,
          //   !isValid[index] && styles.invalidInput,
          // ]}
          // style={[
          //   styles.input,
          //   isError && otp[index] === '' && styles.invalidInput,
          // ]}
          style={[
            styles.input,
            isError && otp[index] === '' && styles.invalidInput, isMisMatch && styles.invalidInput
          ]}
          value={otp[index]}
          onChangeText={(value) => handleOTPChange(index, value)}
          onKeyPress={({ nativeEvent: { key } }) =>
            handleOTPKeyPress(index, key)
          }
          keyboardType="numeric"
          maxLength={1}
          ref={(ref) => (otpInputRefs.current[index] = ref)}
        />
      ))}
      {/* <Button onPress={handleSubmit}>Submit</Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 4,
    width: 40,
    textAlign: 'center',
    fontSize: 20,
  },
  invalidInput: {
    borderColor: 'red',
    color: 'red',
  },
});
