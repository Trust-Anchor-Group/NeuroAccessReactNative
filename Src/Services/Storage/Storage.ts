import EncryptedStorage from 'react-native-encrypted-storage';
 
export async function storeUserSession(key: string, data: any) {
  try {
    await EncryptedStorage.setItem(
      key,
      JSON.stringify(data)
    );
  } catch (error) {
    return error;
  }
}

export async function retrieveUserSession(key: string) {
  try {
    const session = await EncryptedStorage.getItem(key);
    if (session !== undefined) {
      return JSON.parse(session);
    }
  } catch (error) {
    return error;
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
