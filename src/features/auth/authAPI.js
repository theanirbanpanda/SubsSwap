import { setCurrentUser } from "../../utils/storage";

export const login = (username) => {
  setCurrentUser(username);
};
