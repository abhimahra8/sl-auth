import { Sequelize, Op } from "sequelize";
import schema from './model';
import { Tables } from "./model/types";
import db from "../config/db";

export class Database {
  static sequelize: Sequelize;
  static schema: Tables;

  constructor() {
    const DB_NAME = db.DB_NAME;
    const DB_USER = db.DB_USER;
    const DB_PASSWORD = db.DB_PASSWORD;
    Database.sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      dialect: "mysql",
      host: db.DB_HOST,
    });
  }


  static GetSchema = (name: string): any => {
    return Database.schema[name];
  };

  static GetDB(): Sequelize {
    return Database.sequelize;
  }

  static InitDB() {
    Database.schema = schema();
  }

}
