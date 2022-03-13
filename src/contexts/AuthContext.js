import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase.js";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

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

  function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then(navigate("/"))
      .catch((error) => console.log(error));
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
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isloading && children}
    </AuthContext.Provider>
  );
}
