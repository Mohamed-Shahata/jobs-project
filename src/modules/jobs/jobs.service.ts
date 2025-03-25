import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "./jobs.entity";
import { Repository } from "typeorm";
import { CreateJobDto } from "./dtos/create-job.dto";
import { UpdateJobDto } from "./dtos/update-job.dto";


@Injectable()
export class JobService {

  constructor(@InjectRepository(Job) private readonly jobRepository: Repository<Job>) { };


  /**
   * Get all jobs
   * @returns collection job from database
   */
  public getAll() {
    return this.jobRepository.find();
  };

  /**
   * Get a single job
   * @param id id of job
   * @returns return job if found
   */
  public async getBy(id: number) {
    const job = await this.jobRepository.findOne({ where: { id } });
    if (!job) throw new NotFoundException("Job not found");

    return job;
  };

  /**
   * Create a new job
   * @param dto data of job
   * @returns job
   */
  public async create(dto: CreateJobDto) {
    const job = this.jobRepository.create(dto);
    await this.jobRepository.save(job);
    return job;
  };


  /**
   * Update a job
   * @param id id of job
   * @param dto data for update job
   * @returns job after updated
   */
  public async update(id: number, dto: UpdateJobDto) {
    const { title, description, price } = dto;
    let job = await this.getBy(id);

    job.title = title ?? job.title;
    job.description = description ?? job.description;
    job.price = price ?? job.price;

    return this.jobRepository.save(job);
  };


  public async delete(id: number) {
    const job = await this.getBy(id);
    await this.jobRepository.remove(job);
    return { message: "delete job success" };
  }
};