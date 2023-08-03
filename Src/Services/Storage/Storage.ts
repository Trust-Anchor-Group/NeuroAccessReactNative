import { isEmpty } from '@Helpers/Utils';
import EncryptedStorage from 'react-native-encrypted-storage';
 
export async function storeUserSession(key: string, data: any) {
  try {
    await EncryptedStorage.setItem(
      key,
      JSON.stringify(data)
    );
  } catch (error) {
    return false;
  }
}

export async function retrieveUserSession(key: string) {
  try {
    const session = await EncryptedStorage.getItem(key);
    if (!isEmpty(session) && session !== null && session !== undefined) {
      return JSON.parse(session);
    } else {
      return false
    }
  } catch (error) {
    return false;
  }
}


export async function removeUserSession(key: string) {
  try {
    await EncryptedStorage.removeItem(key);
    return true
  } catch (error) {
    return false
  }
}

export async function clearLocalStorage() {
  try {
    await EncryptedStorage.clear();
    return true
  } catch (error) {
    return false
  }
}


