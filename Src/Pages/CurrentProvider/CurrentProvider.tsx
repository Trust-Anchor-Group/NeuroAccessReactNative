import React, { useContext, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {
  NeuroAccessBackground,
  NavigationHeader,
  TextLabel,
  TextLabelVariants,
  ActionButton,
  ShowError,
} from '@Controls/index';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
import { Logo } from '@Assets/Svgs';
import { GlobalStyle as styles, CurrentProviderStyle } from '@Pages/Styles';
import { CreateAccountIcon, ChangeProviderIcon } from '@Assets/Svgs';

interface SelectionProp {
  isCreateAccountSelected: boolean;
  isChangeProviderSelected: boolean;
}
export const CurrentProvider = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const { t } = useTranslation();
  const { themeColors } = useContext(ThemeContext);
  const [selected, setSelected] = useState<SelectionProp>();

  const onBackClick = () => {
    navigation.goBack();
  };

  const onLanguageClick = () => {
    navigation.navigate('Settings');
  };

  const handleSubmit = () => {};

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
          <TextLabel
            variant={TextLabelVariants.HEADER}
            style={CurrentProviderStyle(themeColors).headerText}
          >
            {t('currentProvider.title')}
          </TextLabel>
          <TextLabel
            style={CurrentProviderStyle(themeColors).linkText}
            variant={TextLabelVariants.LABEL}
          >
            {t('currentProvider.providerLink')}
          </TextLabel>
        </View>

        <View style={styles(themeColors).inputContainer}>
          <TextLabel
            style={CurrentProviderStyle(themeColors).detailText}
            variant={TextLabelVariants.LABEL}
          >
            {t('currentProvider.detail')}{' '}
            <TextLabel
              variant={TextLabelVariants.LABEL}
              style={CurrentProviderStyle(themeColors).linkTextDetail}
            >
              {t('currentProvider.providerLink') + '.'}
            </TextLabel>{' '}
            {t('currentProvider.continueDetail')}
          </TextLabel>

          <TextLabel
            variant={TextLabelVariants.INPUTLABEL}
            style={{ marginTop: 18 }}
          >
            {t('currentProvider.optionTitle')}
          </TextLabel>

          <View style={CurrentProviderStyle(themeColors).selectionView}>
            <TouchableOpacity
              style={touchableView(selected?.isCreateAccountSelected)}
              onPress={() => {
                setSelected({ isCreateAccountSelected: true, isChangeProviderSelected: false });
              }}
            >
              <CreateAccountIcon
                iconColor={iconStyle(selected?.isCreateAccountSelected)}
              />

              <TextLabel
                style={titleStyle(selected?.isCreateAccountSelected)}
                variant={TextLabelVariants.LABEL}
              >
                {t('currentProvider.createAccount')}
              </TextLabel>
            </TouchableOpacity>

            <TouchableOpacity
              style={touchableView(selected?.isChangeProviderSelected)}
              onPress={() => {
                setSelected({ isCreateAccountSelected: false, isChangeProviderSelected: true });
              }}
            >
              <ChangeProviderIcon
                iconColor={iconStyle(selected?.isChangeProviderSelected)}
              />

              <TextLabel
                style={titleStyle(selected?.isChangeProviderSelected)}
                variant={TextLabelVariants.LABEL}
              >
                {t('currentProvider.changeService')}
              </TextLabel>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={CurrentProviderStyle(themeColors).providerInfo}
            onPress={() => {}}
          >
            <ShowError
              errorMessage={t('currentProvider.serviceProvider')}
              styles={CurrentProviderStyle(themeColors).infoText}
              colorCode={themeColors.currentProvider.titleUnSelected}
              changeColor={true}
            />
          </TouchableOpacity>
        </View>

        <View style={styles(themeColors).buttonContainer}>
          <ActionButton
            disabled={!selected}
            textStyle={[
              CurrentProviderStyle(themeColors).sendText,
              !selected && { color: themeColors.button.disableText },
            ]}
            buttonStyle={
              !selected && {
                backgroundColor: themeColors.button.disableBg,
              }
            }
            title={t('buttonTitle.continue')}
            onPress={selected && handleSubmit}
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
