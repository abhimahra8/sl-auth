import { DataTypes } from "sequelize";
import { Database } from "../database";
import { TokenType } from "./types";

const UserTokenDefinition = {
  token_id:{
    primaryKey: true,
    type: DataTypes.UUID,
  },  
  user_id: {
    allowNull: false,
    type: DataTypes.UUID,
  },
  token: {
    defaultValue: null,
    type: DataTypes.TEXT,
  }
};

export const UserAuth = Database.GetDB().define(
  "user_tokens",
  UserTokenDefinition
) as TokenType;
