import * as Bcrypt from "bcryptjs";
import { createAuth } from "../utility/auth";
import { Database } from "../database";
import * as UUID from "uuid";

export function hashPassword (password:string) {
    return Bcrypt.hashSync(password, 10).toString();
};

export async function comparePasswords(password:string, hash:string) {
  return await Bcrypt.compare(password, hash)
}

export async function findUser(payload){
  return await Database.schema.User.findOne({
    where: {
        user_email: payload.user_email
    }
  })
}

export async function createAuthToken(payload:any){
    const tokenObj = createAuth(payload);
    tokenObj["token_id"] = UUID.v4().toString();
    Database.schema.UserAuth.create(tokenObj);
    return {
        user_email: payload.user_email,
        user_id: tokenObj.user_id,
        token: tokenObj.token
    }
}

export async function findToken(token:string, user_id:string){
  return await Database.schema.UserAuth.findOne({
    where: {
        token,
        user_id,
    }
  })
}