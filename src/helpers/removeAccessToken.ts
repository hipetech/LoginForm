import { resetGenericPassword } from 'react-native-keychain';
import { KeystoreKeys } from '../keystoreKeys.ts';

export const removeAccessToken = async () => {
  try {
    await resetGenericPassword({ server: KeystoreKeys.ACCESS_TOKEN });
  } catch (error){
    console.error(error);
  }
};
