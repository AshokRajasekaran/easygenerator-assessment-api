import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signupPayload: SignupDto): any {
    return this.authService.signUp(signupPayload);
  }

  @Post('/login')
  login(@Body() loginPayload: LoginDto): any {
    return this.authService.login(loginPayload);
  }
}
