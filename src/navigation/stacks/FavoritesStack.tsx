import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavoritesStackParams } from '../types/navigationTypes';
import { FavoritesScreen } from '../../modules/favorites/screens/FavoritesScreen';
import { TvShowDetailsScreen } from '../../modules/tvShows/screens/TvShowDetailsScreen';
import { EpisodeDetailsScreen } from '../../modules/tvShows/screens/EpisodeDetailsScreen';

export const FavoritesStack = () => {
  const Stack = createNativeStackNavigator<FavoritesStackParams>();

  return (
    <Stack.Navigator initialRouteName="FavoritesList">
      <Stack.Screen
        name="FavoritesList"
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
        }}
      />
      <Stack.Screen name="TvShowDetails" component={TvShowDetailsScreen} />
      <Stack.Screen name="EpisodeDetails" component={EpisodeDetailsScreen} />
    </Stack.Navigator>
  );
};
