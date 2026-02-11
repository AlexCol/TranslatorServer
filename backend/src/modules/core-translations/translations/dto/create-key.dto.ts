import { IsString } from 'class-validator';
export class CreateKeyDto {
  @IsString()
  key: string;
}
