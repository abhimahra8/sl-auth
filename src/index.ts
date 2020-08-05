import { config as dotenvConfig } from "dotenv";
dotenvConfig();

import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';


import { Database } from "./database";
import router from './routes/users';

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', router);

new Database();

Database.sequelize.sync().then(() => {
    try {
      Database.InitDB();
      const server = http.createServer(app);
      server.listen(PORT, () => {
        console.log(`Server running at: http://localhost:${PORT}`);
      });
    } catch(err){
        process.exit();
    }
});

export { app };  