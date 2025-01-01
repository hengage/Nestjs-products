export const JWT_CONFIG = {
  ACCESS_TOKEN_EXPIRES: '1h',
};

export enum HttpMethods {
  GET = 'GET',
  HEAD = 'HEAD',
  PUT = 'PUT',
  PATCH = 'PATCH',
  POST = 'POST',
  DELETE = 'DELETE',
}

/**
 * Defines the names of the validation fields used throughout the application.
 */
export enum VALIDATION_FIELDS {
  NAME = 'Name',
  EMAIL = 'Email',
  PASSWORD = 'Password',
}

/**
 * Defines the minimum and maximum length rules for various validation fields used throughout the application.
 */
export const LENGTH_RULES = {
  [VALIDATION_FIELDS.NAME]: { min: 2, max: 50 },
  [VALIDATION_FIELDS.EMAIL]: { min: 2, max: 50 },
  [VALIDATION_FIELDS.PASSWORD]: { min: 6, max: 100 },
} as const;
