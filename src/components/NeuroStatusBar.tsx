import React, {useContext} from 'react';
import { StatusBar} from 'react-native';
import { ThemeContext } from '@src/theme/provider/ThemeContext';

export const NeuroStatusBar = ()=>{

  const {theme,themeColors} = useContext(ThemeContext);
  return(
    <StatusBar 
    animated={true}
    backgroundColor={themeColors.background}
    barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}/>
  )
}