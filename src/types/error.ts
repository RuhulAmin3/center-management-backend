export type IGenericErrMessage = {
  path: string | number;
  message: string;
};

type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrMessage[];
};
