export const maskingPhone = (phoneNumber: string): string => {
  // Ensure the phone number is at least 5 characters long
  if (phoneNumber.length <= 5) {
    throw new Error("Phone number must be longer than 5 characters.");
  }

  const firstPart = phoneNumber.slice(0, 3); // First 3 characters
  const lastPart = phoneNumber.slice(-2); // Last 2 characters
  const maskedPart = '*'.repeat(phoneNumber.length - 5); // Middle part

  return firstPart + maskedPart + lastPart;
};
