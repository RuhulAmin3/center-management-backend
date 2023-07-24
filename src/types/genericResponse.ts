export type genericResponseType<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
