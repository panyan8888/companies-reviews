export enum Role {
  user = 1,
  company = 2,
}

export enum Category {
  IT = 1,
  notIT = 2,
}

export enum Product {
  ITProduct = 1,
  notITProduct = 2,
}

export interface IUser {
  id: number;
  email: string;
  password: string;
  username: string;
  role: Role;
  address?: string;
  name?: string;
  category?: Category;
  product?: Product;
}
