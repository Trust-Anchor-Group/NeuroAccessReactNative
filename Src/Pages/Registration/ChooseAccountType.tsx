import { ActivityIndicator, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ContextType, chooseActionTypeData } from 'Services/Data/Data';
import { ChooseNeuroAccessAppContext } from '@Controls/ChooseNeuroAccessAppContext';
import { ActionButton } from '@Controls/ActionButton';
import { NavigationHeader } from '@Controls/NavigationHeader';
import { NeuroAccessBackground } from '@Controls/NeuroAccessBackground';
import { ShowLabelsForAuth } from '@Controls/ShowLabelsForAuth';
import { ChooseAccountTypeStyle } from '@Pages/Styles/ChooseAccountTypeStyle';
import { Logo } from '@Assets/Svgs/Logo';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@Theme/Provider/ThemeContext';

export const ChooseAccountType = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const { t } = useTranslation();
  const { themeColors } = useContext(ThemeContext);
  const [selected, setSelected] = useState<ContextType>();

  const onBackAction = () => {};

  const onLanguageClick = () => {
    navigation.navigate('Settings');
  };

  return (
    <NeuroAccessBackground>
      <View style={ChooseAccountTypeStyle.container}>
        <View style={ChooseAccountTypeStyle.containerSpace} />
        <View style={ChooseAccountTypeStyle.containerLogo}>
          <Logo
            textColor={themeColors.logoPrimary}
            logoColor={themeColors.logoSecondary}
          />
        </View>
        <View style={ChooseAccountTypeStyle.containerInput}>
          <ShowLabelsForAuth
            largeText={t('heading.welcome')}
            smallText={t('heading.chooseIntend')}
            inputLabel={t('choosePurposeScreen.label')}
          />

          <ChooseNeuroAccessAppContext
            label="Select Item"
            data={chooseActionTypeData}
            onSelect={setSelected}
          />
        </View>

        <View style={ChooseAccountTypeStyle.buttonContainer}>
          <ActionButton
            title={t('buttonLabel.continue')}
            onPress={async () => {
              navigation.navigate('EnterEmail')
            }}
          />
        </View>
      </View>
      <NavigationHeader
        hideBackAction={true}
        onBackAction={onBackAction}
        onLanguageAction={onLanguageClick}
      />
      </NeuroAccessBackground>
  );
};