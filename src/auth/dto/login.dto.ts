import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Allow,
  Matches,
  NotContains,
} from 'class-validator';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ description: 'Email' })
  readonly email: string;

  @IsNotEmpty({ message: 'Password is mandatory' })
  @MinLength(8, { message: 'Invalid Password' })
  @MaxLength(20, { message: 'Invalid Password' })
  @ApiProperty({
    description: 'Password',
  })
  @NotContains(' ', { message: 'Invalid Password' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message: 'Invalid Password',
  })
  // Overriding variable delegation from parent class to avoid password policy exposing during login.
  readonly password: string;

  @Allow()
  @ApiHideProperty()
  additionalProperty?: never;
}
export class LoginResponseDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'JWT Token to access other APIs' })
  token: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'JWT Token expiry time' })
  expireTime: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Unique User Id' })
  userId: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Registered Name of the User' })
  name: string;

  @ApiProperty({ description: 'Registered Email of the User' })
  @IsNotEmpty()
  email: string;
  
  @Allow()
  @ApiHideProperty()
  additionalProperty?: never;
}