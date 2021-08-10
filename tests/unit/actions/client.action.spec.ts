import ClientAction from '../../../src/actions/client.action';
import ClientRepository from '../../../src/repositories/client.repository';
import ProductService from '../../../src/services/product.service';
import { listClients } from '../mocks/clients.mock';
import { productDetails } from '../mocks/products.mock';

jest.mock('ioredis');

const action = new ClientAction();

describe('testing create', () => {
  it('should return success', async () => {
    jest.spyOn(ClientRepository.prototype, 'add').mockResolvedValueOnce();
    const res = await action.create('name', 'email');
    expect(res).toEqual({ success: true });
  });
});

describe('testing list', () => {
  it('should return success with clients list', async () => {
    jest.spyOn(ClientRepository.prototype, 'list').mockResolvedValueOnce(listClients);
    const res = await action.list();
    expect(res).toEqual({ success: true, data: listClients });
  });
});

describe('testing get', () => {
  it('should return success with client details', async () => {
    jest.spyOn(ClientRepository.prototype, 'get').mockResolvedValueOnce(listClients[0]);
    jest.spyOn(ProductService.prototype, 'getProductDetails').mockResolvedValueOnce(productDetails);
    
    const res = await action.get('id');
    
    const expectedData = {
      ...listClients[0],
      wishlist: [productDetails]
    }
    
    expect(res).toEqual({ success: true, data: expectedData });
  });

  it('should return success with empty wishlist', async () => {
    jest.spyOn(ClientRepository.prototype, 'get').mockResolvedValueOnce(listClients[1]);
    
    const res = await action.get('id');
    
    expect(res).toEqual({ success: true, data: listClients[1] });
  });
});

describe('testing update', () => {
  it('should return success', async () => {
    jest.spyOn(ClientRepository.prototype, 'update').mockResolvedValueOnce();
    const res = await action.update('id', {} as any);
    expect(res).toEqual({ success: true });
  });
});

describe('testing delete', () => {
  it('should return success', async () => {
    jest.spyOn(ClientRepository.prototype, 'delete').mockResolvedValueOnce();
    const res = await action.delete('id');
    expect(res).toEqual({ success: true });
  });
});

