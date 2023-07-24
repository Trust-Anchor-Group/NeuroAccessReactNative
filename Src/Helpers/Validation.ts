import * as yup from 'yup';
import { Constants } from './Constants';
import { PinStrength } from './Enums/PinStrength';

export const isValidEmail = (text: string): string | undefined => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!text) {
    return 'Email is required';
  }
  if (!emailRegex.test(text)) {
    return 'Invalid email address';
  }
  return undefined;
};

export const isValidPhone = (
  phoneNumber: string,
  phoneNumberWithCode: string
): string | undefined => {
  const regexPattern = /^\+[1-9]\d{4,}$/;
  const isMatch: boolean = regexPattern.test(phoneNumberWithCode);
  if (!phoneNumber) {
    return 'Phone number is required';
  } else if (!isMatch) {
    return 'Invalid phone number';
  }
  return undefined;
};

export const validationSchema = yup.object().shape({
  profileImage: yup
    .string()
    .min(2, 'tellUsAboutYou.inputRequired')
    .required('tellUsAboutYou.inputRequired'),
  firstName: yup
    .string()
    .min(2, 'tellUsAboutYou.nameRequired')
    .required('tellUsAboutYou.nameRequired'),
  lastName: yup
    .string()
    .min(2, 'tellUsAboutYou.lastNameRequired')
    .required('tellUsAboutYou.lastNameRequired'),
  personalNumber: yup
    .string()
    .min(10, 'tellUsAboutYou.personalNumberRequired')
    .required('tellUsAboutYou.personalNumberRequired'),
  country: yup
    .string()
    .min(2, 'tellUsAboutYou.countryRequired')
    .required('tellUsAboutYou.countryRequired'),
  address: yup
    .string()
    .min(5, 'tellUsAboutYou.addressNumberRequired')
    .required('tellUsAboutYou.addressNumberRequired'),
  zip: yup
    .string()
    .min(5, 'tellUsAboutYou.zipRequired')
    .required('tellUsAboutYou.zipRequired'),
  city: yup
    .string()
    .min(2, 'tellUsAboutYou.cityRequired')
    .required('tellUsAboutYou.cityRequired'),
  isTermCondition: yup.boolean().oneOf([true], 'tellUsAboutYou.inputRequired'),
});

export const unlockAppValidationSchema = yup.object().shape({
  confirmPin: yup
    .string()
    .min(8, 'Confirm Pin is required!')
    .required('Confirm Pin is required!'),
});

export const pinValidationSchema = yup.object().shape({
  newPin: yup.string().test('validator-custom-name', function (value) {
    const result = validatePinStrength(value ? value : '');
    const msg = getPinValidationErrorMsg(result);
    if (msg) {
      return this.createError({
        path: this.path,
        message: msg,
      });
    } else {
      return true;
    }
  }).min(8, 'PIN.PinTooShort')
  ,
  confirmPin: yup
    .string()
    .oneOf([yup.ref('newPin')], 'Your pin do not match!')
    .required('Confirm Pin is required!'),
});

const getPinValidationErrorMsg = (result: number) => {
  let msg = '';
  switch (result) {
    case PinStrength.NotEnoughDigitsLettersSigns:
      msg = 'PIN.PinTooShort';
    case PinStrength.NotEnoughDigitsOrSigns:
      msg = 'PIN.NotEnoughDigitsOrSigns';
      break;
    case PinStrength.NotEnoughLettersOrDigits:
      msg = 'PIN.NotEnoughLettersOrDigits';
      break;
    case PinStrength.NotEnoughLettersOrSigns:
      msg = 'PIN.NotEnoughLettersOrSigns';
      break;
    case PinStrength.ContainsAddress:
      msg = 'PIN.ContainsAddressExist';
      break;
    case PinStrength.ContainsName:
      msg = 'PIN.ContainsNameExist';
      break;
    case PinStrength.ContainsPersonalNumber:
      msg = 'PIN.ContainsPersonalNumberExist';
      break;
    case PinStrength.ContainsPhoneNumber:
      msg = 'PIN.PhoneNumberExist';
      break;
    case PinStrength.ContainsEMail:
      msg = 'PIN.ContainsEmailExist';
      break;
    case PinStrength.TooManyIdenticalSymbols:
      msg = 'PIN.IdenticalSymbolsExist';
      break;
    case PinStrength.TooManySequencedSymbols:
      msg =
        'PIN.SequencedSymbolsExist';
      break;
    default:
      msg = '';
  }
  return msg;
};

function validatePinStrength(Pin: string): PinStrength {
  const userDetails = Constants.UserDetails;
  if (Pin === null) {
    return PinStrength.NotEnoughDigitsLettersSigns;
  }
  // Remove diacritical marks (if any)
  Pin = Pin.normalize();

  let DigitsCount = 0;
  let LettersCount = 0;
  let SignsCount = 0;

  const DistinctSymbolsCount: Record<number, number> = {};

  const SlidingWindow: number[] = new Array(
    Constants.Authentication.MaxPinSequencedSymbols + 1
  ).fill(0);

  for (let i = 0; i < Pin.length; ) {
    if (/\d/.test(Pin[i])) {
      DigitsCount++;
    } else if (/[a-zA-Z]/.test(Pin[i])) {
      LettersCount++;
    } else {
      SignsCount++;
    }

    const Symbol = Pin.codePointAt(i)!;

    if (DistinctSymbolsCount.hasOwnProperty(Symbol)) {
      const SymbolCount = DistinctSymbolsCount[Symbol];
      DistinctSymbolsCount[Symbol] = SymbolCount + 1;
      if (SymbolCount > Constants.Authentication.MaxPinIdenticalSymbols) {
        return PinStrength.TooManyIdenticalSymbols;
      }
    } else {
      DistinctSymbolsCount[Symbol] = 1;
    }

    for (let j = 0; j < SlidingWindow.length - 1; j++) {
      SlidingWindow[j] = SlidingWindow[j + 1];
    }
    SlidingWindow[SlidingWindow.length - 1] = Symbol;

    const SlidingWindowDifferences = new Array(SlidingWindow.length - 1).fill(
      0
    );
    for (let j = 0; j < SlidingWindow.length - 1; j++) {
      SlidingWindowDifferences[j] = SlidingWindow[j + 1] - SlidingWindow[j];
    }

    if (SlidingWindowDifferences.every((difference) => difference === 1)) {
      return PinStrength.TooManySequencedSymbols;
    }

    if (/\uD800|\uDFFF/.test(Pin[i])) {
      i += 2;
    } else {
      i += 1;
    }
  }
  // Assuming LegalIdentity is defined somewhere
  const Comparison = (a: string, b: string) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' }) === 0;

  if (userDetails) {
    const PersonalNumber = userDetails?.mobileNumber?.number;
    if (
      typeof PersonalNumber === 'string' &&
      PersonalNumber !== '' &&
      Pin.includes(PersonalNumber)
    )
      return PinStrength.ContainsPersonalNumber;

    const Phone = userDetails?.mobileNumber?.number;
    if (typeof Phone === 'string' && Phone !== '' && Pin.includes(Phone))
      return PinStrength.ContainsPhoneNumber;

    const EMail = userDetails?.email;
    if (typeof EMail === 'string' && EMail !== '' && Pin.includes(EMail))
      return PinStrength.ContainsEMail;

    const NameWords: string[] = [
      Constants.XmppProperties.FirstName,
      Constants.XmppProperties.MiddleName,
      Constants.XmppProperties.LastName,
    ]
      .flatMap((PropertyKey) => {
        const PropertyValue = Constants.LegalIdentity[PropertyKey];
        return typeof PropertyValue === 'string'
          ? PropertyValue.split(/\p{Zs}+/)
          : [];
      })
      .filter((Word) => Word?.length > 2);

    if (NameWords.some((NameWord) => Pin.includes(NameWord, Comparison)))
      return PinStrength.ContainsName;

    const AddressWords = [Constants.XmppProperties.Address, Constants.XmppProperties.Address2]
      .flatMap((PropertyKey) => {
        const PropertyValue = Constants.LegalIdentity[PropertyKey];
        return typeof PropertyValue === 'string'
          ? PropertyValue.split(/\p{Zs}+/)
          : [];
      })
      .filter((Word) => Word?.length > 2);

    if (
      AddressWords.some((AddressWord) => Pin.includes(AddressWord, Comparison))
    )
      return PinStrength.ContainsAddress;
  }

  const MinDigitsCount =
    Constants.Authentication.MinPinSymbolsFromDifferentClasses;
  const MinLettersCount =
    Constants.Authentication.MinPinSymbolsFromDifferentClasses;
  const MinSignsCount =
    Constants.Authentication.MinPinSymbolsFromDifferentClasses;

  if (
    DigitsCount < MinDigitsCount &&
    LettersCount < MinLettersCount &&
    SignsCount < MinSignsCount
  ) {
    return PinStrength.NotEnoughDigitsLettersSigns;
  }

  if (
    DigitsCount >= MinDigitsCount &&
    LettersCount < MinLettersCount &&
    SignsCount < MinSignsCount
  ) {
    return PinStrength.NotEnoughLettersOrSigns;
  }

  if (
    DigitsCount < MinDigitsCount &&
    LettersCount >= MinLettersCount &&
    SignsCount < MinSignsCount
  ) {
    return PinStrength.NotEnoughDigitsOrSigns;
  }

  if (
    DigitsCount < MinDigitsCount &&
    LettersCount < MinLettersCount &&
    SignsCount >= MinSignsCount
  ) {
    return PinStrength.NotEnoughLettersOrDigits;
  }

  if (
    DigitsCount + LettersCount + SignsCount <
    Constants.Authentication.MinPinLength
  ) {
    return PinStrength.TooShort;
  }

  return PinStrength.Strong;
}
