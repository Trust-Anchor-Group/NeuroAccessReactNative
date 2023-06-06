import { View } from 'react-native';
import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ChooseNeuroAccessAppContext } from '@src/components/ChooseNeuroAccessAppContext';
import { ContextType, chooseActionTypeData } from '@src/services/Data';
import { ActionButton } from '@src/components/ActionButton';
import { NeuroAccessBackground } from '@src/components/NeuroAccessBackground';
import { ChooseAccountTypeStyle } from '@src/styles/ChooseAccountTypeStyle';
import { NavigationHeader } from '@src/components/NavigationHeader';
import { Colors } from '@src/theme/Colors';
import { Logo } from '@src/assets/svg/Logo';
import { ShowLabelsForAuth } from '@src/components/ShowLabelsForAuth';
import { useTranslation } from 'react-i18next';

export const ChooseAccountType = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const { t } = useTranslation();

  const [selected, setSelected] = useState<ContextType>();

  const onLanguageClick = () => {
    navigation.navigate('Settings');
  };

  return (
    <NeuroAccessBackground>
      <View style={ChooseAccountTypeStyle.container}>
        <View style={ChooseAccountTypeStyle.containerSpace} />
        <View style={ChooseAccountTypeStyle.containerLogo}>
          <Logo
            textColor={Colors.light.logoPrimary}
            logoColor={Colors.light.logoSecondary}
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
            onPress={() => navigation.navigate('EnterEmail')}
          />
        </View>
      </View>
      <NavigationHeader
        hideBackAction={true}
        onLanguageAction={onLanguageClick}
      />
    </NeuroAccessBackground>
  );
};
