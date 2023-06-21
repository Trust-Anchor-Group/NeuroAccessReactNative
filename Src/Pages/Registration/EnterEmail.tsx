import React, { useState, useRef, useContext } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {
  NeuroAccessBackground,
  NavigationHeader,
  TextLabel,
  TextLabelVariants,
  ActionButton,
} from '@Controls/index';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
import InputBox, { TextInputRef } from '@Controls/InputBox';
import { Logo, EmailIcon } from '@Assets/Svgs';
import { isValidEmail } from '@Helpers/index';
import { AgentAPI } from '@Services/API/Agent';
import { GlobalStyle as styles, EnterEmailStyle } from '@Pages/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '@Services/Redux/Actions/GetUserDetails';
import { ThunkDispatch } from '@reduxjs/toolkit';

export const EnterEmail = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { user, loading, error } = useSelector((state) => state.user);
  const { themeColors } = useContext(ThemeContext);
  const emailInputRef = useRef<TextInputRef>(null);
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    const isFormValid = emailInputRef.current?.validate();
    if (isFormValid) {
      dispatch(fetchUser(email));
      navigation.navigate('EnterMobileNumber');
    }
  };

  const onBackClick = () => {
    navigation.goBack();
  };

  const onLanguageClick = () => {
    navigation.navigate('Settings');
  };

  if (loading) {
    return <ActivityIndicator />;
  }

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
            style={EnterEmailStyle(themeColors).textLabel}
            variant={TextLabelVariants.LABEL}
          >
            {t('heading.verifyEmail')}
          </TextLabel>
        </View>

        <View style={styles(themeColors).inputContainer}>
          <TextLabel variant={TextLabelVariants.INPUTLABEL}>
            {t('enterEmailScreen.label')}
          </TextLabel>
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
        </View>

        <View style={styles(themeColors).buttonContainer}>
          <ActivityIndicator animating={loading} />
          <ActionButton
            textStyle={EnterEmailStyle(themeColors).sendText}
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
