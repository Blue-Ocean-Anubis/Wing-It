import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import fb from "./../firebase.js";

const auth = getAuth();

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // User defaults to null
  const [user, setUser] = useState(null);

  const signup = (email, password) => {
    // returns promise
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Run once on mount
  useEffect(() => {
    // notfies us whenever the user gets set; listens for state change
    // user will always be some user or null
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, signup, login }}>
      {children}
    </AuthContext.Provider>
  );
}
