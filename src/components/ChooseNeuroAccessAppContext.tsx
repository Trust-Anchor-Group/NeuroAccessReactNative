import React, { FC, useState, useContext } from 'react';
import {
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  View,
} from 'react-native';
import { ChooseActionTypeStyle } from '@src/styles/ChooseActionTypeStyle';
import { InformationIcon } from '@src/assets/svg/InformationIcon';
import { ContextType } from '@src/services/Data';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@src/theme/provider/ThemeContext';
import { TextLabel } from './TextLabel';
import { TextLabelVariants } from '@src/utils/enums/TextLabelVariants';

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
  const { t } = useTranslation();
  const {themeColors} = useContext(ThemeContext);
  const styles = ChooseActionTypeStyle(themeColors)
  const [selected, setSelected] = useState<ContextType>();

  const onItemPress = (item: ContextType): void => {
    setSelected(item);
    onSelect(item);
  };

  const getItemBackgroundColor = (index: number) => {
    return index === selected?.value
      ? themeColors.choosePurpose.itemSelectedBg
      : themeColors.choosePurpose.itemDefaultBg;
  };
  const getItemTextColor = (index: number) => {
    if (selected === undefined) {
      return themeColors.choosePurpose.itemSelectedBg;
    } else {
      return index === selected?.value
        ? themeColors.choosePurpose.infoSelected
        : themeColors.choosePurpose.infoDefault;
    }
  };

  const getInformationLogoColor = (index: number) => {
    return index === selected?.value
      ? themeColors.choosePurpose.infoSelected
      : themeColors.choosePurpose.infoDefault;
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
      <TextLabel variant={TextLabelVariants.INPUTLABEL} style={{ color: getItemTextColor(index), flex: 1 }}>
        {t(item.label)}
      </TextLabel>
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
