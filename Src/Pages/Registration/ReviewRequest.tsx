import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Alert,
  FlatList,
  StyleSheet,
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
import {
  GlobalStyle as sstyles,
  AlmostThereStyle,
  CurrentProviderStyle,
} from '@Pages/Styles';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  ReviewServicePayload,
  getServiceProvidersForIdReviewApi,
  selectReviewServiceApi,
  authorizeAccessToIdApi,
  AuthorizeAccessToIdPayload,
  PetitionPeerReviewPayload,
  petitionPeerReviewApi,
} from '@Services/Redux/Actions/GetStatusForIdentity';
import { setIdentitySliceError } from '@Services/Redux/Reducers/IdentitySlice';
import { DefaultQrCode } from '@Assets/Svgs/DefaultQrCode';
import { QRCodeScanner } from '@Services/Scanner/QRCodeScanner';

interface ReviewItem {
  external: boolean;
  iconHeight: number;
  iconUrl: string;
  iconWidth: number;
  id: string;
  name: string;
  reviewerId: string;
  type: string;
}

export const ReviewRequest = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const { t } = useTranslation();
  const { themeColors } = useContext(ThemeContext);
  const [providers, setProviders] = useState<ReviewItem[]>([]);
  const [showScanner, setShowScanner] = useState<boolean>(false);
  const PRemoteId = useRef('');
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { userDetails } = useSelector((state) => state.user);
  const {
    getServiceProvidersForIdReviewResponse,
    selectReviewServiceResponse,
    authorizeAccessToIdResponse,
    petitionPeerReviewResponse,
    loading,
    error,
  } = useSelector((state) => state.identity);

  useEffect(() => {
    if (error) {
      Alert.alert(t('Error.ErrorTitle'), JSON.stringify(error), [
        {
          text: 'ok',
          onPress: () => {
            dispatch(setIdentitySliceError(''));
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
    // providerForIdReview();
  }, []);

  const providerForIdReview = async () => {
    await dispatch(getServiceProvidersForIdReviewApi(userDetails?.legalId));
  };
  useEffect(() => {
    const forIdReviewHandler =
      Object.entries(getServiceProvidersForIdReviewResponse).length !== 0;
    if (forIdReviewHandler) {
      const providersList = getServiceProvidersForIdReviewResponse?.Providers;

      setProviders([
        ...providersList,
        {
          external: '',
          iconHeight: '',
          iconUrl: '',
          iconWidth: '',
          id: '',
          name: 'Request another user to review your application',
          reviewerId: '',
          type: 'default',
        },
      ]);
      console.log('for id review list', getServiceProvidersForIdReviewResponse);
    }
  }, [getServiceProvidersForIdReviewResponse]);

  useEffect(() => {
    if (selectReviewServiceResponse !== null) {
      console.log(
        'for selectReviewServiceResponse review list',
        selectReviewServiceResponse
      );
    }
  }, [selectReviewServiceResponse]);

  useEffect(() => {
    if (authorizeAccessToIdResponse !== null) {
      console.log(
        'for authorizeAccessToIdResponse review list',
        authorizeAccessToIdResponse
      );
      authorizeAccessToIdCall();
    }
  }, [authorizeAccessToIdResponse]);

  useEffect(() => {
    if (petitionPeerReviewResponse !== null) {
      console.log(
        'for petitionPeerReviewResponse review list',
        petitionPeerReviewResponse
      );
    }
  }, [petitionPeerReviewResponse]);

  const authorizeAccessToIdCall = async () => {
    const payload: AuthorizeAccessToIdPayload = {
      legalId: userDetails?.legalId,
      remoteId: PRemoteId.current,
      authorized: true,
    };
    await dispatch(authorizeAccessToIdApi(payload));
  };

  const toggleScannerOverlay = () => {
    setShowScanner(!showScanner);
  };

  const handleQRCodeSelection = async (domainInfo: any) => {
    console.log('print scanner result', domainInfo);
    console.log('print scanner result', domainInfo[0].cornerPoints);
  };

  const selectReviewServiceCall = async (
    serviceID: string,
    serviceProviderVal: string
  ) => {
    const payload: ReviewServicePayload = {
      serviceId: serviceID,
      serviceProvider: serviceProviderVal,
    };
    await dispatch(selectReviewServiceApi(payload));
  };

  const petitionPeerReviewCall = async () => {
    const payload: PetitionPeerReviewPayload = {
      UserName: userDetails?.userName,
      LocalName: userDetails?.legalId,
      Namespace: userDetails?.legalId,
      KeyId: userDetails?.keyId,
      KeyPassword: userDetails?.keyPassword,
      AccountPassword: userDetails?.password,
      LegalId: userDetails?.legalId,
      RemoteId: PRemoteId.current,
      PetitionId: '',
      Purpose: ''
    };
    await dispatch(petitionPeerReviewApi(payload));
  };

  

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item?.type === 'default') {
            toggleScannerOverlay();
          } else {
            if (!item?.external) {
              PRemoteId.current = item?.type;
             // selectReviewServiceCall(item?.id, item?.type);
            }
            // console.log('print selected item value ', item);
          }
        }}
      >
        <View style={[styles.itemContainer]}>
          {item?.type === 'default' ? (
            <DefaultQrCode />
          ) : (
            <Image source={{ uri: item.iconUrl }} style={styles.image} />
          )}
          <TextLabel variant={TextLabelVariants.INPUTLABEL} style={styles.text}>
            {item.name}
          </TextLabel>
          {/* You can add additional UI elements for each item here */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <NeuroAccessBackground>
      <View style={sstyles(themeColors).container}>
        <View style={sstyles(themeColors).spaceContainer} />

        <TextLabel
          style={AlmostThereStyle(themeColors).headerTxt}
          variant={TextLabelVariants.HEADER}
        >
          {'Request review'}
        </TextLabel>

        <FlatList
          data={providers}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <NavigationHeader
        hideBackAction={false}
        onBackAction={onBackClick}
        onLanguageAction={onLanguageClick}
      />

      {showScanner && (
        <View style={CurrentProviderStyle(themeColors).qrCodeScannerContainer}>
          <QRCodeScanner
            scannerType="reviewRequest"
            peerResult={handleQRCodeSelection}
            toggleOverlay={toggleScannerOverlay}
          />
        </View>
      )}
    </NeuroAccessBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between', // You can adjust this as needed
  },
  itemContainer: {
    alignSelf: 'center',
    width: '90%',
    flexDirection: 'row',
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  text: {
    padding: 10,
    flexWrap: 'wrap',
    fontSize: 16,
    width: '70%',
  },
  contentContainer: {
    alignItems: 'flex-start', // Align items to the left
  },
});
