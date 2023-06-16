import { View } from 'react-native';
import React, { useContext, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ContextType, chooseActionTypeData } from '@Services/Data';
import {
  ChooseNeuroAccessAppContext,
  ActionButton,
  NavigationHeader,
  NeuroAccessBackground,
  TextLabel,
  TextLabelVariants,
} from '@Controls/index';
import { GlobalStyle as styles } from '@Pages/Styles';
import { ChooseAccountTypeStyle } from '@Pages/Styles';
import { Logo } from '@Assets/Svgs';
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
            label="Select Item"
            data={chooseActionTypeData}
            onSelect={setSelected}
          />
        </View>

        <View style={styles(themeColors).buttonContainer}>
          <ActionButton
            textStyle={[
              ChooseAccountTypeStyle(themeColors).sendText,
              !selected && { color: themeColors.button.disableText },
            ]}
            buttonStyle={
              !selected && { backgroundColor: themeColors.button.disableBg }
            }
            title={t('buttonLabel.continue')}
            onPress={async () => {
              //  navigation.navigate('EnterEmail');
              navigation.navigate('EmailOTPVerify');
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
