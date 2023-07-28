import React, { useState, useRef, useContext, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {
  NeuroAccessBackground,
  NavigationHeader,
  TextLabel,
  TextLabelVariants,
  ActionButton,
  Loader,
} from '@Controls/index';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
import InputBox, { TextInputRef } from '@Controls/InputBox';
import { Logo, EmailIcon } from '@Assets/Svgs';
import { isValidEmail } from '@Helpers/index';
import { AgentAPI } from '@Services/API/Agent';
import { GlobalStyle as styles, EnterEmailStyle } from '@Pages/Styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  UserPayload,
  createAccountUsingEmail,
  saveEmail,
  saveAccountPassword,
} from '@Services/Redux/Actions/GetUserDetails';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { setUserSliceError } from '@Services/Redux/Reducers/UserSlice';
import { isEmpty } from '@Helpers/Utils';

export const EnterEmail = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { userDetails, loading, error } = useSelector((state) => state.user);
  const { themeColors } = useContext(ThemeContext);
  const emailInputRef = useRef<TextInputRef>(null);
  const accountPassword = useRef<string>('');
  const [email, setEmail] = useState(userDetails?.email);

  useEffect(() => {
    if (error) {
      Alert.alert('Error!', JSON.stringify(error), [
        {
          text: 'ok',
          onPress: () => dispatch(setUserSliceError('')),
        }
      ]);
    }
  }, [error]);

  useEffect(() => {
    if (!isEmpty(userDetails?.tokenData)) {
      const nextPage = async () => {
        await dispatch(saveEmail(email));
        await dispatch(saveAccountPassword(accountPassword?.current));
        navigation.navigate('EmailOTPVerify');  
      }
      nextPage()
    }
  }, [userDetails?.tokenData]);

  const handleSubmit = () => {
    generateUniqueKey();
  };

  const generateUniqueKey = async () => {
    try {
      const randomString = AgentAPI.Account.getRandomValues(32);
      const s1 = userDetails?.userName + ':' + email + ':' + randomString;
      accountPassword.current = await AgentAPI.Account.Sign(
        userDetails.userName,
        s1
      );
      callCreateAccount();
    } catch (error) {}
  };

  const callCreateAccount = async () => {
    const userPayload: UserPayload = {
      UserName: userDetails?.userName,
      EMail: email,
      Password: accountPassword.current,
    };
    const isFormValid = emailInputRef.current?.validate();
    if (isFormValid) {
      Keyboard.dismiss();
      try {
        await dispatch(createAccountUsingEmail(userPayload));
      } catch (error) {
        alert(error);
      }
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
          <ActionButton
            disabled={!email}
            textStyle={[
              EnterEmailStyle(themeColors).sendText,
              !email && { color: themeColors.button.disableText },
            ]}
            buttonStyle={
              !email && {
                backgroundColor: themeColors.button.disableBg,
              }
            }
            title={t('buttonTitle.sendCode')}
            onPress={async () => {
              if (email) {
                Keyboard.dismiss();
                handleSubmit();
              }
            }}
          />
        </View>
      </KeyboardAvoidingView>
      <NavigationHeader
        onBackAction={onBackClick}
        onLanguageAction={onLanguageClick}
      />
      <Loader loading={loading} />
    </NeuroAccessBackground>
  );
};
