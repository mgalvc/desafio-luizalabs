import { Response } from 'express';
import { MockResponse, createResponse } from 'node-mocks-http';
import RequestResponser from '../../../src/controllers/responsers/request.responser';
import BadRequestError from '../../../src/exceptions/bad-request.error';
import NotFoundError from '../../../src/exceptions/not-found.error';

jest.mock('../../../src/utils/logger.util');

let mockedRes: MockResponse<Response>;

beforeEach(() => {
  mockedRes = createResponse();
});

describe('testing handleSuccess', () => {
  it('should return 200', () => {
    RequestResponser.handleSuccess(mockedRes, { success: true });
    expect(mockedRes.statusCode).toEqual(200);
    expect(mockedRes._getJSONData()).toEqual({ success: true });
  });

  it('should return 200', () => {
    RequestResponser.handleSuccess(mockedRes, { success: true }, 201);
    expect(mockedRes.statusCode).toEqual(201);
    expect(mockedRes._getJSONData()).toEqual({ success: true });
  });
})

describe('testing handleError', () => {
  it('should return 404', () => {
    RequestResponser.handleError(mockedRes, new NotFoundError('Not Found'));
    expect(mockedRes.statusCode).toEqual(404);
    expect(mockedRes._getJSONData()).toEqual({ message: 'Not Found' });
  });

  it('should return 400', () => {
    RequestResponser.handleError(mockedRes, new BadRequestError('Bad Request'));
    expect(mockedRes.statusCode).toEqual(400);
    expect(mockedRes._getJSONData()).toEqual({ message: 'Bad Request' });
  });

  it('should return 500', () => {
    RequestResponser.handleError(mockedRes, new Error(''));
    expect(mockedRes.statusCode).toEqual(500);
    expect(mockedRes._getJSONData()).toEqual({ message: 'Ocorreu um erro inesperado' });
  });
})