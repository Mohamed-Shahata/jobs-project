import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { ConfigService } from "@nestjs/config";
import { VerifyCallback } from "jsonwebtoken";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private config: ConfigService) {
    super({
      clientID: config.get<string>("CLIENT_ID"),
      clientSecret: config.get<string>("CLIENT_SECRET"),
      callbackURL: config.get<string>("GOOGLE_CALLBACK"),
      scope: ["email", "profile"],
      accessType: 'offline',
      prompt: 'consent',
    })
  };

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { emails, name, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      profileImage: photos[0]?.value
    };

    done(null, user);
  }
};