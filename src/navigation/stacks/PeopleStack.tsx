import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PeopleStackParams } from '../types/navigationTypes';
import { PeopleScreen } from '../../modules/people/screens/PeopleScreen';
import { PersonDetailsScreen } from '../../modules/people/screens/PersonDetailsScreen';
import { TvShowDetailsScreen } from '../../modules/tvShows/screens/TvShowDetailsScreen';

export const PeopleStack = () => {
  const Stack = createNativeStackNavigator<PeopleStackParams>();

  return (
    <Stack.Navigator initialRouteName="PeopleList">
      <Stack.Screen
        name="PeopleList"
        component={PeopleScreen}
        options={{
          title: 'People',
        }}
      />
      <Stack.Screen name="PersonDetails" component={PersonDetailsScreen} />
      <Stack.Screen name="TvShowDetails" component={TvShowDetailsScreen} />
    </Stack.Navigator>
  );
};
