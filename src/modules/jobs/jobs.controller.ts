import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { JobService } from "./jobs.service";
import { CreateJobDto } from "./dtos/create-job.dto";
import { UpdateJobDto } from "./dtos/update-job.dto";


@Controller("/jobs")
export class JobController {

  constructor(private readonly jobService: JobService) { };

  // GET: ~/api/jobs
  @Get()
  public getAllJob() {
    return this.jobService.getAll();
  };

  // GET: ~/api/jobs/:id
  @Get("/:id")
  public getJobBy(@Param("id", ParseIntPipe) id: number) {
    return this.jobService.getBy(id);
  };

  // POST: ~/api/jobs
  @Post()
  public createJob(@Body() dto: CreateJobDto) {
    return this.jobService.create(dto);
  };

  // PUT: ~/api/jobs/:id
  @Put("/:id")
  public updateJob(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateJobDto) {
    return this.jobService.update(id, dto);
  };

  // DELETE: ~/api/jobs/:id
  @Delete("/:id")
  public deleteJob(@Param("id", ParseIntPipe) id: number) {
    return this.jobService.delete(id);
  };
};