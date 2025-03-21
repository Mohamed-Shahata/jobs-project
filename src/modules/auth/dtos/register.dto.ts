import { IsIn, IsNotEmpty, IsString, Length, MaxLength } from "class-validator";
import { UserType } from "src/utils/enum-role";


export class RegisterDto {

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 50)
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(["freelancer", "client"], { message: "Invalid role" })
  role: UserType;
};