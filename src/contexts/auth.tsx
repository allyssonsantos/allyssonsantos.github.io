import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  type PropsWithChildren,
} from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  deleteUser,
  reauthenticateWithPopup,
  type User,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

import { auth, db } from 'src/services/firebase';

type AuthContextType = {
  currentUser?: User | null;
  isLoadingUser: boolean;
};

const AuthContext = createContext({} as AuthContextType);

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

    return true;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function deleteAccount() {
  const user = auth.currentUser;

  try {
    await deleteUser(user!);

    const q = query(collection(db, 'comments'), where('uid', '==', user!.uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => deleteDoc(doc.ref));
  } catch (err) {
    if (err) {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });

      reauthenticateWithPopup(user!, provider);
    }
  }
}

function AuthProvider({ children }: PropsWithChildren) {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>();
  const [isLoadingUser, toggleLoading] = useState(true);

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
      isLoadingUser,
    }),
    [currentUser, isLoadingUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { useAuth, AuthProvider, login, logout, deleteAccount };
