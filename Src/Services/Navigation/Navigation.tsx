import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '@Pages/Home/Home';
import { ChooseAccountType } from '@Pages/Registration/ChooseAccountType';
import { EmailOTPVerify } from '@Pages/Registration/EmailOTPVerify';
import { EnterEmail } from '@Pages/Registration/EnterEmail';
import { EnterMobileNumber } from '@Pages/Registration/EnterMobileNumber';
import { MobileNumberOTPVerify } from '@Pages/Registration/MobileNumberOTPVerify';
import { Settings } from '@Pages/Settings/Settings';
const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="ChooseAccoutType">
      <Stack.Screen
        name="ChooseAccoutType"
        component={ChooseAccountType}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EnterEmail"
        component={EnterEmail}
        options={{
          headerShown: false,
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

      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitle: 'Settings',
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