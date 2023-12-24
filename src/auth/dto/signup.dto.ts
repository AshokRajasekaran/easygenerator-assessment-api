import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Allow,
  NotContains,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { LoginDto } from './login.dto';

export class SignupDto extends LoginDto {
  @IsNotEmpty({ message: 'Name is mandatory' })
  @IsString({ message: 'Name Should be a string' })
  @MinLength(4, { message: 'Name must have minimum 4 characters' })
  @MaxLength(36, {
    message:
      'Name cannot Exceed 36 characters , change Last Names to single letter and try again',
  })
  @ApiProperty({ description: 'Name' })
  readonly name: string;

  @IsNotEmpty({ message: 'Password is mandatory' })
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be of minimum 8 characters' })
  @MaxLength(20, { message: 'Password contain less than 20 characters' })
  @ApiProperty({
    description:
      'Password (Minimum 8 characters, 1 letter, 1 number, 1 special character)',
  })
  @NotContains(' ', { message: 'Password must not contain spaces.' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message:
      'Password must be at least 8 characters long and contain at least 1 letter, 1 number, and 1 special character.',
  })
  readonly password: string;

  @Allow()
  @ApiHideProperty()
  additionalProperty?: never;
}
