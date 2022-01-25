import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  deleteUser,
  reauthenticateWithPopup,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

import { node } from 'prop-types';
import { navigate } from 'gatsby';

import { auth, db } from '../services/firebase';

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
      provider.setCustomParameters({
        prompt: 'select_account',
      });
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err);
    }
  }

  async function logout() {
    await signOut(auth);
    navigate('/');
  }

  async function deleteAccount() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });
    const user = auth.currentUser;

    try {
      await deleteUser(user);

      const q = query(collection(db, 'comments'), where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => deleteDoc(doc.ref));

      navigate('/');
    } catch (err) {
      if (err) {
        reauthenticateWithPopup(user, provider);
      }
    }
  }

  const value = useMemo(
    () => ({
      currentUser,
      error,
      login,
      logout,
      deleteAccount,
    }),
    [currentUser]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: node.isRequired,
};

export { useAuth, AuthProvider };
