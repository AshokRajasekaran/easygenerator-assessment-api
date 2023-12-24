import {
  IsNotEmpty,
  Allow,
} from 'class-validator';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

export class ErorResponseDto {
  @ApiProperty({ description: 'Response Status Code' })
  @IsNotEmpty()
  statusCode: number;

  @ApiProperty({ description: 'Request Url Path' })
  @IsNotEmpty()
  path: string;

  @ApiProperty({ description: 'Error Message' })
  @IsNotEmpty()
  errorMessage: string;

  @ApiProperty({ description: 'Error Display Message for end user' })
  displayMessage: string;

  @Allow()
  @ApiHideProperty()
  additionalProperty?: never;
}
