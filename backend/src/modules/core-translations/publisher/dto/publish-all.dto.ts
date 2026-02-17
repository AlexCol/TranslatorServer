import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString, Matches } from 'class-validator';

export class PublishAllDto {
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
  @IsIn(['dev', 'prod'], { message: 'from must be one of: dev, prod' })
  from: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsIn(['dev', 'prod'], { message: 'to must be one of: dev, prod' })
  to: string;
}
