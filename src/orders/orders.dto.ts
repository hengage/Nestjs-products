import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
export class CreateOrderDto {
  @Min(3)
  @Max(300)
  @IsNotEmpty()
  @IsString()
  description: string;

  @Min(10)
  @IsString()
  @IsNotEmpty()
  specifications: string;

  @Min(1)
  @Max(1000)
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
