import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'

const MobileNumberOTPVerify = ({ navigation }:StackScreenProps<{Profile: any}>) => {
  return (
    <View>
      <Text>MobileNumberOTPVerify</Text>
      <Button title='Next' onPress={() => navigation.navigate('MobileNumberOTPVerify')}/>
    </View>
  )
}

export default MobileNumberOTPVerify

const styles = StyleSheet.create({})