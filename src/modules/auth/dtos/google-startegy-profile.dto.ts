import { IsIn, IsNotEmpty, IsOptional, IsString, Length, MaxLength } from "class-validator";

export class ProfileDto {
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

  @IsOptional()
  @IsString()
  profileImage?: string;
}