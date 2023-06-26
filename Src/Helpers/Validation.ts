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
