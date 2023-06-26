import React, { useState, useContext } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
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

export const EnterUserName = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const { t } = useTranslation();
  const { userDetails, loading, error } = useSelector((state) => state.user);
  const { themeColors } = useContext(ThemeContext);
  const userNameInputRef = React.useRef<TextInputRef>(null);
  const [userName, setUserName] = useState(userDetails?.userName || '');
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const onBackClick = () => {
    navigation.goBack();
  };

  const onLanguageClick = () => {
    navigation.navigate('Settings');
  };

  const handleSubmit = async () => {
    try {
      dispatch(addUserName(userName));
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
              {t('enterMobileScreen.message')}
            </TextLabel>
          </View>

          <View style={styles(themeColors).inputContainer}>
            <TextLabel
              style={EnterMobileNumberStyle(themeColors).inputLabel}
              variant={TextLabelVariants.INPUTLABEL}
            >
              {t('enterMobileScreen.label')}
            </TextLabel>
            <InputBox
              keyboardType="default"
              ref={userNameInputRef}
              value={userName}
              onChangeText={(val) => {
                setUserName(val);
              }}
              actionType="done"
              onFocusColor={themeColors.inputBox.inputFocus}
              placeholder={t('enterUserName.placeHolder')}
              autoFocus={false}
              autoCapitalize="none"
              onAction={() => {
                handleSubmit;
              }}
            />
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
          onBackAction={onBackClick}
          onLanguageAction={onLanguageClick}
        />
      </NeuroAccessBackground>
    </KeyboardAvoidingView>
  );
};
