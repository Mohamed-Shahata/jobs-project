import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/users.entity";
import { Repository } from "typeorm";
import { RegisterDto } from "./dtos/register.dto";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { AccessTokenType, JWTPayloadType } from "src/utils/types";
import { LoginDto } from "./dtos/login.dto";
import { ProfileDto } from "./dtos/google-startegy-profile.dto";


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { };

  /**
   * Register
   * @param dto 
   * @returns 
   */
  public async register(dto: RegisterDto): Promise<AccessTokenType> {
    const { firstName, lastName, email, password, role } = dto;

    const userExsits = await this.userRepository.findOne({ where: { email } });
    if (userExsits) throw new BadRequestException("User already exsits");

    const hashPassword = await this.hashPassword(password);

    let newUser = this.userRepository.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      role
    });

    await this.userRepository.save(newUser);

    const accessToken = await this.genrateToken({ id: newUser.id, role: newUser.role });
    return { accessToken };
  };

  /**
   * Login
   * @param dto 
   * @returns 
   */
  public async login(dto: LoginDto): Promise<AccessTokenType> {
    const { email, password } = dto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new BadRequestException("Invalid email or password");

    const IsPasswordMatch = await bcrypt.compare(password, user.password);
    if (!IsPasswordMatch) throw new BadRequestException("Invalid email or password");

    const accessToken = await this.genrateToken({ id: user.id, role: user.role });
    return { accessToken };
  }

  public async validateUser(dto: ProfileDto): Promise<AccessTokenType> {
    const { firstName, lastName, email, profileImage } = dto;
    let user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      user = this.userRepository.create({ firstName, lastName, email, profileImage });
      await this.userRepository.save(user);
    }

    const accessToken = await this.genrateToken({ id: user.id, role: user.role });

    return { accessToken };
  }


  /**
   * Hash Password
   * @param password password of user
   * @returns hashed password
   */
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  /**
   * Genrate access token
   * @param payload data of user
   * @returns access token
   */
  private async genrateToken(payload: JWTPayloadType): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
};