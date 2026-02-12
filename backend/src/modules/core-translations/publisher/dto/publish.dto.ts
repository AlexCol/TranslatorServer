import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString, Matches } from 'class-validator';

export class PublishDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9-_]+$/, {
    message: 'system must contain only alphanumeric characters, hyphens, and underscores',
  })
  system: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z]{2}(-[A-Z]{2})?$/, {
    message: 'language must be in format xx or xx-YY (example: en or pt-BR)',
  })
  language: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9-_]+$/, {
    message: 'namespace must contain only alphanumeric characters, hyphens, and underscores',
  })
  namespace: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsIn(['dev', 'prod'], { message: 'from must be one of: dev, prod' })
  from: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsIn(['dev', 'prod'], { message: 'to must be one of: dev, prod' })
  to: string;
}
