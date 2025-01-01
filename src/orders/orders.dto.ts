import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { LENGTH_RULES, VALIDATION_FIELDS } from 'src/constants';
import { Msg } from 'src/utils/message';

export class CreateOrderDto {
  @MinLength(LENGTH_RULES[VALIDATION_FIELDS.ORDER_DESCRIPTION].min, {
    message: Msg.ERROR_MIN_LENGTH(VALIDATION_FIELDS.ORDER_DESCRIPTION),
  })
  @MaxLength(LENGTH_RULES[VALIDATION_FIELDS.ORDER_DESCRIPTION].max, {
    message: Msg.ERROR_MAX_LENGTH(VALIDATION_FIELDS.ORDER_DESCRIPTION),
  })
  @IsString({
    message: Msg.ERROR_STRING_TYPE(VALIDATION_FIELDS.ORDER_DESCRIPTION),
  })
  @IsNotEmpty({
    message: Msg.ERROR_REQUIRED(VALIDATION_FIELDS.ORDER_DESCRIPTION),
  })
  description: string;

  @MinLength(LENGTH_RULES[VALIDATION_FIELDS.ORDER_SPECIFICATIONS].min, {
    message: Msg.ERROR_MIN_LENGTH(VALIDATION_FIELDS.ORDER_SPECIFICATIONS),
  })
  @IsString({
    message: Msg.ERROR_STRING_TYPE(VALIDATION_FIELDS.ORDER_SPECIFICATIONS),
  })
  @IsNotEmpty({
    message: Msg.ERROR_REQUIRED(VALIDATION_FIELDS.ORDER_SPECIFICATIONS),
  })
  specifications: string;

  @Min(LENGTH_RULES[VALIDATION_FIELDS.ORDER_QUANTITY].min, {
    message: Msg.ERROR_MIN_LENGTH(VALIDATION_FIELDS.ORDER_QUANTITY),
  })
  @Max(LENGTH_RULES[VALIDATION_FIELDS.ORDER_QUANTITY].max, {})
  @IsNumber(
    {},
    { message: Msg.ERROR_NUMBER_TYPE(VALIDATION_FIELDS.ORDER_QUANTITY) },
  )
  @IsNotEmpty({ message: Msg.ERROR_REQUIRED(VALIDATION_FIELDS.ORDER_QUANTITY) })
  quantity: number;
}
