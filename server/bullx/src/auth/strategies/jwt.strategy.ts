import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
       // Get token from Authorization: Bearer <token>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Disable audience/issuer check here and validate manually in validate()
      ignoreExpiration: false,
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
      }),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    const expectedAud = process.env.AUTH0_AUDIENCE;
    const expectedIss = `https://${process.env.AUTH0_DOMAIN}/`;

    if (payload.aud !== expectedAud) {
      throw new Error(`Invalid audience: expected "${expectedAud}", got "${payload.aud}"`);
    }

    if (payload.iss !== expectedIss) {
      throw new Error(`Invalid issuer: expected "${expectedIss}", got "${payload.iss}"`);
    }

    return payload;
  }
}
