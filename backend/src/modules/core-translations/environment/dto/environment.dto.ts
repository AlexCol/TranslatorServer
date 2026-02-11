import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class EnvironmentDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9-_]+$/, {
    message: 'system must contain only alphanumeric characters, hyphens, and underscores',
  })
  system: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9-_]+$/, {
    message: 'environment must contain only alphanumeric characters, hyphens, and underscores',
  })
  environment: string;
}
