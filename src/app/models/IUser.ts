export enum Role {
  user = 'User',
  company = 'Company',
}

export enum Category {
  IT = 'IT',
  notIT = 'notIT',
}

export enum Product {
  ITProduct = 'ITProduct',
  notITProduct = 'notITProduct',
}

export interface IUser {
  id?: number;
  email: string;
  password: string;
  username: string;
  role?: Role;
  address?: string;
  name?: string;
  category?: Category;
  product?: Product;
}
