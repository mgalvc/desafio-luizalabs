import UserRepository from '../../../src/repositories/user.repository';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { UserModel } from '../../../src/models/user.model';
import BadRequestError from '../../../src/exceptions/bad-request.error';
import messagesUtil from '../../../src/utils/messages.util';
import NotFoundError from '../../../src/exceptions/not-found.error';
import configs from '../../../src/configs/configs';

const repository = new UserRepository();

let mongod: MongoMemoryServer;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
  await mongoose.connect(uri, options);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
})

beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for(const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

const user = { username: 'username', password: 'password', role: 'role' };
const projection = { _id: 1, username: 1, password: 1, role: 1 };

describe('testing add', () => {
  it('should insert user to database', async () => {
    await repository.add(user);
    const entity = await UserModel.findOne({}, projection);
    expect(entity.toObject()).toEqual({
      ...user,
      _id: expect.anything()
    });
  });

  it('should throw BadRequestError for duplicated username', async () => {
    await repository.add(user);

    try {
      await repository.add(user);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestError);
      expect(error.message).toEqual(messagesUtil.UNAVAILABLE_USERNAME);
    }
  });

  it('should throw BadRequestError for invalid username', async () => {
    jest.spyOn(configs, 'rootUser').mockReturnValueOnce('admin');
    
    try {
      await repository.add({...user, username: 'admin'});
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestError);
      expect(error.message).toEqual(messagesUtil.INVALID_USERNAME);
    }
  });

  it('should throw generic error', async () => {
    try {
      await repository.add({} as any);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});

describe('testing get', () => {
  it('should return inserted user without password', async () => {
    await repository.add(user);
    const { _id } = await UserModel.findOne({});

    const entity = await repository.get(_id);
    expect(entity).toEqual({
      username: 'username',
      role: 'role',
      _id
    });
  });

  it('should return inserted user with password', async () => {
    const { _id } = await UserModel.create(user);

    const entity = await repository.get(user.username, true);
    expect(entity).toEqual({
      ...user,
      _id
    });
  });

  it('should return admin user', async () => {
    jest.spyOn(configs, 'rootUser').mockReturnValueOnce('admin');
    jest.spyOn(configs, 'rootPass').mockReturnValueOnce('pass');

    const entity = await repository.get('admin', true);

    expect(entity).toEqual({
      username: 'admin',
      password: 'pass',
      role: 'admin'
    });
  });

  it('should throw NotFoundError for invalid id', async () => {
    try {
      await repository.get('610c77a1d60957718f408c3c');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError);
      expect(error.message).toEqual(messagesUtil.USER_NOT_FOUND);
    }
  });
});

describe('testing list', () => {
  it('should return list of inserted users', async () => {
    const clients = [
      user,
      { ...user, username: 'username2' }
    ];

    await UserModel.insertMany(clients);

    const entities = await repository.list();
    expect(entities.length).toEqual(2);
  });
});

describe('testing update', () => {
  it('should update inserted entity', async () => {
    const { _id } = await UserModel.create(user);

    await repository.update(_id, { username: 'updated' } as any);

    const entity = await UserModel.findById(_id, projection);
    
    expect(entity.toObject()).toEqual({
      ...user,
      username: 'updated',
      _id
    });
  });

  it('should throw NotFoundError', async () => {
    try {
      await repository.update('610c77a1d60957718f408c3c', { username: 'abc' } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError);
    }
  });

  it('should throw BadRequestError for duplicated username', async () => {
    await UserModel.create(user);
    const { _id } = await UserModel.create({ ...user, username: 'username2' });

    try {
      await repository.update(_id, { username: 'username' } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestError);
      expect(error.message).toEqual(messagesUtil.UNAVAILABLE_USERNAME);
    }
  });

  it('should throw BadRequestError for invalid username', async () => {
    jest.spyOn(configs, 'rootUser').mockReturnValueOnce('admin');

    try {
      await repository.update('', { username: 'admin' } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestError);
      expect(error.message).toEqual(messagesUtil.INVALID_USERNAME);
    }
  });
});

describe('testing delete', () => {
  it('should delete entity', async () => {
    const { _id } = await UserModel.create(user);
    await repository.delete(_id);
    const entity = await UserModel.findById(_id);
    expect(entity).toBeNull();
  });

  it('should throw NotFoundError', async () => {
    try {
      await repository.delete('610c77a1d60957718f408c3c');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError);
    }
  });
});