import React, { useContext, useRef, useState } from 'react';
import {
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { StackScreenProps } from '@react-navigation/stack';
import Config from 'react-native-config';
import {
  NeuroAccessBackground,
  NavigationHeader,
  TextLabel,
  TextLabelVariants,
  ActionButton,
} from '@Controls/index';
import { NeuroTextInput } from '@Controls/NeuroTextInput';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
import { GlobalStyle as styles, TellUsAboutYouStyle } from '@Pages/Styles';
import { Formik } from 'formik';
import {
  Constants,
  computePinHash,
  unlockAppValidationSchema,
} from '@Helpers/index';
import { retrieveUserSession, storeUserSession } from '@Services/Storage';
import { StackActions } from '@react-navigation/native';
import { isEmpty, replaceWithIntValue } from '@Helpers/Utility/Utils';
import CountdownTimer from '@Helpers/Utility/LoginAuditor/CountDownTimer';
import EncryptedStorage from 'react-native-encrypted-storage';
import Space from '../../Controls/Space';

const PIN_BLOCK_THRESHOLD = 3; 
// const BLOCK_TIME = 60 * 60 * 1000; // 1 hour in milliseconds Actually
const OneHourInMiliseconds = 60 * 60 * 1000;

export const VerifyPin = () => {
  const { t } = useTranslation();
  const [remainingTime, setRemainingTime] = React.useState(0);
  const blockedMessage = React.useRef('');
  const [loading, isLoading] = useState(false);

  const { themeColors } = useContext(ThemeContext);
  const formikRef = useRef();
  const confirmPin = useRef<TextInput>(null);
  const [error, setError] = React.useState('');

  React.useEffect(() => {}, [setRemainingTime]);
  const getBlockedTime = async () => {
    return new Promise(async (resolve) => {
      const attemptsValue = await EncryptedStorage.getItem(
        Constants.Pin.EnterAttemptsKey
      );

      if (
        parseInt(attemptsValue) % PIN_BLOCK_THRESHOLD === 0 &&
        parseInt(attemptsValue) === PIN_BLOCK_THRESHOLD
      ) {
        resolve(Constants.Pin.FirstBlockInHours * OneHourInMiliseconds);
      } else if (
        parseInt(attemptsValue) % (PIN_BLOCK_THRESHOLD * 2) === 0 &&
        parseInt(attemptsValue) === PIN_BLOCK_THRESHOLD * 2
      ) {
        resolve(Constants.Pin.SecondBlockInHours * OneHourInMiliseconds);
      } else if (
        parseInt(attemptsValue) % (PIN_BLOCK_THRESHOLD * 3) === 0 &&
        parseInt(attemptsValue) === PIN_BLOCK_THRESHOLD * 3
      ) {
        resolve(Constants.Pin.ThirdBlockInHours * OneHourInMiliseconds);
      } else if (parseInt(attemptsValue) > PIN_BLOCK_THRESHOLD * 3) {
        resolve(new Date(Constants.Pin.DateTimeMaxValue).getTime());
      } else resolve(0);
    });
  };

  React.useEffect(() => {
    const checkIfUserAlreadyBlocked = async () => {
      isLoading(true);
      EncryptedStorage.getItem(Constants.Pin.RemainingTime).then(
        async (storedTime) => {
          if (storedTime) {
            const blockedTime = await getBlockedTime();
            const timeDiff = new Date().getTime() - parseInt(storedTime);
            const newRemainingTime = Math.max(0, blockedTime - timeDiff);
            setRemainingTime(newRemainingTime);
            isLoading(false);
            if (newRemainingTime > 0) {
              const blockedUpto = new Date(
                new Date().getTime() + newRemainingTime
              );
              blockedMessage.current = t(
                'PIN.PinIsInvalidAplicationBlocked'
              ).replace('{0}', `${blockedUpto}`);
              // Start a timer to update remaining time
              const interval = setInterval(() => {
                const timeDiff = new Date().getTime() - parseInt(storedTime);
                const updatedRemainingTime = Math.max(
                  0,
                  blockedTime - timeDiff
                );
                setRemainingTime(updatedRemainingTime);

                if (updatedRemainingTime <= 0) {
                  clearInterval(interval);
                  EncryptedStorage.removeItem(Constants.Pin.RemainingTime);
                  blockedMessage.current = '';
                }
              }, 1000);
            } else {
              EncryptedStorage.removeItem(Constants.Pin.RemainingTime);
              blockedMessage.current = '';
              setRemainingTime(0);
            }
          }
        }
      );
    };
    checkIfUserAlreadyBlocked();
  }, []);

  const CheckPinAndUnblockUser = async (Pin: string) => {
    const hashedPassword = await hashPassword(Pin);
    const storedPassword = await retrieveUserSession(
      Constants.Authentication.PinKey
    );

    if (hashedPassword === storedPassword) {
      // Reset attempts and remaining time
      EncryptedStorage.removeItem(Constants.Pin.EnterAttemptsKey);
      EncryptedStorage.removeItem(Constants.Pin.RemainingTime);
      blockedMessage.current = '';
      setRemainingTime(0);
      navigation.dispatch(StackActions.replace('ChooseAccoutType'));
    } else {
      const getAttempts = await EncryptedStorage.getItem(
        Constants.Pin.EnterAttemptsKey
      );
      let updatedAttempts = 1;
      if (!isEmpty(getAttempts)) {
        updatedAttempts = parseInt(getAttempts) + 1;
      }

      EncryptedStorage.setItem(
        Constants.Pin.EnterAttemptsKey,
        updatedAttempts.toString()
      );

      const remainingAttempts =
        PIN_BLOCK_THRESHOLD - (updatedAttempts % PIN_BLOCK_THRESHOLD);
      if (updatedAttempts % PIN_BLOCK_THRESHOLD === 0) {
        const currentTime = new Date().getTime();
        EncryptedStorage.setItem(
          Constants.Pin.RemainingTime,
          currentTime.toString()
        );
        const blockedTime = await getBlockedTime();
        const blockedUpto = new Date(new Date().getTime() + blockedTime);
        blockedMessage.current = t('PIN.PinIsInvalidAplicationBlocked').replace(
          '{0}',
          `${blockedUpto}`
        );
        if (blockedTime) {
          setRemainingTime(blockedTime);
          const interval = setInterval(() => {
            EncryptedStorage.getItem(Constants.Pin.RemainingTime).then(
              (storedTime) => {
                if (storedTime) {
                  const timeDiff =
                    new Date().getTime() - parseInt(storedTime, 10);
                  const updatedRemainingTime = Math.max(
                    0,
                    blockedTime - timeDiff
                  );
                  setRemainingTime(updatedRemainingTime);

                  if (updatedRemainingTime <= 0) {
                    clearInterval(interval);
                    EncryptedStorage.removeItem(Constants.Pin.RemainingTime);
                    blockedMessage.current = '';
                  }
                } else {
                  blockedMessage.current = '';
                  setRemainingTime(0)
                }
              }
            );
          }, blockedTime);
        }
      } else {
        alert(t('PIN.PinIsInvalid').replace('{0}', `${remainingAttempts}`));
      }
    }
  };

  const hashPassword = async (password: string) => {
    const objectId = await retrieveUserSession(
      Constants.Authentication.ObjectId
    );
    const hashedPassword = computePinHash(
      password,
      objectId,
      Config.Host ?? Constants.DefaultValues.Host
    );
    return hashedPassword;
  };

  const handleFormSubmit = async (values: any) => {
    EncryptedStorage.getItem(Constants.Pin.RemainingTime).then(
      async (storedTime) => {
        if (storedTime) {
          const blockedTime = await getBlockedTime();
          const timeDiff = new Date().getTime() - parseInt(storedTime);
          const newRemainingTime = Math.max(0, blockedTime - timeDiff);
          setRemainingTime(newRemainingTime);
          const blockedUpto = new Date(new Date().getTime() + newRemainingTime);
          alert(
            t('PIN.PinIsInvalidAplicationBlocked').replace(
              '{0}',
              `${blockedUpto}`
            )
          );
        } else {
          CheckPinAndUnblockUser(values.confirmPin);
        }
      }
    );
  };

  const onBackClick = () => {
    navigation.goBack();
  };

  const onLanguageClick = () => {
    navigation.navigate('Settings');
  };

  const borderColor = (touchedAction: any, errorAction: any, value: any) => {
    if (touchedAction !== undefined) {
      if (errorAction !== undefined) {
        return {
          borderColor: errorAction
            ? themeColors.tellUsAboutYou.error
            : themeColors.tellUsAboutYou.defaultBorder,
        };
      } else {
        if (value !== undefined && value !== '') {
          return {
            borderColor: touchedAction
              ? themeColors.tellUsAboutYou.focusBorder
              : themeColors.tellUsAboutYou.defaultBorder,
          };
        } else {
          return {
            borderColor: touchedAction
              ? themeColors.tellUsAboutYou.defaultBorder
              : themeColors.tellUsAboutYou.defaultBorder,
          };
        }
      }
    }
  };

  const errorIcon = (touchedAction: any, errorAction: any) => {
    if (touchedAction !== undefined) {
      return errorAction ? true : false;
    }
  };

  return (
    <NeuroAccessBackground>
      <KeyboardAvoidingView
        style={styles(themeColors).container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30}
      >
        <View style={styles(themeColors).spaceContainer} />
        <TextLabel
          style={TellUsAboutYouStyle(themeColors).header}
          variant={TextLabelVariants.HEADER}
        >
          {t('PIN.UnlockTitle')}
        </TextLabel>
        <TextLabel
          style={[TellUsAboutYouStyle(themeColors).detailHeight]}
          variant={TextLabelVariants.LABEL}
        >
          {t('PIN.UnlockDescription')}
        </TextLabel>

        {remainingTime !== 0 && (
          <View>
            <Space />
            <CountdownTimer targetTime={new Date().getTime() + remainingTime} />
          </View> 
        )}

        {remainingTime === 0 && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Formik
              innerRef={formikRef}
              initialValues={{
                confirmPin: '',
              }}
              validationSchema={unlockAppValidationSchema}
              onSubmit={handleFormSubmit}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                setFieldTouched,
                isValid,
              }) => (
                <View style={TellUsAboutYouStyle(themeColors).formView}>
                  <TextLabel
                    style={TellUsAboutYouStyle(themeColors).label}
                    variant={TextLabelVariants.INPUTLABEL}
                  >
                    {t('Enter pin')}
                  </TextLabel>
                  <NeuroTextInput
                    neuroStyle={[
                      TellUsAboutYouStyle(themeColors).textInput,
                      borderColor(
                        touched.confirmPin,
                        errors.confirmPin,
                        values.confirmPin
                      ),
                    ]}
                    textAlign="center"
                    secureTextEntry
                    placeholder={t('PIN.EnterPinPlaceholder')}
                    placeholderTextColor={
                      themeColors.tellUsAboutYou.placeHolder
                    }
                    value={values.confirmPin}
                    onChangeText={handleChange('confirmPin')}
                    onBlur={() => {
                      handleBlur('confirmPin');
                      setFieldTouched('confirmPin', false);
                    }}
                    onFocus={() => setFieldTouched('confirmPin', true)}
                    isError={errorIcon(touched.confirmPin, errors.confirmPin)}
                    errorStyle={TellUsAboutYouStyle(themeColors).errorText}
                    autoCapitalize="none"
                    returnKeyType="next"
                    keyboardType="default"
                    ref={confirmPin}
                    onSubmitEditing={() => {
                      confirmPin.current?.focus();
                    }}
                  />
                  {errors.confirmPin && (
                    <TextLabel
                      variant={TextLabelVariants.XSMALL}
                      style={TellUsAboutYouStyle(themeColors).error}
                    >
                      {t(errors.confirmPin)}
                    </TextLabel>
                  )}
                  {error && (
                    <TextLabel
                      variant={TextLabelVariants.XSMALL}
                      style={TellUsAboutYouStyle(themeColors).error}
                    >
                      {error}
                    </TextLabel>
                  )}

                  <View
                    style={
                      TellUsAboutYouStyle(themeColors).actionButtonContainer
                    }
                  >
                    <ActionButton
                      disabled={!isValid}
                      textStyle={[TellUsAboutYouStyle(themeColors).sendText]}
                      buttonStyle={[
                        TellUsAboutYouStyle(themeColors).button,
                        !isValid && {
                          backgroundColor: themeColors.button.disableBg,
                        },
                      ]}
                      title={t('buttonTitle.unlock')}
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </ScrollView>
        )}
        {remainingTime !== 0 && (
          <View style={{ margin: 20 }}>
            <TextLabel variant={TextLabelVariants.DESCRIPTION}>
              {blockedMessage.current}
            </TextLabel>
          </View>
        )}
      </KeyboardAvoidingView>
      <NavigationHeader
        hideBackAction={true}
        onBackAction={onBackClick}
        onLanguageAction={onLanguageClick}
      />
    </NeuroAccessBackground>
  );
};
