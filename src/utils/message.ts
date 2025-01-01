import { LENGTH_RULES } from 'src/constants';
import { ValidationFields } from 'types';

export const Msg = {
  ERROR_USER_ALREADY_EXISTS() {
    return 'User with this email already exists';
  },
  ERROR_USER_NOT_FOUND() {
    return 'User with this email does not exist';
  },
  ERROR_INCORRECT_PASSWORD() {
    return 'Incorrect password';
  },
  ERROR_MIN_LENGTH(field: ValidationFields) {
    return `${field} must be at least ${LENGTH_RULES[field].min} characters`;
  },
  ERROR_MAX_LENGTH(field: ValidationFields) {
    return `${field} cannot exceed ${LENGTH_RULES[field].max} characters`;
  },
  ERROR_STRING_TYPE(field: ValidationFields) {
    return `${field} must be a string`;
  },
  ERROR_NUMBER_TYPE(field: ValidationFields) {
    return `${field} must be a string`;
  },
  ERROR_REQUIRED(field: ValidationFields) {
    return `${field} is required`;
  },
  ERROR_EMAIL_FORMAT() {
    return 'Email must be a valid email format';
  },
  USER_REGISTERED_SUCCESS() {
    return 'User registered successfully';
  },
  LOGIN_SUCCESS() {
    return 'Login successful';
  },
};
