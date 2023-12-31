export enum ValidateProfileError {
  INCORRECT_USER_DATA = "INCORRECT_USER_DATA",
  INCORRECT_AGE = "INCORRECT_AGE",
  INCORRECT_COUNTRY = "INCORRECT_COUNTRY",
  INCORRECT_CURRENCY = "INCORRECT_CURRENCY",
  INCORRECT_LASTNAME = "INCORRECT_LASTNAME",
  INCORRECT_EMAIL = "INCORRECT_EMAIL",
  INCORRECT_USERNAME = "INCORRECT_USERNAME",
  INCORRECT_AVATAR = "INCORRECT_AVATAR",
  INCORRECT_FIRSTNAME = "INCORRECT_FIRSTNAME",
  NO_DATA = "NO_DATA",
  SERVER_ERROR = "SERVER_ERROR",
}

export const REG_EXP_EMAIL: RegExp = new RegExp(
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/
);
