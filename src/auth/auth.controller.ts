import { Controller, Body, Post, HttpCode, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidationPipe } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { ErrorException } from 'src/error/error.exception';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  async login(@Body() userData: LoginUserDto) {
    try {
      const { username, password } = userData;
      const user = await this.authService.validateUserLogin(username, password);
      const { token } = await this.authService.login(user);
      return { token, message: 'Login successful' };
    } catch (error) {
      throw new ErrorException(error);
    }
  }
}
