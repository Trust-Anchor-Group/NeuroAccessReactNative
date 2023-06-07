import React, { useState, useRef, useContext } from 'react';
import { View, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { NeuroAccessBackground } from '@src/components/NeuroAccessBackground';
import { EnterEmailStyle } from '@src/styles/EnterEmailStyle';
import InputBox, { TextInputRef } from '@src/components/InputBox';
import { NavigationHeader } from '@src/components/NavigationHeader';
import { Logo } from '@src/assets/svg/Logo';
import { EmailIcon } from '@src/assets/svg/EmailIcon';
import { isValidEmail } from '@src/utils/Validation';
import { ActionButton } from '@src/components/ActionButton';
import { ShowLabelsForAuth } from '@src/components/ShowLabelsForAuth';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@src/theme/provider/ThemeContext';

export const EnterEmail = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const { t } = useTranslation();
  const { themeColors } = useContext(ThemeContext);
 const style = EnterEmailStyle(themeColors)
  const emailInputRef = useRef<TextInputRef>(null);
  const [email, setEmail] = useState('');
  
  const handleSubmit = () => {
    const isFormValid = emailInputRef.current?.validate();
    if (isFormValid) {
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
