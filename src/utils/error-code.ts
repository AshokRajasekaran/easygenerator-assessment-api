// Enum representing different error message codes in the application
export enum ErrorMessageCode {
  // Error code for unauthorized user access
  UNAUTHORISED_USER = 'UNAUTHORISED_USER',

  // Error code for user not found in the system
  USER_NOT_FOUND = 'USER_NOT_FOUND',

  // Error code for when an email already exists in the system (duplicate email)
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',

  // Error code for incorrect password provided by the user
  INCORRET_PASSWORD = 'INCORRET_PASSWORD',
}