import {
  IsBooleanString,
  IsDateString,
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserDataDto {
  @IsOptional()
  @IsString()
  username?: string;
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsDateString()
  registrationdate?: Date;
  @IsOptional()
  @IsBooleanString()
  confirmed?: boolean;
  @IsOptional()
  @IsBooleanString()
  canceled?: boolean;
  @IsOptional()
  @IsNumberString()
  typeid?: number;
  @IsOptional()
  @IsNumberString()
  countryid?: number;
}
