import { BuildOptions, Model } from "sequelize";

export class UserModel extends Model {
  user_dob: string;
  user_email: string;
  user_id: string;
  user_name: string;
  user_phone: string;
  user_password: string;
}
export type UserType = typeof Model &
  (new (values?: object, options?: BuildOptions) => UserModel);

export class UserToken extends Model {
    token_id: string;
    user_id: string;
    token: string;
  }
export type TokenType = typeof Model &
    (new (values?: object, options?: BuildOptions) => UserToken);


export interface Tables {
  User: UserType;
  UserAuth: TokenType;
}
