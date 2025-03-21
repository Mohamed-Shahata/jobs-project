import { IsNotEmpty, IsString, Length, MaxLength } from "class-validator";


export class LoginDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 50)
  password: string;
};