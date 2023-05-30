import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home/Home';
import ChooseAccountType from '../screens/registration/ChooseAccountType';
import EmailOTPVerify from '../screens/registration/EmailOTPVerify';
import EnterEmail from '../screens/registration/EnterEmail';
import EnterMobileNumber from '../screens/registration/EnterMobileNumber';
import MobileNumberOTPVerify from '../screens/registration/MobileNumberOTPVerify';

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
          headerTitle: 'Enter Email',
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
