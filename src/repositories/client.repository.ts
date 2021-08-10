import BadRequestError from "../exceptions/bad-request.error";
import RepositoryInterface from "./repository.interface";
import { ClientModel, IClient } from "../models/client.model";
import NotFoundError from "../exceptions/not-found.error";

export default class ClientRepository implements RepositoryInterface<IClient> {
  async add(entity: IClient) {
    try {
      await ClientModel.create(entity);
    } catch (error) {
      if(error.code === 11000) {
        throw new BadRequestError('E-mail já está sendo utilizado');
      }
      
      throw error;
    }
  }

  async get(id: string | number): Promise<IClient> {
    const entity = await ClientModel.findById(id, { _id: 1, name: 1, email: 1, wishlist: 1 }).exec();

    if(!entity) {
      throw new NotFoundError('Cliente não encontrado');
    }

    return entity;
  }
  
  async list(): Promise<IClient[]> {
    return ClientModel.find({}, { _id: 1, name: 1, email: 1 });
  }
  
  async update(id: string | number, entity: IClient): Promise<void> {
    try {
      const updated = await ClientModel.findByIdAndUpdate(id, entity).exec();

      if(!updated) {
        throw new NotFoundError('Cliente não encontrado');
      }
    } catch (error) {
      if(error.code === 11000) {
        throw new BadRequestError('E-mail já está sendo utilizado');
      }
      
      throw error;
    }
  }

  async delete(id: string | number): Promise<void> {
    const entity = await ClientModel.findByIdAndDelete(id).exec();
    
    if(!entity) {
      throw new NotFoundError('Cliente não encontrado');
    }
  }

  async addProductToWishlist(clientId: string, productId: string): Promise<void> {
    const entity = await ClientModel.findByIdAndUpdate(clientId, { $addToSet: { wishlist: productId } }).exec();

    if(!entity) {
      throw new NotFoundError('Cliente não encontrado');
    }
  }

  async removeProductFromWishlist(clientId: string, productId: string): Promise<void> {
    const entity = await ClientModel.findByIdAndUpdate(clientId, { $pull: { wishlist: productId } }).exec();

    if(!entity) {
      throw new NotFoundError('Cliente não encontrado');
    }
  }
}