import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, BackHandler, Platform } from 'react-native';
import { Button } from '../ui/button.tsx';
import { useNavigation } from '@react-navigation/native';
import { isAccessTokenExpired } from '../helpers/isAccessTokenExpired.ts';
import { getAccessToken } from '../helpers/getAccessToken.ts';

export const Home = () => {
  const navigation = useNavigation();

  const handleNavigation = async () => {
    const accessToken = await getAccessToken();
    const isExpired = accessToken && isAccessTokenExpired(accessToken);
    navigation.navigate(!accessToken || isExpired ? 'Login' : 'Profile');
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => true,
      );

      return () => backHandler.remove();
    }
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Button onPress={handleNavigation}>Go to login</Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F8FA',
    gap: 5,
  },
});
