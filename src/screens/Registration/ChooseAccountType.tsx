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

export const ChooseAccountType = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const [selected, setSelected] = useState<ContextType>();

  const onLanguageClick = () => {
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
            largeText="Welcome to Neuro-Access"
            smallText="Choose In what context you intend to use the Neuro-Access"
            inputLabel="Choose access purpose"
          />

          <ChooseNeuroAccessAppContext
            label="Select Item"
            data={chooseActionTypeData}
            onSelect={setSelected}
          />
        </View>

        <View
            style={ChooseAccountTypeStyle.buttonContainer}
          >
            <ActionButton
              title="Continue"
              onPress={() => navigation.navigate('EnterEmail')}
            />
          </View>
      </View>
      <NavigationHeader hideBackAction={true} onLanguageAction={onLanguageClick} />
    </NeuroAccessBackground>
  );
};
