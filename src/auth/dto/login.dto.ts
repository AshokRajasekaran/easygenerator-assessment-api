import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Allow,
  Matches,
  NotContains
} from 'class-validator';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

export class LoginDto {

  @IsEmail()
  @ApiProperty({ description: 'Email' })
  readonly email: string;
  
  @IsNotEmpty({ message: 'Password is mandatory' })
  @IsNotEmpty()
  @MinLength(8, {message: 'Invalid Password'})
  @MaxLength(20, { message: 'Invalid Password'})
  @ApiProperty({
    description: 'Password',
  })
  @NotContains(' ', { message: 'Invalid Password' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message:
      'Invalid Password',
  })
  // Overriding variable delegation from parent class to avoid password policy exposing during login.
  readonly password: string;

  @Allow()
  @ApiHideProperty()
  additionalProperty?: never;
}
