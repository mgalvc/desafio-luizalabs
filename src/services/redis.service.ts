import Redis from 'ioredis';
import configs from '../configs/configs';

export default class RedisService {
  constructor(
    private redis = new Redis(configs.redisPort(), configs.redisHost())
  ) {}
  
  async get(key: string): Promise<any> {
    return this.redis.get(key);
  }

  async set(key: string, value: any, ttl: number | string) {
    this.redis.set(key, value, 'EX', ttl);
  }
}