import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack';

export const ChooseAccountType = ({ navigation }:StackScreenProps<{Profile: any}>) => {
  return (
    <View>
      <Text>ChooseAccoutType</Text>
      <Button title='Next' onPress={() => navigation.navigate('EnterEmail')}/>
    </View>
  )
}

const styles = StyleSheet.create({})