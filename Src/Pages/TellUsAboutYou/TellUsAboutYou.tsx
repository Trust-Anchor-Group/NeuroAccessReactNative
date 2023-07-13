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
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { getAlgorithmListApi } from '@Services/Redux/Actions/GetAlgorithmList';
import { Algorithm } from '@Services/Redux/Reducers/CryptoSlice';
import { AgentAPI } from '@Services/API/Agent';
import Config from 'react-native-config';
import {
  ApplyLegalPayload,
  applyLegalIdApi,
  AddIdAttachmentPayload,
  addIdAttachmentApi,
  PnrPayload,
  validatePNrApi,
} from '@Services/Redux/Actions/GetAlgorithmList';

const ApiKey = Config.ApiKey;
const Secret = Config.Secret;

export const TellUsAboutYou = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const { t } = useTranslation();
  const { themeColors } = useContext(ThemeContext);
  const [imageUri, setImageUri] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const formikRef = useRef();
  const accountPassword = useRef();
  const keyPassword = useRef();
  const countryISOCode = useRef();
  const legalID = useRef();
  const algorithmVal = useRef<Algorithm>();
  const { userDetails } = useSelector((state) => state.user);
  const {
    algorithmDetails,
    pnrResponse,
    legalResponse,
    attachmentResponse,
    loading,
    error,
  } = useSelector((state) => state.crypto);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

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
    dispatch(getAlgorithmListApi());
  }, []);

  useEffect(() => {
    filterAlgorithm(algorithmDetails.Algorithms);
  }, [algorithmDetails]);

  useEffect(() => {
    const pnrHandler = Object.entries(pnrResponse).length !== 0;
    if (pnrHandler) {
      if (pnrResponse.countrySupported && pnrResponse.isValid) {
        formikRef.current?.setFieldValue(
          'personalNumber',
          pnrResponse.normalized
        );
      } else {
        formikRef.current?.setErrors({
          personalNumber: t('tellUsAboutYou.pnrInvalid'),
        });
      }
    }
  }, [pnrResponse]);

  useEffect(() => {
    const legalHandler = Object.entries(legalResponse).length !== 0;
    if (legalHandler) {
      const state = legalResponse.Identity.status.state;
      if (state === 'Created') {
        const id = legalResponse.Identity.id;
        legalID.current = id;
        uploadAttachment(id);
      }
    }
  }, [legalResponse]);

  useEffect(() => {
    const attachmentHandler = Object.entries(attachmentResponse).length !== 0;
    if (attachmentHandler) {
      const state = legalResponse.Identity.status.state;
      if (state === 'Created') {
      }
    }
  }, [attachmentResponse]);

  const filterAlgorithm = async (algorithms: any) => {
    let highestSecurityStrength = 0;
    let resultFinal: Algorithm | undefined;

    if (algorithms !== undefined) {
      await algorithms.forEach((algorithm: Algorithm) => {
        if (
          algorithm.safe &&
          algorithm.securityStrength > highestSecurityStrength
        ) {
          highestSecurityStrength = algorithm.securityStrength;
          resultFinal = algorithm;
        }
      });
      algorithmVal.current = resultFinal;
    }
  };

  const generateUniqueKey = async () => {
    try {
      const randomString = AgentAPI.Account.getRandomValues(32);
      const s1 = userDetails.userName + ':' + randomString;
      accountPassword.current = await AgentAPI.Account.Sign(
        userDetails.userName,
        s1
      );

      const s2 = Secret + ':' + randomString;
      keyPassword.current = await AgentAPI.Account.Sign(ApiKey, s2);
    } catch (error) {}
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleItemSelected = (selectedItem: any) => {
    addressRef.current?.focus();
    countryISOCode.current = selectedItem?.code;
    formikRef.current?.setFieldValue('country', selectedItem?.name['en']);
  };

  const handleFormSubmit = (values: any) => {
    const properties = [
      {
        name: 'FIRST',
        value: values.firstName,
      },
      {
        name: 'LAST',
        value: values.lastName,
      },
      {
        name: 'PNR',
        value: values.personalNumber,
      },
      {
        name: 'ADDR',
        value: values.address,
      },
      {
        name: 'ZIP',
        value: values.zip,
      },
      {
        name: 'CITY',
        value: values.city,
      },
      {
        name: 'COUNTRY',
        value: countryISOCode.current,
      },
    ];

    if (values.middleName.length !== 0) {
      properties.push({
        name: 'MIDDLE',
        value: values.middleName,
      });
    }
    if (values.address2.length !== 0) {
      properties.push({
        name: 'ADDR2',
        value: values.address2,
      });
    }

    if (values.state.length !== 0) {
      properties.push({
        name: 'REGION',
        value: values.state,
      });
    }

    const applyLegalPayload: ApplyLegalPayload = {
      LocalName: algorithmVal?.current?.localName,
      Namespace: algorithmVal.current?.namespace,
      KeyId: '5df048afef1941a40153ae55525034e8cf47dc2d60659a8dc7d26e7b5c551c02',
      KeyPassword: 'ankush@12345',
      AccountPassword: 'ankush@12345',
      Properties: properties,
    };
    dispatch(applyLegalIdApi(applyLegalPayload));
  };

  const uploadAttachment = (id: string) => {
    const addIdAttachmentPayload: AddIdAttachmentPayload = {
      LocalName: algorithmVal?.current?.localName,
      Namespace: algorithmVal.current?.namespace,
      KeyId: '5df048afef1941a40153ae55525034e8cf47dc2d60659a8dc7d26e7b5c551c02',
      KeyPassword: 'ankush@12345',
      AccountPassword: 'ankush@12345',
      LegalId: id,
      Attachment: imageUri?.base64,
      FileName: imageUri?.fileName,
      ContentType: imageUri?.type,
    };
    dispatch(addIdAttachmentApi(addIdAttachmentPayload));
  };

  const checkPersonalNumber = (pnr: string) => {
    if (pnr !== undefined) {
      const pnrPayload: PnrPayload = {
        countryCode: 'IN',
        pnr: pnr,
      };
      dispatch(validatePNrApi(pnrPayload));
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
        setImageUri(response.assets[0]);
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
          setImageUri(response.assets[0]);
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

                    {imageUri?.uri && (
                      <Image
                        resizeMode="cover"
                        resizeMethod="scale"
                        source={{ uri: imageUri?.uri }}
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
                  autoCapitalize="none"
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
                  autoCapitalize="none"
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
                  autoCapitalize="none"
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
                    checkPersonalNumber(values.personalNumber);
                    handleBlur('personalNumber');
                    setFieldTouched('personalNumber', false);
                  }}
                  onFocus={() => setFieldTouched('personalNumber', true)}
                  isError={errorIcon(
                    touched.personalNumber,
                    errors.personalNumber
                  )}
                  errorStyle={TellUsAboutYouStyle(themeColors).errorText}
                  autoCapitalize="none"
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
                  autoCapitalize="none"
                  returnKeyType="next"
                  keyboardType="default"
                  ref={countryRef}
                  editable={false}
                  onTouchStart={() => {
                    addressRef.current?.focus();
                    openModal();
                  }}
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
                  autoCapitalize="none"
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
                  autoCapitalize="none"
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
                  autoCapitalize="none"
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
                  autoCapitalize="none"
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
