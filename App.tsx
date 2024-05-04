import React from 'react';
import { TvShowsScreen } from './src/modules/tvShows/screens/TvShowsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TvShowDetailsScreen } from './src/modules/tvShows/screens/TvShowDetailsScreen';
import { RootStackParamList } from './src/navigation/types/navigationTypes';
import { EpisodeDetailsScreen } from './src/modules/tvShows/screens/EpisodeDetailsScreen';

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TvShows">
        <Stack.Screen
          name="TvShows"
          component={TvShowsScreen}
          options={{
            title: 'Tv Shows',
          }}
        />
        <Stack.Screen name="TvShowDetails" component={TvShowDetailsScreen} />
        <Stack.Screen name="EpisodeDetails" component={EpisodeDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
