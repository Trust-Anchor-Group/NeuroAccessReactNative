import React, { useContext, useRef } from 'react';
import {
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import Config from 'react-native-config';
import {
  NeuroAccessBackground,
  NavigationHeader,
  TextLabel,
  TextLabelVariants,
  ActionButton,
} from '@Controls/index';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
import { GlobalStyle as styles, TellUsAboutYouStyle } from '@Pages/Styles';
import { NeuroTextInput } from '@Controls/NeuroTextInput';
import { pinValidationSchema, Constants, computePinHash  } from '@Helpers/index';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveUserSession, storeUserSession } from '@Services/Storage';
import {AgentAPI} from '../../Services/API/Agent';

export const CreatePin = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const { t } = useTranslation();
  const { themeColors } = useContext(ThemeContext);
  const formikRef = useRef();
  const { userDetails } = useSelector((state) => state.user);
  const { identityResponse } = useSelector((state) => state.identity);
  console.log(identityResponse.Identity.property)
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const newPin = useRef<TextInput>(null);
  const confirmPin = useRef<TextInput>(null);

  if (userDetails) {
    Constants.UserDetails = userDetails;
    for (const item of identityResponse.Identity.property) {
      console.log(item)
      if (item.name === 'FIRST') {
        Constants.LegalIdentity.FIRST = item.value;
      }
      if (item.name === 'MIDDLE') {
        Constants.LegalIdentity.MIDDLE = item.value;
      }
      if (item.name === 'LAST') {
        Constants.LegalIdentity.LAST = item.value;
      }
      if (item.name === 'ADDR') {
        Constants.LegalIdentity.ADDR = item.value;
      }
      if (item.name === 'ADDR2') {
        Constants.LegalIdentity.ADDR2 = item.value;
      }
    }
  }
  const hashPassword = async (password: string) => {
    let objectId = await retrieveUserSession(Constants.Authentication.ObjectId);
    if (!objectId) {
      objectId = AgentAPI.Account.getRandomValues(32);
      await storeUserSession(Constants.Authentication.ObjectId, objectId);
    }
    const hashedPassword = computePinHash(password, objectId, Config.Host || '', userDetails.userName, userDetails.legalId);
    return hashedPassword;
  };
  
  const handleFormSubmit = async (values: any) => {
    const hashedPassword = await hashPassword(values.newPin);
    await storeUserSession(Constants.Authentication.PinKey, hashedPassword);
    const storedPassword = await retrieveUserSession(Constants.Authentication.PinKey);
    if (hashedPassword === storedPassword) {
      alert(t('PIN.PinCreateSuccess'))
    } else {
      alert(t('PIN.IncorrectPin'))
    }
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
          {t('PIN.Title')}
        </TextLabel>
        <TextLabel
          style={[TellUsAboutYouStyle(themeColors).detailHeight]}
          variant={TextLabelVariants.LABEL}
        >
          {t(
            'PIN.Description'
          )}
        </TextLabel>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Formik
            innerRef={formikRef}
            initialValues={{
              newPin: '',
              confirmPin: '',
            }}
            validationSchema={pinValidationSchema}
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
              setFieldValue,
              isValidating,
              isValid,
            }) => (
              <View style={TellUsAboutYouStyle(themeColors).formView}>
                <TextLabel
                  style={TellUsAboutYouStyle(themeColors).label}
                  variant={TextLabelVariants.INPUTLABEL}
                >
                  {t('PIN.EnterNewPin')}
                </TextLabel>
                <NeuroTextInput
                  neuroStyle={[
                    TellUsAboutYouStyle(themeColors).textInput,
                    borderColor(touched.newPin, errors.newPin, values.newPin),
                  ]}
                  textAlign="center"
                  secureTextEntry
                  placeholder={t('Enter pin')}
                  placeholderTextColor={themeColors.tellUsAboutYou.placeHolder}
                  value={values.newPin}
                  onChangeText={handleChange('newPin')}
                  onBlur={() => {
                    handleBlur('newPin');
                    setFieldTouched('newPin', false);
                  }}
                  onFocus={() => setFieldTouched('newPin', true)}
                  isError={errorIcon(touched.newPin, errors.newPin)}
                  errorStyle={TellUsAboutYouStyle(themeColors).errorText}
                  autoCapitalize="none"
                  returnKeyType="next"
                  keyboardType="default"
                  ref={newPin}
                  onSubmitEditing={() => {
                    confirmPin.current?.focus();
                  }}
                />
                {errors.newPin && (
                  <TextLabel
                    variant={TextLabelVariants.XSMALL}
                    style={TellUsAboutYouStyle(themeColors).error}
                  >
                    {t(errors.newPin)}
                  </TextLabel>
                )}

                <TextLabel
                  style={TellUsAboutYouStyle(themeColors).label}
                  variant={TextLabelVariants.INPUTLABEL}
                >
                  {t('PIN.EnterConfirmPinTitle')}
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
                  placeholder={t('PIN.EnterConfirmPinPlaceholder')}
                  placeholderTextColor={themeColors.tellUsAboutYou.placeHolder}
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
                />
                {errors.confirmPin && (
                  <TextLabel
                    variant={TextLabelVariants.XSMALL}
                    style={TellUsAboutYouStyle(themeColors).error}
                  >
                    {t(errors.confirmPin)}
                  </TextLabel>
                )}

                <View style={TellUsAboutYouStyle(themeColors).actionButtonContainer}>
                  <ActionButton
                    disabled={!isValid}
                    textStyle={[TellUsAboutYouStyle(themeColors).sendText]}
                    buttonStyle={[
                      TellUsAboutYouStyle(themeColors).button,
                      !isValid && {
                        backgroundColor: themeColors.button.disableBg,
                      },
                    ]}
                    title={t('buttonTitle.CreatePin')}
                    onPress={handleSubmit}
                  />
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
      <NavigationHeader
        hideBackAction={false}
        onBackAction={onBackClick}
        onLanguageAction={onLanguageClick}
      />
    </NeuroAccessBackground>
  );
};
