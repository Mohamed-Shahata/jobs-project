import { Module } from "@nestjs/common";
import { JobController } from "./jobs.controller";
import { JobService } from "./jobs.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Job } from "./jobs.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature([Job])
  ],
  controllers: [JobController],
  providers: [JobService]
})
export class JobModule { };