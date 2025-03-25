import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min, MinLength } from "class-validator";


export class UpdateJobDto {

  @IsString()
  @Length(2, 100)
  @IsOptional()
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
};