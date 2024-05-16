import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useRootSelector } from '../redux/hooks';
import { getShouldAskForAuthentication } from '../modules/security/selectors/getShouldAskForAuthentication';
import { RootStackParams } from './types/navigationTypes';
import { TvShowsStack } from './stacks/TvShowsStack';
import { PeopleStack } from './stacks/PeopleStack';
import { FavoritesStack } from './stacks/FavoritesStack';
import { AuthStack } from './stacks/AuthStack';

export default function Navigator() {
  const shouldAskForAuthorization = useRootSelector(
    getShouldAskForAuthentication,
  );
  const Tab = createBottomTabNavigator<RootStackParams>();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarInactiveBackgroundColor: 'whitesmoke',
        }}
        initialRouteName={shouldAskForAuthorization ? 'Security' : 'TvShows'}
      >
        <Tab.Screen
          name="TvShows"
          component={TvShowsStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name="tv" color={focused ? 'purple' : 'grey'} size={18} />
            ),
          }}
        />
        <Tab.Screen
          name="People"
          component={PeopleStack}
          options={{
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
            tabBarIcon: ({ focused }) => (
              <Icon name="star" color={focused ? 'purple' : 'grey'} size={18} />
            ),
          }}
        />
        <Tab.Screen
          name="Security"
          component={AuthStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name="lock" color={focused ? 'purple' : 'grey'} size={18} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
