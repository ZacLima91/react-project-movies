export type Users = {
  id?: string;
};

export type Movie = {
  id?: string;
  name: string;
  description: string;
  imgUrl: string;
  imgFullScreen: string;
  trailer: string;
  year: number;
};

export type User = {
  id?: string;
  userName: string;
  img: string;
  email: string;
  password?: string;
}



export type Category = {
  movie: string | undefined;
  serie: string | undefined;
};

export interface IResponse<T> {
  data: T;
  status: number;
}

export interface IAxios {
  <T>(url: string, data?: any): Promise<IResponse<T>>;
  <T>(url: string, config?: any): Promise<IResponse<T>>;
}

export type Login = {
  email: string;
  password: string;
};
