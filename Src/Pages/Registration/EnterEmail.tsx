import React, { useState, useRef, useContext } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { NeuroAccessBackground } from '@Controls/NeuroAccessBackground';
import InputBox, { TextInputRef } from '@Controls/InputBox';
import { NavigationHeader } from '@Controls/NavigationHeader';
import { ActionButton } from '@Controls/ActionButton';
import { ShowLabelsForAuth } from '@Controls/ShowLabelsForAuth';
import { Logo, EmailIcon } from '@Assets/Svgs';
import { EnterEmailStyle } from '@Pages/Styles';
import { isValidEmail } from '@Helpers/index';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
import { AgentAPI } from '@Services/API/Agent';

export const EnterEmail = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const { t } = useTranslation();
  const { themeColors } = useContext(ThemeContext);
  const style = EnterEmailStyle(themeColors);
  const emailInputRef = useRef<TextInputRef>(null);
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const isFormValid = emailInputRef.current?.validate();
    if (isFormValid) {
      setLoading(true);
      const createData = await AgentAPI.Account.Create(email, email, email);
      setLoading(false);
      navigation.navigate('EmailOTPVerify');
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
            largeText={t('heading.getStarted')}
            smallText={t('heading.verifyEmail')}
            inputLabel={t('enterEmailScreen.label')}
          />
          <InputBox
            leftIcon={EmailIcon}
            keyboardType="email-address"
            ref={emailInputRef}
            value={email}
            onChangeText={(val) => {
              setEmail(val);
            }}
            actionType="done"
            onFocusColor={themeColors.inputBox.inputFocus}
            placeholder={t('enterEmailScreen.placeHolder')}
            autoFocus={false}
            autoCapitalize="none"
            onAction={() => {
              handleSubmit;
            }}
            validator={(value) => {
              return isValidEmail(value);
            }}
          />

          <View style={style.button}>
            <ActivityIndicator animating={isLoading} />
            <ActionButton
              title={t('buttonLabel.sendCode')}
              onPress={() => {
                Keyboard.dismiss();
                handleSubmit();
              }}
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
