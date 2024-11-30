import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './screens/home.tsx';
import { Login } from './screens/login.tsx';
import { Profile } from './screens/profile.tsx';
import { createStaticNavigation } from '@react-navigation/native';

export const NavigationStack = createStackNavigator({
  screens: {
    Home,
    Login,
    Profile,
  },
  screenOptions: {
    headerShown: false,
  },
});

const Navigation = createStaticNavigation(NavigationStack);

export const App = () => <Navigation />;
