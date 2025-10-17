export interface IUser{
  uid: string;
  name: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  password: string;
}

export interface IUserAuth extends Pick<IUser, 'email' | 'password'>{}
export interface IUserCreate extends Omit<IUser, 'uid'>{}
