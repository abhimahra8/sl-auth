import { Tables } from "./types";

export default (): Tables => {
  return {
    User: require("./users").User,
    UserAuth: require("./auth").UserAuth,
  };
};
