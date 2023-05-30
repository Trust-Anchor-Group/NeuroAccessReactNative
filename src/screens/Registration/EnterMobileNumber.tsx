import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'

const EnterMobileNumber = ({ navigation }:StackScreenProps<{Profile: any}>) => {
  return (
    <View>
      <Text>EnterMobileNumber</Text>
      <Button title='Next' onPress={() => navigation.navigate('MobileNumberOTPVerify')}/>
    </View>
  )
}

export default EnterMobileNumber

const styles = StyleSheet.create({})