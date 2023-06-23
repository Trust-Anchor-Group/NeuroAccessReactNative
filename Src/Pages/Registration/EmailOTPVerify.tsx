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
import { AgentAPI, APIType } from '@Services/API/Agent';
import { useRoute } from '@react-navigation/native';
import { Loader } from '@Controls/index';

export const EmailOTPVerify = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const route = useRoute();
  const { data } = route?.params;
  const { t } = useTranslation();
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
    const response = await AgentAPI.ID.verifyNumber(
      data,
      otpValue,
      APIType.ID_APP
    );
    if (response.Status) {
      navigation.navigate('CreateAccount');
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
      setIsLoading(true);

      const response = await AgentAPI.ID.sendVerificationMessage(
        data,
        APIType.ID_APP
      );
      if (response.Status) {
        setIsLoading(false);
      }
    } catch (error) {}
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
            {t('enterOTPVerifyScreen.message') + ' ' + data}
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
              title={t('buttonLabel.resend')}
              textStyle={EnterOTPVerifyStyle(themeColors).resendText}
              onPress={callResendCode}
            />

            <ActionButton
              buttonStyle={EnterOTPVerifyStyle(themeColors).sendButton}
              title={t('buttonLabel.verify')}
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
