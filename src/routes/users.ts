import * as express from 'express';
import { Users } from '../service/Users';
import { validationRegister, validationLogin, validationLogout } from '../middleware/validation';

const router = express.Router();
const users= new Users();

router.post('/login', validationLogin, async function(req , res) {
    const result:any = await users.login(req.body);
    if(result.status){
        res.statusMessage= result.message
        res.status(result.status).send(res.statusMessage);
    } else {
        res.status(200).send(result);
    }
})  

router.post('/register', validationRegister, async function(req , res) {
    const result:any = await users.register(req.body);
    if(result.status){
        res.statusMessage= result.message;
        res.status(result.status).send(res.statusMessage);
    } else {
        res.status(200).send(result);
    }
})  

router.post('/logout', validationLogout, async function(req , res) {
    const result = await users.logout(req);
    res.status(200).send(result);
})  

export default router;