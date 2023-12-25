import { Controller, Post, Body, Response } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { SignupDto, SignupResponseDto } from './dto/signup.dto';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { ErorResponseDto } from './dto/error.dto';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiResponse({
    status: 200,
    description: 'Successful Signup',
    type: SignupDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ErorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ErorResponseDto,
  })
  signUp(@Body() signupPayload: SignupDto): Promise<SignupResponseDto> {
    return this.authService.signUp(signupPayload);
  }

  @Post('/login')
  @ApiResponse({
    status: 200,
    description: 'Successful login',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ErorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User Not Found',
    type: ErorResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'User Unauthorised',
    type: ErorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ErorResponseDto,
  })
  login(@Body() loginPayload: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginPayload);
  }
}
