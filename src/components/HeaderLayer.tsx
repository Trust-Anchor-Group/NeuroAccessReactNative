import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { HeaderLayerStyle } from '@src/styles/HeaderLayerStyle';
import { LanguageIcon } from '@src/assets/svg/LanguageIcon';
import { BackIcon } from '@src/assets/svg/BackIcon';
import { headerSize } from '@src/theme/Dimensions';
import { TextLabel } from './TextLabel';

export const HeaderLayer = () => {
  return (
    <View style={HeaderLayerStyle.container}>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          flex: 0.15,
          height: headerSize.Height,
          paddingTop: headerSize.pTop,
        }}
        onPress={() => {
          console.log('click on back');
        }}
      >
        <BackIcon />
      </TouchableOpacity>

      <View style={{ flex: 0.65 }}></View>

      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 0.2,
          height: headerSize.Height,
        }}
        onPress={() => {
          console.log('click on language');
        }}
      >
        <LanguageIcon />
        <TextLabel variant="xSmall" style={{ marginTop: 5 }}>
          English
        </TextLabel>
      </TouchableOpacity>
    </View>
  );
};
