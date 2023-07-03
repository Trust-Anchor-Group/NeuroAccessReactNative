import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {QRCodeScanner} from '@Services/Scanner/QRCodeScanner'

export const ScanInvitation = () => {
  return (
    <View>
      <Text>SendInvitationUsingQR</Text>
      <QRCodeScanner title={''} description={''} toggleOverlay={function (): void {
        throw new Error('Function not implemented.')
      } } />
    </View>
  )
}

const styles = StyleSheet.create({})