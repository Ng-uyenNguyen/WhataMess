import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useEffect, useState } from 'react';
import { auth } from "../firebase/firebase";
export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      user ? setCurrentUser(user) : setCurrentUser(null)
    });
    return () => {
      unsub();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider >
  );
}