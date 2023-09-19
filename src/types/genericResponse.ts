export type genericResponseType<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages?: number | null;
    previousPage?: number | null;
    nextPage?: number | null;
  };
  data: T;
};
