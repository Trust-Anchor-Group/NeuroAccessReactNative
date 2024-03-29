import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';
import { GlobalStyle as styles, EnterMobileNumberStyle } from '@Pages/Styles';
import { StackScreenProps } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import {
  createAccountUsingMobileNumber,
  getUsersCountry,
  saveNumber,
} from '@Services/Redux/Actions/GetUserDetails';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { Logo } from '@Assets/Svgs';
import {
  NeuroAccessBackground,
  NavigationHeader,
  ActionButton,
  TextLabelVariants,
  TextLabel,
} from '@Controls/index';
import MobileInputView from '@Controls/MobileInputView';
import { TextInputRef } from '@Controls/MobileInputView';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
import { CountryDialog } from '@Controls/CountryDialog';
import { countryCodes } from '@Services/Data/index';
import { isValidPhone } from '@Helpers/Validation';
import { Loader } from '@Controls/index';
import {
  requestMultiPermission,
  requestMultiPermissionIos,
} from '@Services/Permission/RequestPermission';
import { PERMISSIONS } from 'react-native-permissions';
import {
  clearSendVerificationCodeResponse,
  setUserSliceError,
} from '@Services/Redux/Reducers/UserSlice';
import { isEmpty } from '@Helpers/Utility/Utils';

export const EnterMobileNumber = ({ navigation }: StackScreenProps<{}>) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { userDetails, sendVerificationCodeResponse, loading, error } =
    useSelector((state) => state.user);
  const { themeColors } = useContext(ThemeContext);
  const [countryFlag, setCountryFlag] = useState('');
  const countryISOCode = React.useRef('');
  const mobileCode = React.useRef(userDetails?.mobileNumber?.code);
  const [mobileNumber, setMobileNumber] = useState(
    userDetails?.mobileNumber?.number
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const mobileNumberInputRef = React.useRef<TextInputRef>(null);

  useEffect(() => {
    if (error) {
      Alert.alert(t('Error.ErrorTitle'), JSON.stringify(error), [
        {
          text: 'ok',
          onPress: () => {
            dispatch(setUserSliceError(''));
          },
        },
      ]);
    }
  }, [error]);

  useEffect(() => {
    if (
      !isEmpty(sendVerificationCodeResponse) &&
      sendVerificationCodeResponse?.Status
    ) {
      navigation.navigate('OTPVerify');
      dispatch(clearSendVerificationCodeResponse(undefined));
    }
  }, [sendVerificationCodeResponse]);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleItemSelected = (selectedItem: any) => {
    mobileCode.current = selectedItem?.dial_code;
    countryISOCode.current = selectedItem?.code;
    setCountryFlag(selectedItem?.flag);
  };

  const handleInputChange = (text: string) => {
    setMobileNumber(text);
  };

  const handleCountryChange = () => {
    openModal();
  };

  const onBackClick = () => {
    navigation.goBack();
  };

  const onLanguageClick = () => {
    navigation.navigate('Settings');
  };

  React.useEffect(() => {
    const callCountryCode = async () => {
      try {
        await dispatch(getUsersCountry());
      } catch (error) {
        throw error;
      }
    };
    callCountryCode();
  }, []);

  React.useEffect(() => {
    handleSearchCountryISOCode(userDetails?.country?.CountryCode);
  }, [userDetails]);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      requestMultiPermissionIos(
        PERMISSIONS.IOS.CAMERA,
        PERMISSIONS.IOS.PHOTO_LIBRARY
      );
    } else {
      const androidVersion = parseInt(Platform.Version, 10);
      if (androidVersion <= 10) {
        requestMultiPermission(
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
        );
      } else {
        requestMultiPermissionIos(
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        );
      }
    }
  }, []);

  const handleSearchCountryISOCode = (isoCode: string) => {
    const filteredItems = countryCodes.filter((item) =>
      item.code.includes(isoCode)
    );
    mobileCode.current = filteredItems[0]?.dial_code;
    countryISOCode.current = filteredItems[0]?.code;
    setCountryFlag(filteredItems[0]?.flag);
  };

  const handleSubmit = async () => {
    try {
      const isFormValid = mobileNumberInputRef.current?.validate();
      if (isFormValid) {
        const mobileData = {
          number: mobileNumber,
          code: mobileCode.current,
        };
        const number = mobileCode.current + mobileNumber;
        await dispatch(createAccountUsingMobileNumber(number));
        await dispatch(saveNumber(mobileData));
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles(themeColors).container}
    >
      <NeuroAccessBackground>
        <ScrollView
          style={styles(themeColors).container}
          contentContainerStyle={styles(themeColors).scrollViewContainer}
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
            <TextLabel variant={TextLabelVariants.LABEL}>
              {t('enterMobileScreen.message')}
            </TextLabel>
          </View>

          <View style={styles(themeColors).inputContainer}>
            <TextLabel
              style={EnterMobileNumberStyle(themeColors).inputLabel}
              variant={TextLabelVariants.INPUTLABEL}
            >
              {t('enterMobileScreen.label')}
            </TextLabel>
            <MobileInputView
              ref={mobileNumberInputRef}
              flag={countryFlag}
              code={mobileCode.current}
              value={mobileNumber}
              onChangeText={handleInputChange}
              onCountrySelect={handleCountryChange}
              onAction={() => {
                handleSubmit();
              }}
              validator={(value) => {
                return isValidPhone(value, mobileCode.current + value);
              }}
            />
          </View>

          <View style={styles(themeColors).buttonContainer}>
            <ActionButton
              disabled={!mobileNumber}
              textStyle={[
                EnterMobileNumberStyle(themeColors).sendText,
                !mobileNumber && { color: themeColors.button.disableText },
              ]}
              buttonStyle={
                !mobileNumber && {
                  backgroundColor: themeColors.button.disableBg,
                }
              }
              title={t('buttonTitle.sendCode')}
              onPress={async () => {
                if (mobileNumber) {
                  Keyboard.dismiss();
                  handleSubmit();
                }
              }}
            />
          </View>
        </ScrollView>

        <NavigationHeader
          hideBackAction={true}
          onBackAction={onBackClick}
          onLanguageAction={onLanguageClick}
        />
        <CountryDialog
          isVisible={isModalVisible}
          closeModal={closeModal}
          data={countryCodes}
          onItemSelected={handleItemSelected}
        />
        <Loader loading={loading} />
      </NeuroAccessBackground>
    </KeyboardAvoidingView>
  );
};
