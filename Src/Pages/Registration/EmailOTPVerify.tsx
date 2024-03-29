import { View, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import {
  NeuroAccessBackground,
  OtpInput,
  ShowError,
  NavigationHeader,
  ActionButton,
  TextLabel,
  TextLabelVariants,
  Loader,
} from '@Controls/index';
import { GlobalStyle as styles, EnterOTPVerifyStyle } from '@Pages/Styles';
import { Logo } from '@Assets/Svgs';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@Theme/Provider';
import { AgentAPI } from '@Services/API/Agent';
import {
  UserPayload,
  createAccountUsingEmail,
} from '@Services/Redux/Actions/GetUserDetails';
import { setEmailVarified, setUserSliceError } from '@Services/Redux/Reducers/UserSlice';
import { isEmpty } from '@Helpers/Utility/Utils';

type Props = StackScreenProps<{}>;

export const EmailOTPVerify = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { userDetails, loading, error } = useSelector((state) => state.user);
  const { themeColors } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otpValue, setOTPValue] = useState('');
  const [isError, setIsError] = useState(error.length ? true : false);
  const errorMessage = React.useRef(error);

  React.useEffect(() => {
    if (error) {
      Alert.alert(t('Error.ErrorTitle'), JSON.stringify(error), [
        {
          text: 'ok',
          onPress: () => dispatch(setUserSliceError('')),
        },
      ]);
    }
  }, [error]);

  React.useEffect(() => {
    if (!isEmpty(userDetails?.tokenData)) {
      const nextPage = async () => {
        navigation.navigate('EmailOTPVerify');
      };
      nextPage();
    }
  }, [userDetails?.tokenData]);

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
    try {
      setIsLoading(true);
      let response = await AgentAPI.Account.VerifyEMail(
        userDetails?.email,
        otpValue
      );
      await setIsLoading(false);
      if (response?.eMail) {
        await dispatch(setEmailVarified(true))
        navigation.navigate('TellUsAboutYou');
      }
    } catch (error) {
      setIsLoading(false);
      alert(`Error : ${error['message']}`);
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
      setOTPValue('');
      const userPayload: UserPayload = {
        UserName: userDetails?.userName,
        EMail: userDetails?.email,
        Password: userDetails?.password,
      };
      await dispatch(createAccountUsingEmail(userPayload));
    } catch (error) {
      alert(`Error : ${error['message']}`);
    }
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
            {t('enterOTPVerifyScreen.message') + ' ' + userDetails?.email}
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
              title={t('buttonTitle.resend')}
              textStyle={EnterOTPVerifyStyle(themeColors).resendText}
              onPress={callResendCode}
            />

            <ActionButton
              buttonStyle={EnterOTPVerifyStyle(themeColors).sendButton}
              title={t('buttonTitle.verify')}
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
      <Loader loading={isLoading || loading} />
    </NeuroAccessBackground>
  );
};
