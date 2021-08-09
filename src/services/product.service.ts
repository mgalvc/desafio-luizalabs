import axios from 'axios';
import configs from '../configs/configs';
import NotFoundError from '../exceptions/not-found.error';
import RedisService from './redis.service';

export default class ProductService {
  constructor(
    private redisService = new RedisService(),
    private apiUrl = configs.productsApiUrl()
  ) {}

  async getProductDetails(productId: string) {
    try {
      const cachedProduct =  await this.redisService.get(productId);
      
      if(cachedProduct) {
        return JSON.parse(cachedProduct);
      }

      const { data: product } = await axios.get(`${this.apiUrl}/${productId}/`);
      this.redisService.set(productId, JSON.stringify(product), configs.redisProductTtl());
      return product;
    } catch (err) {
      if (err.response?.status == 404) {
        throw new NotFoundError('Produto não encontrado');
      }
      
      throw err;
    } 
  }
}