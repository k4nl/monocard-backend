import { Controller, Request, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Request() req: any) {
    try {
      const { username, password } = req.body;
      const user = await this.authService.validateUserLogin(username, password);
      const { token } = await this.authService.login(user);
      return { token, message: 'Login successful' };
    } catch (error) {
      return error;
    }
  }
}
