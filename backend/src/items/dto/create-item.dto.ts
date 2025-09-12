import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsBoolean,
} from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  material?: string;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  collectionId: number;

  @IsBoolean()
  @IsOptional()
  isNew?: boolean;
}
