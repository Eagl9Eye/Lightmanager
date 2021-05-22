export interface CRUD<T> {
  list: (limit: number, page: number) => Promise<T[]>;
  create: (resource: T) => Promise<T>;
  update: (resource: T) => Promise<T>;
  patch: (resource: T) => Promise<T>;
  readById: (resourceId: string) => Promise<any>;
  deleteById: (resourceId: string) => Promise<any>;
}
