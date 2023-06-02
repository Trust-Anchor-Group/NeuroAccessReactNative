import React, { FC, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ChooseActionTypeStyle as styles } from '@src/styles/ChooseActionTypeStyle';
import { Colors } from '@src/theme/Colors';
import { InformationIcon } from '@src/assets/svg/InformationIcon';
import { ContextType } from '@src/services/Data';

interface Props {
  label: string;
  data: Array<ContextType>;
  onSelect: (item: ContextType) => void;
}

export const ChooseNeuroAccessAppContext: FC<Props> = ({
  label,
  data,
  onSelect,
}) => {
  const [selected, setSelected] = useState<ContextType>();

  const onItemPress = (item: ContextType): void => {
    setSelected(item);
    onSelect(item);
  };

  const getItemBackgroundColor = (index: number) => {
    return index === selected?.value
      ? Colors.light.chooseActionItemSelecectedBackground
      : Colors.light.chooseActionItemBackground;
  };
  const getItemTextColor = (index: number) => {
    if (selected === undefined) {
      return Colors.light.chooseActionItemSelecectedBackground;
    } else {
      return index === selected?.value
        ? Colors.light.informationLogoSelectedColor
        : Colors.light.informationLogoColor;
    }
  };

  const getInformationLogoColor = (index: number) => {
    return index === selected?.value
      ? Colors.light.informationLogoSelectedColor
      : Colors.light.informationLogoColor;
  };

  const renderItem: ListRenderItem<ContextType> = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.item,
        {
          backgroundColor: getItemBackgroundColor(index),
        },
      ]}
      onPress={() => onItemPress(item)}
    >
      <Text style={{ color: getItemTextColor(index), flex: 1 }}>
        {item.label}
      </Text>
      <View style={styles.informationLogoContainer}>
        <InformationIcon textColor={getInformationLogoColor(index)} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
