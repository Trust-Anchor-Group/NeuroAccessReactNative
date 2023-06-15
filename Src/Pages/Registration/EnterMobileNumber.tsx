import React,{ useState, useRef, useContext, useEffect } from 'react'
import { View, KeyboardAvoidingView, Platform, Keyboard, ActivityIndicator } from 'react-native';
import { Button, Text } from 'react-native'
import { EnterMobileNumberStyle } from '@Pages/Styles';
import { StackScreenProps } from '@react-navigation/stack'
import { NeuroAccessBackground } from '@Controls/NeuroAccessBackground';
import { Logo } from '@Assets/Svgs';
import { NavigationHeader } from '@Controls/NavigationHeader';
import { ActionButton } from '@Controls/ActionButton';
import { ShowLabelsForAuth } from '@Controls/ShowLabelsForAuth';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
import { AgentAPI, APIType } from '@Services/API/Agent';
import { MobileInputView } from '@Controls/MobileInputView';

export const EnterMobileNumber = ({ navigation }:StackScreenProps<{Profile: any}>) => {

  interface CountryCodeData{
    RemoteEndPoint:string;
    CountryCode:string;
    PhoneCode:string;
  }
  const { t } = useTranslation();
  const { themeColors } = useContext(ThemeContext);
  const styles = EnterMobileNumberStyle(themeColors);
  const [countryCode,setCountryCode] = useState<CountryCodeData>();
  const countryISOCode = countryCode?.CountryCode;
  const phoneCode = countryCode?.PhoneCode;
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  const onBackClick = () => {
    navigation.goBack();
  };

  const onLanguageClick = () => {
    navigation.navigate('Settings');
  };

  useEffect(() => {
    const callCountryCode = async () => {
      try {
        const createData = await AgentAPI.ID.CountryCode(APIType.ID_APP);
        setCountryCode(createData);
        console.log('response data', JSON.stringify(createData));
      } catch (error) {
      }
    };
    callCountryCode();
  }, []);
  
  const handleSubmit = async ()=>{
    console.log('clicked ', inputValue);
    try {
      const request={
        Nr:phoneCode+inputValue 
      }
      const response = await AgentAPI.ID.sendVerificationMessage(request,APIType.ID_APP);
      console.log('response data', JSON.stringify(response));
    } catch (error) {
    }
  }

  return (
    <NeuroAccessBackground>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
     <View style={styles.containerSpace} />
        <View style={styles.containerLogo}>
          <Logo
            textColor={themeColors.logoPrimary}
            logoColor={themeColors.logoSecondary}
          />
        </View>
        <View style={styles.containerInput}>
          <ShowLabelsForAuth
            largeText={t('heading.getStarted')}
            smallText={t('enterMobileScreen.message')}
            inputLabel={t('enterMobileScreen.label')}
          />
         
         <MobileInputView
          label1={countryISOCode}
          label2={phoneCode}
          value={inputValue}
          onChangeText={handleInputChange}
         />

          <View style={styles.button}>
            {/* <ActivityIndicator animating={isLoading} />     */}
            <ActionButton
              title={t('buttonLabel.sendCode')}
              onPress={() => {
                Keyboard.dismiss();
                handleSubmit();
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      <NavigationHeader
        onBackAction={onBackClick}
        onLanguageAction={onLanguageClick}
      />
    </NeuroAccessBackground>
  )
}