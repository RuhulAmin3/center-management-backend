export type ILoginUser = {
  id: string;
  password: string;
};

export type ILoginResponse = {
  needPasswordChange: boolean;
  accessToken: string;
  refreshToken: string;
};

export type IPassword = {
  oldPassword: string;
  newPassword: string;
};
