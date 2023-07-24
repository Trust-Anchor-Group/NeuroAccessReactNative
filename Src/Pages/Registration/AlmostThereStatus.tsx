import React, { useContext, useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View, ScrollView, Image } from 'react-native';
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
import { GlobalStyle as styles, AlmostThereStatusStyle } from '@Pages/Styles';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '@Controls/index';
import { AlmostStatusLabel, AlmostTechnicalLabel } from '@Controls/index';
import { ArrowDownIcon, ArrowUpIcon } from '@Assets/Svgs';
import {
  getIdentityApi,
  getApplicationAttributeApi,
} from '@Services/Redux/Actions/GetStatusForIdentity';
import { readBase64FromFile } from '@Services/Storage';
import { AlmostStatusList } from '@Controls/AlmostStatusList';
import { InformationOverlay } from '@Controls/InformationOverlay';
import {
  getPopMessageApi,
  PopMessagePayload,
} from '@Services/Redux/Actions/GetStatusForIdentity';
import { savePopMessageLast } from '@Services/Redux/Reducers/IdentitySlice';

export const AlmostThereStatus = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const { t } = useTranslation();
  const { themeColors } = useContext(ThemeContext);
  const [imageUri, setImageURI] = useState('');
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [numberOfRemaining, setNumberOfRemaining] = useState('');
  const [technicalToggle, setTechnicalToggle] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const approveStatus = useRef(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { userDetails } = useSelector((state) => state.user);
  const { identityResponse } = useSelector((state) => state.identity);
  const {
    attributeResponse,
    popMessageResponse,
    popMessageLastResponse,
    loading,
    error,
  } = useSelector((state) => state.identity);

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
      const val = attributeResponse?.nrReviewers + '';
      setNumberOfRemaining(val);
    }
  }, [attributeResponse]);

  useEffect(() => {
    const id = setInterval(popMessage, 2000);
    setIntervalId(id);
    return () => {
      clearInterval(id);
    };
  }, []);

  const popMessage = async () => {
    const popMessagePayload: PopMessagePayload = {
      MaxCount: 1,
    };
    await dispatch(getPopMessageApi(popMessagePayload));
  };

  useEffect(() => {
    const popMessageHandler = Object.entries(popMessageResponse).length !== 0;
    if (popMessageHandler) {
      if (popMessageResponse?.Messages.length > 0) {
        savePopMessage(popMessageResponse?.Messages[0]);
      } else {
        const popMessageLastHandler =
          Object.entries(popMessageLastResponse).length !== 0;
        if (popMessageLastHandler) {
          const val = popMessageLastResponse?.Content?.status?.state;
          if (val === 'Created') {
          } else if (val === 'Approved') {
            approveStatus.current = true;
            stopInterval();
          }
        }
      }
    }
  }, [popMessageResponse]);

  const savePopMessage = async (message: any) => {
    dispatch(savePopMessageLast(message));
  };

  const stopInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const readAndUseBase64 = async () => {
    try {
      const base64String = await readBase64FromFile();
      setImageURI(base64String);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const handleOnPress = () => {
    stopInterval();
    if (approveStatus.current) {
    } else {
    }
  };

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };
  return (
    <NeuroAccessBackground>
      <View style={styles(themeColors).container}>
        <View style={styles(themeColors).spaceContainer} />

        <TextLabel
          style={AlmostThereStatusStyle(themeColors).headerTxt}
          variant={TextLabelVariants.HEADER}
        >
          {approveStatus.current
            ? t('almostThere.congTitle')
            : t('almostThere.title')}
        </TextLabel>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={AlmostThereStatusStyle(themeColors).scrollView}
        >
          <View style={AlmostThereStatusStyle(themeColors).spacer} />
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
                  {
                    backgroundColor: approveStatus.current
                      ? themeColors.almost.approved
                      : themeColors.almost.remainingPeer,
                  },
                ]}
              />
              <TextLabel
                style={AlmostThereStatusStyle(themeColors).pendingReviewTxt}
                variant={TextLabelVariants.LABEL}
              >
                {approveStatus.current
                  ? t('almostThere.verified')
                  : t('almostThere.pendingReview')}
              </TextLabel>
            </View>

            {!approveStatus.current && (
              <TextLabel
                style={[AlmostThereStatusStyle(themeColors).remainingPeerTxt]}
                variant={TextLabelVariants.DESCRIPTION}
              >
                {t('almostThere.remainingPeer') + numberOfRemaining}
              </TextLabel>
            )}

            <AlmostStatusLabel
              title="Created"
              titleValue={identityResponse?.Identity?.status?.created}
              titleValueColor={themeColors.almost.created}
            />
            <AlmostStatusLabel
              title="Updated"
              titleValue={identityResponse?.Identity?.status?.to}
              titleValueColor={themeColors.almost.created}
            />

            <View style={AlmostThereStatusStyle(themeColors).line} />

            <AlmostStatusList data={identityResponse?.Identity?.property} />
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
                  logoColor={themeColors.almost.value}
                  onPress={() => setTechnicalToggle(!technicalToggle)}
                  style={AlmostThereStatusStyle(themeColors).upIcon}
                />
              ) : (
                <ArrowDownIcon
                  logoColor={themeColors.almost.value}
                  onPress={() => setTechnicalToggle(!technicalToggle)}
                  style={AlmostThereStatusStyle(themeColors).downIcon}
                />
              )}
            </TouchableOpacity>

            {technicalToggle && (
              <View style={AlmostThereStatusStyle(themeColors).toggle}>
                <AlmostTechnicalLabel
                  title="Neuro-ID"
                  link={identityResponse?.Identity?.id}
                />
                <AlmostTechnicalLabel
                  title="Network"
                  link={identityResponse?.Identity?.serverSignature?.value}
                />
              </View>
            )}

            <ActionButtonWithIcon
              onPress={() => handleOnPress()}
              hideIcon={approveStatus.current}
              title={
                approveStatus.current
                  ? t('almostThere.finishSetup')
                  : t('almostThere.invitePeer')
              }
              buttonStyle={AlmostThereStatusStyle(themeColors).actionButton}
              textStyle={AlmostThereStatusStyle(themeColors).sendText}
            />
            <View style={AlmostThereStatusStyle(themeColors).spacer} />
            <View style={AlmostThereStatusStyle(themeColors).spacer} />
          </View>

          {!approveStatus.current && (
            <TouchableOpacity
              onPress={() => setShowOverlay(true)}
              style={AlmostThereStatusStyle(themeColors).providerInfo}
            >
              <ShowError
                errorMessage={t('almostThere.reviewProcess')}
                styles={AlmostThereStatusStyle(themeColors).infoText}
                colorCode={themeColors.currentProvider.titleUnSelected}
                changeColor={true}
              />
            </TouchableOpacity>
          )}

          <View style={AlmostThereStatusStyle(themeColors).spacer} />
        </ScrollView>
      </View>
      <NavigationHeader
        hideBackAction={false}
        onBackAction={onBackClick}
        onLanguageAction={onLanguageClick}
      />

      {showOverlay && (
        <InformationOverlay
          toggleOverlay={toggleOverlay}
          title={t('peerReviewProcess.title')}
          description={t('peerReviewProcess.detail')}
        />
      )}
    </NeuroAccessBackground>
  );
};
