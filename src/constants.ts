export const JWT_CONFIG = {
  ACCESS_TOKEN_EXPIRES: '1h',
  SECRET: process.env.JWT_SECRET,
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
  // User fields
  NAME = 'Name',
  EMAIL = 'Email',
  PASSWORD = 'Password',

  // Order fields
  ORDER_DESCRIPTION = 'Description',
  ORDER_SPECIFICATIONS = 'Specifications',
  ORDER_QUANTITY = 'Quantity',
}
/**
 * Defines the minimum and maximum length rules for various validation fields used throughout the application.
 */
export const LENGTH_RULES = {
  [VALIDATION_FIELDS.NAME]: { min: 2, max: 50 },
  [VALIDATION_FIELDS.EMAIL]: { min: 2, max: 50 },
  [VALIDATION_FIELDS.PASSWORD]: { min: 6, max: 100 },
  [VALIDATION_FIELDS.ORDER_DESCRIPTION]: { min: 3, max: 300 },
  [VALIDATION_FIELDS.ORDER_SPECIFICATIONS]: { min: 10, max: undefined },
  [VALIDATION_FIELDS.ORDER_QUANTITY]: { min: 1, max: 1000 },
} as const;
