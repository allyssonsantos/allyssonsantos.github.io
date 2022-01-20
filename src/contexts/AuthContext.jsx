import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { node } from 'prop-types';
import { navigate } from 'gatsby';

import { auth } from '../services/firebase';

const AuthContext = createContext();

function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  async function login() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err);
    }
  }

  async function logout() {
    await signOut(auth);
    navigate('/');
  }

  const value = useMemo(
    () => ({
      currentUser,
      error,
      login,
      logout,
    }),
    [currentUser]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: node.isRequired,
};

export { useAuth, AuthProvider };
