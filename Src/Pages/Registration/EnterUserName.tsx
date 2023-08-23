import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
  AppState,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { GlobalStyle as styles, EnterMobileNumberStyle } from '@Pages/Styles';
import { StackScreenProps } from '@react-navigation/stack';
import { Logo } from '@Assets/Svgs';
import {
  NeuroAccessBackground,
  NavigationHeader,
  ActionButton,
  TextLabelVariants,
  TextLabel,
} from '@Controls/index';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
import InputBox, { TextInputRef } from '@Controls/InputBox';
import { addUserName } from '@Services/Redux/Actions/GetUserDetails';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '@Helpers/Utility/Utils';
import { clearAlternatives } from '@Services/Redux/Reducers/UserSlice';
import { AlternateUserNameList } from '@Controls/AlternateUserNameList';

export const EnterUserName = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const { t } = useTranslation();
  const { userDetails, loading, error } = useSelector((state) => state.user);
  const { themeColors } = useContext(ThemeContext);
  const userNameInputRef = React.useRef<TextInputRef>(null);
  const [userName, setUserName] = useState('');
  const [alternatives, setAlternatives] = useState();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    if (appStateVisible === 'inactive') {
      userName !== '' && dispatch(addUserName(userName));
    }
  }, [appStateVisible]);

  useEffect(() => {
    if (!isEmpty(userDetails?.alternatives)) {
      setAlternatives(userDetails?.alternatives);
    }
  }, [userDetails?.alternatives]);

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const onBackClick = () => {
    navigation.goBack();
  };

  const onLanguageClick = () => {
    navigation.navigate('Settings');
  };

  const handleSubmit = async () => {
    try {
      await dispatch(clearAlternatives(''));
      await dispatch(addUserName(userName));
      navigation.navigate('EnterEmail');
    } catch (error) {}
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles(themeColors).container}
    >
      <NeuroAccessBackground>
        <ScrollView
          style={styles(themeColors).container}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-around',
          }}
        >
          <View style={styles(themeColors).spaceContainer} />
          <View style={styles(themeColors).logoContainer}>
            <Logo
              textColor={themeColors.logoPrimary}
              logoColor={themeColors.logoSecondary}
            />
          </View>

          <View style={styles(themeColors).informationContainer}>
            <TextLabel variant={TextLabelVariants.HEADER}>
              {t('heading.getStarted')}
            </TextLabel>
            <TextLabel variant={TextLabelVariants.LABEL}>
              {t('enterUserNameScreen.message')}
            </TextLabel>
          </View>

          <View style={styles(themeColors).inputContainer}>
            <TextLabel
              style={EnterMobileNumberStyle(themeColors).inputLabel}
              variant={TextLabelVariants.INPUTLABEL}
            >
              {t('enterUserNameScreen.label')}
            </TextLabel>
            <InputBox
              keyboardType="default"
              ref={userNameInputRef}
              value={userName === '' ? userDetails?.userName : userName}
              onChangeText={(val) => {
                setUserName(val);
              }}
              actionType="done"
              onFocusColor={themeColors.inputBox.inputFocus}
              placeholder={t('enterUserName.placeHolder')}
              autoFocus={false}
              autoCapitalize="none"
              onAction={handleSubmit}
            />
            {alternatives && alternatives?.length ? (
              <AlternateUserNameList
                data={alternatives}
                onPress={(selectedValue: string) => {
                  setUserName(selectedValue);
                }}
              />
            ) : (
              <></>
            )}
          </View>

          <View style={styles(themeColors).buttonContainer}>
            <ActionButton
              textStyle={EnterMobileNumberStyle(themeColors).sendText}
              title={t('buttonTitle.continue')}
              onPress={() => {
                Keyboard.dismiss();
                handleSubmit();
              }}
            />
          </View>
        </ScrollView>

        <NavigationHeader
          hideBackAction={true}
          onBackAction={onBackClick}
          onLanguageAction={onLanguageClick}
        />
      </NeuroAccessBackground>
    </KeyboardAvoidingView>
  );
};