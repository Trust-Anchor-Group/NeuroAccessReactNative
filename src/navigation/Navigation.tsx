import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '@src/screens/home/Home';
 import { ChooseAccountType } from '@src/screens/registration/ChooseAccountType';
 import { EmailOTPVerify } from '@src/screens/registration/EmailOTPVerify';
import { EnterEmail } from '@src/screens/registration/EnterEmail';
import { EnterMobileNumber } from '@src/screens/registration/EnterMobileNumber';
import { MobileNumberOTPVerify } from '@src/screens/registration/MobileNumberOTPVerify';
import { Splash } from '@src/screens/Splash/Splash';

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
    <Stack.Navigator initialRouteName={'HomeScreen'}>
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