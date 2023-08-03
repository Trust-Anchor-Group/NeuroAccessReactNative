import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {
  NeuroAccessBackground,
  NavigationHeader,
  TextLabel,
  TextLabelVariants,
  ActionButton,
  ShowError,
  Loader,
} from '@Controls/index';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
import {
  Logo,
  CreateAccountIcon,
  ChangeProviderIcon,
  InformationIcon,
} from '@Assets/Svgs';
import { GlobalStyle as styles, CurrentProviderStyle } from '@Pages/Styles';
import { InformationOverlay } from '@Controls/InformationOverlay';
import { QRCodeScanner } from '@Services/Scanner/QRCodeScanner';
import { AgentAPI } from '@Services/API/Agent';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import {
  getDomainDetails,
  setSelectedDomain,
} from '@Services/Redux/Actions/GetDomainDetails';
import {
  DomainInfo,
  setDomainSliceError,
} from '@Services/Redux/Reducers/DomainSlice';
import { moderateScale } from '@Theme/Metrics';
import Config from 'react-native-config';
import { StackActions } from '@react-navigation/native';
import { setUserSliceError } from '@Services/Redux/Reducers/UserSlice';

interface ProviderDetails {
  domain: string;
  useEncryption: boolean;
  humanReadableName: string;
  humanReadableDescription: string;
}
export const CurrentProvider = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {
    defaultDomain,
    selectedDomain,
    loading: domainInfoLoading,
    error: domainInfoError,
  } = useSelector((state) => state.domain);
  const { themeColors } = useContext(ThemeContext);
  const currentProviderStyle = CurrentProviderStyle(themeColors);
  const [loading, setLoading] = useState(false);
  const [isCreateAccountSelected, setCreateAccountSelected] =
    useState<boolean>(false);
  const [showServiceProviderInfo, setShowServiceProviderInfo] =
    useState<boolean>(false);
  const [showDomainInfo, setShowDomainInfo] = useState<boolean>(false);
  const [showScanner, setShowScanner] = useState<boolean>(false);
  const [selectedProvider, setSelectedProvider] = useState<DomainInfo>();

  useEffect(() => {
    if (domainInfoError) {
      Alert.alert(t('Error.ErrorTitle'), JSON.stringify(domainInfoError), [
        {
          text: 'ok',
          onPress: () => {
            dispatch(setDomainSliceError(''));
          },
        },
      ]);
    }
  }, [domainInfoError]);

  React.useEffect(() => {
    if (!defaultDomain?.humanReadableName) {
      const getDomainInfo = async () => {
        await dispatch(getDomainDetails('lab.tagroot.io'));
      };
      getDomainInfo()
    }
    if (!selectedDomain?.Domain) {
      dispatch(setSelectedDomain(defaultDomain));
    }
  }, [defaultDomain]);

  const onBackClick = () => {
    navigation.goBack();
  };

  const onLanguageClick = () => {
    navigation.navigate('Settings');
  };

  const toggleOverlay = () => {
    setShowServiceProviderInfo(!showServiceProviderInfo);
  };

  const toggleDomainInfoOverlay = () => {
    setShowDomainInfo(!showDomainInfo);
  };

  const toggleScannerOverlay = () => {
    setShowScanner(!showScanner);
  };

  const handleSubmit = () => {
    if (selectedDomain && isCreateAccountSelected) {
      Config.AGENT_API_URL = 'https://' + selectedDomain.Domain;
      Config.Host = selectedDomain.Domain;
      Config.ApiKey = selectedDomain.Key;
      Config.Secret = selectedDomain.Secret;
      navigation.dispatch(StackActions.replace('EnterUserName'));
    }
  };

  const touchableView = (selectedValue: any) => {
    if (selectedValue === undefined)
      return CurrentProviderStyle(themeColors).createAccountDefault;
    else
      return [
        CurrentProviderStyle(themeColors).createAccountDefault,
        {
          backgroundColor: selectedValue
            ? themeColors.currentProvider.selectedBgColor
            : themeColors.currentProvider.unSelectedBgColor,
          borderColor: selectedValue
            ? themeColors.currentProvider.borderColor
            : themeColors.currentProvider.unSelectedBorder,
        },
      ];
  };

  const titleStyle = (selectedValue: any) => {
    if (selectedValue === undefined)
      return CurrentProviderStyle(themeColors).createAccountTitle;
    else
      return [
        CurrentProviderStyle(themeColors).createAccountTitle,
        {
          color: selectedValue
            ? themeColors.currentProvider.titleSelected
            : themeColors.currentProvider.titleUnSelected,
        },
      ];
  };

  const iconStyle = (selectedValue: any) => {
    if (selectedValue === undefined)
      return themeColors.currentProvider.titleColor;
    else
      return selectedValue
        ? themeColors.currentProvider.titleSelected
        : themeColors.currentProvider.titleUnSelected;
  };

  const handleQRCodeSelection = async (domainInfo: DomainInfo) => {
    if (domainInfo.Domain) {
      try {
        setLoading(true);
        const response = await AgentAPI.Account.GetDomainInfo(
          domainInfo.Domain
        );
        setLoading(false);
        domainInfo.humanReadableDescription =
          response['humanReadableDescription'];
        domainInfo.humanReadableName = response['humanReadableName'];
        domainInfo.useEncryption = response['useEncryption'];
        setSelectedProvider(domainInfo);
        dispatch(setSelectedDomain(domainInfo));
      } catch (error) {
        console.log('Error ----> ', error);
      }
    }
  };

  const serviceProviderDetails = () => {
    return (
      <View
        style={
          CurrentProviderStyle(themeColors).serviceProviderDetailsContainer
        }
      >
        <TextLabel
          style={CurrentProviderStyle(themeColors).detailText}
          variant={TextLabelVariants.LABEL}
        >
          {selectedProvider
            ? selectedProvider && selectedProvider.humanReadableDescription
            : defaultDomain && defaultDomain?.humanReadableDescription}
          {'\n\n'}
          <TextLabel
            style={CurrentProviderStyle(themeColors).detailText}
            variant={TextLabelVariants.LABEL}
          >
            {t('currentProvider.continueDetail')}
          </TextLabel>
        </TextLabel>
      </View>
    );
  };

  const userSelection = () => {
    return (
      <View style={[styles(themeColors).inputContainer]}>
        <TextLabel variant={TextLabelVariants.INPUTLABEL}>
          {t('currentProvider.optionTitle')}
        </TextLabel>

        <View style={CurrentProviderStyle(themeColors).selectionView}>
          <TouchableOpacity
            style={touchableView(isCreateAccountSelected)}
            onPress={() => {
              setCreateAccountSelected(!isCreateAccountSelected);
            }}
          >
            <CreateAccountIcon iconColor={iconStyle(isCreateAccountSelected)} />

            <TextLabel
              style={titleStyle(isCreateAccountSelected)}
              variant={TextLabelVariants.LABEL}
            >
              {t('currentProvider.createAccount')}
            </TextLabel>
          </TouchableOpacity>

          <TouchableOpacity
            style={touchableView(false)}
            onPress={() => {
              toggleScannerOverlay();
            }}
          >
            <ChangeProviderIcon iconColor={iconStyle(false)} />

            <TextLabel
              style={titleStyle(false)}
              variant={TextLabelVariants.LABEL}
            >
              {t('currentProvider.changeService')}
            </TextLabel>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={CurrentProviderStyle(themeColors).providerInfo}
          onPress={() => {}}
          onPress={toggleOverlay}
        >
          <ShowError
            errorMessage={t('currentProvider.serviceProvider')}
            styles={CurrentProviderStyle(themeColors).infoText}
            colorCode={themeColors.currentProvider.titleUnSelected}
            changeColor={true}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const overLayViews = () => {
    return (
      <>
        {showDomainInfo && (
          <InformationOverlay
            toggleOverlay={toggleDomainInfoOverlay}
            title={t(`serviceProviderInformation.title`)}
            description={t(`serviceProviderInformation.description`)}
          />
        )}
        {showServiceProviderInfo && (
          <InformationOverlay
            toggleOverlay={toggleOverlay}
            title={t(`serviceProviderInformation.title`)}
            description={t(`serviceProviderInformation.description`)}
          />
        )}
        {showScanner && (
          <View style={currentProviderStyle.qrCodeScannerContainer}>
            <QRCodeScanner
              scannerType='currentProvider'
              toggleOverlay={toggleScannerOverlay}
              onSelect={handleQRCodeSelection}
            />
          </View>
        )}
      </>
    );
  };

  return (
    <NeuroAccessBackground>
      <NavigationHeader
        hideBackAction={true}
        onBackAction={onBackClick}
        onLanguageAction={onLanguageClick}
      />
      <View style={styles(themeColors).container}>
        <View style={styles(themeColors).spaceContainer} />
        <View style={styles(themeColors).logoContainer}>
          <Logo
            textColor={themeColors.logoPrimary}
            logoColor={themeColors.logoSecondary}
          />
        </View>

        <View style={styles(themeColors).informationContainer}>
          <TextLabel
            variant={TextLabelVariants.HEADER}
            style={CurrentProviderStyle(themeColors).headerText}
          >
            {t('currentProvider.title')}
          </TextLabel>
          <View
            style={CurrentProviderStyle(themeColors).domainDetailsContainer}
          >
            <TextLabel
              style={CurrentProviderStyle(themeColors).linkText}
              variant={TextLabelVariants.LABEL}
            >
              {selectedProvider
                ? selectedProvider && selectedProvider.humanReadableName
                : defaultDomain && defaultDomain.humanReadableName}
            </TextLabel>
            <InformationIcon
              style={CurrentProviderStyle(themeColors).infoIconMargin}
              textColor={themeColors.currentProvider.link}
              onPress={toggleDomainInfoOverlay}
            />
          </View>
          <TextLabel
            variant={TextLabelVariants.LABEL}
            style={CurrentProviderStyle(themeColors).headerText}
          >
            {'Domain:'}
          </TextLabel>
          <TextLabel
            variant={TextLabelVariants.LABEL}
            style={CurrentProviderStyle(themeColors).linkTextDetail}
          >
            {selectedProvider
              ? selectedProvider && selectedProvider.Domain
              : defaultDomain && defaultDomain.Domain}
          </TextLabel>
        </View>
        <ScrollView>
          {serviceProviderDetails()}
          {userSelection()}
        </ScrollView>
        <View
          style={[
            styles(themeColors).buttonContainer,
            { justifyContent: 'space-between' },
          ]}
        >
          {selectedProvider &&
            defaultDomain?.Domain !== selectedProvider?.Domain && (
              <ActionButton
                textStyle={[
                  CurrentProviderStyle(themeColors).linkText,
                  { fontSize: moderateScale(14) },
                ]}
                buttonStyle={{ backgroundColor: themeColors.button.linkText }}
                title={t('Undo Selection')}
                onPress={() => setSelectedProvider(defaultDomain)}
              />
            )}
          <ActionButton
            disabled={!isCreateAccountSelected}
            textStyle={[
              CurrentProviderStyle(themeColors).sendText,
              !isCreateAccountSelected && {
                color: themeColors.button.disableText,
              },
            ]}
            buttonStyle={
              !isCreateAccountSelected && {
                backgroundColor: themeColors.button.disableBg,
              }
            }
            title={t('buttonTitle.continue')}
            onPress={isCreateAccountSelected && handleSubmit}
          />
        </View>
      </View>
      {overLayViews()}
      <Loader loading={loading || domainInfoLoading} />
    </NeuroAccessBackground>
  );
};
