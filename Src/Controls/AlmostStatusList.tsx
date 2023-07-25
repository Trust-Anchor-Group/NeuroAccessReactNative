import React, { useContext } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
import { AlmostStatusLabel } from './AlmostStatusLable';
import { AlmostStatusLabelStyle } from './Styles';
type DataItem = {
  __name: string;
  __ns: string;
  name: string;
  value: string;
};

interface DynamicListProps {
  data: DataItem[];
}

export const AlmostStatusList: React.FC<DynamicListProps> = ({ data }) => {
  const { t } = useTranslation();
  const { themeColors } = useContext(ThemeContext);

  const getNameLabel = (type: string) => {
    switch (type) {
      case 'FIRST':
        return t('almostThere.firstName');
      case 'MIDDLE':
        return t('almostThere.middleName');
      case 'LAST':
        return t('almostThere.lastName');
      case 'PNR':
        return t('almostThere.pnr');
      case 'ADDR':
        return t('almostThere.address');
      case 'ZIP':
        return t('almostThere.zip');
      case 'CITY':
        return t('almostThere.city');
      case 'REGION':
        return t('almostThere.state');
      case 'COUNTRY':
        return t('almostThere.country');
      case 'ADDR2':
        return t('almostThere.address');
      case 'PHONE':
        return t('almostThere.mobile');
      case 'AGENT':
        return t('almostThere.agent');
      default:
        return type;
    }
  };

  return (
    <View style={AlmostStatusLabelStyle(themeColors).listContainer}>
      {data.map((item, index) => (
        <View key={index}>
          <AlmostStatusLabel
            title={getNameLabel(item?.name)}
            titleValue={item?.value}
            titleValueColor={themeColors.almost.value}
          />
        </View>
      ))}
    </View>
  );
};
