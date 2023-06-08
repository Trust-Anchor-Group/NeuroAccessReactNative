import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { AgentAPI } from '@src/services/API/Agent';

export const EmailOTPVerify = ({
  navigation,
}: StackScreenProps<{ Profile: any }>) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <View>
      <Text>EmailOTPVerify</Text>
      <Button
        title="Next"
        onPress={async () => {
          setLoading(true);
          const createData = await AgentAPI.Account.VerifyEMail(
            'pramodsphinx@gmail.com',
            '926200'
          );
          setLoading(false);
          console.log('createData ===> ', createData);

          navigation.navigate('EnterMobileNumber');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
