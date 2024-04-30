import { IsNotEmpty, IsString, isNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsString()
  isEmpty: boolean;
}
