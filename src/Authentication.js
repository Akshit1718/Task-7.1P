import React, { useContext, useState, useEffect } from 'react';
import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function Authent({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setloading] = useState(true);

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password); 
  }

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password); 
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setloading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}