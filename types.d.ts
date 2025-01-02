import { Request } from 'express';
import { Socket } from 'socket.io';
import { VALIDATION_FIELDS } from 'src/constants';

/**
 * Creates a union type of validation fields from the `VALIDATION_FIELDS` constant.
 */
type ValidationFields =
  (typeof VALIDATION_FIELDS)[keyof typeof VALIDATION_FIELDS];

type AuthTokenSource = Request | Socket;
