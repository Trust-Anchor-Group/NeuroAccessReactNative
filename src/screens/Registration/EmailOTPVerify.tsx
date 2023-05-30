import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'

const EmailOTPVerify = ({ navigation }:StackScreenProps<{Profile: any}>) => {
  return (
    <View>
      <Text>EmailOTPVerify</Text>
      <Button title='Next' onPress={() => navigation.navigate('EnterMobileNumber')}/>
    </View>
  )
}

export default EmailOTPVerify

const styles = StyleSheet.create({})