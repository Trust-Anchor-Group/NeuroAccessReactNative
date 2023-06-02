export const isValidEmail = (text: string): string | undefined => {
  // Email validation regex pattern
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!text) {
    return 'Email is required';
  }
  if (!emailRegex.test(text)) {
    return 'Invalid email address';
  }
  return undefined; // Return undefined if valid
};
