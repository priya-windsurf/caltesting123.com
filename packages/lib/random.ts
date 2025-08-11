import { randomBytes } from "crypto";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const CHARACTERS_LENGTH = CHARACTERS.length;

/**
 * Generate a cryptographically secure random string of a given length using alphanumeric characters.
 */
export const randomString = function (length = 12) {
  let result = "";
  const randomBytesBuffer = randomBytes(length);

  for (let i = 0; i < length; i++) {
    result += CHARACTERS.charAt(randomBytesBuffer[i] % CHARACTERS_LENGTH);
  }

  return result;
};
