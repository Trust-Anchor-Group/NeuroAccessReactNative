import { Alert, AppState, View } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { ContextType, chooseActionTypeData } from '@Services/Data';
import {
  ChooseNeuroAccessAppContext,
  ActionButton,
  NavigationHeader,
  NeuroAccessBackground,
  TextLabel,
  TextLabelVariants,
} from '@Controls/index';
import { GlobalStyle as styles, ChooseAccountTypeStyle } from '@Pages/Styles';
import { Logo } from '@Assets/Svgs';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
import { InformationOverlay } from '@Controls/InformationOverlay';
import { selectedPupose } from '@Services/Redux/Actions/GetUserDetails';
import { StackActions } from '@react-navigation/native';
import { isEmpty } from '@Helpers/Utility/Utils';

export const ChooseAccountType = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const { t } = useTranslation();
  const [appLoading, setAppLoading] = useState(true);
  const { userDetails } = useSelector((state) => state.user);
  const { identityResponse } = useSelector((state) => state.identity);
  const {
    defaultDomain,
  } = useSelector((state) => state.domain);  
  const { themeColors } = useContext(ThemeContext);
  const [selected, setSelected] = useState<ContextType>();
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [showServiceProviderInfo, setShowServiceProviderInfo] =
    useState<boolean>(false);
  const overlayInfo = useRef<ContextType>();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    if (appStateVisible === 'inactive') {
      if (selected) {
        dispatch(selectedPupose(selected));
      }
    }
  }, [appStateVisible]);

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    setAppLoading(false);

    setTimeout(() => {
      // navigation.dispatch(StackActions.replace('EnterUserName'));

      if (identityResponse?.Identity?.status) {
        navigation.dispatch(StackActions.replace('AlmostThere'));
      } else if (userDetails?.userName && userDetails?.emailVerified) {
        navigation.dispatch(StackActions.replace('TellUsAboutYou'));
      } else if (userDetails?.userName && !userDetails?.email) {
        navigation.dispatch(StackActions.replace('EnterUserName'));
      } else if (userDetails?.userName) {
        navigation.dispatch(StackActions.replace('EnterUserName'));
      } else if (!isEmpty(defaultDomain)) {
        navigation.dispatch(StackActions.replace('CurrentProvider'));
      } else if (userDetails?.purpose) {
        navigation.dispatch(StackActions.replace('EnterMobileNumber'));
      }
    }, 10);
  }, []);

  useEffect(() => {
    if (!selected && userDetails && userDetails['purpose']) {
      overlayInfo.current = userDetails['purpose'];
      setSelected(userDetails['purpose']);
    }
  }, []);

  const toggleOverlay = (item?: ContextType) => {
    overlayInfo.current = item;
    setShowOverlay(!showOverlay);
  };

  const onBackAction = () => {};

  const onLanguageClick = () => {
    navigation.navigate('Settings');
  };

  if (appLoading) {
    return <></>;
  }
  return (
    <NeuroAccessBackground>
      <View style={styles(themeColors).container}>
        <View style={styles(themeColors).spaceContainer} />
        <View style={styles(themeColors).logoContainer}>
          <Logo
            textColor={themeColors.logoPrimary}
            logoColor={themeColors.logoSecondary}
          />
        </View>
        <View style={styles(themeColors).informationContainer}>
          <TextLabel variant={TextLabelVariants.HEADER}>
            {t('heading.welcome')}
          </TextLabel>
          <TextLabel variant={TextLabelVariants.LABEL}>
            {t('heading.chooseIntend')}
          </TextLabel>
        </View>
        <View style={styles(themeColors).inputContainer}>
          <TextLabel
            style={ChooseAccountTypeStyle(themeColors).textLabel}
            variant={TextLabelVariants.INPUTLABEL}
          >
            {t('choosePurposeScreen.label')}
          </TextLabel>

          <ChooseNeuroAccessAppContext
            data={chooseActionTypeData}
            onSelect={setSelected}
            preSelected={selected}
            toggleOverlay={(type) => toggleOverlay(type)}
          />
        </View>

        <View style={styles(themeColors).buttonContainer}>
          <ActionButton
            disabled={!selected}
            textStyle={[
              ChooseAccountTypeStyle(themeColors).sendText,
              !selected && { color: themeColors.button.disableText },
            ]}
            buttonStyle={
              !selected && { backgroundColor: themeColors.button.disableBg }
            }
            title={t('buttonTitle.continue')}
            onPress={async () => {
              if (selected) {
                dispatch(selectedPupose(selected));
                navigation.dispatch(StackActions.replace('EnterMobileNumber'));
              }
            }}
          />
        </View>
      </View>
      <NavigationHeader
        hideBackAction={true}
        onBackAction={onBackAction}
        onLanguageAction={onLanguageClick}
      />
      {showOverlay && (
        <InformationOverlay
          toggleOverlay={toggleOverlay}
          title={t(`${overlayInfo?.current?.label}`)}
          description={t(`${overlayInfo?.current?.description}`)}
        />
      )}
    </NeuroAccessBackground>
  );
};
