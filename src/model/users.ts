import { DataTypes } from "sequelize";
import { Database } from "../database";
import { UserType } from "./types";

const UserModelDefinition = {
  user_id: {
    primaryKey: true,
    type: DataTypes.UUID,
  },
  user_email: {
    defaultValue: "",
    type: DataTypes.TEXT,
  },
  user_dob: {
    defaultValue: "N/A",
    type: DataTypes.STRING(100),
  },
  user_name: {
    defaultValue: "N/A",
    type: DataTypes.STRING(100),
  },
  user_password: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  user_phone: {
    defaultValue: "N/A",
    type: DataTypes.STRING(15),
  }
};

export const User = Database.GetDB().define(
  "users",
  UserModelDefinition
) as UserType;
