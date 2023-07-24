export default {
  language: 'English',
  heading: {
    welcome: 'Welcome to Neuro-Access',
    chooseIntend: 'Choose In what context you intend to use the Neuro-Access',
    getStarted: "Let's get started",
    verifyEmail: 'To get verified, you need to enter your email',
    mobilePlaceHolder: 'xxxxxxxxxx',
  },
  buttonTitle: {
    continue: 'Continue',
    sendCode: 'Send Code',
    resend: 'Resend Code',
    verify: 'Verify',
    close: 'Close',
    search: 'Search',
    done: 'Done',
    unlock: 'Unlock now',
    CreatePin: 'Create pin',
  },
  choosePurposeScreen: {
    label: 'Choose access purpose',
    personalUse: 'Personal use',
    work: 'Work',
    experimental: 'Experimental',
    educational: 'Educational',
  },
  enterEmailScreen: {
    label: 'Enter email',
    placeHolder: 'your.email@email.com',
  },
  enterUserName: {
    label: 'Enter User Name',
    placeHolder: 'user name',
  },
  enterOTPVerifyScreen: {
    header: 'Enter Code',
    message: 'Please enter verification code sent to',
    bellow: 'bellow',
    label: 'Enter verification code',
    emptyFields: 'Please enter the verification code',
    wrongCode: 'Something want wrong, please double check your code',
  },
  enterMobileScreen: {
    message: 'To get verified, you need to enter your phone number',
    label: 'Enter phone number',
  },
  enterUserNameScreen: {
    message: 'To get verified, you need to enter your user name',
    label: 'Enter user name',
  },
  settingScreen: {
    selectLanguage: ' Select Language ',
    changeTheme: 'Change Theme',
  },
  internetSatus: {
    connected: 'Internet Connected',
    disconnected: 'Internet Not Connected!',
  },
  accessPurposeInformation: {
    Personal: {
      title: 'Personal',
      description: `Selecting personal use enables you to use the app for signing in or accessing resources as an individual. Whether managing personal accounts or accessing private information, Neuro-Access provides a convenient and secure way to handle your digital identity.

      Remember that certain operations may have associated costs depending on the service provider. For more information, please check with your service provider.`,
    },
    Work: {
      title: 'Work',
      description: `Choose Neuro-Access for work-related purposes, including non-profit organizations. This option allows you to use the app for work-related sign-ins and access resources as your organization's representative.

      Certain operations may have associated costs depending on the chosen service provider. For more details, please check with your service provider.
      `,
    },
    Experimental: {
      title: 'Experimental',
      description: `Use Neuro-Access for experimental purposes. This option enables you to explore and learn about the capabilities of the technology. Experiment with different applications and functionalities as an individual user.

      Please note that the account may have time limitations and could be removed when it's no longer in use. For more details, please check with your service provider.`,
    },
    Educational: {
      title: 'Educational',
      description: `Select Neuro-Access for educational purposes. Whether you're an educator or a student, this option allows you to use the app for signing in or accessing educational resources.

      Please note that the account may have time limitations and could be removed when it's no longer in use. For further information, please consult your service provider.`,
    },
  },
  serviceProviderInformation: {
    title: 'Service Provider',
    description:
      'A service provider is an organization that helps you connect and manage your digital identity. They offer services that allow you to access and use various online platforms and applications securely. They take care of the technical aspects, authentication, and data protection, so you can focus on enjoying the benefits of the digital world.',
  },
  currentProvider: {
    title: 'Selected Provider',
    providerLink: 'eu.id.tagroot.io',
    detail: 'Your service provider has been selected to',
    continueDetail:
      'To continue, you can create a new account on this provider or change the service provider.',
    optionTitle: 'Choose one option',
    createAccount: 'Create a new account on this provider',
    changeService: 'Change service provider',
    serviceProvider: 'What is a service provider?',
    domainTitle: 'Domain:',
  },
  qrCodeScanner: {
    serviceProviderBtn: 'Point the camera at the QR-code with the above symbol',
    invitaionTitle: 'Scan invitation',
    enterObInfoManuallyTitle: 'Enter QRCode Info or Copy Paste',
    enterObInfoManuallyPlaceholder: 'Enter QRCode Info or Copy Paste here',
    errorQRCodeInfo: 'Please enter correct QRCode Info!',
  },
  tellUsAboutYou: {
    headerTitle: 'Tell us about you',
    detail: 'To use Neuro-Access, we need to know more about you.',
    note: 'Please add an image where you can easily be identified*',
    firstName: 'First name*',
    middleName: 'Middle name(s)',
    lastName: 'Last name*',
    personalNumber: 'Personal number*',
    country: 'Country*',
    address: 'Address*',
    address2: 'Address 2',
    zip: 'Zip or postal code*',
    city: 'City*',
    state: 'State',
    enterFirst: 'Enter first name',
    enterMiddle: 'Enter middle name(s)',
    enterLast: 'Enter last name',
    enterPersonal: 'YYYYMMDD-XXXX',
    enterCountry: 'Enter country name',
    enterAddress: 'Enter address',
    enterZip: 'Enter postal code',
    enterCity: 'Enter city',
    enterState: 'Enter state',
    noteTitle: 'I agree to the',
    terms: 'terms and conditions',
    noteTitleTwo: 'for Neuro-Access',
    nameRequired: 'First name is required',
    lastNameRequired: 'Last name is required',
    personalNumberRequired: 'Personal number is required',
    pnrInvalid: 'Entered presonal number is invalid',
    countryRequired: 'Country is required',
    addressNumberRequired: 'Address is required',
    zipRequired: 'Zip is required',
    cityRequired: 'City is required',
    stateRequired: 'State is required',
    inputRequired: 'Input is required',
    alphabetsValidation: 'only contain alphabets',
    numericValidation: 'only contain numbers',
  },
  almostThere: {
    title: 'Almost there!',
    pendingReview: 'Pending review',
    remainingPeer: 'Remaining peer reviews: ',
    details:
      'You can track the progress of your application below and see who has reviewed your information.',
    checkStatus: 'Check Status',
    reviewProcess: 'Review process',
    peerReview: 'Peer review process',
    invitePeer: 'Invite peer',
  },
  PIN: {
    Title: 'Create a PIN code',
    Description:
      'To enhance the security of your Neuro-Identity and sensitive information, we recommend adding an extra layer of protection by creating a PIN or password.',
    EnterConfirmPinTitle: 'Confirm pin',
    EnterConfirmPinPlaceholder: 'Enter pin again',
    PinIsInvalid: 'PIN is invalid. You have {0} remaining attempts',
    PinIsInvalidAplicationBlockedForever:
      'PIN attempts entering is exceded. Your application has been blocked forever',
    PinIsInvalidAplicationBlocked:
      'PIN attempts entering is exceded. Your application has been blocked till {0}.',
    PinIsInvalidAplicationBlockedTillTomorrow:
      'PIN attempts entering is exceded. Your application has been blocked till tomorrow at {0}.',
    PinIsInvalidAplicationBlockedForOneWeek:
      'PIN attempts entering is exceded. Your application has been blocked for one week',
    PinMustNotIncludeWhitespace:
      'PIN number must not include leading or trailing whitespace.',
    PinOrPassword: 'PIN or password',
    PinsDoNotMatch: 'PINs do not match',
    PinTooShort: 'PIN length must be at least 8 characters.',
    WrongPin: 'Wrong Pin!',
    UnlockTitle: 'Unlock Neuro-Access',
    UnlockDescription:
      'Authentication is required to access the Neuro-Access app, Enter PIN!',
    EnterPinPlaceholder: 'Enter pin',
    NotEnoughDigitsOrSigns: 'Not Enough Digits Or Signs exist in the Pin!',
    NotEnoughLettersOrDigits: 'Not Enough Letters Or Digits exist in the Pin!',
    NotEnoughLettersOrSigns: 'Not Enough Letters Or Signs exist in the Pin!',
    ContainsAddressExist: 'Contains Address in the Pin!',
    ContainsNameExist: 'Contains Name in the Pin!',
    ContainsPersonalNumberExist: 'Contains Personal Number in the Pin!',
    PhoneNumberExist: 'Contains Phone number in the Pin!',
    EmailExist: 'Contains Email in the Pin!',
    IdenticalSymbolsExist:
      'A PIN must not contain more than 2 identical symbols.',
    SequencedSymbolsExist:
      'A PIN must not contain more than 2 sequenced symbols. \n e.g. "12" or "ab"',
    EnterNewPin: 'Enter new pin',
    PinCreateSuccess: 'Pin Created Successfully!',
    IncorrectPin: 'Incorrect Pin!',
    ConfirmPinRequired: 'Confirm Pin is required!',
    PinDontMatched: 'Your pin do not match!',
    UnlockPinRequired: 'Unlock Pin is required!'
  },
};
