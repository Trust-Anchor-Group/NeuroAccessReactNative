import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'

export const EmailOTPVerify = ({ navigation }:StackScreenProps<{Profile: any}>) => {
  return (
    <View>
      <Text>EmailOTPVerify</Text>
      <Button title='Next' onPress={() => navigation.navigate('EnterMobileNumber')}/>
    </View>
  )
}

const styles = StyleSheet.create({})