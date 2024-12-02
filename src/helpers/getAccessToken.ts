import { getGenericPassword } from 'react-native-keychain';
import { KeystoreKeys } from '../keystoreKeys.ts';

export const getAccessToken = async () => {
  try {
    const credentials = await getGenericPassword({
      server: KeystoreKeys.ACCESS_TOKEN,
    });
    if (credentials) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};
