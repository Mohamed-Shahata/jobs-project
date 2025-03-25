import { IsNotEmpty, IsNumber, IsString, Length, Min, MinLength } from "class-validator";


export class CreateJobDto {

  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;
};