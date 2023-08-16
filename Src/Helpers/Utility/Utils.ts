import { Platform } from 'react-native';
import { AgentAPI } from '@Services/API/Agent';
import Utf8 from 'crypto-js/enc-utf8';
import Base64 from 'crypto-js/enc-base64';
import { TextEncoder } from 'text-decoding';
import { Constants } from '../Constants';
let CryptoJS = require('crypto-js');

export function computePinHash(
  pin: string,
  objectId: string,
  domain: string
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

const HasClientPublicKey = () => {
  return true;
  //return !string.IsNullOrEmpty(clientKeyName) && !(ClientPubKey is null);
};

const xmlEncode = (input: string): string => {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/\n/g, '&#10;')
    .replace(/\r/g, '&#13;')
    .replace(/\t/g, '&#9;')
    .replace(/\v/g, '&#11;')
    .replace(/\f/g, '&#12;');
};

function encode(s: string): string {
  const specialCharacters = ['&', '<', '>', '"', "'"];

  if (!s || !specialCharacters.some((char) => s.includes(char))) {
    return s;
  }

  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const DateTimeMaxValue = '9999-12-31T23:59:59.9999999Z';
const DateTimeMinValue = '0001-01-01T00:00:00.000Z';

export const Serialize = async (
  Xml:any,
  identity: any,
  IncludeNamespace: boolean,
  IncludeIdAttribute: boolean,
  IncludeClientSignature: boolean,
  IncludeAttachments: boolean,
  IncludeStatus: boolean,
  IncludeServerSignature: boolean,
  IncludeAttachmentReferences: boolean
) => {
 // const identity = identityResponse.Identity;

 console.log('print serialize response', identity);
  Xml.push('<identity');

  if (IncludeIdAttribute) {
    Xml.push(" id=\"");
    Xml.push(encode(identity?.id));
    Xml.push('"');
  }

  if (IncludeNamespace) {
    Xml.push(" xmlns=\"");
    Xml.push(identity?.xmlns);
    Xml.push('"');
  }

  Xml.push('>');

  if (identity?.clientPublicKey) {
    Xml.push('<clientPublicKey>');

    const properties = identity['clientPublicKey']
      ? Object.keys(identity['clientPublicKey'])
      : [];
    {
      properties.map((propertyName) => {
        const publicKey = identity['clientPublicKey'][propertyName]?.pub;
        if (publicKey) {
          const clientKeyName =
            identity['clientPublicKey'][propertyName]?.__name;
          const IoTHarmonizationE2E =
            identity['clientPublicKey'][propertyName]?.xmlns;

          if (clientKeyName.startsWith('RSA')) {
            Xml.push("<rsa pub=\"");
            Xml.push(ToBase64String(publicKey));
            Xml.push("\" size=\"");
            Xml.push(clientKeyName.substring(3));
            Xml.push("\" xmlns=\"");
            Xml.push(IoTHarmonizationE2E);
          } else {
            Xml.push('<');
            Xml.push(clientKeyName);
            Xml.push(" pub=\"");
            Xml.push(ToBase64String(publicKey));
            Xml.push("\" xmlns=\"");
            Xml.push(IoTHarmonizationE2E);
          }
        }
      });
    }

    Xml.push("\"/></clientPublicKey>");
  }

  if (identity?.property.length > 0) {
    for (const PropertyName in identity?.property) {
      const PropertyValue = identity?.property[PropertyName];
      Xml.push("<property name=\"");
      Xml.push(encode(PropertyValue?.name));
      Xml.push("\" value=\"");
      Xml.push(encode(PropertyValue?.value));
      Xml.push("\"/>");
    }
  }

  if (IncludeClientSignature) {
    Xml.push('<clientSignature>');

    if (identity?.clientSignature)
      Xml.push(ToBase64String(identity?.clientSignature?.value));

    Xml.push('</clientSignature>');
  }

  if (IncludeAttachments && identity?.attachment) {
    if(Array.isArray(identity?.attachment))
    {
      if(identity?.attachment.length>0)
      {
        for (const attachmentImage in identity?.attachment) {
          const attachmentValue = identity?.attachment[attachmentImage];
          Xml.push("<attachment contentType=\"");
      Xml.push(attachmentValue?.contentType.normalize());
      Xml.push("\" fileName=\"");
      Xml.push(attachmentValue?.fileName.normalize());
      Xml.push("\" id=\"");
      Xml.push(attachmentValue?.id.normalize());
      Xml.push("\" s=\"");
      Xml.push(ToBase64String(attachmentValue?.s));
      Xml.push("\" timestamp=\"");
      Xml.push(encode(attachmentValue?.timestamp));
      Xml.push("\"/>");
        }
      }

    }
    else{
      Xml.push("<attachment contentType=\"");
      Xml.push(identity?.attachment?.contentType.normalize());
      Xml.push("\" fileName=\"");
      Xml.push(identity?.attachment?.fileName.normalize());
      Xml.push("\" id=\"");
      Xml.push(identity?.attachment?.id.normalize());
      Xml.push("\" s=\"");
      Xml.push(ToBase64String(identity?.attachment?.s));
      Xml.push("\" timestamp=\"");
      Xml.push(encode(identity?.attachment?.timestamp));
      Xml.push("\"/>");
    }
  }

  if (IncludeStatus) {
    Xml.push("<status created=\"");
    Xml.push(encode(identity?.status?.created));

    // if (from != DateTime.MinValue)
    // {
      Xml.push("\" from=\"");
    Xml.push(encode(identity?.status?.from));
    // }

    Xml.push("\" provider=\"");
    Xml.push(encode(identity?.status?.provider));

    Xml.push("\" state=\"");
    Xml.push(identity?.status?.state);

    // if (to != DateTime.MaxValue)
    // {
      Xml.push("\" to=\"");
    Xml.push(encode(identity?.status?.to));
    // }

    // if (updated != DateTime.MinValue)
    // {
      Xml.push("\" updated=\"");
    Xml.push(encode(identity?.status?.updated));
    // }

    Xml.push("\"/>");
  }

  if (IncludeServerSignature) {
    Xml.push('<serverSignature>');

    if (identity?.serverSignature)
      Xml.push(ToBase64String(identity?.serverSignature?.value));

    Xml.push('</serverSignature>');
  }

  if (IncludeAttachmentReferences) {
    if(Array.isArray(identity?.attachmentRef))
    {
      if(identity?.attachmentRef.length>0)
      {
        for (const attachmentRefVal in identity?.attachmentRef) {
          const refVal = identity?.attachmentRef[attachmentRefVal];
          if (refVal?.url) {
            Xml.push("<attachmentRef attachmentId=\"");
            Xml.push(encode(refVal?.attachmentId));
            Xml.push("\" url=\"");
            Xml.push(encode(refVal?.url));
            Xml.push("\"/>");
          }
        }
      }
    }
    else{
      if (identity?.attachmentRef?.url) {
        Xml.push("<attachmentRef attachmentId=\"");
        Xml.push(encode(identity?.attachmentRef?.attachmentId));
        Xml.push("\" url=\"");
        Xml.push(encode(identity?.attachmentRef?.url));
        Xml.push("\"/>");
      }
    }
   
  }

  Xml.push('</identity>');
};

// Encoding the message to base64
//const encodedMessage = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(originalMessage));

// Decoding the encoded message back to original
//const decodedMessage = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encodedMessage));

// LegalIdentity Identity,
//   LegalIdentity ReviewerLegalIdentity, byte[] PeerSignature
export const AddPeerReviewIDAttachment = async (Identity: any,
   ReviewerLegalIdentity: any, PeerSignature: any) =>
{

  console.log('print identity of user',Identity);

  console.log('print identity of revieewer ',ReviewerLegalIdentity);


  const currentUtcDate = new Date();
const currentUtcDateTimeString = currentUtcDate.toISOString();
//const signature = Base64.parse(PeerSignature);
//console.log('print signature after stringfy',signature);
  const Xml = [];
 // console.log('after date orginal data',(currentUtcDateTimeString));
 // const ecodedval = ToBase64String(currentUtcDateTimeString);
  //console.log('after date ecoding data',ecodedval);
  //console.log('after date decode data',FromBase64String(ecodedval));
  Xml.push("<peerReview s='");
  Xml.push(ToBase64String(PeerSignature));
  Xml.push("' tp='");
  Xml.push(encode(currentUtcDateTimeString));
  Xml.push("' xmlns='");
  Xml.push(Identity?.xmlns);
  Xml.push("'><reviewed>");
  await Serialize(Xml,Identity, true, true, true, true, true, true, true);
  Xml.push("</reviewed><reviewer>");
  await Serialize(Xml,ReviewerLegalIdentity, true, true, true, true, true, true, true);
  Xml.push("</reviewer></peerReview>");

  console.log('print final xml string',Xml.join(''))
  const encoder = new TextEncoder();
  //byte[] Data = Encoding.UTF8.GetBytes(Xml.join(''));
  //const docArray: Uint8Array = encoder.encode(Xml.join(''));
  const Data = ToBase64String(Xml.join(''));
 // console.log('after convert base64 data');
  //const Signature = AgentAPI.Account.Sign(Data, SignWith.CurrentKeys);
  const FileName = ReviewerLegalIdentity.id + ".xml";
  const ContentType = "text/xml";

  const response ={
    Data,FileName,ContentType
  }
  //await e2.PUT(Data, ContentType, 10000);

  return response;
}

const ToBase64String = (data:any)=>{
  return Base64.stringify(Utf8.parse(data));
}

const FromBase64String = (data:any)=>{
  return Utf8.stringify(Base64.parse(data));
}
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
