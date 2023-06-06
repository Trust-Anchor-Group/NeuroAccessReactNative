import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { NavigationHeaderStyle } from '@src/components/styles/NavigationHeaderStyle';
import { LanguageIcon } from '@src/assets/svg/LanguageIcon';
import { BackIcon } from '@src/assets/svg/BackIcon';
import { TextLabel } from './TextLabel';
import { TextLabelVariants } from '@src/utils/enums/TextLabelVariants';
import { useTranslation } from 'react-i18next';

interface Props {
  hideBackAction?: boolean;
  onBackAction?: () => void;
  onLanguageAction: () => void;
}
export const NavigationHeader: FC<Props> = ({
  hideBackAction,
  onBackAction,
  onLanguageAction,
}) => {
  const { t } = useTranslation();
  

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
          <BackIcon />
        </TouchableOpacity>
      )}

      <View style={NavigationHeaderStyle.middleContainer}></View>

      <TouchableOpacity
        style={NavigationHeaderStyle.languageContainer}
        onPress={() => {
          onLanguageAction();
        }}
      >
        <LanguageIcon />
        <TextLabel variant={TextLabelVariants.XSMALL} style={NavigationHeaderStyle.textMarginTop}>
          {t('language')}
        </TextLabel>
      </TouchableOpacity>
    </View>
  );
};
