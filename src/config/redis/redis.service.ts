import { Injectable } from "@nestjs/common";
import Redis from "ioredis";


@Injectable()
export class RedisService {
  private redis: Redis
  constructor() {
    this.redis = new Redis({
      host: '127.0.0.1',
      port: 6379,
    })
  };

  async set(key: string, value: string) {
    await this.redis.set(key, value);
  }

  async get(key: string) {
    return await this.redis.get(key);
  }


};