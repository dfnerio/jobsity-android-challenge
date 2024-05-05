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
import { AuthStack } from './src/navigation/stacks/AuthStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRootSelector } from './src/redux/hooks';
import { getShouldAskForAuthentication } from './src/modules/security/selectors/getShouldAskForAuthentication';

function Navigator() {
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

export default function App() {
  return (
    <Provider store={rootStore}>
      <PersistGate loading={null} persistor={rootPersistor}>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <Navigator />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
