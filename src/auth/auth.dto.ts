import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { LENGTH_RULES, VALIDATION_FIELDS } from 'src/constants';
import { Msg } from 'src/utils/message';

export class CreateUserDto {
  @MinLength(LENGTH_RULES[VALIDATION_FIELDS.NAME].min, {
    message: Msg.ERROR_MIN_LENGTH(VALIDATION_FIELDS.NAME),
  })
  @MaxLength(LENGTH_RULES[VALIDATION_FIELDS.NAME].max, {
    message: Msg.ERROR_MAX_LENGTH(VALIDATION_FIELDS.NAME),
  })
  @IsString({ message: Msg.ERROR_STRING_TYPE(VALIDATION_FIELDS.NAME) })
  @IsNotEmpty({ message: Msg.ERROR_REQUIRED(VALIDATION_FIELDS.NAME) })
  name: string;

  @MinLength(LENGTH_RULES[VALIDATION_FIELDS.EMAIL].min, {
    message: Msg.ERROR_MIN_LENGTH(VALIDATION_FIELDS.EMAIL),
  })
  @MaxLength(LENGTH_RULES[VALIDATION_FIELDS.EMAIL].max, {
    message: Msg.ERROR_MAX_LENGTH(VALIDATION_FIELDS.EMAIL),
  })
  @IsString({ message: Msg.ERROR_STRING_TYPE(VALIDATION_FIELDS.EMAIL) })
  @IsEmail({}, { message: Msg.ERROR_EMAIL_FORMAT() })
  @IsNotEmpty({ message: Msg.ERROR_REQUIRED(VALIDATION_FIELDS.EMAIL) })
  email: string;

  @MinLength(LENGTH_RULES[VALIDATION_FIELDS.PASSWORD].min, {
    message: Msg.ERROR_MIN_LENGTH(VALIDATION_FIELDS.PASSWORD),
  })
  @MaxLength(LENGTH_RULES[VALIDATION_FIELDS.PASSWORD].max, {
    message: Msg.ERROR_MAX_LENGTH(VALIDATION_FIELDS.PASSWORD),
  })
  @IsString({ message: Msg.ERROR_STRING_TYPE(VALIDATION_FIELDS.PASSWORD) })
  @IsNotEmpty({ message: Msg.ERROR_REQUIRED(VALIDATION_FIELDS.PASSWORD) })
  password: string;
}

export class LoginDto {
  @IsNotEmpty({ message: Msg.ERROR_REQUIRED(VALIDATION_FIELDS.EMAIL) })
  @IsString({ message: Msg.ERROR_STRING_TYPE(VALIDATION_FIELDS.EMAIL) })
  @IsEmail({}, { message: Msg.ERROR_EMAIL_FORMAT() })
  email: string;

  @IsNotEmpty({ message: Msg.ERROR_REQUIRED(VALIDATION_FIELDS.PASSWORD) })
  @IsString({ message: Msg.ERROR_STRING_TYPE(VALIDATION_FIELDS.PASSWORD) })
  password: string;
}
