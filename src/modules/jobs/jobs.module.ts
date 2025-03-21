import { Module } from "@nestjs/common";
import { JobController } from "./jobs.controller";
import { JobService } from "./jobs.service";


@Module({
  controllers: [JobController],
  providers: [JobService]
})
export class JobModule { };