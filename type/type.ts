export enum UserRole {
  ADMIN = 1,
  USER = 0,
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  phone_number: string;
  role: UserRole;
  pic_url: string;
}

export interface IBrand {
  id: number;
  name: string;
  products: IProduct[];
}

export interface ICategory {
  id: number;
  name: string;
  products: IProduct[];
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  brandId: number;
  categoryId: number;
  category: ICategory;
  brand: IBrand;
  images: IProductImage[];
  sizes: IProductSize[];
}

export interface IWish {
  id: number;
  product: IProduct;
}

export interface ICart {
  id: number;
  quantity: number;
  product: IProduct;
  size: IProductSize;
}

export interface IOrder {
  id: number;
  quantity: number;
  price: number;
  status: number;
  date: Date;
  userId: number;
  product: IProduct;
  size: IProductSize;
}

export interface IProductImage {
  id: number;
  name: string;
  productId: number;
}

export interface IProductSize {
  id: number;
  size: string;
  count: number;
  productId: number;
}

export interface IUpdateProduct {
  name: string;
  price: string;
  description: string;
  brand: string;
  category: string;
  sizes: { size: string; count: string }[];
}

// API types

export interface IAddOrUpdateSize {
  id: number;
  sizes: IProductSize;
}

export interface IFilterProduct {
  categoryName?: any;
  brandName?: any;
  min_price?: any;
  max_price?: any;
  size?: any;
  page?: any;
  limit?: number;
}


export interface IAddProductToCart {
  sizeId: number;
  quantity: number;
  productId: number;
}

export interface IRegisterUser {
  name: string;
  username: string;
  email: string;
  password: string;
  phone_number: string;
}

export interface IChangeUserPassword {
  currentPassword: string;
  password: string;
  confirmationPassword: string;
}
