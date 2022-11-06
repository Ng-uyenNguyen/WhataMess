import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { UserProfileModel } from "../utils/models/user-profile.model";
export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserProfileModel | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const getUserData = async () => {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const user: UserProfileModel = {
              uid: docSnap.data().uid,
              displayName: docSnap.data().displayName,
              avatar: docSnap.data().avatar,
              email: docSnap.data().email,
            };
            setCurrentUser(user);
          }
        };
        getUserData();
      }
      setCurrentUser(null);
    });
    return () => {
      unsub();
    };
  }, []);
  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
