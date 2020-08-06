import { Database } from "../database";
import { hashPassword, findUser, createAuthToken, comparePasswords } from "../utility/common";
import * as UUID from "uuid";

export class Users {
   
    async login(payload:any){
        console.log("Inside service !!! ", payload);
        const user = await findUser(payload);
        if(user){
            const passCheck = await comparePasswords(payload.user_password, user.user_password);
            if(passCheck){
                payload["user_id"] = user.user_id;
                delete payload.user_password;
                return await createAuthToken(payload);
            } else {
                return {
                    status: 403,
                    message: "Invalid user_email or password"
                }
            }
        } 
        return {
            status: 403,
            message: "User does not exists"
        }
    } 

    async register(payload:any){
        payload["user_id"] = UUID.v4().toString();
        try{
            const user = await findUser(payload);

            if(user){
                return {
                    status: 400,
                    message: "user already exists"
                };
            }
            payload["user_password"] = hashPassword(payload.user_password);
            await Database.schema.User.create(payload);
            return await createAuthToken(payload);
        } catch(err){
            return new Error("Something went wrong while doing registration ");
        }
        
    } 

    async logout(payload:any){
        const token = payload.headers["authorization"].split(" ");
        try{
            const userToken = await Database.schema.UserAuth.destroy({
                where: {
                    token: token[1]
                }
            });

            if(userToken){
                return {message:"logout successfully"}
            }
        } catch(err){
            return new Error("Something went wrong");
            
        }
    }
}