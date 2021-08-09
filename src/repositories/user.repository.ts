import NotFoundError from "../exceptions/not-found.error";
import { UserNotFound } from "../exceptions/user.exception";
import RepositoryInterface from "./repository.interface";

const usersCollection: User[] = [
  { id: 1, username: 'admin', password: 'admin#123456', role: 'admin' },
  { id: 2, username: 'guest', password: 'guest#123456', role: 'guest' }
];

export default class UserRepository implements RepositoryInterface<User> {
  add(entity: User): void {
    throw new Error("Method not implemented.");
  }
  
  list(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  
  delete(id: string | number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  update(id: string | number, entity: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  async get(id: string) {
    const user = usersCollection.find(({ username }) => {
      return username === id;
    });

    if(!user) {
      throw new NotFoundError('Invalid credentials');
    }

    return user;
  }
}

interface User {
  id: number;
  username: string; 
  password: string;
  role: string;
}