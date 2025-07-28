export const setCurrentUser = (username) => {
  localStorage.setItem("subs_user", username);
};

export const getCurrentUser = () => {
  return localStorage.getItem("subs_user");
};

export const logout = () => {
  localStorage.removeItem("subs_user");
};
