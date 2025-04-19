import { Controller, UseGuards, Get, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('login')
  @UseGuards(AuthGuard('oidc'))
  login() {
    // Passport will redirect to Auth0
  }

  @Get('callback')
  @UseGuards(AuthGuard('oidc'))
  callback(@Req() req: Request, @Res() res: Response) {
    // Access user info on req.user
    res.redirect(`/?user=${JSON.stringify(req.user)}`);
  }
}