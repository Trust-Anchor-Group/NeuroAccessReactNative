import { Platform } from 'react-native';
let CryptoJS = require('crypto-js');

export function computePinHash(
  pin: string,
  objectId: string,
  domain: string,
): string {
  const sb = new Array<string>();

  sb.push(objectId);
  sb.push(':');
  sb.push(domain);
  sb.push(':');
  sb.push(pin);

  const s = sb.join('');
  const data = CryptoJS.enc.Utf8.parse(s);
  const sha384Hash = CryptoJS.SHA384(data);

  return sha384Hash.toString();
}

export function isEmpty(obj: any) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
}

export const convertUTCToLocalTime = (utcTimestamp: string) => {
  const utcDate = new Date(utcTimestamp);
  const offsetMilliseconds = utcDate.getTimezoneOffset() * 60 * 1000;
  const localTimeMilliseconds = utcDate.getTime() - offsetMilliseconds;
  const localDate = new Date(localTimeMilliseconds);

  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const day = String(localDate.getDate()).padStart(2, '0');
  const hours = String(localDate.getHours()).padStart(2, '0');
  const minutes = String(localDate.getMinutes()).padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

const convertLocalTimeToUTCTime = (dateString: any) => {
  let date = new Date(dateString);
  if (Platform.OS === 'ios') {
    return date.toISOString();
  }
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  ).toISOString();
};
