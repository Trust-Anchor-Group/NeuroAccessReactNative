import * as yup from 'yup';

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
    .required('tellUsAboutYou.nameRequired')
    .matches(/^[a-zA-Z]+$/, 'tellUsAboutYou.alphabetsValidation'),
  lastName: yup
    .string()
    .min(2, 'tellUsAboutYou.lastNameRequired')
    .required('tellUsAboutYou.lastNameRequired')
    .matches(/^[a-zA-Z]+$/, 'tellUsAboutYou.alphabetsValidation'),
  personalNumber: yup
    .string()
    .min(10, 'tellUsAboutYou.personalNumberRequired')
    .required('tellUsAboutYou.personalNumberRequired')
    .matches(/^[0-9]+$/, 'tellUsAboutYou.numericValidation'),
  country: yup
    .string()
    .min(2, 'tellUsAboutYou.countryRequired')
    .required('tellUsAboutYou.countryRequired')
    .matches(/^[a-zA-Z]+$/, 'tellUsAboutYou.alphabetsValidation'),
  address: yup
    .string()
    .min(5, 'tellUsAboutYou.addressNumberRequired')
    .required('tellUsAboutYou.addressNumberRequired'),
  zip: yup
    .string()
    .min(5, 'tellUsAboutYou.zipRequired')
    .required('tellUsAboutYou.zipRequired')
    .matches(/^[0-9]+$/, 'tellUsAboutYou.numericValidation'),
  city: yup
    .string()
    .min(2, 'tellUsAboutYou.cityRequired')
    .required('tellUsAboutYou.cityRequired')
    .matches(/^[a-zA-Z]+$/, 'tellUsAboutYou.alphabetsValidation'),
  state: yup
    .string()
    .min(2, 'tellUsAboutYou.stateRequired')
    .required('tellUsAboutYou.stateRequired')
    .matches(/^[a-zA-Z]+$/, 'tellUsAboutYou.alphabetsValidation'),
  isTermCondition: yup.boolean().oneOf([true], 'tellUsAboutYou.inputRequired'),
});
