import React, { FC } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ArrowBackIcon from '../../assets/icons/arrowBack.svg';
import { Font } from '../styles/font.ts';
import { useNavigation } from '@react-navigation/native';
import { User } from '../types/User.ts';

type ProfileHeaderProps = {
  user?: User;
  isLoading: boolean;
};

export const ProfileHeader: FC<ProfileHeaderProps> = ({ user, isLoading }) => {
  const navigation = useNavigation();
  const greeting = user ? `Hi, ${user.firstName} ${user.lastName}!` : 'Something went wrong :(';

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <ArrowBackIcon />
      </Pressable>
      <Text style={styles.text}>{isLoading ? 'Loading...' : greeting}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  text: {
    color: '#000',
    fontSize: 18,
    fontFamily: Font.semiBold,
  },
});
