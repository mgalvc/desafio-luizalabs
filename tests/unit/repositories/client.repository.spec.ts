import ClientRepository from '../../../src/repositories/client.repository';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { ClientModel } from '../../../src/models/client.model';
import BadRequestError from '../../../src/exceptions/bad-request.error';
import messagesUtil from '../../../src/utils/messages.util';
import NotFoundError from '../../../src/exceptions/not-found.error';

const repository = new ClientRepository();

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

const client = { name: 'name', email: 'email', wishlist: [] };
const projection = { _id: 1, name: 1, email: 1, wishlist: 1 };

describe('testing add', () => {
  it('should insert client to database', async () => {
    await repository.add(client);
    const entity = await ClientModel.findOne({}, projection);
    expect(entity.toObject()).toEqual({
      ...client,
      _id: expect.anything()
    });
  });

  it('should throw BadRequestError for duplicated email', async () => {
    await repository.add(client);

    try {
      await repository.add(client);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestError);
      expect(error.message).toEqual(messagesUtil.UNAVAILABLE_EMAIL);
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
  it('should return inserted client', async () => {
    await repository.add(client);
    const { _id } = await ClientModel.findOne({}, projection);

    const entity = await repository.get(_id);
    expect(entity).toEqual({
      ...client,
      _id
    });
  });

  it('should throw NotFoundError for invalid id', async () => {
    try {
      await repository.get('610c77a1d60957718f408c3c');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError);
      expect(error.message).toEqual(messagesUtil.CLIENT_NOT_FOUND);
    }
  });
});

describe('testing list', () => {
  it('should return list of inserted clients', async () => {
    const clients = [
      client,
      { ...client, email: 'email2' }
    ];

    await ClientModel.insertMany(clients);

    const entities = await repository.list();
    expect(entities.length).toEqual(2);
  });
});

describe('testing update', () => {
  it('should update inserted entity', async () => {
    const { _id } = await ClientModel.create(client);

    await repository.update(_id, { name: 'updated' } as any);

    const entity = await ClientModel.findById(_id, projection);
    
    expect(entity.toObject()).toEqual({
      ...client,
      name: 'updated',
      _id
    });
  });

  it('should throw NotFoundError', async () => {
    try {
      await repository.update('610c77a1d60957718f408c3c', {} as any);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError);
    }
  });

  it('should throw BadRequestError for duplicated email', async () => {
    await ClientModel.create(client);
    const { _id } = await ClientModel.create({ ...client, email: 'email2' });

    try {
      await repository.update(_id, { email: 'email' } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestError);
      expect(error.message).toEqual(messagesUtil.UNAVAILABLE_EMAIL);
    }
  });
});

describe('testing delete', () => {
  it('should delete entity', async () => {
    const { _id } = await ClientModel.create(client);
    await repository.delete(_id);
    const entity = await ClientModel.findById(_id);
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

describe('testing addProductToWishlist', () => {
  it('should insert unique products', async () => {
    const { _id } = await ClientModel.create(client);
    
    await repository.addProductToWishlist(_id, 'productId1');
    await repository.addProductToWishlist(_id, 'productId1');
    await repository.addProductToWishlist(_id, 'productId2');

    const { wishlist } = (await ClientModel.findById(_id)).toObject();

    expect(wishlist).toEqual(['productId1', 'productId2']);
  });

  it('should throw NotFoundError', async () => {
    try {
      await repository.addProductToWishlist('610c77a1d60957718f408c3c', 'productId');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError);
    }
  });
});

describe('testing removeProductFromWishlist', () => {
  it('should delete product', async () => {
    const { _id } = await ClientModel.create(client);
    
    await repository.addProductToWishlist(_id, 'productId1');
    await repository.addProductToWishlist(_id, 'productId2');

    await repository.removeProductFromWishlist(_id, 'productId1');

    const { wishlist } = (await ClientModel.findById(_id)).toObject();

    expect(wishlist).toEqual(['productId2']);
  });

  it('should throw NotFoundError', async () => {
    try {
      await repository.removeProductFromWishlist('610c77a1d60957718f408c3c', 'productId');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError);
    }
  });
});