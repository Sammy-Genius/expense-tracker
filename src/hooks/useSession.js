export const useSession = () => {
  const session = JSON.parse(localStorage.getItem("session"));

  const getUser = () => {
    if (session.user) {
      return session.user;
    } else {
      return null;
    }
  };

  const setSession = (item) => {
    localStorage.setItem("session", JSON.stringify(item));
  };

  return { session, getUser, setSession };
};
