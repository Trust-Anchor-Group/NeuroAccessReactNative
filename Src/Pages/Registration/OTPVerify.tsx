import { View, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  NeuroAccessBackground,
  OtpInput,
  ShowError,
  NavigationHeader,
  ActionButton,
  TextLabel,
  TextLabelVariants,
} from '@Controls/index';
import { GlobalStyle as styles, EnterOTPVerifyStyle } from '@Pages/Styles';
import { Logo } from '@Assets/Svgs';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@Theme/Provider';
import { AgentAPI } from '@Services/API/Agent';
import { Loader } from '@Controls/index';
import { OnboardingAPI } from '@Services/API/OnboardingApi';
import { getDomainDetails, setDomainDetails } from '@Services/Redux/Actions/GetDomainDetails';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { DomainInfo } from '@Services/Redux/Reducers/DomainSlice';

type Props = StackScreenProps<{}>;

export const OTPVerify = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { userDetails, loading, error } = useSelector((state) => state.user);
  const { number, code } = userDetails?.mobileNumber;
  const mobileNumber = code + number;
  const { themeColors } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otpValue, setOTPValue] = useState('');
  const [isError, setIsError] = useState(false);
  const errorMessage = React.useRef('');

  const handleOTPChange = (otp: string) => {
    setIsError(false);
    setOTPValue(otp);
  };

  const handleSubmit = () => {
    if (otpValue === '') {
      setIsError(true);
      errorMessage.current = t('enterOTPVerifyScreen.emptyFields');
    } else if (otpValue.length < 6) {
      setIsError(true);
      errorMessage.current = t('enterOTPVerifyScreen.emptyFields');
    } else if (otpValue.length === 6) {
      setIsError(false);
      callVerificationCode();
    } else {
      setIsError(true);
      errorMessage.current = t('enterOTPVerifyScreen.wrongCode');
    }
  };

  const callVerificationCode = async () => {
    setIsLoading(true);
    let response = await OnboardingAPI.ID.verifyNumber(mobileNumber, otpValue);
    setIsLoading(false);
    if (response?.Status) {
      let responseObj: DomainInfo = {
        Domain: response['Domain'],
        Key: response['Key'],
        Secret: response['Secret']
      };
      dispatch(setDomainDetails(responseObj));
      navigation.navigate('CurrentProvider');
    }
  };
  const onBackClick = () => {
    navigation.goBack();
  };

  const onLanguageClick = () => {
    navigation.navigate('Settings');
  };

  const callResendCode = async () => {
    try {
      setOTPValue('');
      setIsLoading(true);
      const response = await OnboardingAPI.ID.sendVerificationMessage(
        mobileNumber
      );
      setIsLoading(false);
      if (response.Status) {
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <NeuroAccessBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles(themeColors).container}
      >
        <View style={styles(themeColors).spaceContainer} />
        <View style={styles(themeColors).logoContainer}>
          <Logo
            textColor={themeColors.logoPrimary}
            logoColor={themeColors.logoSecondary}
          />
        </View>

        <View style={styles(themeColors).informationContainer}>
          <TextLabel variant={TextLabelVariants.HEADER}>
            {t('enterOTPVerifyScreen.header')}
          </TextLabel>
          <TextLabel
            style={EnterOTPVerifyStyle(themeColors).textLabel}
            variant={TextLabelVariants.LABEL}
          >
            {t('enterOTPVerifyScreen.message') + ' ' + mobileNumber}
          </TextLabel>
        </View>
        <View style={styles(themeColors).inputContainer}>
          <TextLabel
            style={EnterOTPVerifyStyle(themeColors).label}
            variant={TextLabelVariants.INPUTLABEL}
          >
            {t('enterOTPVerifyScreen.label')}
          </TextLabel>
          <OtpInput
            onOTPChange={handleOTPChange}
            otpValue={otpValue}
            isError={isError}
            handleSubmit={handleSubmit}
          />
          {isError && <ShowError errorMessage={errorMessage.current} />}
        </View>
        <View style={styles(themeColors).buttonContainer}>
          <View style={EnterOTPVerifyStyle(themeColors).bottom}>
            <ActionButton
              buttonStyle={EnterOTPVerifyStyle(themeColors).resendButton}
              title={t('buttonTitle.resend')}
              textStyle={EnterOTPVerifyStyle(themeColors).resendText}
              onPress={callResendCode}
            />

            <ActionButton
              buttonStyle={EnterOTPVerifyStyle(themeColors).sendButton}
              title={t('buttonTitle.verify')}
              textStyle={EnterOTPVerifyStyle(themeColors).sendText}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      <NavigationHeader
        onBackAction={onBackClick}
        onLanguageAction={onLanguageClick}
      />
      <Loader loading={isLoading} />
    </NeuroAccessBackground>
  );
};
