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
      return {
        token,
        message: 'Login successful',
        user_info: { id: user.id, name: user.name, balance: user.balance },
      };
    } catch (error) {
      throw new ErrorException(error);
    }
  }

  @Post('auth/register')
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  async register(@Body() userData: LoginUserDto) {
    try {
      const { username, password } = userData;
      const user = await this.authService.validateUserRegister(
        username,
        password,
      );
      const { token } = await this.authService.login(user);
      return {
        token,
        message: 'Register successful',
        user_info: { id: user.id, name: user.name, balance: user.balance },
      };
    } catch (error) {
      throw new ErrorException(error);
    }
  }
}
