import ClientAction from '../../../src/actions/client.action';
import ClientController from '../../../src/controllers/client.controller';
import { MockRequest, MockResponse, createRequest, createResponse } from 'node-mocks-http';
import { Request, Response } from 'express';
import { listClients } from '../mocks/clients.mock';

jest.mock('../../../src/utils/logger.util');
jest.mock('../../../src/actions/client.action');

const controller = new ClientController();

const name = 'name';
const email = 'email';
const id = 'id';

let mockedReq: MockRequest<Request>;
let mockedRes: MockResponse<Response>;

beforeEach(() => {
  mockedReq = createRequest();
  mockedRes = createResponse();
});

describe('testing list', () => {
  it('should return success', async () => {
    jest.spyOn(ClientAction.prototype, 'list').mockResolvedValueOnce({ success: true, data: listClients })
    
    await controller.list(mockedReq, mockedRes);

    expect(mockedRes.statusCode).toEqual(200);
    expect(mockedRes._getJSONData()).toEqual({ success: true, data: listClients });
  });

  it('should return 500', async () => {
    jest.spyOn(ClientAction.prototype, 'list').mockRejectedValueOnce(new Error())
    
    await controller.list(mockedReq, mockedRes);

    expect(mockedRes.statusCode).toEqual(500);
    expect(mockedRes._getJSONData()).toEqual({ message: 'Ocorreu um erro inesperado' });
  });
});

describe('testing get', () => {
  it('should return success', async () => {
    mockedReq.params = { id };

    jest.spyOn(ClientAction.prototype, 'get').mockResolvedValueOnce({ success: true, data: listClients[0] })
    
    await controller.get(mockedReq, mockedRes);

    expect(ClientAction.prototype.get).toHaveBeenCalledWith(id);
    expect(mockedRes.statusCode).toEqual(200);
    expect(mockedRes._getJSONData()).toEqual({ success: true, data: listClients[0] });
  });

  it('should return 500', async () => {
    jest.spyOn(ClientAction.prototype, 'get').mockRejectedValueOnce(new Error())
    
    await controller.get(mockedReq, mockedRes);

    expect(mockedRes.statusCode).toEqual(500);
    expect(mockedRes._getJSONData()).toEqual({ message: 'Ocorreu um erro inesperado' });
  });
});

describe('testing create', () => {
  it('should return success', async () => {
    mockedReq.body = { name, email };

    jest.spyOn(ClientAction.prototype, 'create').mockResolvedValueOnce({ success: true, data: {} })
    
    await controller.create(mockedReq, mockedRes);

    expect(ClientAction.prototype.create).toHaveBeenCalledWith(name, email);
    expect(mockedRes.statusCode).toEqual(201);
    expect(mockedRes._getJSONData()).toEqual({ success: true, data: {} });
  });

  it('should return 500', async () => {
    jest.spyOn(ClientAction.prototype, 'create').mockRejectedValueOnce(new Error())
    
    await controller.create(mockedReq, mockedRes);

    expect(mockedRes.statusCode).toEqual(500);
    expect(mockedRes._getJSONData()).toEqual({ message: 'Ocorreu um erro inesperado' });
  });
});

describe('testing update', () => {
  it('should return success', async () => {
    mockedReq.body = { name, email };
    mockedReq.params = { id };

    jest.spyOn(ClientAction.prototype, 'update').mockResolvedValueOnce({ success: true, data: {} })
    
    await controller.update(mockedReq, mockedRes);

    expect(ClientAction.prototype.update).toHaveBeenCalledWith(id, { name, email });
    expect(mockedRes.statusCode).toEqual(200);
    expect(mockedRes._getJSONData()).toEqual({ success: true, data: {} });
  });

  it('should return 500', async () => {
    jest.spyOn(ClientAction.prototype, 'update').mockRejectedValueOnce(new Error())
    
    await controller.update(mockedReq, mockedRes);

    expect(mockedRes.statusCode).toEqual(500);
    expect(mockedRes._getJSONData()).toEqual({ message: 'Ocorreu um erro inesperado' });
  });
});

describe('testing delete', () => {
  it('should return success', async () => {
    mockedReq.params = { id };

    jest.spyOn(ClientAction.prototype, 'delete').mockResolvedValueOnce({ success: true, data: {} })
    
    await controller.delete(mockedReq, mockedRes);

    expect(ClientAction.prototype.delete).toHaveBeenCalledWith(id);
    expect(mockedRes.statusCode).toEqual(200);
    expect(mockedRes._getJSONData()).toEqual({ success: true, data: {} });
  });

  it('should return 500', async () => {
    jest.spyOn(ClientAction.prototype, 'delete').mockRejectedValueOnce(new Error())
    
    await controller.delete(mockedReq, mockedRes);

    expect(mockedRes.statusCode).toEqual(500);
    expect(mockedRes._getJSONData()).toEqual({ message: 'Ocorreu um erro inesperado' });
  });
});