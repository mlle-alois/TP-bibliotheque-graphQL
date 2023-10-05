import { UnauthorizedException } from '@nestjs/common';

// oblige à fournir un token dans le header de chaque requête, on vérifiera le format dans les services sous-jacents
export const authContext = ({ req }) => {
  if (req.headers?.authorization) {
    return {
      authorization: req.headers?.authorization,
    };
  }
  throw new UnauthorizedException();
};
