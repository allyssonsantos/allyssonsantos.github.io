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

import { auth, db } from '@services/firebase';

const AuthContext = createContext();

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth mst be used within a AuthProvider');
  }
  return context;
}

async function login() {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });
    await signInWithPopup(auth, provider);

    return true;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function logout() {
  try {
    await signOut(auth);
    navigate('/');

    return true;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function deleteAccount() {
  const user = auth.currentUser;

  try {
    await deleteUser(user);

    const q = query(collection(db, 'comments'), where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => deleteDoc(doc.ref));

    navigate('/');
  } catch (err) {
    if (err) {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });

      reauthenticateWithPopup(user, provider);
    }
  }
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loadingUser, toggleLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

      toggleLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      loadingUser,
    }),
    [currentUser, loadingUser]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: node.isRequired,
};

export { useAuth, AuthProvider, login, logout, deleteAccount };
