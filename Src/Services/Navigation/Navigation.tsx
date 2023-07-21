import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '@Pages/Home';
import {
  ChooseAccountType,
  OTPVerify,
  EmailOTPVerify,
  EnterEmail,
  EnterMobileNumber,
  CreateAccount,
  EnterUserName,AlmostThere
} from '@Pages/Registration';
import { Settings } from '@Pages/Settings';
import { CurrentProvider, TellUsAboutYou  } from '@Pages/index';

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
        name="OTPVerify"
        component={OTPVerify}
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
        name="EnterUserName"
        component={EnterUserName}
        options={{
          headerShown: false,
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
        name="CurrentProvider"
        component={CurrentProvider}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="TellUsAboutYou"
        component={TellUsAboutYou}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AlmostThere"
        component={AlmostThere}
        options={{
          headerShown: false,
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
    <Stack.Navigator initialRouteName={'AlmostThere'}>
      <Stack.Screen
        name="TellUsAboutYou"
        component={TellUsAboutYou}
        options={{
          headerShown: false,
        }}
      />

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
