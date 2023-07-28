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
import Config from 'react-native-config';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
import { GlobalStyle as styles, AlmostThereStatusStyle } from '@Pages/Styles';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '@Controls/index';
import { AlmostStatusLabel, AlmostTechnicalLabel } from '@Controls/index';
import { ArrowDownIcon, ArrowUpIcon } from '@Assets/Svgs';
import { getApplicationAttributeApi } from '@Services/Redux/Actions/GetStatusForIdentity';
import { readBase64FromFile } from '@Services/Storage';
import { AlmostStatusList } from '@Controls/AlmostStatusList';
import { InformationOverlay } from '@Controls/InformationOverlay';
import {
  getPopMessageApi,
  PopMessagePayload,
} from '@Services/Redux/Actions/GetStatusForIdentity';
import { savePopMessageLast } from '@Services/Redux/Reducers/IdentitySlice';
import { convertUTCToLocalTime } from '@Helpers/Utils';

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
  const userFullName = useRef('');
  const presonalNumber = useRef('');
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { userDetails } = useSelector((state) => state.user);
  const { identityResponse, pnrNumber } = useSelector(
    (state) => state.identity
  );
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
    userIdentity();
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

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const id = setInterval(popMessage, 2000);
      setIntervalId(id);
    });

    return () => {
      clearInterval(intervalId);
      unsubscribe();
    };
  }, [navigation]);

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

  const userIdentity = () => {
    let fullName = '';
    identityResponse?.Identity?.property.map((item, index) => {
      if (item?.name === 'FIRST') {
        fullName = item?.value;
      } else if (item?.name === 'MIDDLE') {
        fullName = fullName + ' ' + item?.value;
      } else if (item?.name === 'LAST') {
        fullName = fullName + ' ' + item?.value;
      } else if (item?.name === 'PNR') {
        presonalNumber.current = item?.value;
      }
    });
    userFullName.current = fullName;
    readAndUseBase64();
  };

  const validDate = () => {
    let validDate = '';

    return validDate;
  };

  const splitDate = (dateTimeFrom: string, dateTimeTo?: string) => {
    if (approveStatus.current) {
      const [datePart, timePart] = dateTimeFrom.split('T');
      if (dateTimeTo !== undefined) {
        const [datePartTo, timePartTo] = dateTimeTo.split('T');
        return datePart + ' ... ' + datePartTo;
      } else {
        return datePart;
      }
    } else {
      const val = convertUTCToLocalTime(dateTimeFrom);
      return val;
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
              <View style={AlmostThereStatusStyle(themeColors).imageView}>
                <Image
                  style={[AlmostThereStatusStyle(themeColors).image]}
                  source={{ uri: `data:image/png;base64,${imageUri}` }}
                  resizeMode="cover"
                />
              </View>
              <View style={AlmostThereStatusStyle(themeColors).userInfo}>
                <TextLabel
                  style={AlmostThereStatusStyle(themeColors).name}
                  variant={TextLabelVariants.HEADER}
                >
                  {userFullName.current}
                </TextLabel>

                <TextLabel
                  style={AlmostThereStatusStyle(themeColors).mobile}
                  variant={TextLabelVariants.DESCRIPTION}
                >
                  {presonalNumber.current}
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
              styleTitle={{ flex: 0.2 }}
              styleValue={{ flex: 0.8 }}
              title="Created"
              titleValue={splitDate(
                identityResponse?.Identity?.status?.created
              )}
              titleValueColor={themeColors.almost.created}
            />
            <AlmostStatusLabel
              styleTitle={{ flex: 0.2 }}
              styleValue={{ flex: 0.8 }}
              title={approveStatus.current ? 'Valid' : 'Updated'}
              titleValue={
                approveStatus.current
                  ? splitDate(
                      identityResponse?.Identity?.status?.from,
                      identityResponse?.Identity?.status?.to
                    )
                  : splitDate(identityResponse?.Identity?.status?.created)
              }
              titleValueColor={themeColors.almost.created}
            />

            <View style={AlmostThereStatusStyle(themeColors).line} />

            <View style={{ width: '100%' }}>
              <AlmostStatusList data={identityResponse?.Identity?.property} />
            </View>

            <TouchableOpacity
              style={AlmostThereStatusStyle(themeColors).technical}
              onPress={() => setTechnicalToggle(!technicalToggle)}
            >
              <TextLabel variant={TextLabelVariants.INPUTLABEL}>
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
                  title={t('almostThere.neuroID')}
                  prefix="Legal ID: "
                  link={identityResponse?.Identity?.id}
                />
                <AlmostTechnicalLabel
                  title={t('almostThere.networkId')}
                  prefix="Network ID: "
                  link={userDetails?.userName + '@' + Config.Host}
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
