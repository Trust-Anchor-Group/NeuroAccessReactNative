import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '@src/screens/home/Home';
import { ChooseAccountType } from '@src/screens/registration/ChooseAccountType';
import { EmailOTPVerify } from '@src/screens/registration/EmailOTPVerify';
import { EnterEmail } from '@src/screens/registration/EnterEmail';
import { EnterMobileNumber } from '@src/screens/registration/EnterMobileNumber';
import { MobileNumberOTPVerify } from '@src/screens/registration/MobileNumberOTPVerify';
import { Settings } from '@src/screens/settings/Settings';
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
