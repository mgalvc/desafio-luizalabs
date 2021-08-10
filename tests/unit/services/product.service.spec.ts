import axios from 'axios';
import { Error } from 'mongoose';
import NotFoundError from '../../../src/exceptions/not-found.error';
import ProductService from '../../../src/services/product.service';
import RedisService from '../../../src/services/redis.service';
import { productDetails } from '../mocks/products.mock';

jest.mock('ioredis');

const service = new ProductService();

describe('testing getProductDetails', () => {
  it('should return product from API when not cached', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: productDetails });

    const res = await service.getProductDetails('productId');
    expect(res).toEqual(productDetails);
    expect(axios.get).toHaveBeenCalledTimes(1);
  })

  it('should return product from cache when cached', async () => {
    jest.spyOn(RedisService.prototype, 'get').mockResolvedValueOnce(JSON.stringify(productDetails));

    const res = await service.getProductDetails('productId');
    expect(res).toEqual(productDetails);
    expect(axios.get).toHaveBeenCalledTimes(0);
  })

  it('should throw NotFoundError when API returns 404', async () => {
    const error: any = new Error('');
    error.response = { status: 404 };
    
    jest.spyOn(RedisService.prototype, 'get').mockResolvedValueOnce(undefined);
    jest.spyOn(axios, 'get').mockRejectedValueOnce(error);
    
    try {
      await service.getProductDetails('productId');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError);
    }
  })

  it('should throw Error when API returns error', async () => {
    const error: any = new Error('');
    jest.spyOn(RedisService.prototype, 'get').mockResolvedValueOnce(undefined);
    jest.spyOn(axios, 'get').mockRejectedValueOnce(error);
    try {
      await service.getProductDetails('productId');
    } catch (error) {
      expect(error).toEqual(error);
    }
  });
})