import { HttpStatus } from '@nestjs/common';

export const formatResponse = <T>(
  statusCode: HttpStatus,
  message: string,
  data: T,
) => ({
  statusCode,
  message,
  data,
});
