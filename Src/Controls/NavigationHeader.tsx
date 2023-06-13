import React, { FC, useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { NavigationHeaderStyle } from '@Controls/Styles/NavigationHeaderStyle';
import { LanguageIcon } from '@Assets/Svgs/LanguageIcon';
import { BackIcon } from '@Assets/Svgs/BackIcon';
import { TextLabel } from './TextLabel';
import { TextLabelVariants } from 'Helpers/Enums/TextLabelVariants';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@Theme/Provider/ThemeContext';

interface Props {
  hideBackAction?: boolean;
  onBackAction: () => void;
  onLanguageAction: () => void;
}
export const NavigationHeader: FC<Props> = ({
  hideBackAction,
  onBackAction,
  onLanguageAction,
}) => {
  const { t } = useTranslation();
  const {themeColors} = useContext(ThemeContext);

  return (
    <View style={NavigationHeaderStyle.container}>
      {hideBackAction ? (
        <View
          style={NavigationHeaderStyle.emptyContainer}
        />
      ) : (
        <TouchableOpacity
          style={NavigationHeaderStyle.backContainer}
          onPress={() => {
            onBackAction();
          }}
        >
          <BackIcon iconColor={themeColors.icons.back}/>
        </TouchableOpacity>
      )}

      <View style={NavigationHeaderStyle.middleContainer}></View>

      <TouchableOpacity
        style={NavigationHeaderStyle.languageContainer}
        onPress={() => {
          onLanguageAction();
        }}
      >
        <LanguageIcon iconColor={themeColors.icons.language}/>
        <TextLabel variant={TextLabelVariants.XSMALL} style={NavigationHeaderStyle.textMarginTop}>
          {t('language')}
        </TextLabel>
      </TouchableOpacity>
    </View>
  );
};
