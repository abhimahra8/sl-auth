import { Request, Response, NextFunction } from "express";
import { verifyAuth } from "../utility/auth";
import { findToken } from "../utility/common";
const statusMessage = {message: "Bad request, some input parameter is missing"};

export async function validationRegister(req:Request, res:Response, next:NextFunction){
    if(!req.body.user_email || !req.body.user_password || !req.body.user_dob || !req.body.user_phone){
        return res.status(400).send(statusMessage);
    }
    next();
};

export async function validationLogin(req:Request, res:Response, next:NextFunction){
    if(!req.body.user_email || !req.body.user_password){
        return res.status(400).send(statusMessage);
    }
    else if(!req.headers["authorization"]){
        next();
    }
    else {
        const token = req.headers["authorization"].split(" ");
        const response:any = verifyAuth(token[1]);
        if(typeof(response) !== 'object'){
            return res.status(401).send(response);
        } 
        else if(response.message){
            next();
        }
        else {
            if(req.body.user_email !== response.authObj.user_email){
                return res.status(401).send({message: "Not your account"});
            }
            const checkToken = await findToken(token[1], response.authObj.user_id);
            if(checkToken){
                return res.status(200).send({message: "already logged in"})
            }
            next();
        }
    }
};

export async function validationLogout(req:Request, res:Response, next:NextFunction){
    if(!req.headers["authorization"]){
        return res.status(401).send("Authentication header missing")
    }
    const token = req.headers["authorization"].split(" ");
    const response:any = verifyAuth(token[1]);
    if(typeof(response) !== 'object'){
        return res.status(401).send(response);
    } 
    else if(response.message){
        return res.status(401).send(response);
    }
    next();
};
