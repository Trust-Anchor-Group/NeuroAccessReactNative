
import { View } from 'react-native'
import React, { useContext } from 'react'
import { GlobalStyle } from '@Pages/Styles'
import { ThemeContext } from '@Theme/Provider';

const Space = () => {
  const { themeColors } = useContext(ThemeContext);

  return <View style={GlobalStyle(themeColors).space} />
}

export default Space
