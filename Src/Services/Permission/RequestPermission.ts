import {
  checkMultiple,
  requestMultiple,
  openSettings,
} from 'react-native-permissions';

export const requestMultiPermissionIos = async (
  permissionCamera: any,
  permissionGallery: any
) => {
  requestMultiple([permissionCamera, permissionGallery]).then((statuses) => {});
};
export const checkMultiPermissionIos = async (
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

export const requestMultiPermission = async (
  permissionCamera: any,
  permissionRead: any,
  permissionWrite: any
) => {
  requestMultiple([permissionCamera, permissionRead, permissionWrite]).then(
    (statuses) => {}
  );
};
export const checkMultiPermission = async (
  permissionCamera: any,
  permissionRead: any,
  permissionWrite: any
): Promise<boolean> => {
  try {
    const statuses = await checkMultiple([
      permissionCamera,
      permissionRead,
      permissionRead,
    ]);
    if (
      statuses[permissionCamera] === 'blocked' ||
      statuses[permissionRead] === 'blocked' ||
      statuses[permissionWrite] === 'blocked'
    ) {
      await openSettings();
    } else if (
      statuses[permissionCamera] === 'granted' &&
      statuses[permissionRead] === 'granted' &&
      statuses[permissionRead] === 'granted'
    ) {
      return true;
    }
  } catch (error) {
    console.error('Permission error:', error);
    throw error;
  }
  return false;
};
