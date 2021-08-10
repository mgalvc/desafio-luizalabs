import { EPERM } from 'constants';
import ClientProductAction from '../../../src/actions/client-product.action';
import BadRequestError from '../../../src/exceptions/bad-request.error';
import NotFoundError from '../../../src/exceptions/not-found.error';
import ClientRepository from '../../../src/repositories/client.repository';
import ProductService from '../../../src/services/product.service';

jest.mock('ioredis');

const action = new ClientProductAction();

describe('testing addToWishlist', () => {
  it('should return success', async () => {
    jest.spyOn(ProductService.prototype, 'getProductDetails').mockResolvedValueOnce({});
    jest.spyOn(ClientRepository.prototype, 'addProductToWishlist').mockResolvedValueOnce();

    const res = await action.addToWishlist('clientId', 'productId');
    expect(res).toEqual({
      success: true
    });
  })

  it('should throw BadRequestError for product not found', async () => {
    jest.spyOn(ProductService.prototype, 'getProductDetails').mockRejectedValueOnce(new NotFoundError(''));

    try {
      await action.addToWishlist('clientId', 'productId');
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestError);
    }
  });

  it('should throw catched Error', async () => {
    jest.spyOn(ProductService.prototype, 'getProductDetails').mockRejectedValueOnce(new Error(''));

    try {
      await action.addToWishlist('clientId', 'productId');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  })
})

describe('testing removeFromWishlist', () => {
  it('should return success', async () => {
    jest.spyOn(ClientRepository.prototype, 'removeProductFromWishlist').mockResolvedValueOnce();

    const res = await action.removeFromWishlist('clientId', 'productId');

    expect(res).toEqual({
      success: true
    })
  })
})