import { View, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  NeuroAccessBackground,
  OtpInput,
  ShowError,
  NavigationHeader,
  ActionButton,
  TextLabel,
  TextLabelVariants,
} from '@Controls/index';
import { GlobalStyle as styles, EnterOTPVerifyStyle } from '@Pages/Styles';
import { Logo } from '@Assets/Svgs';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@Theme/Provider';
import { Loader } from '@Controls/index';
import { mobileNumberOtpVerification } from '@Services/Redux/Actions/GetDomainDetails';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { setDomainSliceError } from '@Services/Redux/Reducers/DomainSlice';
import { StackActions } from '@react-navigation/native';
import {
  createAccountUsingMobileNumber,
  saveKeyId,
} from '@Services/Redux/Actions/GetUserDetails';
import { setUserSliceError } from '@Services/Redux/Reducers/UserSlice';
import { isEmpty } from '@Helpers/Utils';

type Props = StackScreenProps<{}>;

export const OTPVerify = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { userDetails, loading, error } = useSelector((state) => state.user);
  const {
    defaultDomain,
    loading: isDomainLoading,
    error: domainError,
  } = useSelector((state) => state.domain);
  const number = userDetails?.mobileNumber?.number;
  const code = userDetails?.mobileNumber?.code;
  const purpose = (userDetails?.purpose?.value === 0 || userDetails?.purpose?.value === 1) ? false : true ;
  const mobileNumber = code + number;
  const { themeColors } = useContext(ThemeContext);
  const [otpValue, setOTPValue] = useState('');
  const [isError, setIsError] = useState(false);
  const errorMessage = React.useRef('');

  useEffect(() => {
    if (error || domainError) {
      Alert.alert(
        t('Error.ErrorTitle'),
        JSON.stringify(error ? error : domainError),
        [
          {
            text: 'ok',
            onPress: () => {
              error
                ? dispatch(setUserSliceError(''))
                : dispatch(setDomainSliceError(''));
            },
          },
        ]
      );
    }
  }, [error, domainError]);

  useEffect(() => {
    if (!isEmpty(defaultDomain)) {
      dispatch(saveKeyId(defaultDomain?.Key));
      navigation.dispatch(StackActions.replace('CurrentProvider'));
    }
  }, [defaultDomain]);

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
      await dispatch(mobileNumberOtpVerification({ mobileNumber, otpValue, purpose }));
    } catch (error) {
      console.log('Error -- ', error);
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
      await dispatch(createAccountUsingMobileNumber(mobileNumber));
    } catch (error) {
      throw error;
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
            {t('enterOTPVerifyScreen.message') + ' ' + mobileNumber}
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
      <Loader loading={loading || isDomainLoading} />
    </NeuroAccessBackground>
  );
};
