import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TvShowsStackParams } from '../types/navigationTypes';
import { TvShowsScreen } from '../../modules/tvShows/screens/TvShowsScreen';
import { TvShowDetailsScreen } from '../../modules/tvShows/screens/TvShowDetailsScreen';
import { EpisodeDetailsScreen } from '../../modules/tvShows/screens/EpisodeDetailsScreen';

export const TvShowsStack = () => {
  const Stack = createNativeStackNavigator<TvShowsStackParams>();

  return (
    <Stack.Navigator initialRouteName="TvShowsList">
      <Stack.Screen
        name="TvShowsList"
        component={TvShowsScreen}
        options={{
          title: 'Tv Shows',
        }}
      />
      <Stack.Screen name="TvShowDetails" component={TvShowDetailsScreen} />
      <Stack.Screen name="EpisodeDetails" component={EpisodeDetailsScreen} />
    </Stack.Navigator>
  );
};
