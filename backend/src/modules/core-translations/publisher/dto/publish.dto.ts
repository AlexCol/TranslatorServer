import { IsString } from 'class-validator';

export class PublishDto {
  @IsString()
  system: string;

  @IsString()
  language: string;

  @IsString()
  namespace: string;

  @IsString()
  from: string;

  @IsString()
  to: string;
}
