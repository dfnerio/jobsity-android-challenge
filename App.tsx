import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParams } from './src/navigation/types/navigationTypes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Provider } from 'react-redux';
import { rootPersistor, rootStore } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { TvShowsStack } from './src/navigation/stacks/TvShowsStack';
import { FavoritesStack } from './src/navigation/stacks/FavoritesStack';
import { PeopleStack } from './src/navigation/stacks/PeopleStack';

export default function App() {
  const Tab = createBottomTabNavigator<RootStackParams>();

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
              component={TvShowsStack}
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
              name="People"
              component={PeopleStack}
              options={{
                tabBarLabel: 'People',
                tabBarIcon: ({ focused }) => (
                  <Icon
                    name="person"
                    color={focused ? 'purple' : 'grey'}
                    size={18}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Favorites"
              component={FavoritesStack}
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
