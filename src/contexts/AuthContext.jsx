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
import PropTypes from 'prop-types';
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

function AuthProvider({
  children,
  currentUser: initialUser = null,
  loadingUser: initialLoading = true,
}) {
  const [currentUser, setCurrentUser] = useState(initialUser);
  const [loadingUser, toggleLoading] = useState(initialLoading);

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
  children: PropTypes.node.isRequired,
  currentUser: PropTypes.shape({
    uid: PropTypes.string,
    photoURL: PropTypes.string,
    displayName: PropTypes.string,
  }),
  loadingUser: PropTypes.bool,
};

AuthProvider.defaultProps = {
  currentUser: undefined,
  loadingUser: true,
};

export { useAuth, AuthProvider, login, logout, deleteAccount };
