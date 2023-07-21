import RNFS from 'react-native-fs';

export const saveBase64ToFile = async (
  imageString: string
): Promise<boolean> => {
  const base64String: string = imageString;
  const filePath: string = RNFS.DocumentDirectoryPath + '/file.txt';

  try {
    await RNFS.writeFile(filePath, base64String, 'base64');
    return true;
  } catch (error) {
    console.error('Error creating file:', error);
    return false;
  }
};

export const readBase64FromFile = async (): Promise<string> => {
  try {
    const filePath: string = RNFS.DocumentDirectoryPath + '/file.txt';
    const base64String: string = await RNFS.readFile(filePath, 'base64');
    return base64String;
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
};
