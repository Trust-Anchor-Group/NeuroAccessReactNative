import React, { useContext, useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
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
import {
  getPopMessageApi,
  PopMessagePayload,
} from '@Services/Redux/Actions/GetStatusForIdentity';
import { savePopMessageLast } from '@Services/Redux/Reducers/IdentitySlice';
import { InformationOverlay } from '@Controls/InformationOverlay';
export const AlmostThere = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const { t } = useTranslation();
  const { themeColors } = useContext(ThemeContext);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const overlyTitle = useRef('');
  const overlyDetail = useRef('');
  const [imageUri, setImageURI] = useState('');
  const approveStatus = useRef(false);
  const [numberOfRemaining, setNumberOfRemaining] = useState('');
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { userDetails } = useSelector((state) => state.user);
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
      const val = attributeResponse?.nrReviewers;
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

  const handleCheckStatus = () => {
    stopInterval();
    navigation.navigate('AlmostThereStatus');
  };

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <NeuroAccessBackground>
      <View style={styles(themeColors).container}>
        <View style={styles(themeColors).spaceContainer} />

        <TextLabel
          style={AlmostThereStyle(themeColors).headerTxt}
          variant={TextLabelVariants.HEADER}
        >
          {approveStatus.current
            ? t('almostThere.congTitle')
            : t('almostThere.title')}
        </TextLabel>

        <View
          style={[
            AlmostThereStyle(themeColors).informationContainer,
            AlmostThereStyle(themeColors).shadowProp,
          ]}
        >
          <View style={AlmostThereStyle(themeColors).imageContainer}>
            <Image
              style={[AlmostThereStyle(themeColors).imageView]}
              source={{ uri: `data:image/png;base64,${imageUri}` }}
              resizeMode="cover"
            />

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
                {
                  backgroundColor: approveStatus.current
                    ? themeColors.almost.approved
                    : themeColors.almost.remainingPeer,
                },
              ]}
            />
            <TextLabel
              style={AlmostThereStyle(themeColors).pendingReviewTxt}
              variant={TextLabelVariants.LABEL}
            >
              {approveStatus.current
                ? t('almostThere.verified')
                : t('almostThere.pendingReview')}
            </TextLabel>
          </View>

          {!approveStatus.current && (
            <TextLabel
              style={AlmostThereStyle(themeColors).remainingPeerTxt}
              variant={TextLabelVariants.DESCRIPTION}
            >
              {t('almostThere.remainingPeer') + numberOfRemaining}
            </TextLabel>
          )}

          <TextLabel
            style={AlmostThereStyle(themeColors).descriptionTxt}
            variant={TextLabelVariants.DESCRIPTION}
          >
            {approveStatus.current
              ? t('almostThere.verifyDetails')
              : t('almostThere.details')}
          </TextLabel>

          <TouchableOpacity
            style={AlmostThereStyle(themeColors).checkStatus}
            onPress={() => {
              handleCheckStatus();
            }}
          >
            <TextLabel
              style={AlmostThereStyle(themeColors).checkStatusTxt}
              variant={TextLabelVariants.INPUTLABEL}
            >
              {approveStatus.current
                ? t('almostThere.seeAccount')
                : t('almostThere.checkStatus')}
            </TextLabel>
          </TouchableOpacity>
        </View>
        {!approveStatus.current && (
          <TouchableOpacity
            style={AlmostThereStyle(themeColors).providerInfo}
            onPress={() => {
              overlyTitle.current = t('pendingReview.title');
              overlyDetail.current = t('pendingReview.detail');
              setShowOverlay(true);
            }}
          >
            <ShowError
              errorMessage={t('almostThere.reviewProcess')}
              styles={AlmostThereStyle(themeColors).infoText}
              colorCode={themeColors.currentProvider.titleUnSelected}
              changeColor={true}
            />
          </TouchableOpacity>
        )}

        <View style={AlmostThereStyle(themeColors).bottomContainer}>
          {!approveStatus.current && (
            <TouchableOpacity
              style={AlmostThereStyle(themeColors).providerInfo}
              onPress={() => {
                overlyTitle.current = t('peerReviewProcess.title');
                overlyDetail.current = t('peerReviewProcess.detail');
                setShowOverlay(true);
              }}
            >
              <ShowError
                errorMessage={t('almostThere.peerReview')}
                styles={AlmostThereStyle(themeColors).infoText}
                colorCode={themeColors.currentProvider.titleUnSelected}
                changeColor={true}
              />
            </TouchableOpacity>
          )}
          <View style={AlmostThereStyle(themeColors).spacer} />
          <ActionButtonWithIcon
            onPress={() => handleOnPress()}
            hideIcon={approveStatus.current}
            title={
              approveStatus.current
                ? t('almostThere.finishSetup')
                : t('almostThere.invitePeer')
            }
            buttonStyle={AlmostThereStyle(themeColors).actionButton}
            textStyle={AlmostThereStyle(themeColors).sendText}
            onPress={() => navigation.navigate('CreatePin')}
          />
        </View>
      </View>

      {showOverlay && (
        <InformationOverlay
          toggleOverlay={toggleOverlay}
          title={overlyTitle.current}
          description={overlyDetail.current}
        />
      )}

      <NavigationHeader
        hideBackAction={true}
        onBackAction={onBackClick}
        onLanguageAction={onLanguageClick}
      />
    </NeuroAccessBackground>
  );
};
