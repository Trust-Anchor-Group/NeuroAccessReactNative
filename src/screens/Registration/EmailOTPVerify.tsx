import { Button, StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { OtpInput } from '@src/components/OtpInput'

export const EmailOTPVerify = ({ navigation }:StackScreenProps<{Profile: any}>) => {

  const [otpValue, setOTPValue] = useState('');
  const [isOTPValid, setIsOTPValid] = useState(true);
  const [isMisMatch, setIsMisMatch] = useState(false);

  const handleSubmitOTP = (otp: string) => {
    if (isOTPValid) {
      //console.log('Submitting OTP:', otpValue);
      if(otpValue==='222222')
      {
        console.log('Submitting OTP:', otpValue);
      }
      else{
        console.log('Submitting OTP:', otpValue);
        setIsMisMatch(true)
      }
      // Call your submit action or perform any necessary logic here
    } else {
      setIsOTPValid(false)
      console.log('Please enter a valid OTP.');
    }
  };

  const handleOTPChange = (otp: string) => {
    // Perform any necessary logic when OTP changes
    // You can validate the OTP here if needed
    setIsMisMatch(false)
    setOTPValue(otp);
    setIsOTPValid(otp.length === 6);
    console.log('OTP changed:', otp);
  };

  const handleButtonClick = () => {
    const otp = // get the OTP value from OTPInputFields component
    handleSubmitOTP(otpValue);
  };


  return (
    <View>
      <Text>EmailOTPVerify</Text>
      <OtpInput onOTPChange={handleOTPChange} otpValue={otpValue} isError={!isOTPValid} isMisMatch={isMisMatch}/>
      <Button title='Next' onPress={() => {
        handleButtonClick();
       // navigation.navigate('EnterMobileNumber')
        
        }}/>
    </View>
  )
}

const styles = StyleSheet.create({})