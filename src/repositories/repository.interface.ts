export default interface RepositoryInterface<T> {
  add(entity: T): void;
  get(id: string | number): Promise<T>;
  list(): Promise<T[]>;
  update(id: string | number, entity: T): Promise<void>;
  delete(id: string | number): Promise<void>;
}