import {
  storeUserSession,
  retrieveUserSession,
  removeUserSession,
} from '../Storage';
import { TextEncoder } from 'text-decoding';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import Config from "react-native-config";

const baseURL = Config.AGENT_API_URL;
const host = Config.Host;
const ApiKey = Config.ApiKey;
const Secret = Config.Secret;
const Seconds = 3500;

console.log(Config)

export const AgentAPI = {
  IO: {
    Request: async function (
      Resource: string,
      RequestPayload: any,
      Internal?: any
    ) {
      const Request = new Promise(async (SetResult, SetException) => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (xhttp.readyState == 4) {
            let Response = xhttp.responseText;
            if (xhttp.status === 200) {
              Response = JSON.parse(Response);
              SetResult(Response);
            } else SetException(Response);

            if (!Internal) AgentAPI.IO.AfterResponse(Response);
          }
        };

        if (!Internal) this.BeforeRequest(RequestPayload);

        xhttp.open('POST', baseURL + Resource);
        xhttp.setRequestHeader('Content-Type', 'application/json');

        var Token = await AgentAPI.Account.GetSessionString('AgentAPI.Token');
        if (Token) xhttp.setRequestHeader('Authorization', 'Bearer ' + Token);

        xhttp.send(JSON.stringify(RequestPayload));
      });

      return await Request;
    },
    BeforeRequest: function (Payload: any) {
      // const Control = document.getElementById("AgentRequestPayload");
      // if (Control)
      // 	Control.innerText = JSON.stringify(Payload, null, 2);
    },
    AfterResponse: function (Payload: any) {
      // const Control = document.getElementById("AgentResponsePayload");
      // if (Control)
      // 	Control.innerText = JSON.stringify(Payload, null, 2);
    },
    Log: function (Message: string) {
      console.log(new Date().toString() + ': ' + Message);
    },
  },
  Account: {
    Utf8: new TextEncoder('windows-1252', {
      NONSTANDARD_allowLegacyEncoding: true,
    }),
    Base64Alphabet: [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '+',
      '/',
    ],
    getRandomValues: function (lenth: any) {
      const char =
        'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
      const random = Array.from(
        { length: lenth },
        () => char[Math.floor(Math.random() * char.length)]
      );
      return random.join('');
    },
    Base64Encode: function (Data: string | any[]) {
      let Result = '';
      let i;
      const c = Data.length;

      for (i = 2; i < c; i += 3) {
        Result += this.Base64Alphabet[Data[i - 2] >> 2];
        Result +=
          this.Base64Alphabet[((Data[i - 2] & 0x03) << 4) | (Data[i - 1] >> 4)];
        Result +=
          this.Base64Alphabet[((Data[i - 1] & 0x0f) << 2) | (Data[i] >> 6)];
        Result += this.Base64Alphabet[Data[i] & 0x3f];
      }

      if (i === c) {
        Result += this.Base64Alphabet[Data[i - 2] >> 2];
        Result +=
          this.Base64Alphabet[((Data[i - 2] & 0x03) << 4) | (Data[i - 1] >> 4)];
        Result += this.Base64Alphabet[(Data[i - 1] & 0x0f) << 2];
        Result += '=';
      } else if (i === c + 1) {
        Result += this.Base64Alphabet[Data[i - 2] >> 2];
        Result += this.Base64Alphabet[(Data[i - 2] & 0x03) << 4];
        Result += '==';
      }

      return Result;
    },
    XmlEncode: function (s: string) {
      return s
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
    },
    Sign: async function (Key: any, Data: any) {
      return Base64.stringify(hmacSHA256(Data, Key));
    },
    GetSessionString: async function (Name: string) {
      return await retrieveUserSession(Name);
    },
    SetSessionString: async function (Name: string, Value: any) {
      return await storeUserSession(Name, Value);
    },
    RemoveSessionValue: async function (Name: string) {
      return await removeUserSession(Name);
    },
    GetSessionInt: function (Name: any) {
      const s = this.GetSessionString(Name);
      if (s) return parseInt(s);
      else return null;
    },
    SetSessionInt: function (Name: any, Value: { toString: () => any }) {
      this.SetSessionString(Name, Value.toString());
    },
    RefreshToken: async function () {
      AgentAPI.Account.RemoveSessionValue('AgentAPI.RefreshTimer');
      AgentAPI.Account.RemoveSessionValue('AgentAPI.RefreshTimerElapses');
      AgentAPI.Account.RemoveSessionValue('AgentAPI.RefreshTimerExpires');

      const Seconds = AgentAPI.Account.GetSessionInt('AgentAPI.Seconds');
      if (Seconds) AgentAPI.Account.Refresh(Seconds, true);
    },
    RestartActiveSession: function () {
      const Token = this.GetSessionString('AgentAPI.Token');
      const Seconds = this.GetSessionInt('AgentAPI.Seconds');

      if (Token && Seconds) {
        AgentAPI.IO.Log('Checking last session.');
        this.CheckSessionToken(Token, Seconds, false);
      } else AgentAPI.IO.Log('No session found.');
    },
    CheckSessionToken: function (Token: any, Seconds: number, NewToken: any) {
      const OldTimer = this.GetSessionInt('AgentAPI.RefreshTimer');
      const Elapses = this.GetSessionInt('AgentAPI.RefreshTimerElapses');
      const Expires = this.GetSessionInt('AgentAPI.RefreshTimerExpires');
      const Now = Math.round(Date.now() / 1000);

      if (!OldTimer || !Expires || !Elapses) {
        if (NewToken) AgentAPI.IO.Log('Saving new session token.');
        else AgentAPI.IO.Log('Resaving session token.');

        this.SaveSessionToken(Token, Seconds, Math.round(Seconds / 2));
      } else if (Expires > Now) {
        if (Elapses <= Now) {
          if (NewToken) {
            AgentAPI.IO.Log('New token replaces old token.');
            this.SaveSessionToken(Token, Seconds, Math.round(Seconds / 2));
          } else {
            AgentAPI.IO.Log(
              'Token elapsed, but not expired. Refreshing token.'
            );
            this.RefreshToken();
          }
        } else {
          if (NewToken)
            AgentAPI.IO.Log(
              'Saving new session token, using previous session timer.'
            );
          else AgentAPI.IO.Log('Restarting previous session token.');

          this.SaveSessionToken(Token, Seconds, Elapses - Now);
        }
      } else if (NewToken) {
        AgentAPI.IO.Log('Saving new session token.');
        this.SaveSessionToken(Token, Seconds, Math.round(Seconds / 2));
      } else AgentAPI.IO.Log('Obsolete session token.');
    },
    SaveSessionToken: function (Token: any, Seconds: number, Next: number) {
      const OldTimer = this.GetSessionInt('AgentAPI.RefreshTimer');
      if (OldTimer) {
        AgentAPI.IO.Log('Stopping previous session timer.');
        // window.clearTimeout(OldTimer);
      }

      const Now = Math.round(Date.now() / 1000);

      this.SetSessionString('AgentAPI.Token', Token);
      this.SetSessionInt('AgentAPI.Seconds', Seconds);
      // this.SetSessionInt("AgentAPI.RefreshTimer", window.setTimeout(this.RefreshToken, 1000 * Next));
      this.SetSessionInt('AgentAPI.RefreshTimerElapses', Now + Next);
      this.SetSessionInt('AgentAPI.RefreshTimerExpires', Now + Seconds);

      AgentAPI.IO.Log(
        'Resetting session timer to ' +
          Next +
          's, with token life cycle of ' +
          Seconds +
          's'
      );
    },
    Create: async function (
      UserName: string,
      EMail: string,
      Password: string
      // ApiKey?: string,
      // Secret?: any,
      // Seconds?: number
    ) {
      const Nonce = AgentAPI.Account.getRandomValues(32);
      const s =
        UserName +
        ':' +
        host +
        ':' +
        EMail +
        ':' +
        Password +
        ':' +
        ApiKey +
        ':' +
        Nonce;
      const Response = await AgentAPI.IO.Request('/Agent/Account/Create', {
        userName: UserName,
        eMail: EMail,
        password: Password,
        apiKey: ApiKey,
        nonce: Nonce,
        signature: await this.Sign(Secret, s),
        seconds: Seconds,
      });

			this.SetSessionString('AgentAPI.UserName', UserName);
      this.SaveSessionToken(Response.jwt, Seconds, Math.round(Seconds / 2));

      return Response;
    },
    GetSessionToken: async function () {
      const Response = await AgentAPI.IO.Request(
        '/Agent/Account/GetSessionToken',
        {}
      );

      this.CheckSessionToken(
        Response.AccountCreated.jwt,
        Response.seconds,
        true
      );
    },
    VerifyEMail: async function (EMail: any, Code: any) {
      const Result = await AgentAPI.IO.Request('/Agent/Account/VerifyEMail', {
        eMail: EMail,
        code: Code,
      });

      this.SetSessionString('AgentAPI.UserName', Result.userName);

      return Result;
    },
    Login: async function (UserName: string, Password: any, Seconds: number) {
      const Nonce = this.getRandomValues(32);
      const s = UserName + ':' + host + ':' + Nonce;
      let raw = {
        userName: UserName,
        nonce: Nonce,
        signature: await this.Sign(Password, s),
        seconds: 3500,
      };
      const Response = await AgentAPI.IO.Request('/Agent/Account/Login', raw);

      this.SetSessionString('AgentAPI.UserName', UserName);
      this.SaveSessionToken(Response.jwt, Seconds, Math.round(Seconds / 2));

      return Response;
    },
    Refresh: async function (Seconds: number, Internal: any) {
      AgentAPI.IO.Log('Requesting a refresh of Agent API session token.');

      const Response = await AgentAPI.IO.Request(
        '/Agent/Account/Refresh',
        {
          seconds: Seconds,
        },
        Internal
      );

      this.SaveSessionToken(Response.jwt, Seconds, Math.round(Seconds / 2));

      return Response;
    },
    Logout: async function () {
      const OldTimer = this.GetSessionInt('AgentAPI.RefreshTimer');
      if (OldTimer) {
        AgentAPI.IO.Log('Stopping session timer.');
        window.clearTimeout(OldTimer);
      }

      this.RemoveSessionValue('AgentAPI.UserName');
      this.RemoveSessionValue('AgentAPI.Seconds');
      this.RemoveSessionValue('AgentAPI.RefreshTimer');
      this.RemoveSessionValue('AgentAPI.RefreshTimerElapses');
      this.RemoveSessionValue('AgentAPI.RefreshTimerExpires');

      const Response = await AgentAPI.IO.Request('/Agent/Account/Logout', {});

      this.RemoveSessionValue('AgentAPI.Token');

      return Response;
    },
  },
  Xmpp: {
    SendTextMessage: async function (
      To: any,
      Message: any,
      Subject: any,
      Language: any,
      Id: any
    ) {
      const Request = {
        to: To,
        message: Message,
      };

      if (Subject) Request.subject = Subject;

      if (Language) Request.language = Language;

      if (Id) Request.id = Id;

      const Response = await AgentAPI.IO.Request(
        '/Agent/Xmpp/SendTextMessage',
        Request
      );

      if (!Response.sent) throw new Error('Message not sent.');

      return Response.id;
    },
    SendFormattedMessage: async function (
      To: any,
      Message: any,
      Subject: any,
      Language: any,
      Id: any
    ) {
      const Request = {
        to: To,
        message: Message,
      };

      if (Subject) Request.subject = Subject;

      if (Language) Request.language = Language;

      if (Id) Request.id = Id;

      const Response = await AgentAPI.IO.Request(
        '/Agent/Xmpp/SendFormattedMessage',
        Request
      );

      if (!Response.sent) throw new Error('Message not sent.');

      return Response.id;
    },
    SendXmlMessage: async function (
      To: any,
      Xml: any,
      Subject: any,
      Language: any,
      Id: any
    ) {
      const Request = {
        to: To,
        Xml: Xml,
      };

      if (Subject) Request.subject = Subject;

      if (Language) Request.language = Language;

      if (Id) Request.id = Id;

      const Response = await AgentAPI.IO.Request(
        '/Agent/Xmpp/SendXmlMessage',
        Request
      );

      if (!Response.sent) throw new Error('Message not sent.');

      return Response.id;
    },
    SendPresenceSubscription: async function (
      To: any,
      CustomXml: any,
      Language: any,
      Id: any
    ) {
      const Request = {
        to: To,
      };

      if (CustomXml) Request.customXml = CustomXml;

      if (Language) Request.language = Language;

      if (Id) Request.id = Id;

      const Response = await AgentAPI.IO.Request(
        '/Agent/Xmpp/SendPresenceSubscription',
        Request
      );

      if (!Response.sent) throw new Error('Subscription not sent.');

      return Response.id;
    },
    SendPresenceUnsubscription: async function (To: any, Id: any) {
      const Request = {
        to: To,
      };

      if (Id) Request.id = Id;

      const Response = await AgentAPI.IO.Request(
        '/Agent/Xmpp/SendPresenceUnsubscription',
        Request
      );

      if (!Response.sent) throw new Error('Unsubscription not sent.');

      return Response.id;
    },
    SendSubscriptionAccepted: async function (To: any, Id: any) {
      const Request = {
        to: To,
      };

      if (Id) Request.id = Id;

      const Response = await AgentAPI.IO.Request(
        '/Agent/Xmpp/SendSubscriptionAccepted',
        Request
      );

      if (!Response.sent) throw new Error('Subscription acceptance not sent.');

      return Response.id;
    },
    SendSubscriptionDeclined: async function (To: any, Id: any) {
      const Request = {
        to: To,
      };

      if (Id) Request.id = Id;

      const Response = await AgentAPI.IO.Request(
        '/Agent/Xmpp/SendSubscriptionDeclined',
        Request
      );

      if (!Response.sent) throw new Error('Subscription declination not sent.');

      return Response.id;
    },
    GetRoster: async function (Offset: any, MaxCount: any) {
      const Request = {
        offset: Offset,
        maxCount: MaxCount,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Xmpp/GetRoster',
        Request
      );

      return Response;
    },
    GetRosterItem: async function (BareJid: any) {
      const Request = {
        bareJid: BareJid,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Xmpp/GetRosterItem',
        Request
      );

      return Response;
    },
    SetRosterItem: async function (BareJid: any, Name: any, Groups: any) {
      const Request = {
        bareJid: BareJid,
        name: Name,
        Groups: Groups,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Xmpp/SetRosterItem',
        Request
      );

      return Response;
    },
    RemoveRosterItem: async function (BareJid: any) {
      const Request = {
        bareJid: BareJid,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Xmpp/RemoveRosterItem',
        Request
      );

      return Response;
    },
    PresenceProbe: async function (BareJid: any) {
      const Request = {
        to: BareJid,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Xmpp/PresenceProbe',
        Request
      );

      return Response;
    },
    InformationQuery: async function (BareJid: any, Type: any, QueryXml: any) {
      const Request = {
        to: BareJid,
        type: Type,
        xml: QueryXml,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Xmpp/InformationQuery',
        Request
      );

      return Response;
    },
    PopMessages: async function (MaxCount: any) {
      const Request = {
        maxCount: MaxCount,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Xmpp/PopMessages',
        Request
      );

      return Response;
    },
  },
  Storage: {
    SavePrivateXml: async function (Xml: any) {
      const Request = {
        xml: Xml,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Storage/SavePrivateXml',
        Request
      );

      return Response;
    },
    LoadPrivateXml: async function (LocalName: any, Namespace: any) {
      const Request = {
        localName: LocalName,
        namespace: Namespace,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Storage/LoadPrivateXml',
        Request
      );

      return Response;
    },
  },
  Crypto: {
    GetAlgorithms: async function () {
      const Request = {};
      const Response = await AgentAPI.IO.Request(
        '/Agent/Crypto/GetAlgorithms',
        Request
      );

      return Response;
    },
    CreateKey: async function (
      LocalName: string,
      Namespace: string,
      Id: string,
      KeyPassword: any,
      AccountPassword: any
    ) {
      const UserName = AgentAPI.Account.GetSessionString('AgentAPI.UserName');
      const Nonce = AgentAPI.Account.getRandomValues(32);

      const s1 =
        UserName + ':' + host + ':' + LocalName + ':' + Namespace + ':' + Id;
      const KeySignature = await AgentAPI.Account.Sign(KeyPassword, s1);
      const s2 = s1 + ':' + KeySignature + ':' + Nonce;
      const RequestSignature = await AgentAPI.Account.Sign(AccountPassword, s2);

      const Request = {
        localName: LocalName,
        namespace: Namespace,
        id: Id,
        nonce: Nonce,
        keySignature: KeySignature,
        requestSignature: RequestSignature,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Crypto/CreateKey',
        Request
      );

      return Response;
    },
    GetPublicKey: async function (KeyId: any) {
      const Request = {};

      if (KeyId) Request.keyId = KeyId;

      const Response = await AgentAPI.IO.Request(
        '/Agent/Crypto/GetPublicKey',
        Request
      );

      return Response;
    },
  },
  Legal: {
    ApplyId: async function (
      LocalName: string,
      Namespace: string,
      KeyId: string,
      KeyPassword: any,
      AccountPassword: any,
      Properties: { [x: string]: any }
    ) {
      const UserName = AgentAPI.Account.GetSessionString('AgentAPI.UserName');
      const Nonce = AgentAPI.Account.getRandomValues(32);
      const s1 =
        UserName + ':' + host + ':' + LocalName + ':' + Namespace + ':' + KeyId;
      const KeySignature = await AgentAPI.Account.Sign(KeyPassword, s1);
      let s2 = s1 + ':' + KeySignature + ':' + Nonce;
      const PropertiesVector = [];

      for (const PropertyName in Properties) {
        const PropertyValue = Properties[PropertyName];
        s2 += ':' + PropertyName + ':' + PropertyValue;
        PropertiesVector.push({
          name: PropertyName,
          value: PropertyValue,
        });
      }

      const RequestSignature = await AgentAPI.Account.Sign(AccountPassword, s2);

      const Request = {
        keyId: KeyId,
        nonce: Nonce,
        keySignature: KeySignature,
        requestSignature: RequestSignature,
        Properties: PropertiesVector,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Legal/ApplyId',
        Request
      );

      return Response;
    },
    AddIdAttachment: async function (
      LocalName: string,
      Namespace: string,
      KeyId: string,
      KeyPassword: any,
      AccountPassword: any,
      LegalId: any,
      Attachment: string,
      FileName: string,
      ContentType: string
    ) {
      const UserName = AgentAPI.Account.GetSessionString('AgentAPI.UserName');
      const Nonce = AgentAPI.Account.getRandomValues(32);
      const s1 =
        UserName + ':' + host + ':' + LocalName + ':' + Namespace + ':' + KeyId;
      const KeySignature = await AgentAPI.Account.Sign(KeyPassword, s1);
      const s2 =
        s1 +
        ':' +
        KeySignature +
        ':' +
        Nonce +
        ':' +
        Attachment +
        ':' +
        FileName +
        ':' +
        ContentType;

      const RequestSignature = await AgentAPI.Account.Sign(AccountPassword, s2);

      const Request = {
        keyId: KeyId,
        legalId: LegalId,
        nonce: Nonce,
        keySignature: KeySignature,
        requestSignature: RequestSignature,
        attachmentBase64: Attachment,
        attachmentFileName: FileName,
        attachmentContentType: ContentType,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Legal/AddIdAttachment',
        Request
      );

      return Response;
    },
    CreateContract: async function (
      TemplateId: any,
      Visibility: any,
      Parts: any,
      Parameters: { [x: string]: any }
    ) {
      const ParametersVector = [];

      for (const ParameterName in Parameters) {
        ParametersVector.push({
          name: ParameterName,
          value: Parameters[ParameterName],
        });
      }

      const Request = {
        templateId: TemplateId,
        visibility: Visibility,
        Parts: Parts,
        Parameters: ParametersVector,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Legal/CreateContract',
        Request
      );

      return Response;
    },
    GetIdentity: async function (LegalId: any) {
      const Request = {
        legalId: LegalId,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Legal/GetIdentity',
        Request
      );

      return Response;
    },
    GetContract: async function (ContractId: any) {
      const Request = {
        contractId: ContractId,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Legal/GetContract',
        Request
      );

      return Response;
    },
    SignContract: async function (
      LocalName: string,
      Namespace: string,
      KeyId: string,
      KeyPassword: any,
      AccountPassword: any,
      ContractId: string,
      LegalId: string,
      Role: string
    ) {
      const UserName = AgentAPI.Account.GetSessionString('AgentAPI.UserName');
      const Nonce = AgentAPI.Account.getRandomValues(32);
      const s1 =
        UserName + ':' + host + ':' + LocalName + ':' + Namespace + ':' + KeyId;
      const KeySignature = await AgentAPI.Account.Sign(KeyPassword, s1);
      const s2 =
        s1 +
        ':' +
        KeySignature +
        ':' +
        Nonce +
        ':' +
        LegalId +
        ':' +
        ContractId +
        ':' +
        Role;
      const RequestSignature = await AgentAPI.Account.Sign(AccountPassword, s2);

      const Request = {
        keyId: KeyId,
        nonce: Nonce,
        keySignature: KeySignature,
        requestSignature: RequestSignature,
        contractId: ContractId,
        legalId: LegalId,
        role: Role,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Legal/SignContract',
        Request
      );

      return Response;
    },
    GetIdentities: async function (Offset: any, MaxCount: any) {
      const Request = {
        offset: Offset,
        maxCount: MaxCount,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Legal/GetIdentities',
        Request
      );

      return Response;
    },
    GetCreatedContracts: async function (Offset: any, MaxCount: any) {
      const Request = {
        offset: Offset,
        maxCount: MaxCount,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Legal/GetCreatedContracts',
        Request
      );

      return Response;
    },
    ReadyForApproval: async function (LegalId: any) {
      const Request = {
        legalId: LegalId,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Legal/ReadyForApproval',
        Request
      );

      return Response;
    },
    SendProposal: async function (
      ContractId: any,
      Role: any,
      To: any,
      Message: any
    ) {
      const Xml =
        "<contractProposal xmlns='urn:ieee:iot:leg:sc:1.0" +
        "' contractId='" +
        AgentAPI.Account.XmlEncode(ContractId) +
        "' role='" +
        AgentAPI.Account.XmlEncode(Role) +
        "' message='" +
        AgentAPI.Account.XmlEncode(Message) +
        "'/>";

      await AgentAPI.Xmpp.SendXmlMessage(To, Xml);
    },
  },
  Wallet: {
    GetBalance: async function () {
      const Request = {};

      const Response = await AgentAPI.IO.Request(
        '/Agent/Wallet/GetBalance',
        Request
      );

      return Response;
    },
    ProcessEDalerUri: async function (Uri: any) {
      const Request = {
        uri: Uri,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Wallet/ProcessEDalerUri',
        Request
      );

      return Response;
    },
    GetServiceProvidersForBuyingEDaler: async function () {
      const Request = {};

      const Response = await AgentAPI.IO.Request(
        '/Agent/Wallet/GetServiceProvidersForBuyingEDaler',
        Request
      );

      return Response;
    },
    GetServiceProvidersForSellingEDaler: async function () {
      const Request = {};

      const Response = await AgentAPI.IO.Request(
        '/Agent/Wallet/GetServiceProvidersForSellingEDaler',
        Request
      );

      return Response;
    },
    InitiateBuyEDaler: async function (
      ServiceId: any,
      ServiceProvider: any,
      Amount: any,
      Currency: any,
      SuccessUrl: any,
      FailureUrl: any,
      CancelUrl: any,
      TransactionId: any,
      TabId: any,
      FunctionName: any
    ) {
      const Request = {
        serviceId: ServiceId,
        serviceProvider: ServiceProvider,
        amount: Amount,
        currency: Currency,
        successUrl: SuccessUrl,
        failureUrl: FailureUrl,
        cancelUrl: CancelUrl,
        transactionId: TransactionId,
        tabId: TabId,
        functionName: FunctionName,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Wallet/InitiateBuyEDaler',
        Request
      );

      return Response;
    },
    InitiateSellEDaler: async function (
      ServiceId: any,
      ServiceProvider: any,
      Amount: any,
      Currency: any,
      SuccessUrl: any,
      FailureUrl: any,
      CancelUrl: any,
      TransactionId: any,
      TabId: any,
      FunctionName: any
    ) {
      const Request = {
        serviceId: ServiceId,
        serviceProvider: ServiceProvider,
        amount: Amount,
        currency: Currency,
        successUrl: SuccessUrl,
        failureUrl: FailureUrl,
        cancelUrl: CancelUrl,
        transactionId: TransactionId,
        tabId: TabId,
        functionName: FunctionName,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Wallet/InitiateSellEDaler',
        Request
      );

      return Response;
    },
    GetTransactionInformation: async function (
      TransactionId: any,
      TabId: any,
      FunctionName: any
    ) {
      const Request = {
        transactionId: TransactionId,
        tabId: TabId,
        functionName: FunctionName,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Wallet/GetTransactionInformation',
        Request
      );

      return Response;
    },
  },
  Tokens: {
    GetTokens: async function (Offset: any, MaxCount: any, References: any) {
      const Request = {
        offset: Offset,
        maxCount: MaxCount,
        references: References,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Tokens/GetTokens',
        Request
      );

      return Response;
    },
    GetContractTokens: async function (
      ContractId: any,
      Offset: any,
      MaxCount: any,
      References: any
    ) {
      const Request = {
        contractId: ContractId,
        offset: Offset,
        maxCount: MaxCount,
        references: References,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Tokens/GetContractTokens',
        Request
      );

      return Response;
    },
    GetCreationAttributes: async function () {
      const Request = {};

      const Response = await AgentAPI.IO.Request(
        '/Agent/Tokens/GetCreationAttributes',
        Request
      );

      return Response;
    },
    GetToken: async function (TokenId: any) {
      const Request = {
        tokenId: TokenId,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Tokens/GetToken',
        Request
      );

      return Response;
    },
    GetDescription: async function (TokenId: any, ReportFormat: any) {
      const Request = {
        tokenId: TokenId,
        reportFormat: ReportFormat,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Tokens/GetDescription',
        Request
      );

      return Response;
    },
    AddTextNote: async function (TokenId: any, Note: any, Personal: any) {
      const Request = {
        tokenId: TokenId,
        note: Note,
        personal: Personal,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Tokens/AddTextNote',
        Request
      );

      return Response;
    },
    AddXmlNote: async function (TokenId: any, Note: any, Personal: any) {
      const Request = {
        tokenId: TokenId,
        note: Note,
        personal: Personal,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Tokens/AddXmlNote',
        Request
      );

      return Response;
    },
    GetTokenEvents: async function (TokenId: any, Offset: any, MaxCount: any) {
      const Request = {
        tokenId: TokenId,
        offset: Offset,
        maxCount: MaxCount,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/Tokens/GetTokenEvents',
        Request
      );

      return Response;
    },
  },
  StateMachines: {
    GetCurrentState: async function (TokenId: any) {
      const Request = {
        tokenId: TokenId,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/StateMachines/GetCurrentState',
        Request
      );

      return Response;
    },
    CreateReport: async function (
      TokenId: any,
      ReportType: any,
      ReportFormat: any
    ) {
      const Request = {
        tokenId: TokenId,
        reportType: ReportType,
        reportFormat: ReportFormat,
      };

      const Response = await AgentAPI.IO.Request(
        '/Agent/StateMachines/CreateReport',
        Request
      );

      return Response;
    },
  },
};

AgentAPI.Account.RestartActiveSession();
