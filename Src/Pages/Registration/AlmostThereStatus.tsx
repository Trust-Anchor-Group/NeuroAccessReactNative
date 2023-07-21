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
  Dimensions,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {
  NeuroAccessBackground,
  NavigationHeader,
  TextLabel,
  TextLabelVariants,
  ActionButton,
  ShowError,
} from '@Controls/index';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
import { GlobalStyle as styles, AlmostThereStatusStyle } from '@Pages/Styles';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '@Controls/index';
import { AlmostStatusLabel, AlmostTechnicalLabel } from '@Controls/index';
import { ArrowDownIcon, ArrowUpIcon } from '@Assets/Svgs';
// import {
//   getIdentityApi,
//   getApplicationAttributeApi,
// } from '@Services/Redux/Actions/GetStatusForIdentity';
// import { readBase64FromFile } from '@Services/Storage';
export const AlmostThereStatus = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const { t } = useTranslation();
  const { themeColors } = useContext(ThemeContext);
  const [imageUri, setImageURI] = useState(
    'https://fastly.picsum.photos/id/645/200/300.jpg?hmac=fiKW3Nj8r0CWJQY3S-kkeT8PAfvKhA8igd9GIRk41Yw'
  );
  const [numberOfRemaining, setNumberOfRemaining] = useState('');
  const [technicalToggle, setTechnicalToggle] = useState(false);
  const { width, height } = Dimensions.get('window');
  const borderRadius = Math.min(width, height) * 0.5;
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { userDetails } = useSelector((state) => state.user);
  // const { attributeResponse, loading, error } = useSelector(
  //   (state) => state.identity
  // );

  const onBackClick = () => {
    navigation.goBack();
  };

  const onLanguageClick = () => {
    navigation.navigate('Settings');
  };

  useEffect(() => {
    //readAndUseBase64();
    //getIdentityData();
  }, []);

  const getIdentityData = async () => {
    // await dispatch(getApplicationAttributeApi());
  };
  // useEffect(() => {
  //   const attributeHandler = Object.entries(attributeResponse).length !== 0;
  //   if (attributeHandler) {
  //     const val = attributeHandler?.nrReviewers + '';
  //     setNumberOfRemaining(val);
  //   }
  // }, [attributeResponse]);

  const readAndUseBase64 = async () => {
    try {
      // const base64String = await readBase64FromFile();
      //setImageURI(base64String);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  return (
    <NeuroAccessBackground>
      <View style={styles(themeColors).container}>
        <View style={styles(themeColors).spaceContainer} />

        <TextLabel
          style={AlmostThereStatusStyle(themeColors).headerTxt}
          variant={TextLabelVariants.HEADER}
        >
          {t('almostThere.title')}
        </TextLabel>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={AlmostThereStatusStyle(themeColors).scrollView}
        >
          <View
            style={[
              AlmostThereStatusStyle(themeColors).informationContainer,
              AlmostThereStatusStyle(themeColors).shadowProp,
            ]}
          >
            <View style={AlmostThereStatusStyle(themeColors).imageContainer}>
              <Image
                style={[AlmostThereStatusStyle(themeColors).imageView]}
                source={{ uri: `data:image/png;base64,${imageUri}` }}
                resizeMode="cover"
              />
              <View style={AlmostThereStatusStyle(themeColors).userInfo}>
                <TextLabel
                  style={AlmostThereStatusStyle(themeColors).name}
                  variant={TextLabelVariants.HEADER}
                >
                  {userDetails?.userName}
                </TextLabel>

                <TextLabel
                  style={AlmostThereStatusStyle(themeColors).mobile}
                  variant={TextLabelVariants.DESCRIPTION}
                >
                  {userDetails?.mobileNumber?.number}
                </TextLabel>
              </View>
            </View>

            <View style={AlmostThereStatusStyle(themeColors).detailContainer}>
              <View
                style={[
                  AlmostThereStatusStyle(themeColors).pendingContainer,
                  { backgroundColor: themeColors.almost.remainingPeer },
                ]}
              />
              <TextLabel
                style={AlmostThereStatusStyle(themeColors).pendingReviewTxt}
                variant={TextLabelVariants.LABEL}
              >
                {t('almostThere.pendingReview')}
              </TextLabel>
            </View>

            <TextLabel
              style={[AlmostThereStatusStyle(themeColors).remainingPeerTxt]}
              variant={TextLabelVariants.DESCRIPTION}
            >
              {t('almostThere.remainingPeer') + numberOfRemaining}
            </TextLabel>

            <AlmostStatusLabel
              title="Created"
              titleValue="Ankush Mittal"
              titleValueColor="#4F7EAC"
            />
            <AlmostStatusLabel
              title="Updated"
              titleValue="Ankush Mittal"
              titleValueColor="#4F7EAC"
            />

            <View
              style={AlmostThereStatusStyle(themeColors).line}
            />

            <AlmostStatusLabel title="First name" titleValue="Ankush Mittal" />
            <AlmostStatusLabel title="Middle name" titleValue="Ankush Mittal" />
            <AlmostStatusLabel title="Last name" titleValue="Ankush Mittal" />
            <AlmostStatusLabel
              title="Personal number"
              titleValue="Ankush Mittal"
            />
            <AlmostStatusLabel title="Address" titleValue="Ankush Mittal jsjjs ksksk sssj" />
            <AlmostStatusLabel title="Postal code" titleValue="Ankush Mittal" />
            <AlmostStatusLabel title="City" titleValue="Ankush Mittal" />
            <AlmostStatusLabel title="State" titleValue="Ankush Mittal" />
            <AlmostStatusLabel title="Country" titleValue="Ankush Mittal" />

            <TouchableOpacity
              style={AlmostThereStatusStyle(themeColors).technical}
              onPress={() => setTechnicalToggle(!technicalToggle)}
            >
              <TextLabel
                variant={TextLabelVariants.INPUTLABEL}
               // style={{ textAlign: 'left' }}
              >
                {'Technical'}
              </TextLabel>
              {technicalToggle ? (
                <ArrowUpIcon
                  onPress={() => setTechnicalToggle(!technicalToggle)}
                  style={AlmostThereStatusStyle(themeColors).upIcon}
                />
              ) : (
                <ArrowDownIcon
                  onPress={() => setTechnicalToggle(!technicalToggle)}
                  style={AlmostThereStatusStyle(themeColors).downIcon}
                />
              )}
            </TouchableOpacity>

            {technicalToggle && (
              <View
                style={AlmostThereStatusStyle(themeColors).toggle}
              >
                <AlmostTechnicalLabel
                  title="Neuro-ID"
                  link="https://www.figma.com/file/mwLBjGS3Xgiejnv4K7z6yk/Neuro-ID?type=design&node-id=1108-50984&mode=design&t=tbSodALhXrXVezVE-0"
                />
                <AlmostTechnicalLabel
                  title="Network"
                  link="https://www.figma.com/file/mwLBjGS3Xgiejnv4K7z6yk/Neuro-ID?type=design&node-id=1108-50984&mode=design&t=tbSodALhXrXVezVE-0"
                />
              </View>
            )}

            <ActionButton
              title={t('almostThere.invitePeer')}
              buttonStyle={AlmostThereStatusStyle(themeColors).actionButton}
              textStyle={AlmostThereStatusStyle(themeColors).sendText}
            />
            <View style={AlmostThereStatusStyle(themeColors).spacer} />
          </View>

          <TouchableOpacity
            style={AlmostThereStatusStyle(themeColors).providerInfo}
          >
            <ShowError
              errorMessage={t('almostThere.reviewProcess')}
              styles={AlmostThereStatusStyle(themeColors).infoText}
              colorCode={themeColors.currentProvider.titleUnSelected}
              changeColor={true}
            />
          </TouchableOpacity>

          <View style={AlmostThereStatusStyle(themeColors).spacer} />
        </ScrollView>
      </View>
      <NavigationHeader
        hideBackAction={true}
        onBackAction={onBackClick}
        onLanguageAction={onLanguageClick}
      />
    </NeuroAccessBackground>
  );
};
