import ClientProductAction from '../../../src/actions/client-product.action';
import ClientProductController from '../../../src/controllers/client-product.controller';
import { MockRequest, MockResponse, createRequest, createResponse } from 'node-mocks-http';
import { Request, Response } from 'express';

jest.mock('../../../src/utils/logger.util');
jest.mock('../../../src/actions/client-product.action');

const controller = new ClientProductController();

const productId = 'productId';
const clientId = 'clientId';

let mockedReq: MockRequest<Request>;
let mockedRes: MockResponse<Response>;

beforeEach(() => {
  mockedReq = createRequest();
  mockedRes = createResponse();
});

describe('testing create', () => {
  it('should return success', async () => {
    mockedReq.body = { productId };
    mockedReq.params = { clientId };

    jest.spyOn(ClientProductAction.prototype, 'addToWishlist').mockResolvedValueOnce({ success: true, data: {} })
    
    await controller.create(mockedReq, mockedRes);

    expect(ClientProductAction.prototype.addToWishlist).toHaveBeenCalledWith(clientId, productId);
    expect(mockedRes.statusCode).toEqual(201);
    expect(mockedRes._getJSONData()).toEqual({ success: true, data: {} });
  });

  it('should return 500', async () => {
    jest.spyOn(ClientProductAction.prototype, 'addToWishlist').mockRejectedValueOnce(new Error())
    
    await controller.create(mockedReq, mockedRes);

    expect(mockedRes.statusCode).toEqual(500);
    expect(mockedRes._getJSONData()).toEqual({ message: 'Ocorreu um erro inesperado' });
  });
});

describe('testing delete', () => {
  it('should return success', async () => {
    mockedReq.params = { clientId, productId };

    jest.spyOn(ClientProductAction.prototype, 'removeFromWishlist').mockResolvedValueOnce({ success: true, data: {} })
    
    await controller.delete(mockedReq, mockedRes);

    expect(ClientProductAction.prototype.removeFromWishlist).toHaveBeenCalledWith(clientId, productId);
    expect(mockedRes.statusCode).toEqual(200);
    expect(mockedRes._getJSONData()).toEqual({ success: true, data: {} });
  });

  it('should return 500', async () => {
    jest.spyOn(ClientProductAction.prototype, 'removeFromWishlist').mockRejectedValueOnce(new Error())
    
    await controller.delete(mockedReq, mockedRes);

    expect(mockedRes.statusCode).toEqual(500);
    expect(mockedRes._getJSONData()).toEqual({ message: 'Ocorreu um erro inesperado' });
  });
});