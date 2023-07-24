import React, { useContext, useRef } from 'react';
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
import { Constants, computePinHash, unlockAppValidationSchema } from '@Helpers/index';
import { retrieveUserSession } from '@Services/Storage';
import { StackActions } from '@react-navigation/native';

export const VerifyPin = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const { userDetails } = useSelector((state) => state.user);
  const { identityResponse } = useSelector((state) => state.identity);
  const { t } = useTranslation();
  const { themeColors } = useContext(ThemeContext);
  const formikRef = useRef();
  const confirmPin = useRef<TextInput>(null);

  const hashPassword = async (password: string) => {
    const objectId = await retrieveUserSession(Constants.Authentication.ObjectId);
    const hashedPassword = computePinHash(
      password,
      objectId,
      Config.Host || '',
      userDetails.userName,
      userDetails.legalId
    );
    return hashedPassword;
  };

  const handleFormSubmit = async (values: any) => {
    const hashedPassword = await hashPassword(values.confirmPin);
    const storedPassword = await retrieveUserSession(
      Constants.Authentication.PinKey
    );
    if (hashedPassword === storedPassword) {
      navigation.dispatch(StackActions.replace('ChooseAccoutType'));
    } else {
      alert(t('PIN.WrongPin'));
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
          {t('PIN.UnlockTitle')}
        </TextLabel>
        <TextLabel
          style={[TellUsAboutYouStyle(themeColors).detailHeight]}
          variant={TextLabelVariants.LABEL}
        >
          {t('PIN.UnlockDescription')}
        </TextLabel>

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
              setFieldValue,
              isValidating,
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
                    title={t('buttonTitle.unlock')}
                    onPress={handleSubmit}
                  />
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
      <NavigationHeader
        hideBackAction={true}
        onBackAction={onBackClick}
        onLanguageAction={onLanguageClick}
      />
    </NeuroAccessBackground>
  );
};
