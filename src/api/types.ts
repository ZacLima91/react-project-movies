export type Users = {
  id?: string;
  image: string;
};

export type Movie = {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  imgFullScreen: string;
  trailer: string;
  year: number;
};

export type Category = {
  movie: string| undefined;
  serie: string | undefined;
};
