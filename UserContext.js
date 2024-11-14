import { createContext } from "react";

const UserContext = createContext({
  loggedUser: "DefaultUser",
});

export default UserContext;
