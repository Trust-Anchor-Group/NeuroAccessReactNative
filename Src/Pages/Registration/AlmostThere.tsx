import React, { useContext, useEffect, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {
  NeuroAccessBackground,
  NavigationHeader,
  TextLabel,
  TextLabelVariants,
  ActionButtonWithIcon,
  ShowError,
} from '@Controls/index';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
import { GlobalStyle as styles, AlmostThereStyle } from '@Pages/Styles';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  getApplicationAttributeApi,
} from '@Services/Redux/Actions/GetStatusForIdentity';
import { readBase64FromFile } from '@Services/Storage';
export const AlmostThere = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const { t } = useTranslation();
  const { themeColors } = useContext(ThemeContext);
  const [imageUri, setImageURI] = useState('');
  const [numberOfRemaining, setNumberOfRemaining] = useState('');
  const { width, height } = Dimensions.get('window');
  const borderRadius = Math.min(width, height) * 0.5;
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { userDetails } = useSelector((state) => state.user);
  const { attributeResponse } = useSelector(
    (state) => state.identity
  );

  const onBackClick = () => {
    navigation.goBack();
  };

  const onLanguageClick = () => {
    navigation.navigate('Settings');
  };

  useEffect(() => {
    readAndUseBase64();
    getIdentityData();
  }, []);

  const getIdentityData = async () => {
    await dispatch(getApplicationAttributeApi());
  };
  useEffect(() => {
    const attributeHandler = Object.entries(attributeResponse).length !== 0;
    if (attributeHandler) {
      const val = attributeHandler?.nrReviewers + '';
      setNumberOfRemaining(val);
    }
  }, [attributeResponse]);

  const readAndUseBase64 = async () => {
    try {
      const base64String = await readBase64FromFile();
      setImageURI(base64String);
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
          style={AlmostThereStyle(themeColors).headerTxt}
          variant={TextLabelVariants.HEADER}
        >
          {t('almostThere.title')}
        </TextLabel>

        <View
          style={[
            AlmostThereStyle(themeColors).informationContainer,
            AlmostThereStyle(themeColors).shadowProp,
          ]}
        >
          <View style={AlmostThereStyle(themeColors).imageContainer}>
            <View
              style={[
                AlmostThereStyle(themeColors).imageView,
                { borderRadius },
              ]}
            >
              <Image
                source={{ uri: `data:image/png;base64,${imageUri}` }}
                style={AlmostThereStyle(themeColors).image}
                resizeMode="cover"
              />
            </View>

            <View style={AlmostThereStyle(themeColors).userInfo}>
              <TextLabel
                style={AlmostThereStyle(themeColors).name}
                variant={TextLabelVariants.HEADER}
              >
                {userDetails?.userName}
              </TextLabel>

              <TextLabel
                style={AlmostThereStyle(themeColors).mobile}
                variant={TextLabelVariants.DESCRIPTION}
              >
                {userDetails?.mobileNumber?.number}
              </TextLabel>
            </View>
          </View>

          <View style={AlmostThereStyle(themeColors).detailContainer}>
            <View
              style={[
                AlmostThereStyle(themeColors).pendingContainer,
                { borderRadius },
              ]}
            >
              <View
                style={[
                  AlmostThereStyle(themeColors).image,
                  {
                    borderRadius,
                    backgroundColor: themeColors.almost.remainingPeer,
                  },
                ]}
              />
            </View>
            <TextLabel
              style={AlmostThereStyle(themeColors).pendingReviewTxt}
              variant={TextLabelVariants.LABEL}
            >
              {t('almostThere.pendingReview')}
            </TextLabel>
          </View>

          <TextLabel
            style={AlmostThereStyle(themeColors).remainingPeerTxt}
            variant={TextLabelVariants.DESCRIPTION}
          >
            {t('almostThere.remainingPeer') + numberOfRemaining}
          </TextLabel>

          <TextLabel
            style={AlmostThereStyle(themeColors).descriptionTxt}
            variant={TextLabelVariants.DESCRIPTION}
          >
            {t('almostThere.details')}
          </TextLabel>

          <TouchableOpacity style={AlmostThereStyle(themeColors).checkStatus}>
            <TextLabel
              style={AlmostThereStyle(themeColors).checkStatusTxt}
              variant={TextLabelVariants.INPUTLABEL}
            >
              {t('almostThere.checkStatus')}
            </TextLabel>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={AlmostThereStyle(themeColors).providerInfo}>
          <ShowError
            errorMessage={t('almostThere.reviewProcess')}
            styles={AlmostThereStyle(themeColors).infoText}
            colorCode={themeColors.currentProvider.titleUnSelected}
            changeColor={true}
          />
        </TouchableOpacity>
        <View style={AlmostThereStyle(themeColors).bottomContainer}>
          <TouchableOpacity style={AlmostThereStyle(themeColors).providerInfo}>
            <ShowError
              errorMessage={t('almostThere.peerReview')}
              styles={AlmostThereStyle(themeColors).infoText}
              colorCode={themeColors.currentProvider.titleUnSelected}
              changeColor={true}
            />
          </TouchableOpacity>
          <View style={AlmostThereStyle(themeColors).spacer} />
          <ActionButtonWithIcon
            title={t('almostThere.invitePeer')}
            buttonStyle={AlmostThereStyle(themeColors).actionButton}
            textStyle={AlmostThereStyle(themeColors).sendText}
            onPress={() => navigation.navigate('CreatePin')}
          />
        </View>
      </View>
      <NavigationHeader
        hideBackAction={true}
        onBackAction={onBackClick}
        onLanguageAction={onLanguageClick}
      />
    </NeuroAccessBackground>
  );
};
