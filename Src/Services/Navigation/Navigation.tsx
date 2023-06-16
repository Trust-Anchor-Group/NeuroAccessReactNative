import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '@Pages/Home';
import {
  ChooseAccountType,
  EmailOTPVerify,
  EnterEmail,
  EnterMobileNumber,
  MobileNumberOTPVerify,
  CreateAccount,
} from '@Pages/Registration';
import { Settings } from '@Pages/Settings';
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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EnterMobileNumber"
        component={EnterMobileNumber}
        options={{
          headerShown: false,
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
        name="CreateAccount"
        component={CreateAccount}
        options={{
          headerTitle: 'CreateAccount',
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
