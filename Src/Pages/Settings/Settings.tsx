import React, { useContext } from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SettingStyle } from '@Pages/Styles';
import { LANGS } from '@Services/Data';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
import { Colors } from '@Theme/Colors';
import { ThemeVariants } from '@Helpers/Enums';

export const Settings = () => {
  const { t, i18n } = useTranslation();
  const selectedLngCode = i18n.language;
  const { theme, setTheme } = useContext(ThemeContext);

  let themeStyles;

  switch (theme) {
    case ThemeVariants.LIGHT:
      themeStyles = Colors.light;
      break;
    case ThemeVariants.DARK:
      themeStyles = Colors.dark;
      break;
    case ThemeVariants.MOBILE:
      themeStyles = Colors.dark;
      break;
    default:
      themeStyles = Colors.light;
      break;
  }

  const setLng = (lngCode: string) => i18n.changeLanguage(lngCode);

  return (
    <View style={SettingStyle.container}>
      <View style={SettingStyle.titleContainer}>
        <Text style={SettingStyle.select}>
          {t('settingScreen.selectLanguage')}
        </Text>
      </View>
      {LANGS.map((l) => {
        const selected = l.lngCode === selectedLngCode;
        return (
          <TouchableOpacity
            onPress={() => setLng(l.lngCode)}
            key={l.lngCode}
            disabled={selected}
          >
            <View
              style={[
                SettingStyle.row,
                selected ? SettingStyle.selectedRow : {},
              ]}
            >
              <Text
                style={[
                  selected ? SettingStyle.selectedText : SettingStyle.text,
                ]}
              >
                {l.label}
              </Text>
              {selected && <Text>👍</Text>}
            </View>
          </TouchableOpacity>
        );
      })}

      <View style={SettingStyle.titleContainer}>
        <Text style={SettingStyle.select}>
          {t('settingScreen.changeTheme')}
        </Text>
      </View>

      <View >
      <Button title="Light Theme" onPress={() => setTheme('light')} />
      <Button title="Dark Theme" onPress={() => setTheme('dark')} />
      <Button title="Mobile Theme" onPress={() => setTheme('mobile')} />
    </View>
    </View>
  );
};
