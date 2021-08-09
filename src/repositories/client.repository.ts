import DuplicatedError from "../exceptions/duplicated.error";
import RepositoryInterface from "./repository.interface";
import { ClientModel, IClient } from "../models/client.model";

export default class ClientRepository implements RepositoryInterface<IClient> {
  get(id: string | number): Promise<IClient> {
    return ClientModel.findById(id, { _id: 1, name: 1, email: 1, wishlist: 1 }).exec();
  }
  
  async list(): Promise<IClient[]> {
    return ClientModel.find({}, { _id: 1, name: 1, email: 1 });
  }
  
  async delete(id: string | number): Promise<void> {
    await ClientModel.findByIdAndDelete(id).exec();
  }
  
  async update(id: string | number, entity: IClient): Promise<void> {
    try {
      await ClientModel.findByIdAndUpdate(id, entity).exec();
    } catch (error) {
      if(error.code === 11000) {
        throw new DuplicatedError('E-mail already in use');
      }
      
      throw error;
    }
  }
  
  async add(entity: IClient) {
    try {
      await ClientModel.create(entity);
    } catch (error) {
      if(error.code === 11000) {
        throw new DuplicatedError('E-mail already in use');
      }
      
      throw error;
    }
  }

  async addProductToWishlist(clientId: string, productId: string): Promise<void> {
    await ClientModel.findByIdAndUpdate(clientId, { $addToSet: { wishlist: productId } }).exec();
  }

  async removeProductFromWishlist(clientId: string, productId: string): Promise<void> {
    await ClientModel.findByIdAndUpdate(clientId, { $pull: { wishlist: productId } }).exec();
  }
}