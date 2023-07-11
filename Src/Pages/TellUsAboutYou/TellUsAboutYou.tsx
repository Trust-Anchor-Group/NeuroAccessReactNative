import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Image,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {
  NeuroAccessBackground,
  NavigationHeader,
  TextLabel,
  TextLabelVariants,
  ActionButton,
} from '@Controls/index';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
import { GlobalStyle as styles, TellUsAboutYouStyle } from '@Pages/Styles';
import { NeuroTextInput } from '@Controls/NeuroTextInput';
import { Formik } from 'formik';
import { validationSchema } from '@Helpers/Validation';
import {
  CameraIcon,
  GalleryIcon,
  LargeUserIcon,
  UnselectedCheckBox,
  SelectedCheckBox,
} from '@Assets/Svgs';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
  requestMultiPermission,
  checkMultiPermission,
} from '@Services/Permission/RequestPermission';
import { PERMISSIONS } from 'react-native-permissions';
import { CountryDialog } from '@Controls/CountryDialog';
import { countryCodes } from '@Services/Data/index';

export const TellUsAboutYou = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const { t } = useTranslation();
  const { themeColors } = useContext(ThemeContext);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const formikRef = useRef();

  const imageRef = useRef<View>(null);
  const firstNameRef = useRef<TextInput>(null);
  const middleNameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);
  const personalNumberRef = useRef<TextInput>(null);
  const countryRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);
  const address2Ref = useRef<TextInput>(null);
  const zipRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const stateRef = useRef<TextInput>(null);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      requestMultiPermission(
        PERMISSIONS.IOS.CAMERA,
        PERMISSIONS.IOS.PHOTO_LIBRARY
      );
    } else {
      requestMultiPermission(
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      );
    }
  }, []);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleItemSelected = (selectedItem: any) => {
    formikRef.current?.setFieldValue('country', selectedItem?.name['en']);
  };

  const handleFormSubmit = (values: any) => {};
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

  const userAction = async (action: string, setFieldValue: any) => {
    imageRef.current && imageRef.current.focus();
    if (Platform.OS === 'ios') {
      checkMultiPermission(
        PERMISSIONS.IOS.CAMERA,
        PERMISSIONS.IOS.PHOTO_LIBRARY
      )
        .then((result: boolean) => {
          if (result) {
            action === 'gallery'
              ? openGallery(setFieldValue)
              : openCamera(setFieldValue);
          }
        })
        .catch((error: any) => {});
    } else {
      checkMultiPermission(
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      )
        .then((result: boolean) => {
          if (result) {
            action === 'gallery'
              ? openGallery(setFieldValue)
              : openCamera(setFieldValue);
          }
        })
        .catch((error: any) => {});
    }
  };
  const openGallery = async (setFieldValue: any) => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        setFieldValue('profileImage', response.assets[0].fileName);
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const openCamera = async (setFieldValue: any) => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        if (response.errorCode === 'camera_unavailable') {
        } else {
          setFieldValue('profileImage', response.assets[0].fileName);
          setImageUri(response.assets[0].uri);
        }
      }
    });
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
          {t('tellUsAboutYou.headerTitle')}
        </TextLabel>
        <TextLabel
          style={[TellUsAboutYouStyle(themeColors).detailHeight]}
          variant={TextLabelVariants.LABEL}
        >
          {t('tellUsAboutYou.detail')}
        </TextLabel>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Formik
            innerRef={formikRef}
            initialValues={{
              profileImage: '',
              firstName: '',
              middleName: '',
              lastName: '',
              personalNumber: '',
              country: '',
              address: '',
              address2: '',
              zip: '',
              city: '',
              state: '',
              isTermCondition: false,
            }}
            validationSchema={validationSchema}
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
            }) => (
              <View style={TellUsAboutYouStyle(themeColors).formView}>
                <View
                  ref={imageRef}
                  style={TellUsAboutYouStyle(themeColors).viewContainer}
                >
                  <View
                    style={[
                      TellUsAboutYouStyle(themeColors).imageContainer,
                      {
                        borderColor: errors.profileImage
                          ? themeColors.tellUsAboutYou.error
                          : themeColors.tellUsAboutYou.imageBorder,
                      },
                    ]}
                  >
                    <LargeUserIcon
                      iconColor={themeColors.tellUsAboutYou.checkBox}
                    />

                    {imageUri && (
                      <Image
                        resizeMode="cover"
                        resizeMethod="scale"
                        source={{ uri: imageUri }}
                        style={TellUsAboutYouStyle(themeColors).imageView}
                      />
                    )}
                  </View>
                  <View style={TellUsAboutYouStyle(themeColors).actionView}>
                    <TouchableOpacity
                      style={TellUsAboutYouStyle(themeColors).clickAction}
                      onPress={() => userAction('gallery', setFieldValue)}
                    >
                      <GalleryIcon
                        iconColor={themeColors.tellUsAboutYou.checkBox}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        TellUsAboutYouStyle(themeColors).clickAction,
                        TellUsAboutYouStyle(themeColors).cameraMargin,
                      ]}
                      onPress={() => userAction('camera', setFieldValue)}
                    >
                      <CameraIcon
                        iconColor={themeColors.tellUsAboutYou.checkBox}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <TextLabel
                  style={TellUsAboutYouStyle(themeColors).cameraNote}
                  variant={TextLabelVariants.LABEL}
                >
                  {t('tellUsAboutYou.note')}
                </TextLabel>

                <TextLabel
                  style={TellUsAboutYouStyle(themeColors).label}
                  variant={TextLabelVariants.INPUTLABEL}
                >
                  {t('tellUsAboutYou.firstName')}
                </TextLabel>
                <NeuroTextInput
                  neuroStyle={[
                    TellUsAboutYouStyle(themeColors).textInput,
                    borderColor(
                      touched.firstName,
                      errors.firstName,
                      values.firstName
                    ),
                  ]}
                  placeholder={t('tellUsAboutYou.enterFirst')}
                  placeholderTextColor={themeColors.tellUsAboutYou.placeHolder}
                  ref={firstNameRef}
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={() => {
                    handleBlur('firstName');
                    setFieldTouched('firstName', false);
                  }}
                  onFocus={() => setFieldTouched('firstName', true)}
                  isError={errorIcon(touched.firstName, errors.firstName)}
                  keyboardType="default"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    middleNameRef.current?.focus();
                  }}
                  onIconPress={() => {}}
                />
                {errors.firstName && (
                  <TextLabel
                    variant={TextLabelVariants.XSMALL}
                    style={TellUsAboutYouStyle(themeColors).error}
                  >
                    {t(errors.firstName)}
                  </TextLabel>
                )}

                <TextLabel
                  style={TellUsAboutYouStyle(themeColors).label}
                  variant={TextLabelVariants.INPUTLABEL}
                >
                  {t('tellUsAboutYou.middleName')}
                </TextLabel>
                <NeuroTextInput
                  neuroStyle={[
                    TellUsAboutYouStyle(themeColors).textInput,
                    borderColor(
                      touched.middleName,
                      errors.middleName,
                      values.middleName
                    ),
                  ]}
                  placeholder={t('tellUsAboutYou.enterMiddle')}
                  placeholderTextColor={themeColors.tellUsAboutYou.placeHolder}
                  value={values.middleName}
                  onChangeText={handleChange('middleName')}
                  onBlur={() => {
                    handleBlur('middleName');
                    setFieldTouched('middleName', false);
                  }}
                  onFocus={() => setFieldTouched('middleName', true)}
                  isError={errorIcon(touched.middleName, errors.middleName)}
                  errorStyle={TellUsAboutYouStyle(themeColors).errorText}
                  returnKeyType="next"
                  keyboardType="default"
                  ref={middleNameRef}
                  onSubmitEditing={() => {
                    lastNameRef.current?.focus();
                  }}
                />
                {errors.middleName && (
                  <TextLabel
                    variant={TextLabelVariants.XSMALL}
                    style={TellUsAboutYouStyle(themeColors).error}
                  >
                    {t(errors.middleName)}
                  </TextLabel>
                )}

                <TextLabel
                  style={TellUsAboutYouStyle(themeColors).label}
                  variant={TextLabelVariants.INPUTLABEL}
                >
                  {t('tellUsAboutYou.lastName')}
                </TextLabel>
                <NeuroTextInput
                  neuroStyle={[
                    TellUsAboutYouStyle(themeColors).textInput,
                    borderColor(
                      touched.lastName,
                      errors.lastName,
                      values.lastName
                    ),
                  ]}
                  placeholder={t('tellUsAboutYou.enterLast')}
                  placeholderTextColor={themeColors.tellUsAboutYou.placeHolder}
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={() => {
                    handleBlur('lastName');
                    setFieldTouched('lastName', false);
                  }}
                  onFocus={() => setFieldTouched('lastName', true)}
                  isError={errorIcon(touched.lastName, errors.lastName)}
                  errorStyle={TellUsAboutYouStyle(themeColors).errorText}
                  returnKeyType="next"
                  keyboardType="default"
                  ref={lastNameRef}
                  onSubmitEditing={() => {
                    personalNumberRef.current?.focus();
                  }}
                />
                {errors.lastName && (
                  <TextLabel
                    variant={TextLabelVariants.XSMALL}
                    style={TellUsAboutYouStyle(themeColors).error}
                  >
                    {t(errors.lastName)}
                  </TextLabel>
                )}

                <TextLabel
                  style={TellUsAboutYouStyle(themeColors).label}
                  variant={TextLabelVariants.INPUTLABEL}
                >
                  {t('tellUsAboutYou.personalNumber')}
                </TextLabel>
                <NeuroTextInput
                  neuroStyle={[
                    TellUsAboutYouStyle(themeColors).textInput,
                    borderColor(
                      touched.personalNumber,
                      errors.personalNumber,
                      values.personalNumber
                    ),
                  ]}
                  placeholder={t('tellUsAboutYou.enterPersonal')}
                  placeholderTextColor={themeColors.tellUsAboutYou.placeHolder}
                  value={values.personalNumber}
                  onChangeText={handleChange('personalNumber')}
                  onBlur={() => {
                    handleBlur('personalNumber');
                    setFieldTouched('personalNumber', false);
                  }}
                  onFocus={() => setFieldTouched('personalNumber', true)}
                  isError={errorIcon(
                    touched.personalNumber,
                    errors.personalNumber
                  )}
                  errorStyle={TellUsAboutYouStyle(themeColors).errorText}
                  returnKeyType="next"
                  keyboardType="default"
                  ref={personalNumberRef}
                  onSubmitEditing={() => {
                    countryRef.current?.focus();
                  }}
                />
                {errors.personalNumber && (
                  <TextLabel
                    variant={TextLabelVariants.XSMALL}
                    style={TellUsAboutYouStyle(themeColors).error}
                  >
                    {t(errors.personalNumber)}
                  </TextLabel>
                )}

                <TextLabel
                  style={TellUsAboutYouStyle(themeColors).label}
                  variant={TextLabelVariants.INPUTLABEL}
                >
                  {t('tellUsAboutYou.country')}
                </TextLabel>
                <NeuroTextInput
                  neuroStyle={[
                    TellUsAboutYouStyle(themeColors).textInput,
                    borderColor(
                      touched.country,
                      errors.country,
                      values.country
                    ),
                  ]}
                  placeholder={t('tellUsAboutYou.enterCountry')}
                  placeholderTextColor={themeColors.tellUsAboutYou.placeHolder}
                  value={values.country}
                  onChangeText={handleChange('country')}
                  onBlur={() => {
                    handleBlur('country');
                    setFieldTouched('country', false);
                  }}
                  onFocus={() => setFieldTouched('country', true)}
                  isError={errorIcon(touched.country, errors.country)}
                  errorStyle={TellUsAboutYouStyle(themeColors).errorText}
                  returnKeyType="next"
                  keyboardType="default"
                  ref={countryRef}
                  editable={false}
                  onTouchStart={() => openModal()}
                  onSubmitEditing={() => {
                    addressRef.current?.focus();
                  }}
                />
                {errors.country && (
                  <TextLabel
                    variant={TextLabelVariants.XSMALL}
                    style={TellUsAboutYouStyle(themeColors).error}
                  >
                    {t(errors.country)}
                  </TextLabel>
                )}

                <TextLabel
                  style={TellUsAboutYouStyle(themeColors).label}
                  variant={TextLabelVariants.INPUTLABEL}
                >
                  {t('tellUsAboutYou.address')}
                </TextLabel>
                <NeuroTextInput
                  neuroStyle={[
                    TellUsAboutYouStyle(themeColors).textInput,
                    borderColor(
                      touched.address,
                      errors.address,
                      values.address
                    ),
                  ]}
                  placeholder={t('tellUsAboutYou.enterAddress')}
                  placeholderTextColor={themeColors.tellUsAboutYou.placeHolder}
                  value={values.address}
                  onChangeText={handleChange('address')}
                  onBlur={() => {
                    handleBlur('address');
                    setFieldTouched('address', false);
                  }}
                  onFocus={() => setFieldTouched('address', true)}
                  isError={errorIcon(touched.address, errors.address)}
                  errorStyle={TellUsAboutYouStyle(themeColors).errorText}
                  returnKeyType="next"
                  keyboardType="default"
                  ref={addressRef}
                  onSubmitEditing={() => {
                    address2Ref.current?.focus();
                  }}
                />
                {errors.address && (
                  <TextLabel
                    variant={TextLabelVariants.XSMALL}
                    style={TellUsAboutYouStyle(themeColors).error}
                  >
                    {t(errors.address)}
                  </TextLabel>
                )}
                <TextLabel
                  style={TellUsAboutYouStyle(themeColors).label}
                  variant={TextLabelVariants.INPUTLABEL}
                >
                  {t('tellUsAboutYou.address2')}
                </TextLabel>

                <NeuroTextInput
                  neuroStyle={[
                    TellUsAboutYouStyle(themeColors).textInput,
                    borderColor(
                      touched.address2,
                      errors.address2,
                      values.address2
                    ),
                  ]}
                  placeholder={t('tellUsAboutYou.enterAddress')}
                  placeholderTextColor={themeColors.tellUsAboutYou.placeHolder}
                  value={values.address2}
                  onChangeText={handleChange('address2')}
                  onBlur={() => {
                    handleBlur('address2');
                    setFieldTouched('address2', false);
                  }}
                  onFocus={() => setFieldTouched('address2', true)}
                  isError={errorIcon(touched.address2, errors.address2)}
                  errorStyle={TellUsAboutYouStyle(themeColors).errorText}
                  returnKeyType="next"
                  keyboardType="default"
                  ref={address2Ref}
                  onSubmitEditing={() => {
                    zipRef.current?.focus();
                  }}
                />
                {errors.address2 && (
                  <TextLabel
                    variant={TextLabelVariants.XSMALL}
                    style={TellUsAboutYouStyle(themeColors).error}
                  >
                    {t(errors.address2)}
                  </TextLabel>
                )}
                <TextLabel
                  style={TellUsAboutYouStyle(themeColors).label}
                  variant={TextLabelVariants.INPUTLABEL}
                >
                  {t('tellUsAboutYou.zip')}
                </TextLabel>
                <NeuroTextInput
                  neuroStyle={[
                    TellUsAboutYouStyle(themeColors).textInput,
                    borderColor(touched.zip, errors.zip, values.zip),
                  ]}
                  placeholder={t('tellUsAboutYou.enterZip')}
                  placeholderTextColor={themeColors.tellUsAboutYou.placeHolder}
                  value={values.zip}
                  onChangeText={handleChange('zip')}
                  onBlur={() => {
                    handleBlur('zip');
                    setFieldTouched('zip', false);
                  }}
                  onFocus={() => setFieldTouched('zip', true)}
                  isError={errorIcon(touched.zip, errors.zip)}
                  errorStyle={TellUsAboutYouStyle(themeColors).errorText}
                  returnKeyType="next"
                  keyboardType="default"
                  ref={zipRef}
                  onSubmitEditing={() => {
                    cityRef.current?.focus();
                  }}
                />
                {errors.zip && (
                  <TextLabel
                    variant={TextLabelVariants.XSMALL}
                    style={TellUsAboutYouStyle(themeColors).error}
                  >
                    {t(errors.zip)}
                  </TextLabel>
                )}

                <TextLabel
                  style={TellUsAboutYouStyle(themeColors).label}
                  variant={TextLabelVariants.INPUTLABEL}
                >
                  {t('tellUsAboutYou.city')}
                </TextLabel>
                <NeuroTextInput
                  neuroStyle={[
                    TellUsAboutYouStyle(themeColors).textInput,
                    borderColor(touched.city, errors.city, values.city),
                  ]}
                  placeholder={t('tellUsAboutYou.enterCity')}
                  placeholderTextColor={themeColors.tellUsAboutYou.placeHolder}
                  value={values.city}
                  onChangeText={handleChange('city')}
                  onBlur={() => {
                    handleBlur('city');
                    setFieldTouched('city', false);
                  }}
                  onFocus={() => setFieldTouched('city', true)}
                  isError={errorIcon(touched.city, errors.city)}
                  errorStyle={TellUsAboutYouStyle(themeColors).errorText}
                  returnKeyType="next"
                  keyboardType="default"
                  ref={cityRef}
                  onSubmitEditing={() => {
                    stateRef.current?.focus();
                  }}
                />
                {errors.city && (
                  <TextLabel
                    variant={TextLabelVariants.XSMALL}
                    style={TellUsAboutYouStyle(themeColors).error}
                  >
                    {t(errors.city)}
                  </TextLabel>
                )}

                <TextLabel
                  style={TellUsAboutYouStyle(themeColors).label}
                  variant={TextLabelVariants.INPUTLABEL}
                >
                  {t('tellUsAboutYou.state')}
                </TextLabel>
                <NeuroTextInput
                  neuroStyle={[
                    TellUsAboutYouStyle(themeColors).textInput,
                    borderColor(touched.state, errors.state, values.state),
                  ]}
                  placeholder={t('tellUsAboutYou.enterState')}
                  placeholderTextColor={themeColors.tellUsAboutYou.placeHolder}
                  value={values.state}
                  onChangeText={handleChange('state')}
                  onBlur={() => {
                    handleBlur('state');
                    setFieldTouched('state', false);
                  }}
                  onFocus={() => setFieldTouched('state', true)}
                  isError={errorIcon(touched.state, errors.state)}
                  errorStyle={TellUsAboutYouStyle(themeColors).errorText}
                  returnKeyType="done"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="off"
                  textContentType="none"
                  autoCorrect={false}
                  ref={stateRef}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                />
                {errors.state && (
                  <TextLabel
                    variant={TextLabelVariants.XSMALL}
                    style={TellUsAboutYouStyle(themeColors).error}
                  >
                    {t(errors.state)}
                  </TextLabel>
                )}

                <View style={TellUsAboutYouStyle(themeColors).checkView}>
                  <TouchableOpacity
                    style={TellUsAboutYouStyle(themeColors).checkBox}
                    onPress={() => {
                      setFieldValue('isTermCondition', !values.isTermCondition);
                    }}
                  >
                    {values.isTermCondition ? (
                      <SelectedCheckBox
                        iconColor={themeColors.tellUsAboutYou.checkBox}
                      />
                    ) : (
                      <UnselectedCheckBox
                        iconColor={themeColors.tellUsAboutYou.checkBox}
                      />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={TellUsAboutYouStyle(themeColors).term}
                  >
                    <TextLabel
                      style={[
                        TellUsAboutYouStyle(themeColors).detailText,
                        {
                          color: errors.isTermCondition
                            ? themeColors.tellUsAboutYou.error
                            : themeColors.tellUsAboutYou.imageBorder,
                        },
                      ]}
                      variant={TextLabelVariants.LABEL}
                    >
                      {t('tellUsAboutYou.noteTitle')}{' '}
                      <TextLabel
                        variant={TextLabelVariants.LABEL}
                        style={TellUsAboutYouStyle(themeColors).linkTextDetail}
                      >
                        {t('tellUsAboutYou.terms') + '.'}
                      </TextLabel>{' '}
                      {t('tellUsAboutYou.noteTitleTwo')}
                    </TextLabel>
                  </TouchableOpacity>
                </View>

                <ActionButton
                  disabled={!values}
                  textStyle={[
                    TellUsAboutYouStyle(themeColors).sendText,
                    !values && { color: themeColors.button.disableText },
                  ]}
                  buttonStyle={[
                    TellUsAboutYouStyle(themeColors).button,
                    !values && {
                      backgroundColor: themeColors.button.disableBg,
                    },
                  ]}
                  title={t('buttonTitle.continue')}
                  onPress={handleSubmit}
                />
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

      <CountryDialog
        isVisible={isModalVisible}
        closeModal={closeModal}
        data={countryCodes}
        onItemSelected={handleItemSelected}
      />
    </NeuroAccessBackground>
  );
};
