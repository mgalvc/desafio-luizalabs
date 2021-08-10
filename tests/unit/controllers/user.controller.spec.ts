import UserAction from '../../../src/actions/user.action';
import UserController from '../../../src/controllers/user.controller';
import { MockRequest, MockResponse, createRequest, createResponse } from 'node-mocks-http';
import { Request, Response } from 'express';
import { usersList } from '../mocks/users.mock';

jest.mock('../../../src/utils/logger.util');
jest.mock('../../../src/actions/client.action');

const controller = new UserController();

const username = 'username';
const password = 'password';
const role = 'role';
const id = 'id';

let mockedReq: MockRequest<Request>;
let mockedRes: MockResponse<Response>;

beforeEach(() => {
  mockedReq = createRequest();
  mockedRes = createResponse();
});

describe('testing list', () => {
  it('should return success', async () => {
    jest.spyOn(UserAction.prototype, 'list').mockResolvedValueOnce({ success: true, data: usersList })
    
    await controller.list(mockedReq, mockedRes);

    expect(mockedRes.statusCode).toEqual(200);
    expect(mockedRes._getJSONData()).toEqual({ success: true, data: usersList });
  });

  it('should return 500', async () => {
    jest.spyOn(UserAction.prototype, 'list').mockRejectedValueOnce(new Error())
    
    await controller.list(mockedReq, mockedRes);

    expect(mockedRes.statusCode).toEqual(500);
    expect(mockedRes._getJSONData()).toEqual({ message: 'Ocorreu um erro inesperado' });
  });
});

describe('testing get', () => {
  it('should return success', async () => {
    mockedReq.params = { id };

    jest.spyOn(UserAction.prototype, 'get').mockResolvedValueOnce({ success: true, data: usersList[0] })
    
    await controller.get(mockedReq, mockedRes);

    expect(UserAction.prototype.get).toHaveBeenCalledWith(id);
    expect(mockedRes.statusCode).toEqual(200);
    expect(mockedRes._getJSONData()).toEqual({ success: true, data: usersList[0] });
  });

  it('should return 500', async () => {
    jest.spyOn(UserAction.prototype, 'get').mockRejectedValueOnce(new Error())
    
    await controller.get(mockedReq, mockedRes);

    expect(mockedRes.statusCode).toEqual(500);
    expect(mockedRes._getJSONData()).toEqual({ message: 'Ocorreu um erro inesperado' });
  });
});

describe('testing create', () => {
  it('should return success', async () => {
    mockedReq.body = { username, password, role };

    jest.spyOn(UserAction.prototype, 'create').mockResolvedValueOnce({ success: true, data: {} })
    
    await controller.create(mockedReq, mockedRes);

    expect(UserAction.prototype.create).toHaveBeenCalledWith(username, password, role);
    expect(mockedRes.statusCode).toEqual(201);
    expect(mockedRes._getJSONData()).toEqual({ success: true, data: {} });
  });

  it('should return 500', async () => {
    jest.spyOn(UserAction.prototype, 'create').mockRejectedValueOnce(new Error())
    
    await controller.create(mockedReq, mockedRes);

    expect(mockedRes.statusCode).toEqual(500);
    expect(mockedRes._getJSONData()).toEqual({ message: 'Ocorreu um erro inesperado' });
  });
});

describe('testing update', () => {
  it('should return success', async () => {
    mockedReq.body = { username, password, role };
    mockedReq.params = { id };

    jest.spyOn(UserAction.prototype, 'update').mockResolvedValueOnce({ success: true, data: {} })
    
    await controller.update(mockedReq, mockedRes);

    expect(UserAction.prototype.update).toHaveBeenCalledWith(id, { username, password, role });
    expect(mockedRes.statusCode).toEqual(200);
    expect(mockedRes._getJSONData()).toEqual({ success: true, data: {} });
  });

  it('should return 500', async () => {
    jest.spyOn(UserAction.prototype, 'update').mockRejectedValueOnce(new Error())
    
    await controller.update(mockedReq, mockedRes);

    expect(mockedRes.statusCode).toEqual(500);
    expect(mockedRes._getJSONData()).toEqual({ message: 'Ocorreu um erro inesperado' });
  });
});

describe('testing delete', () => {
  it('should return success', async () => {
    mockedReq.params = { id };

    jest.spyOn(UserAction.prototype, 'delete').mockResolvedValueOnce({ success: true, data: {} })
    
    await controller.delete(mockedReq, mockedRes);

    expect(UserAction.prototype.delete).toHaveBeenCalledWith(id);
    expect(mockedRes.statusCode).toEqual(200);
    expect(mockedRes._getJSONData()).toEqual({ success: true, data: {} });
  });

  it('should return 500', async () => {
    jest.spyOn(UserAction.prototype, 'delete').mockRejectedValueOnce(new Error())
    
    await controller.delete(mockedReq, mockedRes);

    expect(mockedRes.statusCode).toEqual(500);
    expect(mockedRes._getJSONData()).toEqual({ message: 'Ocorreu um erro inesperado' });
  });
});