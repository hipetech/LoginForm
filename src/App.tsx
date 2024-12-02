import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './screens/home.tsx';
import { Login } from './screens/login.tsx';
import { Profile } from './screens/profile.tsx';
import { createStaticNavigation } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const NavigationStack = createStackNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        gestureEnabled: false,
      },
    },
    Login,
    Profile,
  },
  screenOptions: {
    headerShown: false,
  },
});

const Navigation = createStaticNavigation(NavigationStack);
export const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <Navigation />
  </QueryClientProvider>
);
