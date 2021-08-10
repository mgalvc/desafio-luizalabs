import AuthAction from '../../../src/actions/auth.action';
import AuthController from '../../../src/controllers/auth.controller';
import { MockRequest, MockResponse, createRequest, createResponse } from 'node-mocks-http';
import { Request, Response } from 'express';

jest.mock('../../../src/utils/logger.util');

const controller = new AuthController();
let mockedReq: MockRequest<Request>;
let mockedRes: MockResponse<Response>;

beforeEach(() => {
  mockedReq = createRequest();
  mockedRes = createResponse();
})

describe('testing authenticate', () => {
  it('should return success', async () => {
    const actionResponse = {
      success: true,
      data: { token: 'token' }
    };

    jest.spyOn(AuthAction.prototype, 'authenticate').mockResolvedValueOnce(actionResponse);

    await controller.authenticate(mockedReq, mockedRes);
    
    expect(mockedRes.statusCode).toEqual(200);
    expect(mockedRes._getJSONData()).toEqual(actionResponse);
  });

  it('should return 500', async () => {
    jest.spyOn(AuthAction.prototype, 'authenticate').mockRejectedValueOnce(new Error(''));
    
    await controller.authenticate(mockedReq, mockedRes);

    expect(mockedRes.statusCode).toEqual(500);
    expect(mockedRes._getJSONData()).toEqual({ message: 'Ocorreu um erro inesperado' });
  })
})