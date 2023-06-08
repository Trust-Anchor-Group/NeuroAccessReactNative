import {
  Button,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState, useContext } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { OtpInput } from '@src/components/OtpInput';
import { EnterOTPVerifyStyle as style } from '@src/styles/EnterOTPVerifyStyle';
import { ShowError } from '@src/components/ShowError';
import { NeuroAccessBackground } from '@src/components/NeuroAccessBackground';
import { Logo } from '@src/assets/svg/Logo';
import { ShowLabelsForAuth } from '@src/components/ShowLabelsForAuth';
import { NavigationHeader } from '@src/components/NavigationHeader';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@src/theme/provider/ThemeContext';

export const EmailOTPVerify = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const { t } = useTranslation();
  const { themeColors } = useContext(ThemeContext);
  const [isLoading, setLoading] = useState(false);
  const [otpValue, setOTPValue] = useState('');
  const [isOTPValid, setIsOTPValid] = useState(true);
  const [isMisMatch, setIsMisMatch] = useState(false);

  const handleSubmitOTP = (otp: string) => {
    if (isOTPValid) {
      //console.log('Submitting OTP:', otpValue);
      if (otpValue === '222222') {
        console.log('Submitting OTP:', otpValue);
      } else {
        console.log('Submitting OTP:', otpValue);
        setIsMisMatch(true);
      }
      // Call your submit action or perform any necessary logic here
    } else {
      setIsOTPValid(false);
      console.log('Please enter a valid OTP.');
    }
  };

  const handleOTPChange = (otp: string) => {
    // Perform any necessary logic when OTP changes
    // You can validate the OTP here if needed
    setIsMisMatch(false);
    setOTPValue(otp);
    setIsOTPValid(otp.length === 6);
    console.log('OTP changed:', otp);
  };

  const handleButtonClick = () => {
    const otp = handleSubmitOTP(otpValue); // get the OTP value from OTPInputFields component
  };

  const onBackClick = () => {
    navigation.goBack();
  };

  const onLanguageClick = () => {
    navigation.navigate('Settings');
  };

  return (
    <NeuroAccessBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={style.container}
      >
        <View style={style.containerSpace} />
        <View style={style.containerLogo}>
          <Logo
            textColor={themeColors.logoPrimary}
            logoColor={themeColors.logoSecondary}
          />
        </View>
        <View style={style.containerInput}>
          <ShowLabelsForAuth
            largeText={t('enterOTPVerifyScreen.header')}
            smallText={t('enterOTPVerifyScreen.message')}
            inputLabel={t('enterOTPVerifyScreen.label')}
          />

          <OtpInput
            onOTPChange={handleOTPChange}
            otpValue={otpValue}
            isError={!isOTPValid}
            isMisMatch={isMisMatch}
          />
          {<ShowError errorMessage="Please enter Otp" />}
        </View>
      </KeyboardAvoidingView>
      <NavigationHeader
        onBackAction={onBackClick}
        onLanguageAction={onLanguageClick}
      />
    </NeuroAccessBackground>
  );

  return (
    <View>
      <Text>EmailOTPVerify</Text>
      <OtpInput
        onOTPChange={handleOTPChange}
        otpValue={otpValue}
        isError={!isOTPValid}
        isMisMatch={isMisMatch}
      />
      {<ShowError errorMessage="Please enter Otp" />}
      {/* <Button
        title="Next"
        onPress={async () => {
          setLoading(true);
          const createData = await AgentAPI.Account.VerifyEMail(
            'pramodsphinx@gmail.com',
            '926200'
          );
          setLoading(false);
          navigation.navigate('EnterMobileNumber');
        }}
      /> */}

      <Button
        title="Next"
        onPress={() => {
          handleButtonClick();
          // navigation.navigate('EnterMobileNumber')
        }}
      />
    </View>
  );
};
