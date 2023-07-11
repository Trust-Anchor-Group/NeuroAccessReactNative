import {
  checkMultiple,
  requestMultiple,
  openSettings,
} from 'react-native-permissions';

export const requestMultiPermission = async (
  permissionCamera: any,
  permissionGallery: any
) => {
  requestMultiple([permissionCamera, permissionGallery]).then((statuses) => {});
};
export const checkMultiPermission = async (
  permissionCamera: any,
  permissionGallery: any
): Promise<boolean> => {
  try {
    const statuses = await checkMultiple([permissionCamera, permissionGallery]);
    if (
      statuses[permissionCamera] === 'blocked' ||
      statuses[permissionGallery] === 'blocked'
    ) {
      await openSettings();
    } else if (
      statuses[permissionCamera] === 'granted' &&
      statuses[permissionGallery] === 'granted'
    ) {
      return true;
    }
  } catch (error) {
    console.error('Permission error:', error);
    throw error;
  }
  return false;
};
