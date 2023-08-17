import React, { useContext, useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View, Image, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {
  NeuroAccessBackground,
  NavigationHeader,
  TextLabel,
  TextLabelVariants,
  ActionButtonWithIcon,
  ShowError,
} from '@Controls/index';
import { TextEncoder } from 'text-decoding';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
import { GlobalStyle as styles, AlmostThereStyle } from '@Pages/Styles';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { getApplicationAttributeApi } from '@Services/Redux/Actions/GetStatusForIdentity';
import { readBase64FromFile } from '@Services/Storage';
import {
  getPopMessageApi,
  PopMessagePayload,
  getIdentityApi,
  getServiceProvidersForIdReviewApi,
} from '@Services/Redux/Actions/GetStatusForIdentity';
import {
  AddIdAttachmentPayload,
  addIdAttachmentApi,
} from '@Services/Redux/Actions/GetAlgorithmList';
import { savePopMessageLast, setIdentitySliceError, setPetitionPeerReviewMsg } from '@Services/Redux/Reducers/IdentitySlice';
import { InformationOverlay } from '@Controls/InformationOverlay';
import { AddPeerReviewIDAttachment } from '@Helpers/Utility/Utils';
export const AlmostThere = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const { t } = useTranslation();
  const { themeColors } = useContext(ThemeContext);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const overlyTitle = useRef('');
  const overlyDetail = useRef('');
  const userFullName = useRef('');
  const presonalNumber = useRef('');
  const [imageUri, setImageURI] = useState('');
  const approveStatus = useRef(false);
  const showPeerReviewButton = useRef(false);
  const [numberOfRemaining, setNumberOfRemaining] = useState('');
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { userDetails } = useSelector((state) => state.user);
  const {
    identityResponse,
    identityResponseApi,
    attributeResponse,
    popMessageResponse,
    popMessageLastResponse,
    getServiceProvidersForIdReviewResponse,
    petitionSignatureResponseMsg,
    loading,
    error,
  } = useSelector((state) => state.identity);
  const {
    attachmentResponse,
    loading: attachmentLoading,
    error: attachmentError,
  } = useSelector((state) => state.crypto);

  useEffect(() => {
    if (error) {
      Alert.alert(t('Error.ErrorTitle'), JSON.stringify(error), [
        {
          text: 'ok',
          onPress: () => {
            dispatch(setIdentitySliceError(''))
          },
        },
      ]);
    }
  }, [error]);

  const onBackClick = () => {
    navigation.goBack();
  };

  const onLanguageClick = () => {
    navigation.navigate('Settings');
  };

  useEffect(() => {
   // console.log('print popmessage response',petitionSignatureResponseMsg.Messages)
    //verifyPetitionId(petitionSignatureResponseMsg.Messages);
   
   userIdentity();
   getAttributeData();
  }, []);

  const getAttributeData = async () => {
    await dispatch(getApplicationAttributeApi());
  };
  useEffect(() => {
    const attributeHandler = Object.entries(attributeResponse).length !== 0;
    if (attributeHandler) {
      const val = attributeResponse?.nrReviewers;
      setNumberOfRemaining(val);
      getIdentityCall();
    }
  }, [attributeResponse]);

  useEffect(() => {
    const forIdReviewHandler = Object.entries(getServiceProvidersForIdReviewResponse).length !== 0;
    if (forIdReviewHandler) {
        console.log('for id review list',getServiceProvidersForIdReviewResponse)
    }
  }, [getServiceProvidersForIdReviewResponse]);

  // const serializeCall = async (identityResponseApi:any)=>{
  //   const Xml: any[] = [];
  //   await Serialize(Xml,identityResponseApi,true, true, true, true, true, true, true);
  //   const encoder = new TextEncoder();
  //   const bytes: Uint8Array = encoder.encode(Xml.join(''));
  // }

  const getIdentityCall = async () => { 
    await dispatch(getIdentityApi(userDetails?.legalId));
  };

  useEffect(() => {
    if (identityResponseApi!==null) {
      //   if(userDetails.petitionId!==undefined)
      //   {
      //     console.log('for id identityResponseApi in serialize..',identityResponseApi)
      //     serializeCall(identityResponseApi)

      //  }
    }
  }, [identityResponseApi]);

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
      MaxCount: 10,
    };
    await dispatch(getPopMessageApi(popMessagePayload));
  };

  useEffect(() => {
    const popMessageHandler = Object.entries(popMessageResponse).length !== 0;
    if (popMessageHandler) {
      //console.log('popmessage response 1',popMessageResponse)
      if (popMessageResponse?.Messages.length > 0) {
        dispatch(setPetitionPeerReviewMsg(popMessageResponse))
        verifyPetitionId(popMessageResponse.Messages)
        //savePopMessage(popMessageResponse?.Messages[0]);
      } else {
        const popMessageLastHandler =
          Object.entries(popMessageLastResponse).length !== 0;
        if (popMessageLastHandler) {
          const val = popMessageLastResponse?.Content?.status?.state;
          if (val === 'Created') {
          } else if (val === 'Approved') {
            approveStatus.current = true;
           // stopInterval();
          }
        }

        // if(petitionSignatureResponseMsg!==null)
        // {
        //   stopInterval();
        // }
      }
    }
  }, [popMessageResponse]);

  const savePopMessage = async (message: any) => {
    dispatch(savePopMessageLast(message));
  };

  const verifyPetitionId = async (popMessageArray:any)=>{
    console.log('verified petiton id called',popMessageArray)
          for (const popMessageIndex in popMessageArray) {
            const identityObj = popMessageArray[popMessageIndex];
            
            if(identityObj?.Content!==undefined)
            {
              const content = identityObj?.Content;
              const reviewerIdentity = content?.identity;
              const xmlnsVal  = content?.xmlns;
              console.log('verified petiton id called if block ',identityObj)
              console.log('verified petiton id called if block  1',userDetails.petitionId)
              if(userDetails.petitionId!==undefined)
              {
                const pid = content?.pid;
                console.log('verified petiton id called if block  2',pid)
                const signature = content?.signature.value;
                console.log('verified petiton id called if block  3',signature)
               
                console.log('verified petiton id called if block  4',reviewerIdentity?.status)
                const legalStatus = reviewerIdentity?.status?.state;
                console.log('verified petiton id called if block  555',legalStatus)
                if(pid===userDetails?.petitionId && legalStatus==='Approved')
                {
                 // stopInterval();
                  console.log('verified petiton id called if block  5',identityObj)
                 // dispatch(setPetitionPeerReviewMsg(identityObj))
                  const response = await AddPeerReviewIDAttachment(identityResponseApi?.Identity,reviewerIdentity,signature,xmlnsVal)
                  console.log('print final peerreview attachment response',response)
                 uploadAttachment(response);
                   
                }else if(pid===userDetails?.petitionId && legalStatus==='Compromized')
                {
                  dispatch(setPetitionPeerReviewMsg(identityObj))
                }
                else if(pid===userDetails?.petitionId && legalStatus==='Obsoleted')
                {
                  dispatch(setPetitionPeerReviewMsg(identityObj))
                }
                else if(pid===userDetails?.petitionId && legalStatus==='Rejected')
                {
                  dispatch(setPetitionPeerReviewMsg(identityObj))
                }
                else if(pid===userDetails?.petitionId && legalStatus==='Ignore')
                {
                  dispatch(setPetitionPeerReviewMsg(identityObj))
                }
              }
            }
            else
            {
              console.log('verified petiton id else block',identityObj)
              if(identityObj?.identity!==undefined)
              {
                const responseId = identityObj?.identity?.id;
                const legalStatus = identityObj?.identity?.status?.state;
                if(userDetails?.legalId===responseId && legalStatus==='Created')
                {
                  savePopMessage(identityObj);
                }
              }

            }
          }
  }

  useEffect(() => {
    const attachmentHandler = Object.entries(attachmentResponse).length !== 0;
    if (attachmentHandler) {
     console.log('attachment uploaded successfully',attachmentResponse)
    }
  }, [attachmentResponse]);

  const uploadAttachment = async (data : any) => {
    const addIdAttachmentPayload: AddIdAttachmentPayload = {
      userName: userDetails.userName,
      LocalName: userDetails?.localName,
      Namespace: userDetails?.nameSpace,
      KeyId: userDetails?.keyId,
      KeyPassword: userDetails?.keyPassword,
      AccountPassword: userDetails?.password,
      LegalId: userDetails?.legalId,
      Attachment: data?.Data,
      FileName: data?.FileName,
      ContentType: data?.ContentType,
    };
    await dispatch(addIdAttachmentApi(addIdAttachmentPayload));
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

  const handleOnPress = async () => {
    console.log('clicked on peervreview',userDetails?.legalId)
    navigation.navigate('ReviewRequest');
   // await dispatch(getServiceProvidersForIdReviewApi(userDetails?.legalId))
    // stopInterval();
    // if (approveStatus.current) {
    //   navigation.navigate('CreatePin');
    // } else {
    // }
  };

  const handleCheckStatus = () => {
   stopInterval();
   navigation.navigate('AlmostThereStatus');
  };

  const toggleOverlay = () => {
    showPeerReviewButton.current = false;
    setShowOverlay(!showOverlay);
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

  const peerReviewAction = () => {};

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
            <View style={AlmostThereStyle(themeColors).imageView}>
              <Image
                style={[AlmostThereStyle(themeColors).image]}
                source={{ uri: `data:image/png;base64,${imageUri}` }}
                resizeMode="cover"
              />
            </View>

            <View style={AlmostThereStyle(themeColors).userInfo}>
              <TextLabel
                style={AlmostThereStyle(themeColors).name}
                variant={TextLabelVariants.HEADER}
              >
                {userFullName.current}
              </TextLabel>

              <TextLabel
                style={AlmostThereStyle(themeColors).mobile}
                variant={TextLabelVariants.DESCRIPTION}
              >
                {presonalNumber.current}
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
                showPeerReviewButton.current = true;
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
          />
        </View>
      </View>

      {showOverlay && (
        <InformationOverlay
          toggleOverlay={toggleOverlay}
          title={overlyTitle.current}
          description={overlyDetail.current}
          peerReview={peerReviewAction}
          showPeerReview={showPeerReviewButton.current}
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
