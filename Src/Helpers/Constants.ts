export type LegalIdentity = {
  FIRST: string;
  MIDDLE: string;
  LAST: string;
  ADDR: string;
  ADDR2: string;
};
export const Constants = {
  Authentication: {
    /// <summary>
    /// Minimum length for PIN Code
    /// </summary>
    MinPinLength: 8,

    /// <summary>
    /// Minimum number of symbols from at least two character classes (digits, letters, other) in a PIN.
    /// </summary>
    MinPinSymbolsFromDifferentClasses: 2,

    /// <summary>
    /// Maximum number of identical symbols in a PIN.
    /// </summary>
    MaxPinIdenticalSymbols: 2,

    /// <summary>
    /// Maximum number of sequenced symbols in a PIN.
    /// </summary>
    MaxPinSequencedSymbols: 2,

    /// <summary>
    /// Key for user pin to store locally.
    /// </summary>
    PinKey: 'Pin',

    /// <summary>
    /// Key for user pin to store locally.
    /// </summary>
    ObjectId: 'ObjectId',
  },
  UserDetails: {},
  XmppProperties: {
    FirstName: 'FIRST',
    /// <summary>
    /// Middle name
    /// </summary>
    MiddleName: 'MIDDLE',

    /// <summary>
    /// Last name
    /// </summary>
    LastName: 'LAST',

    /// <summary>
    /// Personal number
    /// </summary>
    PersonalNumber: 'PNR',

    /// <summary>
    /// Address line 1
    /// </summary>
    Address: 'ADDR',

    /// <summary>
    /// Address line 2
    /// </summary>
    Address2: 'ADDR2',

    /// <summary>
    /// Area
    /// </summary>
    Area: 'AREA',

    /// <summary>
    /// City
    /// </summary>
    City: 'CITY',

    /// <summary>
    /// Zip Code
    /// </summary>
    ZipCode: 'ZIP',

    /// <summary>
    /// Region
    /// </summary>
    Region: 'REGION',

    /// <summary>
    /// Country
    /// </summary>
    Country: 'COUNTRY',

    /// <summary>
    /// Organization name
    /// </summary>
    OrgName: 'ORGNAME',

    /// <summary>
    /// Organization number
    /// </summary>
    OrgNumber: 'ORGNR',

    /// <summary>
    /// Organization Address line 1
    /// </summary>
    OrgAddress: 'ORGADDR',

    /// <summary>
    /// Organization Address line 2
    /// </summary>
    OrgAddress2: 'ORGADDR2',

    /// <summary>
    /// Organization Area
    /// </summary>
    OrgArea: 'ORGAREA',

    /// <summary>
    /// Organization City
    /// </summary>
    OrgCity: 'ORGCITY',

    /// <summary>
    /// Organization Zip Code
    /// </summary>
    OrgZipCode: 'ORGZIP',

    /// <summary>
    /// Organization Region
    /// </summary>
    OrgRegion: 'ORGREGION',

    /// <summary>
    /// Organization Country
    /// </summary>
    OrgCountry: 'ORGCOUNTRY',

    /// <summary>
    /// Organization Department
    /// </summary>
    OrgDepartment: 'ORGDEPT',

    /// <summary>
    /// Organization Role
    /// </summary>
    OrgRole: 'ORGROLE',

    /// <summary>
    /// Device ID
    /// </summary>
    DeviceId: 'DEVICE_ID',

    /// <summary>
    /// Jabber ID
    /// </summary>
    Jid: 'JID',

    /// <summary>
    /// Phone number
    /// </summary>
    Phone: 'PHONE',

    /// <summary>
    /// e-Mail address
    /// </summary>
    EMail: 'EMAIL',

    /// <summary>
    /// Apartment
    /// </summary>
    Apartment: 'APT',

    /// <summary>
    /// Room
    /// </summary>
    Room: 'ROOM',

    /// <summary>
    /// Building
    /// </summary>
    Building: 'BLD',
  },
  LegalIdentity: <LegalIdentity>{},
  DefaultValues: {
    Host: 'lab.tagroot.io',
  },
  Pin: {
    // Possible time of inactivity
    PossibleInactivityInMinutes: 5,

    // Maximum pin entering attempts
    MaxPinAttempts: 3,

    /// <summary>
    /// First Block in hours after 3 attempts
    /// </summary>
    FirstBlockInHours:1,
    
    /// <summary>
    /// Second Block in hours after 3 attempts
    /// </summary>
    SecondBlockInHours: 24,
    
    /// <summary>
    /// Third Block in hours after 3 attempts
    /// </summary>
    ThirdBlockInHours: 7*24,
    
    // Key for pin attempt counter
    CurrentPinAttemptCounter: 'CurrentPinAttemptCounter',

    // Log Object ID
    LogAuditorObjectID: 'LogAuditorObjectID',

    // Endpoint for LogAuditor
    RemoteEndpoint: 'local',

    // Protocol for LogAuditor
    Protocol: 'local',

    // Reason for LogAuditor
    Reason: 'pinEnteringFailure',
    
    DateTimeMaxValue: '9999-12-31T23:59:59.9999999Z',

    EnterAttemptsKey: 'Attempts',

    RemainingTime: 'RemainingTime'
  },
};
