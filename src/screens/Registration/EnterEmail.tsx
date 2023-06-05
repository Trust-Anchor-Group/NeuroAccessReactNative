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

export const EnterEmail = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
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

  const onLanguageClick = () => {};

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
            largeText="Let's get started"
            smallText="To get verified, you need to enter your email"
            inputLabel="Enter email"
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
            placeholder="your.email@email.com"
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
              title="Send Code"
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
