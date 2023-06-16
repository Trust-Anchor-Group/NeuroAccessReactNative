import { ActivityIndicator, View, TextStyle } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ContextType, chooseActionTypeData } from '@Services/Data';
import {
  ChooseNeuroAccessAppContext,
  ShowLabelsForAuth,
  ActionButton,
  NavigationHeader,
  NeuroAccessBackground,
} from '@Controls/index';
import { ChooseAccountTypeStyle } from '@Pages/Styles';
import { Logo } from '@Assets/Svgs';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
import { InformationOverlay } from '@Controls/InformationOverlay';

export const ChooseAccountType = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const { t } = useTranslation();
  const { themeColors } = useContext(ThemeContext);
  const style = ChooseAccountTypeStyle(themeColors);
  const [selected, setSelected] = useState<ContextType>();
  const [showOverlay, setShowOverlay] = React.useState(false);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  const onBackAction = () => {};

  const onLanguageClick = () => {
    navigation.navigate('Settings');
  };

  return (
    <NeuroAccessBackground>
      <View style={style.container}>
        <View style={style.containerSpace} />
        <View style={style.containerLogo}>
          <Logo
            textColor={themeColors.logoPrimary}
            logoColor={themeColors.logoSecondary}
          />
        </View>
        <View style={style.containerInput}>
          <ShowLabelsForAuth
            largeText={t('heading.welcome')}
            smallText={t('heading.chooseIntend')}
            inputLabel={t('choosePurposeScreen.label')}
          />

          <ChooseNeuroAccessAppContext
            data={chooseActionTypeData}
            onSelect={setSelected}
            toggleOverlay={toggleOverlay}
          />
        </View>

        <View style={style.buttonContainer}>
          <ActionButton
            disabled={!selected}
            textStyle={[
              style.sendText,
              !selected && { color: themeColors.button.disableText },
            ]}
            buttonStyle={
              !selected && { backgroundColor: themeColors.button.disableBg }
            }
            title={t('buttonLabel.continue')}
            onPress={async () => {
              selected && navigation.navigate('EnterEmail');
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
          title="For work"
          description={`${t('accessPurposeInformation.personalUse')}`}
        />
      )}
    </NeuroAccessBackground>
  );
};
