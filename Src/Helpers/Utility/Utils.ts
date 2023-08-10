import { Platform } from 'react-native';
import { Constants } from '../Constants';
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

// Define a type guard function to check if the value is boolean
function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean';
}

export function isEmpty(obj: any) {
  if (isBoolean(obj)) {
    return false; // Return the original boolean value
  }

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

export function replaceWithIntValue(inputString: string, intValue: number): string {
  return inputString.replace(/\{0\}/g, intValue.toString());
}


class Instance {
  static loginAuditor = {
    async GetEarliestLoginOpportunity(
      endpoint: string,
      protocol: string
    ): Promise<date | null> {
      // Implement the logic to get the earliest login opportunity
      // and return the DateTime in string format (or null if none found).
      return null;
    }
  };
}

// Instantiate the UiSerializer (assuming it's a class)
// const Ui = new UiSerializer();

async function CheckUserBlocking() {
  const DateTimeForLogin: Date | null =
    await Instance.loginAuditor.GetEarliestLoginOpportunity(
      Constants.Pin.RemoteEndpoint,
      Constants.Pin.Protocol
    );

  if (DateTimeForLogin) {
    let MessageAlert: string;

    if (DateTimeForLogin === Constants.Pin.DateTimeMaxValue) {
      // Adjust the condition to match the DateTime.MaxValue representation
      MessageAlert = 'Pin.PinIsInvalidAplicationBlockedForever';
    } else {
      const LocalDateTime = new Date(DateTimeForLogin).toLocaleString();
      const DateString = LocalDateTime;

      if (DateTimeForLogin === Date) {
        MessageAlert = 'Pin.PinIsInvalidAplicationBlocked'.replace("{0}", DateString);
      } else if (
        DateTimeForLogin ===
        new Date(Date.now() + 86400000)
      ) {
        MessageAlert = 'Pin.PinIsInvalidAplicationBlockedTillTomorrow'.replace("{0}", DateString);
      } else {
        MessageAlert = 'Pin.PinIsInvalidAplicationBlocked'.replace("{0}", DateString);
      }
    }

    return MessageAlert
  }
}
