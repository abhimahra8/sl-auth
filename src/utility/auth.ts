import * as jwt from "jsonwebtoken";


export function createAuth(payload:any){
    const authObj = {
        user_id: payload.user_id,
        user_email: payload.user_email
    };

    const token = jwt.sign({ authObj, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, process.env.SECRET);
    return {user_id: payload.user_id,
            token,
        };
}

export function verifyAuth(token:string){
    return jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err){
            if(err.toString().includes('expired')){
                return {message: "token expired"};
            }
            return "Invalid token"
        } else {
            return decoded;
        }
      });
}
