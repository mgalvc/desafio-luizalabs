import BadRequestError from "../exceptions/bad-request.error";
import NotFoundError from "../exceptions/not-found.error";
import { IUser, UserModel } from "../models/user.model";
import RepositoryInterface from "./repository.interface";
import configs from '../configs/configs';
import messagesUtil from "../utils/messages.util";

export default class UserRepository implements RepositoryInterface<IUser> {
  async add(entity: IUser) {
    try {
      if(entity.username === configs.rootUser()) {
        throw new BadRequestError(messagesUtil.INVALID_USERNAME);
      }

      await UserModel.create(entity);
    } catch (error) {
      if(error.code === 11000) {
        throw new BadRequestError(messagesUtil.UNAVAILABLE_USERNAME);
      }
      
      throw error;
    }
  }

  async get(id: string, isAuth=false): Promise<IUser> {
    if(isAuth && id === configs.rootUser()) {
      return { 
        username: id,
        password: configs.rootPass(),
        role: 'admin'
      }
    }

    let query: any = { _id: id };
    const projection: any = { _id: 1, username: 1, role: 1 };
    
    if(isAuth) {
      projection.password = 1;
      query = { username: id };
    }

    const entity = await UserModel.findOne(query, projection).exec();

    if(!entity) {
      throw new NotFoundError(messagesUtil.USER_NOT_FOUND);
    }

    return entity.toObject();
  }
  
  async list(): Promise<IUser[]> {
    return UserModel.find({}, { _id: 1, username: 1, role: 1 });
  }
  
  async update(id: string | number, entity: IUser): Promise<void> {
    try {
      if(entity.username === configs.rootUser()) {
        throw new BadRequestError(messagesUtil.INVALID_USERNAME);
      }

      const updated = await UserModel.findByIdAndUpdate(id, entity).exec();

      if(!updated) {
        throw new NotFoundError(messagesUtil.USER_NOT_FOUND);
      }
    } catch (error) {
      if(error.code === 11000) {
        throw new BadRequestError(messagesUtil.UNAVAILABLE_USERNAME);
      }
      
      throw error;
    }
  }

  async delete(id: string | number): Promise<void> {
    const entity = await UserModel.findByIdAndDelete(id).exec();
    
    if(!entity) {
      throw new NotFoundError(messagesUtil.USER_NOT_FOUND);
    }
  }
}