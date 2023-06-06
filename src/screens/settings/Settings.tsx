import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import { SettingStyle } from '@src/styles/SettingStyle';
import { LANGS } from '@src/services/Data';


export const Settings = () => {
  const {t, i18n} = useTranslation();
  const selectedLngCode = i18n.language;
  const setLng = (lngCode: string) => i18n.changeLanguage(lngCode);
  return (
    <View style={SettingStyle.container}>
      <View style={SettingStyle.titleContainer}>
        <Text style={SettingStyle.select}>{t('settingScreen.selectLanguage')}</Text>
      </View>
      {LANGS.map((l) => {
        const selected = l.lngCode === selectedLngCode;
        return (
          <TouchableOpacity
            onPress={() => setLng(l.lngCode)}
            key={l.lngCode}
            disabled={selected}>
            <View style={[SettingStyle.row, selected ? SettingStyle.selectedRow : {}]}>
              <Text style={[selected ? SettingStyle.selectedText : SettingStyle.text]}>
                {l.label}
              </Text>
              {selected && <Text>👍</Text>}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

