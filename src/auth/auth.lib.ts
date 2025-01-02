import { Socket } from 'socket.io';
import { AuthTokenSource } from 'types';

export const extractTokenFromHeader = (
  source: AuthTokenSource,
): string | undefined => {
  console.log('Extracting token');
  const authorization =
    source instanceof Socket
      ? source.handshake.headers.authorization
      : source.headers['authorization'];

  const [type, token] = authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
};
