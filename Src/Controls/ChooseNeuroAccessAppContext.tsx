import React, { FC, useState, useContext, useEffect } from 'react';
import { FlatList, ListRenderItem, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ChooseActionTypeStyle } from '@Pages/Styles/ChooseActionTypeStyle';
import { InformationIcon } from '@Assets/Svgs';
import { ContextType } from '@Services/Data';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
import { TextLabel, TextLabelVariants } from '@Controls/index';

interface Props {
  data: Array<ContextType>;
  preSelected?: ContextType;
  onSelect: (item?: ContextType) => void;
  toggleOverlay: (item: ContextType) => void;
}

export const ChooseNeuroAccessAppContext: FC<Props> = ({
  data,
  preSelected,
  onSelect,
  toggleOverlay,
}) => {
  const { t } = useTranslation();
  const { themeColors } = useContext(ThemeContext);
  const styles = ChooseActionTypeStyle(themeColors);
  const [selected, setSelected] = useState<ContextType>();

  useEffect(() => {
    preSelected && preSelected.value && setSelected(preSelected);
  }, [preSelected, setSelected]);
  const onItemPress = (item: ContextType): void => {
    if (item !== selected) {
      setSelected(item);
      onSelect(item);
    } else {
      setSelected(undefined);
      onSelect();
    }
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
      <TextLabel
        variant={TextLabelVariants.INPUTLABEL}
        style={{ color: getItemTextColor(index), flex: 1 }}
      >
        {t(item.label)}
      </TextLabel>
        <InformationIcon textColor={getInformationLogoColor(index)} onPress={() => toggleOverlay(item)}/>
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
