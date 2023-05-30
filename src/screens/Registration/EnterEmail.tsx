import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack';

export const EnterEmail = ({ navigation }:StackScreenProps<{Profile: any}>) => {
  return (
    <View>
      <Text>EnterEmail</Text>
      <Button title='Next' onPress={() => navigation.navigate('EmailOTPVerify')}/>
    </View>
  )
}

const styles = StyleSheet.create({})