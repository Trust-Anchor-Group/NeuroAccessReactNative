import React, { useState, useContext, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { GlobalStyle as styles, EnterMobileNumberStyle } from '@Pages/Styles';
import { StackScreenProps } from '@react-navigation/stack';
import { Logo } from '@Assets/Svgs';
import {
  NeuroAccessBackground,
  NavigationHeader,
  ActionButton,
  TextLabelVariants,
  MobileInputView,
  TextLabel,
} from '@Controls/index';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
import { AgentAPI, APIType } from '@Services/API/Agent';

export const EnterMobileNumber = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  interface CountryCodeData {
    RemoteEndPoint: string;
    CountryCode: string;
    PhoneCode: string;
  }
  const { t } = useTranslation();
  const { themeColors } = useContext(ThemeContext);
  const [countryCode, setCountryCode] = useState<CountryCodeData>();
  const countryISOCode = countryCode?.CountryCode;
  const phoneCode = countryCode?.PhoneCode;
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  const onBackClick = () => {
    navigation.goBack();
  };

  const onLanguageClick = () => {
    navigation.navigate('Settings');
  };

  useEffect(() => {
    const callCountryCode = async () => {
      try {
        const createData = await AgentAPI.ID.CountryCode(APIType.ID_APP);
        setCountryCode(createData);
      } catch (error) {}
    };
    callCountryCode();
  }, []);

  const handleSubmit = async () => {
    try {
      const mobileNumber = phoneCode + inputValue;
      const response = await AgentAPI.ID.sendVerificationMessage(
        mobileNumber,
        APIType.ID_APP
      );
      if (response.Status) {
        navigation.navigate('EmailOTPVerify', { data: mobileNumber });
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
            {t('heading.getStarted')}
          </TextLabel>
          <TextLabel
            style={EnterMobileNumberStyle(themeColors).textLabel}
            variant={TextLabelVariants.LABEL}
          >
            {t('enterMobileScreen.message')}
          </TextLabel>
        </View>
        <View style={styles(themeColors).inputContainer}>
          <TextLabel variant={TextLabelVariants.INPUTLABEL}>
            {t('enterMobileScreen.label')}
          </TextLabel>
          <MobileInputView
            label1={countryISOCode}
            label2={phoneCode}
            value={inputValue}
            onChangeText={handleInputChange}
          />
        </View>
        <View style={styles(themeColors).buttonContainer}>
          <ActionButton
            textStyle={EnterMobileNumberStyle(themeColors).sendText}
            title={t('buttonLabel.sendCode')}
            onPress={() => {
              Keyboard.dismiss();
              handleSubmit();
            }}
          />
        </View>
      </KeyboardAvoidingView>
      <NavigationHeader
        onBackAction={onBackClick}
        onLanguageAction={onLanguageClick}
      />
    </NeuroAccessBackground>
  );
};
