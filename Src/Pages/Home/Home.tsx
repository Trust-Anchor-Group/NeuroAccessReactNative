import React, { useContext } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { GlobalStyle as styles } from '@Pages/Styles';
import { StackScreenProps } from '@react-navigation/stack';
import {
  NeuroAccessBackground,
  NavigationHeader,
  TextLabel,
  TextLabelVariants,
} from '@Controls/index';
import { ThemeContext } from '@Theme/Provider/ThemeContext';

export const Home = ({ navigation }: StackScreenProps<{ Profile: any }>) => {
  const { themeColors } = useContext(ThemeContext);
  const onBackClick = () => {
    navigation.goBack();
  };

  const onLanguageClick = () => {
    navigation.navigate('Settings');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles(themeColors).container}
    >
      <NeuroAccessBackground>
        <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <TextLabel variant={TextLabelVariants.LABEL}>
            Wellcome to Neuro-Access
          </TextLabel>
        </View>
        <NavigationHeader
          hideBackAction={true}
          onBackAction={onBackClick}
          onLanguageAction={onLanguageClick}
        />
      </NeuroAccessBackground>
    </KeyboardAvoidingView>
  );
};
