import { View, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useContext } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { OtpInput } from '@Controls/OtpInput';
import { EnterOTPVerifyStyle } from '@Pages/Styles/EnterOTPVerifyStyle';
import { ShowError } from '@Controls/ShowError';
import { NeuroAccessBackground } from '@Controls/NeuroAccessBackground';
import { Logo } from '@Assets/Svgs';
import { ShowLabelsForAuth } from '@Controls/ShowLabelsForAuth';
import { NavigationHeader } from '@Controls/NavigationHeader';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@Theme/Provider';
import { ActionButton } from '@Controls/ActionButton';
import { AgentAPI } from '@Services/API/Agent';

export const EmailOTPVerify = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const { t } = useTranslation();
  const { themeColors } = useContext(ThemeContext);
  const style = EnterOTPVerifyStyle(themeColors);

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
    } else if (otpValue === '123456') {
      setIsError(false);
      navigation.navigate('EnterMobileNumber');
    } else {
      setIsError(true);
      errorMessage.current = t('enterOTPVerifyScreen.wrongCode');
    }
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
            isError={isError}
            handleSubmit={handleSubmit}
          />
          {isError && <ShowError errorMessage={errorMessage.current} />}

          <View style={style.bottom}>
            <ActionButton
              buttonStyle={style.resendButton}
              title={t('buttonLabel.resend')}
              textStyle={style.resendText}
              onPress={handleSubmit}
            />

            <ActionButton
              buttonStyle={style.sendButton}
              title={t('buttonLabel.verify')}
              textStyle={style.sendText}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      <NavigationHeader
        onBackAction={onBackClick}
        onLanguageAction={onLanguageClick}
      />
    </NeuroAccessBackground>
  );
};
