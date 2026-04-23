import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const url= "https://book-del-backend.onrender.com"
  const initialUser = JSON.parse(localStorage.getItem("user")) || null;

  const [authUser, setAuthUser] = useState(initialUser);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
