var CryptoJS = require("crypto-js");


export function computePinHash(pin: string, objectId: string, domain: string, account: string, legalJid: string): string {
  const sb = new Array<string>();

  sb.push(objectId);
  sb.push(':');
  sb.push(domain);
  sb.push(':');
  sb.push(account);
  sb.push(':');
  sb.push(legalJid);
  sb.push(':');
  sb.push(pin);

  const s = sb.join('');
  const data = CryptoJS.enc.Utf8.parse(s);
  const sha384Hash = CryptoJS.SHA384(data);

  return sha384Hash.toString();
}