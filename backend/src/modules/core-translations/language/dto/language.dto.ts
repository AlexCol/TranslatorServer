import { IsString, Matches, IsNotEmpty } from 'class-validator';

export class LanguageDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9-_]+$/, {
    message: 'system must contain only alphanumeric characters, hyphens, and underscores',
  })
  system: string;

  @IsString()
  code: string;
}
