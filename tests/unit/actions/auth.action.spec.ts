import UserRepository from '../../../src/repositories/user.repository';
import AuthAction from '../../../src/actions/auth.action';
import BadRequestError from '../../../src/exceptions/bad-request.error';
import NotFoundError from '../../../src/exceptions/not-found.error';

const action = new AuthAction();

describe('testing authenticate', () => {
  it('should throw BadRequestError for invalid password', async () => {
    jest.spyOn(UserRepository.prototype, 'get').mockResolvedValueOnce({
      username: 'admin',
      password: 'admin',
      role: 'admin'
    });

    try {
      await action.authenticate('admin', 'wrongPassword');
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestError);
    }
  });

  it('should throw BadRequestError for not found username', async () => {
    jest.spyOn(UserRepository.prototype, 'get').mockRejectedValueOnce(new NotFoundError(''));

    try {
      await action.authenticate('admin', 'admin');
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestError);
    }
  });

  it('should return success response', async () => {
    jest.spyOn(UserRepository.prototype, 'get').mockResolvedValueOnce({
      username: 'admin',
      password: 'admin',
      role: 'admin'
    });

    const res = await action.authenticate('admin', 'admin');
    expect(res).toEqual({
      success: true,
      data: { token: expect.any(String) }
    })
  });
})