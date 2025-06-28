export type SignUpDTO = {
  name: string;
  email: string;
  password: string;
};

export type SignInDTO = {
  email: string;
  password: string;
};

type Meta = {
  total: number;
  page: number;
  lastPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type Response<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
  meta: Meta;
};
