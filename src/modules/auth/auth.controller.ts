import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { RegisterDto } from "./dtos/register.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("/auth")
export class AuthController {

  constructor(private readonly authService: AuthService) { };

  // POST: ~/api/auth/register
  @Post("register")
  public register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  // POST: ~/api/auth/login
  @Post("login")
  public login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Get("google")
  @UseGuards(AuthGuard("google"))
  public async googleAuth() { };

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  public async googleAuthRedirect(@Req() req: any) {
    return this.authService.validateUser(req.user);
  };
};