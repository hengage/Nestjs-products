import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
export class CreateOrderDto {
  @MinLength(3)
  @MaxLength(300)
  @IsString()
  @IsNotEmpty()
  description: string;

  @MinLength(10)
  @IsString()
  @IsNotEmpty()
  specifications: string;

  @Min(1)
  @Max(1000)
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
