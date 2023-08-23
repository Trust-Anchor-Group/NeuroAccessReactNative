import { EnterMobileNumberStyle } from '@Pages/Styles';
import { t } from 'i18next';
import React, { useContext } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  FlatList,
} from 'react-native';
import { TextLabel, TextLabelVariants } from './TextLabel';
import { ThemeContext } from '@Theme/Provider';
import { AlternateUserNameListStyle } from './Styles';

type ItemProps = {
  item: string;
  onPress: () => void;
};

type Props = {
  data: string[];
  onPress: (selectedValue: string) => void;
};

export const AlternateUserNameList = (props: Props) => {
  const { themeColors } = useContext(ThemeContext);
  const Item = ({ item, onPress }: ItemProps) => (
    <TouchableOpacity
      onPress={onPress}
      style={AlternateUserNameListStyle(themeColors).item}
    >
      <Text style={AlternateUserNameListStyle(themeColors).title}>{item}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: string }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          props.onPress(item);
        }}
      />
    );
  };

  return (
    <View>
      <TextLabel
        style={[
          EnterMobileNumberStyle(themeColors).inputLabel,
          AlternateUserNameListStyle(themeColors).titleText,
        ]}
        variant={TextLabelVariants.DESCRIPTION}
      >
        {t('enterUserNameScreen.alternateNameTitle')}
      </TextLabel>
      <FlatList
        data={props.data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        extraData={undefined}
      />
    </View>
  );
};
