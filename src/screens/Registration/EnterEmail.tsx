import React, { useState, useRef } from 'react';
import {
  Button,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { PlaneBackGround } from '@src/components/PlaneBackGround';
import { EnterEmailStyle } from '@src/styles/EnterEmailStyle';
import { TextLabel } from '@src/components/TextLabel';
import InputBox, { TextInputRef } from '@src/components/InputBox';
import { HeaderLayer } from '@src/components/HeaderLayer';
import { Logo } from '@src/assets/svg/Logo';
import { Colors } from '@src/theme/Colors';
import { EmailIcon } from '@src/assets/svg/EmailIcon';
import { isValidEmail } from '@src/utils/Validation';

export const EnterEmail = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const emailInputRef = useRef<TextInputRef>(null);
  const ageInputRef = useRef<TextInputRef>(null);
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    const isFormValid = emailInputRef.current?.validate();
    if (isFormValid) {
      navigation.navigate('EmailOTPVerify');
    }
  };

  return (
    <PlaneBackGround>
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
          <TextLabel variant="header">Let's get started</TextLabel>
          <TextLabel style={EnterEmailStyle.textMargin} variant="label">
            To get verified, you need to enter your email
          </TextLabel>
          <TextLabel style={EnterEmailStyle.textMargin} variant="inputLabel">
            Enter email
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
            onFocusColor="#3E776D"
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
            <Button
              color="#841584"
              title="Next"
              onPress={() => {
                Keyboard.dismiss();
                handleSubmit();
              }}
            ></Button>
          </View>
        </View>
      </KeyboardAvoidingView>
      <HeaderLayer />
    </PlaneBackGround>
  );
};
