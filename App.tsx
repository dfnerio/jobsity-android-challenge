import React from 'react';
import { TvShowsScreen } from './src/modules/tvShows/screens/TvShowsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TvShowDetailsScreen } from './src/modules/tvShows/screens/TvShowDetailsScreen';
import { EpisodeDetailsScreen } from './src/modules/tvShows/screens/EpisodeDetailsScreen';
import {
  FavoritesStackParams,
  RootStackParams,
  TvShowsStackParams,
} from './src/navigation/types/navigationTypes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { FavoritesScreen } from './src/modules/favorites/screens/FavoritesScreen';
import { Provider } from 'react-redux';
import { rootPersistor, rootStore } from './src/modules/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  const TvShowsStack = createNativeStackNavigator<TvShowsStackParams>();
  const FavoritesStack = createNativeStackNavigator<FavoritesStackParams>();
  const Tab = createBottomTabNavigator<RootStackParams>();

  const TvShowsStackScreen = () => {
    return (
      <TvShowsStack.Navigator initialRouteName="TvShowsList">
        <TvShowsStack.Screen
          name="TvShowsList"
          component={TvShowsScreen}
          options={{
            title: 'Tv Shows',
          }}
        />
        <TvShowsStack.Screen
          name="TvShowDetails"
          component={TvShowDetailsScreen}
        />
        <TvShowsStack.Screen
          name="EpisodeDetails"
          component={EpisodeDetailsScreen}
        />
      </TvShowsStack.Navigator>
    );
  };

  const FavoritesStackScreen = () => {
    return (
      <FavoritesStack.Navigator initialRouteName="FavoritesList">
        <FavoritesStack.Screen
          name="FavoritesList"
          component={FavoritesScreen}
          options={{
            title: 'Favorites',
          }}
        />
        <FavoritesStack.Screen
          name="TvShowDetails"
          component={TvShowDetailsScreen}
        />
        <FavoritesStack.Screen
          name="EpisodeDetails"
          component={EpisodeDetailsScreen}
        />
      </FavoritesStack.Navigator>
    );
  };

  return (
    <Provider store={rootStore}>
      <PersistGate loading={null} persistor={rootPersistor}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarInactiveBackgroundColor: 'whitesmoke',
            }}
          >
            <Tab.Screen
              name="TvShows"
              component={TvShowsStackScreen}
              options={{
                tabBarLabel: 'Tv Shows',
                tabBarIcon: ({ focused }) => (
                  <Icon
                    name="tv"
                    color={focused ? 'purple' : 'grey'}
                    size={18}
                  />
                ),
              }}
            />

            <Tab.Screen
              name="Favorites"
              component={FavoritesStackScreen}
              options={{
                tabBarLabel: 'Favorites',
                tabBarIcon: ({ focused }) => (
                  <Icon
                    name="star"
                    color={focused ? 'purple' : 'grey'}
                    size={18}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
