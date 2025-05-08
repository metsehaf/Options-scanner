import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(); // 📢 this will tag logs with 'ScannerService'
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
      audience: ['https://bullx/api', 'https://dev-ou8ki4nzggfqjzsq.ca.auth0.com/userinfo'],
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    this.logger.log('Validating JWT payload', payload);
  
    const expectedAud = process.env.AUTH0_AUDIENCE || 'https://dev-ou8ki4nzggfqjzsq.ca.auth0.com/userinfo';
    const expectedIss = `https://${process.env.AUTH0_DOMAIN}/`;
  
    const aud = payload.aud;
  
    // ✅ Handle array or string audience
    const isAudienceValid = Array.isArray(aud)
      ? aud.includes(expectedAud)
      : aud === expectedAud;
  
    if (!isAudienceValid) {
      throw new Error(`Invalid audience: expected "${expectedAud}", got "${aud}"`);
    }
  
    if (payload.iss !== expectedIss) {
      throw new Error(`Invalid issuer: expected "${expectedIss}", got "${payload.iss}"`);
    }
  
    return payload;
  }
  
}
