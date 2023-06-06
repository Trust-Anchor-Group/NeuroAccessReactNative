import React, { useState, useRef } from 'react';
import { View, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { NeuroAccessBackground } from '@src/components/NeuroAccessBackground';
import { EnterEmailStyle } from '@src/styles/EnterEmailStyle';
import InputBox, { TextInputRef } from '@src/components/InputBox';
import { NavigationHeader } from '@src/components/NavigationHeader';
import { Logo } from '@src/assets/svg/Logo';
import { Colors } from '@src/theme/Colors';
import { EmailIcon } from '@src/assets/svg/EmailIcon';
import { isValidEmail } from '@src/utils/Validation';
import { ActionButton } from '@src/components/ActionButton';
import { ShowLabelsForAuth } from '@src/components/ShowLabelsForAuth';
import { useTranslation } from 'react-i18next';

export const EnterEmail = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const { t } = useTranslation();
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
        style={EnterEmailStyle.container}
      >
        <View style={EnterEmailStyle.containerSpace} />
        <View style={EnterEmailStyle.containerLogo}>
          <Logo
            textColor={Colors.light.logoPrimary}
            logoColor={Colors.light.logoSecondary}
          />
        </View>
        <View style={EnterEmailStyle.containerInput}>
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
            onFocusColor={Colors.light.inputFocus}
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

          <View style={EnterEmailStyle.button}>
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
