import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { HeaderLayerStyle } from '@src/styles/HeaderLayerStyle';
import { LanguageIcon } from '@src/assets/svg/LanguageIcon';
import { BackIcon } from '@src/assets/svg/BackIcon';
import { TextLabel } from './TextLabel';

interface Props {
  hideBackAction?: boolean;
  onBackAction?: () => void;
  onLanguageAction: () => void;
}
export const HeaderLayer: FC<Props> = ({
  hideBackAction,
  onBackAction,
  onLanguageAction,
}) => {
  return (
    <View style={HeaderLayerStyle.container}>
      {hideBackAction ? (
        <View
          style={HeaderLayerStyle.emptyContainer}
        />
      ) : (
        <TouchableOpacity
          style={HeaderLayerStyle.backContainer}
          onPress={() => {
            onBackAction();
          }}
        >
          <BackIcon />
        </TouchableOpacity>
      )}

      <View style={HeaderLayerStyle.middleContainer}></View>

      <TouchableOpacity
        style={HeaderLayerStyle.languageContainer}
        onPress={() => {
          onLanguageAction();
        }}
      >
        <LanguageIcon />
        <TextLabel variant="xSmall" style={HeaderLayerStyle.textMarginTop}>
          English
        </TextLabel>
      </TouchableOpacity>
    </View>
  );
};
