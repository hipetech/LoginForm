import {
  setGenericPassword,
} from 'react-native-keychain';
import { KeystoreKeys } from '../keystoreKeys.ts';

export const setAccessToken = async (token: string) => {
  try {
    await setGenericPassword(KeystoreKeys.ACCESS_TOKEN, token);
  } catch (error) {
    console.error(error);
  }
};
