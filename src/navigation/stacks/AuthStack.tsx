import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParams } from '../types/navigationTypes';
import { ManageSecurityScreen } from '../../modules/security/screens/ManageSecurityScreen';

export const AuthStack = () => {
  const Stack = createNativeStackNavigator<AuthStackParams>();

  return (
    <Stack.Navigator initialRouteName="ManageSecurity">
      <Stack.Screen
        name="ManageSecurity"
        component={ManageSecurityScreen}
        options={{
          title: 'Security',
        }}
      />
    </Stack.Navigator>
  );
};
