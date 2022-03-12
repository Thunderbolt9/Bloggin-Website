import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase.js";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isloading, setIsLoading] = useState(true);

  function registerUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function updateUserName(inputName) {
    return updateProfile(auth.currentUser, {
      displayName: inputName,
    });
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
  }, [currentUser]);

  const value = {
    currentUser,
    registerUser,
    login,
    logOut,
    updateUserName,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isloading && children}
    </AuthContext.Provider>
  );
}
