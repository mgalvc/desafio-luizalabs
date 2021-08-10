import UserAction from '../../../src/actions/user.action';
import UserRepository from '../../../src/repositories/user.repository';
import { usersList } from '../mocks/users.mock';

jest.mock('ioredis');

const action = new UserAction();

describe('testing create', () => {
  it('should return success', async () => {
    jest.spyOn(UserRepository.prototype, 'add').mockResolvedValueOnce();
    const res = await action.create('username', 'password', 'role');
    expect(res).toEqual({ success: true });
  });
});

describe('testing list', () => {
  it('should return success with users list', async () => {
    jest.spyOn(UserRepository.prototype, 'list').mockResolvedValueOnce(usersList);
    const res = await action.list();
    expect(res).toEqual({ success: true, data: usersList });
  });
});

describe('testing get', () => {
  it('should return success with user details', async () => {
    jest.spyOn(UserRepository.prototype, 'get').mockResolvedValueOnce(usersList[0]);
    
    const res = await action.get('id');
    
    expect(res).toEqual({ success: true, data: usersList[0] });
  });
});

describe('testing update', () => {
  it('should return success', async () => {
    jest.spyOn(UserRepository.prototype, 'update').mockResolvedValueOnce();
    const res = await action.update('id', {} as any);
    expect(res).toEqual({ success: true });
  });
});

describe('testing delete', () => {
  it('should return success', async () => {
    jest.spyOn(UserRepository.prototype, 'delete').mockResolvedValueOnce();
    const res = await action.delete('id');
    expect(res).toEqual({ success: true });
  });
});

