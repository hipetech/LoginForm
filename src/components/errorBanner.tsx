import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WarningIcon from '../../assets/icons/warning.svg';
import { Font } from '../styles/font.ts';

type ErrorBannerProps = {
  errorMessage: string;
};

export const ErrorBanner: FC<ErrorBannerProps> = ({ errorMessage }) => {
  return (
    <View style={styles.container}>
      <WarningIcon />
      <Text style={styles.text}>
        {errorMessage}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 53,
    backgroundColor: '#FF0000',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 18,
    flexDirection: 'row',
    gap: 8,
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontFamily: Font.regular,
  },
});
