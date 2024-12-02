import React, { useEffect } from 'react';
import {
  AppState,
  AppStateStatus,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { ProfileHeader } from '../components/profileHeader.tsx';
import { Button } from '../ui/button.tsx';
import { getUser } from '../services/getUser.ts';
import { focusManager, useQuery } from '@tanstack/react-query';
import { User } from '../types/User.ts';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getAccessToken } from '../helpers/getAccessToken.ts';
import { queryClient } from '../App.tsx';
import { removeAccessToken } from '../helpers/removeAccessToken.ts';

export const Profile = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const { data, isLoading, error } = useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        return getUser(accessToken,);
      }
    },
    refetchInterval: 15000,
    retry: false,
    enabled: isFocused,
  });

  const logout = async () => {
    await removeAccessToken();
    navigation.navigate('Home');
  };

  useEffect(() => {
    if (error?.message === 'Error: Token Expired!') {
      navigation.navigate('Home');
      queryClient.removeQueries({ queryKey: ['user'] });
    }
  }, [error, navigation]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (status: AppStateStatus) => focusManager.setFocused(status === 'active'),
    );
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ProfileHeader user={data} isLoading={isLoading} />
        <Button variant="secondary" onPress={logout}>
          Logout
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 32,
  },
});
