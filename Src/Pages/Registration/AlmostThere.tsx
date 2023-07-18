import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Image,
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
  GlobalStyle as styles,
  AlmostThereStyle,
} from '@Pages/Styles';

export const AlmostThere = () => {
  const { t } = useTranslation();
  const { themeColors } = useContext(ThemeContext);

  const onBackClick = () => {
    // navigation.goBack();
  };

  const onLanguageClick = () => {
    // navigation.navigate('Settings');
  };

  return (
    <NeuroAccessBackground>
      <View style={styles(themeColors).container}>
        <View style={styles(themeColors).spaceContainer} />

        <TextLabel
          style={AlmostThereStyle(themeColors).headerTxt}
          variant={TextLabelVariants.HEADER}
        >
          {'Almost there!'}
        </TextLabel>

        <View
          style={[
            AlmostThereStyle(themeColors).informationContainer,
            AlmostThereStyle(themeColors).shadowProp,
          ]}
        >
          <View style={AlmostThereStyle(themeColors).imageContainer}>
            <Image
              style={[
                AlmostThereStyle(themeColors).image,
                { borderColor: '#181F25' },
              ]}
              // source={{uri: `data:image/png;base64,${encodedBase64}`}}
            />

            <View style={AlmostThereStyle(themeColors).userInfo}>
              <TextLabel
                style={AlmostThereStyle(themeColors).name}
                variant={TextLabelVariants.HEADER}
              >
                {'hello'}
              </TextLabel>

              <TextLabel
                style={AlmostThereStyle(themeColors).mobile}
                variant={TextLabelVariants.DESCRIPTION}
              >
                {'description'}
              </TextLabel>
            </View>
          </View>

          <View style={AlmostThereStyle(themeColors).detailContainer}>
            <View style={AlmostThereStyle(themeColors).pendingContainer}></View>
            <TextLabel
              style={AlmostThereStyle(themeColors).pendingReviewTxt}
              variant={TextLabelVariants.LABEL}
            >
              {'Pending review'}
            </TextLabel>
          </View>

          <TextLabel
            style={AlmostThereStyle(themeColors).remainingPeerTxt}
            variant={TextLabelVariants.DESCRIPTION}
          >
            {'Remaining peer reviews:'}
          </TextLabel>

          <TextLabel
            style={AlmostThereStyle(themeColors).descriptionTxt}
            variant={TextLabelVariants.DESCRIPTION}
          >
            {
              'You can track the progress of your application below and see who has reviewed your information.'
            }
          </TextLabel>

          <TouchableOpacity style={AlmostThereStyle(themeColors).checkStatus}>
            <TextLabel
              style={AlmostThereStyle(themeColors).checkStatusTxt}
              variant={TextLabelVariants.INPUTLABEL}
            >
              {'Check Status'}
            </TextLabel>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={AlmostThereStyle(themeColors).providerInfo}
          //onPress={toggleOverlay}
        >
          <ShowError
            errorMessage={'Review process'}
            styles={AlmostThereStyle(themeColors).infoText}
            colorCode={themeColors.currentProvider.titleUnSelected}
            changeColor={true}
          />
        </TouchableOpacity>
        <View style={AlmostThereStyle(themeColors).bottomContainer}>
          <TouchableOpacity
            style={AlmostThereStyle(themeColors).providerInfo}
            //onPress={toggleOverlay}
          >
            <ShowError
              errorMessage={'Peer review process'}
              styles={AlmostThereStyle(themeColors).infoText}
              colorCode={themeColors.currentProvider.titleUnSelected}
              changeColor={true}
            />
          </TouchableOpacity>
          <View style={AlmostThereStyle(themeColors).spacer} />
          <ActionButtonWithIcon
            title={'Invite peer'}
            buttonStyle={AlmostThereStyle(themeColors).actionButton}
            textStyle={AlmostThereStyle(themeColors).sendText}
            //onPress={}
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
