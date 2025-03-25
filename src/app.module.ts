import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { User } from "./modules/users/users.entity";
import { CacheModule } from "@nestjs/cache-manager";
import redisStore from 'cache-manager-redis-store';
import { JobModule } from "./modules/jobs/jobs.module";
import { Job } from "./modules/jobs/jobs.entity";


@Module({
  imports: [
    AuthModule,
    JobModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: "postgres",
          host: "postgres",
          port: config.get<number>("DB_PORT"),
          username: config.get<string>("POSTGRES_USER"),
          password: config.get<string>("POSTGRES_PASSWORD"),
          database: config.get<string>("POSTGRES_DB"),
          synchronize: true,
          entities: [User, Job]
        }
      }
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    CacheModule.register({
      inject: ConfigService,
      useFactory: (config: ConfigService) => ({
        isGlobal: true,
        store: redisStore,
        host: config.get<string>("REDIS_HOST"),
        port: config.get<number>("REDIS_PORT")
      })
    })
  ]
})
export class AppModule { };