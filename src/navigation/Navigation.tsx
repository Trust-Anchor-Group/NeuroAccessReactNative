import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '@screens/Home/Home';
 import {ChooseAccountType} from '@screens/Registration/ChooseAccountType';
 import {EmailOTPVerify} from '@screens/Registration/EmailOTPVerify';
import { EnterEmail } from '@screens/Registration/EnterEmail';
import { EnterMobileNumber } from '@screens/Registration/EnterMobileNumber';
import { MobileNumberOTPVerify } from '@screens/Registration/MobileNumberOTPVerify';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="ChooseAccoutType">
      <Stack.Screen
        name="ChooseAccoutType"
        component={ChooseAccountType}
        options={{
          headerTitle: 'Choose Account Type',
        }}
      />
      <Stack.Screen
        name="EnterEmail"
        component={EnterEmail}
        options={{
          //headerTitle: 'Enter Email',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="EmailOTPVerify"
        component={EmailOTPVerify}
        options={{
          headerTitle: 'Email OTP Verification',
        }}
      />
      <Stack.Screen
        name="EnterMobileNumber"
        component={EnterMobileNumber}
        options={{
          headerTitle: 'Enter Mobile Number',
        }}
      />
      <Stack.Screen
        name="MobileNumberOTPVerify"
        component={MobileNumberOTPVerify}
        options={{
          headerTitle: 'Mobile Number OTP Verification',
        }}
      />
    </Stack.Navigator>
  );
};

export const ApplicationStack = () => {
  return (
    <Stack.Navigator initialRouteName={'ChooseAccoutType'}>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerTitle: 'Neuro Access',
        }}
      />
    </Stack.Navigator>
  );
};
